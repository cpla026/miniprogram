// 请求工具类
import config from './config'
export function get (url, data) {
  // Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，
  // resolve，reject 分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
  // 其实这里用“成功”和“失败”来描述并不准确，按照标准来讲，
  // resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: (res) => {
        if (res.data.status === 200) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}
