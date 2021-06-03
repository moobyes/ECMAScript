/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-08-03 11:22:40
 * @LastEditTime: 2020-08-03 11:22:41
 * @LastEditors: Moobye
 */ 
if (
	location.href.indexOf('http://ebooking.ctrip.com/ebkorder/order') != -1 ||
  location.href.indexOf('https://ebooking.ctrip.com/ebkorder/order') != -1 ||
  location.href.indexOf('https://ebooking.ctrip.com/ebkorderv2/domestic/orderlist.html') != -1
) {
	var PAGE_SIZE = 20;
	var CTRIP = 'ctrip';
	var QUNAR = 'qunar';
	var ELONG = 'elong';

	var protocol = location.href.indexOf('http:') == -1 ? 'https' : 'http';

	// 定时拉去订单任务
	var ctripTimer, qunarTimer, elongTimer;

	$(function() {
		// 初始化页面
		initPage();
		// 查询按钮点击事件
		searchTypeBtnEvent();
		// 定时任务,处理滚动产生的新的订单
		scheduleTask();
		confirmFirstOrderSyncStatus();
	});

	function getCtripHotelName() {
		return $('#aHotelName').html();
	}

	function doCommon(str) {
		let next = randomTime(20, 30);
		let now = new Date();
		let dd = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			now.getHours(),
			now.getMinutes(),
			now.getSeconds() + next / 1000
		).Format('hh:mm:ss');

		let msg = `${str}开始: ${dd}`;
		$('#errorMsg')
			.html(msg)
			.show();
		let timer = setInterval(function() {
			let loading = $(`#${str}Btn`).attr('loading') || false;
			if (!loading) {
				markLoading(str);
				$(`#${str}Btn`).click();
			}
		}, next);
		return timer;
	}

	function doUpload() {
		ctripTimer = doCommon(CTRIP);
		qunarTimer = doCommon(QUNAR);
		elongTimer = doCommon(ELONG);
	}

	function cannelDoUPload() {
		ctripTimer ? clearInterval(ctripTimer) : '';
		qunarTimer ? clearInterval(qunarTimer) : '';
		elongTimer ? clearInterval(elongTimer) : '';
	}

	function showError(msg) {
		$('#errorMsg')
			.html(new Date().Format('hh:mm:ss') + msg)
			.show();
	}

	function hideError() {
		$('#errorMsg').hide();
	}

	function buildQueryParams(pageIndex, FlagID, FlagDate, forAuto, otaId, saveFirst) {
		var sourceType = null;
		if (forAuto) {
			sourceType = otaId == 'ctrip' ? 'Ebooking' : capitilize(otaId);
		} else {
			sourceType = getActiveTab() == 'ctrip' ? 'Ebooking' : capitilize(getActiveTab());
		}

		var today = new Date();
		var start = getCurrentMonth();
		var end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

		var params = {
			DateType: 'OrderDate',
			DateStart: start,
			DateEnd: end.Format('yyyy-MM-dd'),
			OrderType: 'ALL',
			OrderStatus: '0',
			ReceiveType: '',
			OrderID: '',
			RoomName: '',
			ClientName: '',
			BookingNo: '',
			IsGuarantee: false,
			IsPP: false,
			IsUrgent: false,
			IsHoldRoom: false,
			IsFreeSale: false,
			IsCreditOrder: false,
			IsBookingInvoice: false,
			ConfirmName: '',
			OrderBy: 'FormDate',
			UnCheckInChecked: false,
			TodayCheckInChecked: false,
			TodayOrderChecked: false,
			SourceType: sourceType,
			UnBookingInvoice: false,
			PageIndex: pageIndex,
			FlagID: pageIndex == 1 ? 0 : FlagID,
			Method: 'QueryOrderList',
		};
		if (pageIndex != 1) {
			params.FlagDate = FlagDate;
		}
		return params;
	}

	function capitilize(str) {
		if (str == null || str.toString().trim() == '') {
			return '';
		}
		return (
			str
				.toString()
				.substring(0, 1)
				.toUpperCase() + str.toString().substring(1)
		);
	}

	function markLoading(otaId) {
		$('#' + otaId + 'Btn').attr('loading', true);
	}

	function markUnloading(otaId) {
		$('#' + otaId + 'Btn').removeAttr('loading');
	}

	function getActiveTab() {
		var tab = $('div.orderSearch-box')
			.find('a.ebk3-tab-item.item-cur')
			.attr('id');
		if (tab == 'ShowCtrip') {
			return 'ctrip';
		} else if (tab == 'ShowQunaer') {
			return 'qunar';
		} else if (tab == 'ShowElong') {
			return 'elong';
		} else {
			// 防止其他意外情况
			return 'ctrip';
		}
	}

	function buildCtripDetail(to) {
		// 如果有新单子，则需要解析所有信息
		var obj = {};
		obj.orderId = to.OrderID;
		obj.hotelName = getCtripHotelName();
		var dateArr = to.ArrivalAndDeparture.substring(0, to.ArrivalAndDeparture.indexOf('<b>'))
			.trim()
			.split('至');
		if (dateArr.length == 2) {
			obj.checkInDate = dateArr[0].trim();
			obj.checkOutDate = dateArr[1].trim();
		} else if (dateArr[0] === '') {
			obj.checkInDate = to.ArrivalAndDeparture.trim();
			obj.checkOutDate = to.ArrivalAndDeparture.trim();
		}

		obj.purcharseTime = to.FormDateOriginal;
		obj.otaId = getActiveTab();
		obj.pluginVersion = PLUGIN_VERSION;
		obj.paymentType = to.PaymentInfo.indexOf('预付') != -1 || to.PaymentInfo.indexOf('现付闪住') != -1 ? 0 : 1;

		let AmountDesPrice = parseFloat(
			to.AmountDes.replace('RMB', '')
				.replace('&nbsp;', '')
				.trim() || ''
		);

		let InvoicePrice = 0;
		if (to.Invoice && to.Invoice.Info) {
			let oldP = parseFloat(to.Invoice.Info.split('[人民币]')[1]) || 0;
			let newP = parseFloat(to.Invoice.Info.split('RMB')[1]) || 0;

			InvoicePrice = oldP ? oldP : newP;
		}

		if (obj.paymentType) {
			obj.price = AmountDesPrice;
		} else {
			obj.price = AmountDesPrice > InvoicePrice ? AmountDesPrice : InvoicePrice;
		}

		var remark1 = replaceAll(to.CtripRemarks, '<b>', '【');
		remark1 = replaceAll(remark1, '</b>', '】');
		remark1 = replaceAll(remark1, '<br>', '');
		remark1 = replaceAll(remark1, '<br/>', '');
		let isBreakfast = to.RoomPriceText.includes('不含早') ? '不含早' : '含早';
		obj.remark = `【${to.RoomName}】,${isBreakfast},${to.CommonRemark ? to.CommonRemark + '，' : ''}${remark1}`;
		obj.isFinal = 1;
		obj.orderStatus = to.OrderStatusDisplay;
		obj.oyoId = getCtripHotelCode();
		obj.roomCount = parseInt(to.Quantity || '1');
		obj.roomName = to.RoomName;
		obj.isCrs = 1; // 备份的时候，默认就是已经存在了

		var selectedRoomname = $('#' + to.OrderID).val();
		if (selectedRoomname != -1) {
			obj.roomName = selectedRoomname;
		}

		obj.guestName = to.ClientName.substring(0, to.ClientName.indexOf('&nbsp;'));
		if (to.Invoice != null) {
			obj.requestInvoice = to.Invoice.Info;
		}

		if (isNotEmpty(to.CancelPolicyTitle) && to.CancelPolicyTitle.indexOf('不可取消') != -1) {
			obj.cannotCancel = 1;
		}
		console.log(obj);
		return obj;
	}

	function buildCtripDetailForNewOrder(to, otaId) {
		// 如果有新单子，则需要解析所有信息
		var obj = {};
		obj.orderId = to.OrderID;
		obj.hotelName = getCtripHotelName();
		var dateArr = to.ArrivalAndDeparture.substring(0, to.ArrivalAndDeparture.indexOf('<b>'))
			.trim()
			.split('至');
		if (dateArr.length == 2) {
			obj.checkInDate = dateArr[0].trim();
			obj.checkOutDate = dateArr[1].trim();
		} else if (dateArr[0] === '') {
			obj.checkInDate = to.ArrivalAndDeparture.trim();
			obj.checkOutDate = to.ArrivalAndDeparture.trim();
		}
		obj.purcharseTime = to.FormDateOriginal;
		obj.otaId = otaId;
		obj.isCrs = 0;
		obj.pluginVersion = PLUGIN_VERSION;
		obj.paymentType = to.PaymentInfo.indexOf('预付') != -1 || to.PaymentInfo.indexOf('现付闪住') != -1 ? 0 : 1;

		let AmountDesPrice = parseFloat(
			to.AmountDes.replace('RMB', '')
				.replace('&nbsp;', '')
				.trim() || ''
		);
		let InvoicePrice = to.Invoice && to.Invoice.Info ? parseFloat(to.Invoice.Info.split('[人民币]')[1]) : 0;

		if (obj.paymentType) {
			obj.price = AmountDesPrice;
		} else {
			obj.price = AmountDesPrice > InvoicePrice ? AmountDesPrice : InvoicePrice;
		}

		var remark1 = replaceAll(to.CtripRemarks, '<b>', '【');
		remark1 = replaceAll(remark1, '</b>', '】');
		remark1 = replaceAll(remark1, '<br>', '');
		remark1 = replaceAll(remark1, '<br/>', '');
		let isBreakfast = to.RoomPriceText.includes('不含早') ? '不含早' : '含早';
		obj.remark = `【${to.RoomName}】,${isBreakfast},${to.CommonRemark ? to.CommonRemark + '，' : ''}${remark1}`;
		obj.isFinal = 1;
		obj.orderStatus = to.OrderStatusDisplay;
		obj.oyoId = getCtripHotelCode();
		obj.roomCount = parseInt(to.Quantity || '1');
		obj.roomName = to.RoomName;

		var selectedRoomname = $('#' + to.OrderID).val();
		if (selectedRoomname != undefined && selectedRoomname != -1) {
			obj.roomName = selectedRoomname;
		}

		obj.guestName = to.ClientName.substring(0, to.ClientName.indexOf('&nbsp;'));
		if (to.Invoice != null) {
			obj.requestInvoice = to.Invoice.Info;
		}

		if (isNotEmpty(to.CancelPolicyTitle) && to.CancelPolicyTitle.indexOf('不可取消') != -1) {
			obj.cannotCancel = 1;
		}
		return obj;
	}

	function firstOrderCacheKey(otaId) {
		return otaId + '_' + getCtripHotelCode() + '_fid';
	}

	function pageCacheKey(otaId) {
		return otaId + '_' + getCtripHotelCode() + '_page';
	}

	function uploadCurrentPage(orders, pageIndex, totalPages, otaId) {
		var params = [];
		if (orders != null && orders.length > 0) {
			for (var i = 0; i < orders.length; i++) {
				var obj = {};
				var to = orders[i];
				obj.orderId = to.OrderID;
				obj.otaId = otaId;
				obj.isFinal = 1;
				obj.oyoId = getCtripHotelCode();
				obj.orderStatus = to.OrderStatusDisplay;
				params.push(obj);
			}
		}
		$.ajax({
			url:
				PREFIX +
				'/web-spider/ota/order/updateHistoryOrder?otaId=' +
				otaId +
				'&oyoId=' +
				getCtripHotelCode() +
				'&firstOrderId=' +
				(pageIndex == totalPages ? localStorage.getItem(firstOrderCacheKey(otaId)) : ''),
			type: 'POST',
			data: JSON.stringify(params),
			dataType: 'json',
			contentType: 'application/json;charset=UTF-8',
			success: function(r) {
				if (r.code == 0) {
					showCtripProgress(pageIndex, totalPages, otaId);
					pageIndex = pageIndex + 1;
					var lo = orders[orders.length - 1];
					localStorage.setItem(pageCacheKey(otaId), pageIndex);
					setTimeout(function() {
						getHistoryOrders(pageIndex, totalPages, lo.FormID, lo.FormDateOriginal, otaId);
					}, randomTime(5, 8));
				} else {
				}
			},
			error: function(r) {},
		});
	}

	function getHistoryOrders(pageIndex, totalPages, FlagID, FlagDate, otaId) {
		if (pageIndex <= totalPages) {
			var url = protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random();
			$.ajax({
				url: url,
				type: 'post',
				contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
				data: buildQueryParams(pageIndex, FlagID, FlagDate, true, otaId),
				dataType: 'json',
				timeout: 120000,
				success: function(r) {
					if (r.Rcode == 0) {
						if (r.Data != null && r.Data.length > 0) {
							var orders = r.Data;

							var lastOrder = r.Data[r.Data.length - 1];
							if (pageIndex == 1) {
								localStorage.setItem(firstOrderCacheKey(otaId), orders[0].OrderID);
							}
							localStorage.setItem(pageCacheKey(otaId), pageIndex + 1);
							localStorage.setItem(
								previoutPageCacheKey(otaId),
								JSON.stringify({
									formId: lastOrder.FormID,
									original: lastOrder.FormDateOriginal,
								})
							);
							uploadCurrentPage(orders, pageIndex, totalPages, otaId);
						}
					} else {
					}
				},
				error: function(e) {},
			});
		} else {
			localStorage.removeItem(previoutPageCacheKey(otaId));
			localStorage.removeItem(pageCacheKey(otaId));
			localStorage.setItem(historyCacheKey(otaId), '1');
			markUnloading(otaId);
			saveFirstOrderId(otaId);
		}
	}

	function showCtripProgress(pageIndex, totalPages, otaId) {
		$('#progressInfo b#otaId').html(otaId);
		$('#progressInfo b#currentPage').html(pageIndex);
		$('#progressInfo b#total').html(totalPages);
		$('#progressInfo').show();
		hideMsg();
	}

	function hideCtripProgress() {
		$('#progressInfo').hide();
	}

	function hideMsg() {
		$('#errorMsg').hide();
	}

	function showMsg(msg) {
		$('#errorMsg')
			.html(new Date().Format('hh:mm:ss') + ': ' + msg)
			.show();
		hideCtripProgress();
	}

	function getCtripHotelCode() {
		return $('#hotelCodeBox')
			.val()
			.trim();
	}

	function historyCacheKey(otaId) {
		return otaId + '_' + getCtripHotelCode() + '_hi';
	}

	// 为了处理之前的事故
	function accCacheKey(otaId) {
		return otaId + '_' + getCtripHotelCode() + '_acc';
	}

	function previoutPageCacheKey(otaId) {
		return otaId + '_' + getCtripHotelCode() + 'pri';
	}

	function getCtripLastOrderInfo(otaId) {
		var info = null;
		if (isEmpty(getCtripHotelCode())) return info;
		$.ajax({
			url: PREFIX + '/web-spider/ota/order/getFirstOrderId',
			type: 'POST',
			data: {
				oyoId: getCtripHotelCode(),
				otaId: otaId,
			},
			async: false,
			dataType: 'json',
			success: function(r) {
				if (r.code == 0) {
					info = r.data;
				} else {
					markUnloading(otaId);
				}
			},
			error: function(r) {
				markUnloading(otaId);
			},
		});
		return info;
	}

	function buildCancelQueryParams(otaId) {
		var sourceType = otaId == 'ctrip' ? 'Ebooking' : capitilize(otaId);
		var today = new Date();
		var params = {
			DateType: 'OrderDate',
			DateStart: today.Format('yyyy-MM-dd'),
			DateEnd: today.Format('yyyy-MM-dd'),
			OrderType: 'ALL',
			OrderStatus: '4',
			ReceiveType: '',
			OrderID: '',
			RoomName: '',
			ClientName: '',
			BookingNo: '',
			IsGuarantee: false,
			IsPP: false,
			IsUrgent: false,
			IsHoldRoom: false,
			IsFreeSale: false,
			IsCreditOrder: false,
			IsBookingInvoice: false,
			ConfirmName: '',
			OrderBy: 'FormDate',
			UnCheckInChecked: false,
			TodayCheckInChecked: false,
			TodayOrderChecked: false,
			SourceType: sourceType,
			UnBookingInvoice: false,
			PageIndex: 1,
			FlagID: 0,
			Method: 'QueryOrderList',
		};
		return params;
	}

	function cancelOrder(orders, otaId) {
		var orderIds = [];
		var preCan = JSON.parse(localStorage.getItem(getCtripHotelCode() + '_cancel') || '[]');
		for (var i = 0; i < orders.length; i++) {
			if (!arrayHas(preCan, orders[i].OrderID)) {
				orderIds.push(orders[i].OrderID);
			}
		}
		if (orderIds.length > 0) {
			$.ajax({
				url: REPORT_PREFIX + 'cancelOrder?oyoId=' + getCtripHotelCode() + '&otaId=' + otaId,
				type: 'POST',
				data: JSON.stringify(orderIds),
				contentType: 'application/json;charset=utf-8',
				dataType: 'json',
				success: function(e) {
					saveAllItem(preCan, orderIds);
					localStorage.setItem(getCtripHotelCode() + '_cancel', JSON.stringify(preCan));
					markUnloading(otaId);
				},
				error: function(e) {
					markUnloading(otaId);
				},
			});
		} else {
			markUnloading(otaId);
		}
	}

	// 是否有取消的订单，不需要在循环里面走，这么异步就行+
	function hasCancelOrder(otaId) {
		$.ajax({
			url: protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random(),
			data: buildCancelQueryParams(otaId),
			type: 'post',
			dataType: 'json',
			success: function(e) {
				if (e.Rcode == 0) {
					if (e.Data != null && e.Data.length > 0) {
						cancelOrder(e.Data, otaId);
					} else {
						markUnloading(otaId);
					}
				} else {
					markUnloading(otaId);
				}
			},
			error: function() {
				markUnloading(otaId);
			},
		});
	}

	function hasNewOrders(firstOrderId, otaId) {
		var url = protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random();
		$.ajax({
			url: url,
			type: 'POST',
			data: buildQueryParams(1, null, null, true, otaId),
			dataType: 'json',
			success: function(result) {
				if (result != null && result.Data != null && result.Data.length > 0) {
					var orders = result.Data;
					if (orders != null && orders.length > 0) {
						var newOrders = [];
						var index = 0;
						if (firstOrderId != null) {
							if (firstOrderId == '-1') {
								firstOrderId = orders.length;
							} else {
								for (var i = 0; i < orders.length; i++) {
									if (orders[i].OrderID == parseInt(firstOrderId)) {
										index = i;
										break;
									}
								}
							}
						} else {
							index = orders.length;
						}
						newOrders = newOrders.concat(orders.splice(0, index));
						if (newOrders != null && newOrders.length > 0) {
							handleCtripOrders(newOrders, 0, [], otaId);
						} else {
							hasCancelOrder(otaId);
							markUnloading(otaId);
							showMsg(otaId + '-暂无新单子');
						}
					} else {
						showMsg(otaId + '-暂无新订单');
						markUnloading(otaId);
					}
				} else {
					showMsg(otaId + '-当月没有订单 ');
					markUnloading(otaId);
				}
			},
			error: function(e) {
				markUnloading(otaId);
			},
		});
	}

	function getHistoryOrderCount(otaId) {
		var url = protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random();
		$.ajax({
			url: url,
			type: 'post',
			contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
			data: buildQueryParams(1, null, null, true, otaId),
			dataType: 'json',
			timeout: 120000,
			success: function(r) {
				if (r.Rcode == 0) {
					var totalRecords = r.TotalRecords;
					var pageSize = 20;
					var totalPages = 0;
					if (totalRecords % pageSize == 0) {
						totalPages = totalRecords / pageSize;
					} else {
						totalPages = Math.floor(totalRecords / pageSize) + 1;
					}

					// 先判断是否历史订单是否完成了
					var over = localStorage.getItem(historyCacheKey(otaId));
					if (over != null && over == '1') {
						return;
					} else {
						var pre = localStorage.getItem(pageCacheKey(otaId));
						if (pre != null) {
							var preInfo = localStorage.getItem(previoutPageCacheKey(otaId));
							var aa = JSON.parse(preInfo);
							getHistoryOrders(parseInt(pre), totalPages, aa.formId, aa.original, otaId);
						} else {
							getHistoryOrders(1, totalPages, null, null, otaId);
						}
					}
				} else {
					markUnloading(otaId);
				}
			},
			error: function(e) {
				markUnloading(otaId);
			},
		});
	}

	function saveCtripFid(otaId, fid) {
		try {
			localStorage.setItem(firstOrderCacheKey(otaId), fid);
			$.doAjax(
				'saveFirstOrderId',
				{
					otaId: otaId,
					oyoId: getCtripHotelCode(),
					firstOrderId: fid,
				},
				'post',
				'json',
				false,
				function(r) {
					if (r.code == 0) {
					} else {
						markUnloading(otaId);
					}
				}
			);
		} catch (e) {}
	}

	function saveFirstOrderId(otaId) {
		var url = protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random();
		$.ajax({
			url: url,
			type: 'post',
			contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
			data: buildQueryParams(1, null, null, true, otaId, true),
			dataType: 'json',
			timeout: 120000,
			success: function(result) {
				if (result.Rcode == 0) {
					if (result.Data != null && result.Data.length > 0) {
						var fid = result.Data[0].OrderID;
						saveCtripFid(otaId, fid);
					} else {
						saveCtripFid(otaId, '-1');
						markUnloading(otaId);
					}
				} else {
					markUnloading(otaId);
				}
			},
			error: function(e) {
				markUnloading(otaId);
			},
		});
	}

	function handleAccident(otaId) {
		var url = protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random();
		$.ajax({
			url: url,
			type: 'POST',
			data: buildQueryParams(1, null, null, true, otaId),
			dataType: 'json',
			success: function(result) {
				if (result != null && result.Data != null && result.Data.length > 0) {
					let orders = result.Data;
					if (orders != null && orders.length > 0) {
						let serverData = [];
						var max = 0;
						if (orders.length > 10) {
							max = 10;
						} else {
							max = orders.length;
						}

						// 只处理第一页的前10个订单号
						let fid = localStorage.getItem(firstOrderCacheKey(otaId));
						for (var i = 0; i < max; i++) {
							// 第一个订单号的信息
							if (i == 0) {
								serverData.push(orders[i]);
								if (orders[0].OrderID != fid) {
									saveCtripFid(otaId, orders[0].OrderID);
								}
							} else {
								if (localStorage.getItem(otaId + '_order_' + orders[i].OrderID) == null) {
									serverData.push(orders[i]);
								}
							}
						}

						if (serverData != null && serverData.length > 0) {
							handleCtripOrders(serverData, 0, [], otaId);
						} else {
							markUnloading(otaId);
						}
						localStorage.setItem(accCacheKey(otaId), '6');
					} else {
						markUnloading(otaId);
					}
				} else {
					markUnloading(otaId);
				}
			},
			error: function(e) {
				markUnloading(otaId);
			},
		});
	}

	function handleClick(otaId) {
		// 清除历史标记
		localStorage.removeItem(historyCacheKey(CTRIP));
		localStorage.removeItem(historyCacheKey(QUNAR));
		localStorage.removeItem(historyCacheKey(ELONG));
		// 判断之前的故障是否处理完成
		let acc = localStorage.getItem(accCacheKey(otaId));
		if (acc == null || acc == '5') {
			//如果服务器宕机时间长，更改acc == "数值"
			handleAccident(otaId);
		}

		if (localStorage.getItem(firstOrderCacheKey(otaId)) != null) {
			hasNewOrders(localStorage.getItem(firstOrderCacheKey(otaId)), otaId);
		} else {
			var info = getCtripLastOrderInfo(otaId);
			if (info != null && info.firstOrderId != null) {
				localStorage.setItem(firstOrderCacheKey(otaId), info.firstOrderId);
				hasNewOrders(info.firstOrderId, otaId);
			} else {
				saveFirstOrderId(otaId);
				markUnloading(otaId);
			}
		}
	}

	/**
	 * 初始化页面
	 */
	function initPage() {
		var key = 'ctrip_' + getCtripHotelName();

		// 增加酒店code 输入框
		var searchBox = $('div.orderSearch-box div:first');
		$(searchBox).append(
			$(
				'<input type="text" id="hotelCodeBox" c' +
					'lass="ebk3-inText" style="margin-left:30px; margin-bottom:0px; width:120p x;height:30px;">'
			)
		);
		$(searchBox).append(
			$(
				'<span id="ctripBtn" style="font-size: 12px;"></span><span style="font-size: 12px;margin-left: 20px" id="qunarBtn"></span><span style="font-size: 12px;margin-left: 20px" id="elongBtn"></span><label style="color:#ff2a34;font-size:12px" id="errorMsg"></label><span id="progressInfo" style="display:none; margin-left:20px;font-size:18px;position:relative;"><label class="otaId" style="color:blue;font-weight: bold;font-size:12px;"></label>&nbsp;<label>共 <b style="color:#ff5359" id="total"></b> 页, 当前 <b style=color:#ff0000 id="currentPage"></b> 页</label></span>'
			)
		);

		$('#ctripBtn').on('click', function() {
			markLoading(CTRIP);
			handleClick(CTRIP);
		});

		$('#qunarBtn').on('click', function() {
			markLoading(QUNAR);
			handleClick(QUNAR);
		});

		$('#elongBtn').on('click', function() {
			markLoading(ELONG);
			handleClick(ELONG);
		});
		let hotelCodeBox = $('#hotelCodeBox');
		hotelCodeBox.on('change', function() {
			let code = $(this)
				.val()
				.trim();
			localStorage.setItem(key, code);
			if (isNotEmpty(code)) {
				hideError();
				checkHotelCode(code).then(
					data => {
						localStorage.setItem('isHotelCodeError', '0');
						doUpload();
					},
					e => {
						localStorage.setItem('isHotelCodeError', '1');
						cannelDoUPload();
						showError('酒店code为错误！');
						alert(e);
					}
				);
			} else {
				cannelDoUPload();
				showError('酒店code为空！');
			}
		});

		hotelCodeBox.val((localStorage.getItem(key) || '').trim());
		hotelCodeBox.trigger('change');

		setTimeout(function() {
			// 确定订单列表有数据
			if (hasOrders()) {
				// 订单列表点击事件
				bindClickEvent();

				// 标记已经同步的订单
				markAlreadySyncOrder();

				// 处理首个订单是否需要同步
				confirmFirstOrderSyncStatus();
				markTodayOrder();
			}
		}, 1000);
	}

	/**
	 * 标记已同步的订单
	 */
	function markAlreadySyncOrder() {
		$('.ordersSyn-item').each(function(index, item) {
			var orderId = $(item)
				.find('.orderCode>span:last')
				.text();
			if (hasOrderIdCached(orderId)) {
				var labelLength = $(item).find('.orderCode>.sync-label-span').length;
				if (labelLength == 0) {
					$(item)
						.find('.orderCode')
						.prepend(OrderSyncLabelHtmlText(orderId));
				}
			}
		});
	}

	/**
	 * 处理首个订单是否需要同步
	 */
	function confirmFirstOrderSyncStatus() {
		if (hasOrders()) {
			$('.ordersSyn-item')[0].click();
		}
	}

	/**
	 * 左侧订单列表点击事件
	 */
	function bindClickEvent() {
		$('ul.ordersSyn-list').on('click', '.ordersSyn-item', function() {
			var curOrderId = $(this)
				.find('.orderCode>span:last')
				.text();

			var state = $(this)
				.find('div.orderCode')
				.find('b')
				.html(); // 订单状态：已接单、已取消、已拒单 等等
			var firstState = $(this)
				.find('div.orderCode')
				.find('span')
				.html(); //订单标记：新订、取消、无效

			if (
				hasOrderIdCached(curOrderId) ||
				state == '已取消' ||
				state == '已拒单' ||
				firstState == '取消' ||
				firstState == '无效'
			) {
				markAlreadySyncOrder();
				hideSync();
			} else {
				var roomName = $(this)
					.find('div.roomInfo-live')
					.find('p')
					.html();
				var syncDiv = $(
					"<div class='orderMain-hd orderMain-sort sync-order-div' style='display: none'><select  class='ebk3-select'  style='width:200px;margin-left: 10px;'></select><a href='javascript:' name='sync_order_btn' class='ebk3-btn ebk3-btn-primary' data-customquerytype='1'>Sync Order</a></div>"
				);
				var roomSelect = $(syncDiv).find('select');
				roomSelect.append("<option value='-1'>Select Room Type</option>");
				for (var info in oldRoomTypeToNew) {
					var option = $('<option></option>');
					$(option).attr('value', info);
					$(option).text(info);
					$(roomSelect).append(option);
				}

				if ($('div.orderMain-detail').find('div.sync-order-div').length == 0) {
					$('div.orderMain-detail div.orderMain-hd').after(syncDiv);
				} else {
					$('div.orderMain-detail')
						.find('div.sync-order-div')
						.remove();
					$('div.orderMain-detail div.orderMain-hd').after(syncDiv);
				}
				$(syncDiv)
					.find('select')
					.attr('id', curOrderId);

				$(roomSelect).change(function() {
					var val = $(this).val();
					if (val == -1) {
						$(this).css('background-color', 'orange');
					} else {
						$(this).css('background-color', 'white');
					}
				});

				showSync();
				renderRoomTypeSelect(roomName, curOrderId);

				$(syncDiv)
					.find('a')
					.attr('id', curOrderId);
				$(syncDiv)
					.find('a')
					.on('click', function() {
						let code = getCtripHotelCode();
						// 查看hotelCode是否正确
						let isHotelCodeError = localStorage.getItem('isHotelCodeError');
						if (isNotEmpty(code) && isHotelCodeError === '0') {
							syncBtnClick(code);
						} else {
							$('#hotelCodeBox').focus();
							alert('请输入正确的hotelCode!');
						}
					});
			}
		});
	}

	function parseDetailForBackup(order, hotelCode) {
		var detailParam = {};
		detailParam.SourceType = order.SourceType;
		detailParam.Token = order.Token;
		detailParam.Method = 'GetOrderDetial';
		detailParam.OrderKey = order.OrderKey;

		$.ajax({
			url: protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random(),
			type: 'POST',
			data: detailParam,
			dataType: 'json',
			async: false,
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8;',
			success: function(r) {
				if (r.Rcode == 0) {
					var orders = [];
					orders.push(buildCtripDetail(r.Data));
					if (oldRoomTypeToNew[orders[0].roomName] === undefined) {
						alert('无匹配房型，清选择房型');
						return;
					}
					//  校验是否采用新crs录入,校验订单是否存在，如果存在了，则标记为已存在
					checkHotelISRunNew(hotelCode, orders[0]).then(
						e => {
							if (e.isAlreadyExist) {
								alert('Order ' + e.orderId + ' already exists in CRS!');
								// 订单号要考虑不同ota可能会有相同的订单号，所以需要加上ota进行区分
								localStorage.setItem(getActiveTab() + '_order_' + e.orderId, 'true');
								hideSync();
								markTodayOrder();
							} else {
								syncToOYO(hotelCode, e);
							}
						},
						e => {
							alert(e);
						}
					);
				}
			},
			error: function(e) {
				alert(`携程系统错误，${JSON.stringify(e)}`);
			},
		});
	}

	function handleCtripOrders(orders, index, results, otaId) {
		if (index < orders.length) {
			var detailParam = {};
			var order = orders[index];
			detailParam.SourceType = order.SourceType;
			detailParam.Token = order.Token;
			detailParam.Method = 'GetOrderDetial';
			detailParam.OrderKey = order.OrderKey;

			$.ajax({
				url: protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random(),
				type: 'POST',
				data: detailParam,
				dataType: 'json',
				async: false,
				contentType: 'application/x-www-form-urlencoded;charset=UTF-8;',
				success: function(r) {
					if (r.Rcode == 0) {
						results.push(buildCtripDetailForNewOrder(r.Data, otaId));
						setTimeout(function() {
							handleCtripOrders(orders, ++index, results, otaId);
						});
					} else {
						markUnloading(otaId);
					}
				},
				error: function(e) {
					markUnloading(otaId);
				},
			});
		} else {
			var fid = results[0].orderId;
			// console.log(results)
			$.ajax({
				url:
					REPORT_PREFIX + '/upload?otaId=' + otaId + '&oyoId=' + getCtripHotelCode() + '&firstOrderId=' + fid,
				type: 'POST',
				data: JSON.stringify(results),
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				success: function(e) {
					if (e.code == 0) {
						localStorage.setItem(firstOrderCacheKey(otaId), fid);
						showMsg('上传成功 ' + results.length + ' 条');
						markUnloading(otaId);
					} else {
						markUnloading(otaId);
					}
				},
				error: function(e) {
					markUnloading(otaId);
				},
			});
		}
	}

	function syncBtnClick(hotelCode) {
		// 解析DOM
		var obj = {};
		var orderId = getOrderId();
		obj.orderId = orderId;
		obj.otaId = getActiveTab();

		var params = buildQueryParams(1, null, null, false);
		params.OrderID = orderId;
		$.ajax({
			url: protocol + '://ebooking.ctrip.com/ebkorder//Ajax/OrderAjax.ashx?v=' + Math.random(),
			type: 'post',
			contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
			data: params,
			dataType: 'json',
			async: false,
			timeout: 120000,
			success: function(e) {
				if (e.Rcode == 0) {
					if (e.Data != null && e.Data.length > 0) {
						parseDetailForBackup(e.Data[0], hotelCode);
					}
				}
			},
			error: function(e) {},
		});
	}

	/**
	 * 判断订单是否存在于缓存
	 */
	function hasOrderIdCached(ctripOrderID) {
		return localStorage.getItem(getActiveTab() + '_order_' + ctripOrderID) == 'true';
	}

	function hideSync() {
		$('.sync-order-div').hide();
	}

	function showSync() {
		$('.sync-order-div').show();
	}

	/**
	 * 判断是否有订单
	 */
	function hasOrders() {
		var orderSize = $('.ordersSyn-item').length;
		return orderSize > 0;
	}

	/**
	 * 订单同步标签 html
	 */
	function OrderSyncLabelHtmlText(orderId) {
		return (
			'<span class="ebk3-radius-tags sync-label-span sync-label-' +
			orderId +
			" ebk3-solid-tags-elong\" data-bind=\"text: OrderTypeDisplay, css: { 'ebk3-solid-tags-new': OrderType == 'N', 'ebk3-solid-tags-mdf': OrderType == 'M', 'ebk3-solid-tags-delay': OrderType == 'D', 'ebk3-solid-tags-cancel': OrderType == 'C' || OrderType == 'T' || OrderType == 'S' }\">已同步</span>"
		);
	}

	function syncToOYO(hotelCode, order) {
		var confirmMsg = 'Sync 1 order to CRS?';
		console.log(order);
		// hasNewOrders(null,CTRIP)
		// hasNewOrders(null,ELONG)
		// hasNewOrders(null,QUNAR)
		if (confirm(confirmMsg)) {
			// 先备份
			backup(order);
			let oyowin;
			//判断是否录入新系统，打开oyo页面
			if (order.isUseNew) {
				oyowin = window.open(`${domain1}`, '_blank');
			} else {
				oyowin = window.open('https://crs.oyohotels.cn/admin/bookings/new', '_blank');
			}
			//延迟几秒钟等待oyo页面打开，不然那边收到不到消息
			setTimeout(function() {
				oyowin.postMessage(
					{
						orders: [order],
						hotelCode: hotelCode,
						sourceFrom: 'ctrip',
					},
					'*'
				);
			}, 2000);
		}
	}

	function backup(order) {
		if (order == null) return;
		$.ajax({
			url: PREFIX + '/web-spider/ota/order/uploadSingleOrder',
			type: 'POST',
			data: JSON.stringify(order),
			contentType: 'application/json',
			dataType: 'json',
			success: function(e) {},
			error: function(e) {},
		});
	}

	function getOrderId() {
		var orderId = $('span.orderCode-num').html();
		return orderId;
	}

	function renderRoomTypeSelect(roomName, orderId) {
		var standardRoomName = getStandardRoom(roomName);
		var roomTypeSelect = $('#' + orderId);

		var remark = '';
		// 这里下拉框必须根据订单号进行区分，否则，所有的都是这个房型了，肯定是不对的
		if (isEmpty(standardRoomName)) {
			$(roomTypeSelect).css('background-color', 'orange');
			remark += '【' + roomName + '】';
		} else {
			if ($(roomTypeSelect).val() == -1) {
				$(roomTypeSelect).val(standardRoomName);
				$(roomTypeSelect).css('background-color', 'white');
			}
		}
		return remark;
	}

	/**
	 * 查询相关按钮点击事件
	 */
	function searchTypeBtnEvent() {
		$('#search_button,#unCheckInCbox,#todayCheckInCbox,#todayOrderCbox,#needBookInvoice').on('click', function() {
			setTimeout(function() {
				refeshPageStatus();
			}, 100);
		});

		selectCheckInDateEvenet();
	}

	/**
	 *  入住日期选择事件
	 */
	function selectCheckInDateEvenet() {
		$('#orderbyDLL').on('change', function() {
			setTimeout(function() {
				refeshPageStatus();
			}, 100);
		});
	}

	// 标记是今天的订单
	function markTodayOrder() {
		$('.ordersSyn-list li').each(function() {
			var state = $(this)
				.find('div.orderCode')
				.find('b')
				.html();
			var firstState = $(this)
				.find('div.orderCode')
				.find('span')
				.html();
			var curOrderId = $(this)
				.find('.orderCode>span:last')
				.text();
			var checkInDate = $(this)
				.find('.liveTime span')
				.html()
				.split('至')[0]
				.trim();

			if (
				isToday(checkInDate) &&
				!(
					hasOrderIdCached(curOrderId) ||
					state == '已取消' ||
					state == '已拒单' ||
					firstState == '取消' ||
					firstState == '无效'
				)
			) {
				var has = false;
				$(this)
					.find('.item-bd span:last b')
					.each(function() {
						if ($(this).html() == '今日订单') {
							has = true;
						}
					});
				if (!has) {
					$(this)
						.find('.item-bd span:last')
						.after("<span style='margin-left:5px;color:red'><b>今日订单</b></span>");
				}
			} else {
				$(this)
					.find('.item-bd span:last b')
					.each(function() {
						if ($(this).html() == '今日订单') {
							$(this).hide();
						}
					});
			}
		});
	}

	/**
	 * 刷新页面订单列表状态
	 */
	function refeshPageStatus() {
		if (hasOrders()) {
			// 标记已经同步的订单
			markAlreadySyncOrder();
			// 处理首个订单是否需要同步
			confirmFirstOrderSyncStatus();
			bindClickEvent();
			markTodayOrder();
		}
	}
	/**
	 * 处理滚动新增的订单列表
	 * 通过定时获取去解决
	 */
	function scheduleTask() {
		setInterval(function() {
			markAlreadySyncOrder();
		}, 2000);
	}

	// 获取携程登录用户信息
	function getCtripUserInfo() {
		let params = {
			Method: 'GetAccountInfo',
			'Data[isReturnPermissionInfo]': false,
			'Data[isReturnAssociateHotelInfo]': true,
			'Data[isReturnCompanyInfo]': false,
			'Data[IsSelBindMobile]': true,
		};

		$.ajax({
			url:
				protocol +
				'://ebooking.ctrip.com/ebkassembly/usercenter/accountsetting/Ajax/account.ashx?v=' +
				Math.random(),
			type: 'POST',
			data: params,
			dataType: 'json',
			async: false,
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8;',
			success: function(r) {
				console.log(r);
			},
			error: function(e) {
				console.log(e);
			},
		});
	}

	// 获取携程酒店信息
	function getCtriptHotel() {
		let params = {
			Method: 'GetHomestayQualificationInfoByHotel',
		};
		$.ajax({
			url:
				protocol +
				'://ebooking.ctrip.com/ebkproduct/BaseInfo/Ajax/HotelBaseInfoProcess.ashx?v=' +
				Math.random(),
			type: 'POST',
			data: params,
			dataType: 'json',
			async: true,
			contentType: 'application/x-www-form-urlencoded;charset=UTF-8;',
			success: function(r) {
				console.log(r);
			},
			error: function(e) {
				console.log(e);
			},
		});
	}
}
