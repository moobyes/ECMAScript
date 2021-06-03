/*
 * @Description: get_album_data 接口
 * @Author: Moobye
 * @Date: 2020-07-21 22:56:36
 * @LastEditTime: 2020-07-21 23:02:18
 * @LastEditors: Moobye
 */
const url = `https://www.szwego.com/service/album/get_album_data.jsp?act=album_red_dot&_=1595343215679`

const params = {

}

const outParams = {
  errcode: 0,
  result: {
    tab: [{
        name: 'home',
        show: 0
      },
      {
        name: focus,
        show: 0
      },
      {
        name: 'order',
        show: 0
      },
      {
        name: 'catch',
        show: 0
      },
      {
        name: 'user',
        show: 0
      }
    ]
  },
  errmsg: 'Success',
  status: 0,
  token: 'MkI3N0Q2M0E0RTU4NEVCQzkxRUE5Q0Q5NDc5RTg4N0Q1ODREMUQ5MjdBNkNBNkQ1MkI4ODY2QkVCQjVFRUVCNDlGQUY0MEM1RjJENzdBNjNFMDM5RkRERDM0RkNCMThE'
}