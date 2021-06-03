/*
 * @Description: 
 * @Author: Moobye
 * @Date: 2020-07-20 18:10:31
 * @LastEditTime: 2020-07-20 18:17:49
 * @LastEditors: Moobye
 */ 
const query = `RoomID=4594330&HotelID=792978&RoomName=%25u5546%25u52a1%25u5355%25u95f4&Method=RoomTypeSelectedIndexChanged&CurrentHotel=-1`

const outParams = {
  Rcode:2,
  Msg:null,
  Script:null,
  Data:{
    Currency: 'RMB',
    Applicability: '11111',
    HasApplicability:'False',
    BasicRoomTypeID:'1849164',
    EbkPriceChange:'2',
    EbkPriceSettings:
      {
        SettingID:0,
        HotelID:0,
        RoomID:0,
        PriceType:0,
        Breakfast:0,
        PriceDetailType:0,
        Cost:0,'Price':0,
        Commission:0.00,
        CommissionRate:15.0000,
        HasServiceFeeRate:false,
        ServiceFeeRate:null,
        ServiceFeeRateOption:null,
        Applicability:null,
        WeekDayIndex:null
      },
    PPPriceAuthority:'F',
    PriceBlackRoom:'T',
    CompanyType:'HotelCompany',
    CommissionReference:'15.00',
    CostCommissionRate:'15.0000',
    costCommissionRateV2:'15.0000',
    priceChangeMode:'2',
    serviceFeeRate:'0'
  },
  Tag:null,
  TotalPages:null,
  TotalRecord:0,
  Version:0
}