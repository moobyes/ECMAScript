/*
 * @Description: 改价的oyo信息
 * @Author: Moobye
 * @Date: 2020-07-22 13:45:23
 * @LastEditTime: 2020-07-30 14:59:25
 * @LastEditors: Moobye
 */ 
const oyoPriceInfos = {
  "beginDate":1595347200000,
  "createTime":1595425907000,
  "endDate":1595347200000,
  "hotelId":123195,
  "hotelName":"OYO 805658 君锐大酒店",
  "id":129119741,
  "isHourly":0,
  "otaCode":"ctrip",
  "otaHotelId":"770290",
  "otaHotelName":"OYO重庆君锐大酒店",
  "otaRoomTypeId":"275877190",
  "otaRoomTypeName":"特价标间<预付>*预付*",
  "oyoId":"CN_CNG1052",
  "postBreakfastPrice":107,
  "postCommissionRate":10,
  "postSellPrice":97,
  "preBreakfastPrice":98,
  "preCommissionRate":10,
  "preSellPrice":88,
  "price":0,
  "roomTypeId":"29"
}

const CtripPriceInfo = {
  "roomTypeID":275877190,
  "payType":"PP",
  "effectDate":"2020-07-22",
  "price":89,
  "cost":80.1,
  "commissionRate":0.1,
  "commissionRatePercent":"10.00%",
  "commissionValue":8.9,
  "mealNum":0,
  "currency":"RMB",
  "exchange":1,
  "originalPrice":89,
  "originalCost":80.1,
  "priceType":1,
  "preTaxPrice":null,
  "preTaxCost":null,
  "preTaxCommissionRate":null,
  "preTaxCommissionRatePercent":null,
  "preTaxCommissionValue":null
}

const params = {
  "roomPriceInfoList":[
      {
          "roomTypeID":4594330,
          "roomName":" (ID:4594330) 商务单间                现付                        ",
          "hotelID":741958,
          "payType":"FG",
          "currency":"RMB",
          "mealNum":"-100",
          "weekDayIndex":"1111111",
          "costPrice":134.3, // 我们不给的 preSellPrice*(1-rate)
          "salePrice":158, // preSellPrice postSellPrice
          "commissionRate":0.15,
          "commissionValue":23.7, //preSellPrice*rate
          "serviceFeeRate":0,
          "refRoomIDs":[

          ]
      }
  ],
  "dateRangeInfo":[
      {
          "startDate":"2020-07-21",
          "endDate":"2020-07-21"
      }
  ],
  "pageType":"T",
  "priceChangeMode":2
}