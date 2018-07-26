<template>
  <div class="userinfo" @click='login'>
    <img :src="userinfo.avatarUrl" alt="">
    <p>{{userinfo.nickName}}</p>
  </div>
</template>
<script>
  import config from '@/utils/config'
  export default {
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    methods: {
      login () {
        let user = wx.getStorageSync('userinfo')
        const self = this
        if (!user) {
          wx.login({
            success: (res) => {
              if (res.code) {
              // 发起网络请求
                wx.request({
                  url: config.host + '/user/getOpenId',
                  data: {
                    code: res.code
                  },
                  success: (e) => {
                    console.log(111, e)
                    console.log(111, e.data.data.openid)
                    if (e.data.data.openid) {
                      wx.getSetting({
                        success (res) {
                          if (!res.authSetting['scope.userInfo']) {
                            wx.authorize({
                              scope: 'scope.userInfo',
                              success () {
                                wx.getUserInfo({
                                  success: function (x) {
                                    console.log(222, x.userInfo)
                                    wx.setStorageSync('userinfo', x.userInfo)
                                    self.userinfo = x.userInfo
                                    console.log(333, self.userinfo)
                                  },
                                  fail: function (y) {
                                    console.log(y)
                                  }
                                })
                              }
                            })
                          }
                        }
                      })
                    }
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      }
    }
  }
</script>

<style >

</style>
