
<script>
  // 使用封装的 get 请求
  // import {get} from './utils/request'
  // import config from './utils/config'
  // import qcloud from 'wafer2-client-sdk'
  export default {
    // async 和 await 一起使用
    async created () {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
      // 获取用户信息
      // await 等待
      // const res = await get('/user/getUserList')
      // console.log(res)

      // 设置登录地址
      // qcloud.setLoginUrl('http://127.0.0.1:8081/user/login')
      // qcloud.login({
      //   success: function (userInfo) {
      //     console.log('登录成功', userInfo)
      //   },
      //   fail: function (err) {
      //     console.log('登录失败', err)
      //   }
      // })
      // wx.login({
      //   success: (res) => {
      //     if (res.code) {
      //       // 发起网络请求
      //       console.log(res.code)
      //       wx.request({
      //         url: config.host + '/user/getOpenId',
      //
      //         data: {
      //           code: res.code
      //         },
      //         success: (res) => {
      //           console.log('获取用户openid')
      //           console.log(res.data)
      //           // that.globalData.openid = a.data.obj.openid
      //         }
      //       })
      //     } else {
      //       console.log('获取用户登录态失败！' + res.errMsg)
      //     }
      //   }
      // })
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    }
  }
</script>

<style>
.text-footer{
  text-align: center;
  font-size: 12px;
  margin-bottom:5px;
}
.text-primary{
  color:#EA5149;
}
.btn{
  color:white;
  background:#EA5A49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active{
  background: #FA5A49;
}
</style>
