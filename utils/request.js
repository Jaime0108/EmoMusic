const config = require('../utils/config')

export default function promiseRequest(url, data, method="GET"){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: config.baseUrl+url,
      method,
      data,
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

// module.exports = {
//   promiseRequest
// }