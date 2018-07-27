<template>
  <div class="container">
    <div class="userinfo" >
      <img :src="userinfo.avatarUrl" alt="">
      <p v-show="flag">{{userinfo.nickName}}</p>
      <button v-show="!flag" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">获取权限</button>
      <yearprogress></yearprogress>
      <button @click='scanBook' class='btn'>添加图书</button>
    </div>
  </div>
</template>
<script>
  import yearprogress from '@/components/YearProgress'
  import {showSuccess} from '@/utils/tip'
  export default {
    components: {
      yearprogress
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        },
        flag: false
      }
    },
    mounted () {
      // 一进来看看用户是否授权过
      this.getSetting()
      // this.getUserInfo()
    },
    methods: {
      async addBook (isbn) {
        console.log(isbn)
        const res = await this.$ajax.post('/user/addBook', {
          isbn: isbn,
          a: 1
        })
        console.log(res)
        if (res.status === 200) {
          showSuccess(res.msg)
        }
      },
      scanBook () {
        wx.scanCode({
          success: (res) => {
            if (res.result) {
              console.log(res.result)
              this.addBook(res.result)
            }
          },
          fail: (res) => {
            console.log(res)
          }
        })
      },
      getSetting () {
        let user = wx.getStorageSync('userinfo')
        var self = this
        if (!user) {
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function (res) {
                    // 用户已经授权过
                    console.log('用户已经授权过')
                    self.userinfo = res.userInfo
                    self.flag = true
                    wx.setStorageSync('userinfo', res.userInfo)
                    console.log('flag: ', self.flag)
                    console.log(res.userInfo)
                  }
                })
              } else {
                console.log('用户还未授权过')
              }
            }
          })
        }
      },
      getUserInfo1 () {
        console.log('click事件首先触发')
        // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
        // console.log(wx.canIUse('button.open-type.getUserInfo'))
        if (wx.canIUse('button.open-type.getUserInfo')) {
          // 用户版本可用
        } else {
          console.log('请升级微信版本')
        }
      },
      bindGetUserInfo (e) {
        console.log(e.mp.detail.userInfo)
        if (e.mp.detail.userInfo) {
          // 用户按了允许授权按钮
          console.log('用户按了允许授权按钮')
          this.userinfo = e.mp.detail.userInfo
          wx.setStorageSync('userinfo', e.mp.detail.userInfo)
          this.flag = true
          // this.getSetting()
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
        }
      },
      getUserInfo () {
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: (res) => {
                console.log(res)
                this.userinfo = res.userInfo
              }
            })
          }
        })
      }
    },
    onShow () {
      let userinfo = wx.getStorageSync('userinfo')
      console.log(userinfo)
      if (userinfo) {
        this.userinfo = userinfo
      }
      // this.getSetting()
    }
  }
</script>

<style lang="scss">
  .container{
    padding: 0 30rpx;
  }
  .userinfo{
    margin-top: 100rpx;
    text-align: center;
    img{
      width: 150rpx;
      height:150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
</style>
