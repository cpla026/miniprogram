// 请求工具类
import config from './config'
const requestutil = {
  get (url, data) {
    // 数据请求前loading，提高用户体验
    wx.showLoading({
      title: '加载中'
    })
    // Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，
    // resolve，reject 分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
    // 其实这里用“成功”和“失败”来描述并不准确，按照标准来讲，
    // resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + url,
        method: 'GET',
        data: data,
        // 设置请求的 header
        header: {
          'Content-Type': 'application/json'
        },
        // 设置请求的 header
        success: function (res) {
          // success
          wx.hideLoading()
          if (res.statusCode !== 200) {
            wx.showToast({
              title: '网络出错，稍后再试',
              icon: 'none'
            })
            return false
          }
          resolve(res.data)
        },
        fail: function (error) {
          // fail
          wx.hideLoading()
          reject(error) // 请求失败
        },
        complete: function () {
          wx.hideLoading()
          // complete
        }
      })
    })
  },
  post (url, data) {
    // 数据请求前loading，提高用户体验
    wx.showLoading({
      title: '加载中'
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.host + url,
        data: data,
        method: 'POST',
        // 设置请求的 header
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
          // 'Content-Type': 'application/json'
        },
        // 设置请求的 header
        success: function (res) {
          // success
          wx.hideLoading()
          if (res.statusCode !== 200) {
            wx.showToast({
              title: '网络出错，稍后再试',
              icon: 'none'
            })
            return false
          }
          resolve(res.data)
        },
        fail: function (error) {
          // fail
          wx.hideLoading()
          reject(error) // 请求失败
        },
        complete: function () {
          wx.hideLoading()
          // complete
        }
      })
    })
  }
}
// 暴露出来供其他文件引用
export default requestutil
