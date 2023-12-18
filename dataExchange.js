const arr = [
  {
      "id":1702434700081,
      "key":"file_1",
      "defaultValue":"",
      "inputDisabled":false,
      "type":3,
      "description":"",
      "placeholder":"",
      "children":[
          {
              "id":1702434703641,
              "key":"items",
              "defaultValue":"",
              "dataDisabled":false,
              "type":4,
              "description":"",
              "placeholder":"",
              "children":[
                  {
                      "id":1702434707667,
                      "key":"file_1",
                      "defaultValue":"",
                      "inputDisabled":false,
                      "type":1,
                      "description":"",
                      "placeholder":"",
                      "children":[

                      ]
                  },
                  {
                      "id":1702434707860,
                      "key":"file_2",
                      "defaultValue":"",
                      "inputDisabled":false,
                      "type":1,
                      "description":"",
                      "placeholder":"",
                      "children":[

                      ]
                  }
              ]
          }
      ]
  },
  {
      "id":1702434700763,
      "key":"file_2",
      "defaultValue":"",
      "inputDisabled":false,
      "type":4,
      "description":"",
      "placeholder":"",
      "children":[
          {
              "id":1702434712013,
              "key":"file_1",
              "defaultValue":"",
              "inputDisabled":false,
              "type":1,
              "description":"",
              "placeholder":"",
              "children":[

              ]
          },
          {
              "id":1702434712208,
              "key":"file_2",
              "defaultValue":"",
              "inputDisabled":false,
              "type":1,
              "description":"",
              "placeholder":"",
              "children":[

              ]
          }
      ]
  },
  {
      "id":1702434701380,
      "key":"file_3",
      "defaultValue":"",
      "inputDisabled":false,
      "type":1,
      "description":"",
      "placeholder":"",
      "children":[

      ]
  }
]

function exchangeData (list, params)  {
  list.forEach(item => {
    if ([1, 2, 5].includes(item.type)) {
      params[item.key] = item.defaultValue
    } else if (item.type === 3) {
      let currentObj = []
      let paramsObj = {}
      let paramsArray = []
      if (item.children.length) {
        const newParams = exchangeData (item.children, paramsObj)
        const keys = Object.keys(newParams)
        if (keys.includes('items')) {
          paramsArray.push(newParams.items)
        }
        currentObj = paramsArray
      }
      params[item.key] = currentObj
      
    } else if (item.type === 4) {
      let currentObj = {}
      let paramsObj = {}
      if (item.children.length) {
        const newParams = exchangeData (item.children, paramsObj)
        currentObj = newParams
      }
      params[item.key] = currentObj
    }
  })

  return params;
}

let params = {}

const dataPa = exchangeData(arr, params)

console.log(JSON.stringify(dataPa))