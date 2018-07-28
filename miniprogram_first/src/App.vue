
<script>
  import config from '@/utils/config'
  export default {
    data () {
      return {
        token: {
          openid: '',
          session_key: ''
        }
      }
    },
    // async 和 await 一起使用
    created () {
      // 获取用户信息
      // await 等待
      // const res = await this.$ajax.get('/user/getUserList')
      // console.log(res)
      // let self = this
      wx.login({
        success: (res) => {
          if (res.code) {
            // 发起网络请求
            console.log(res.code)
            wx.request({
              url: config.host + '/user/getOpenId',
              data: {
                code: res.code
              },
              success: (e) => {
                if (e.data.status === 200) {
                  console.log(e.data)
                  // self.token = result.data
                  // console.log(self.token)
                  wx.setStorageSync('token', e.data.data)
                }
              }
            })
            // const res2 = this.$ajax.get('/user/getOpenId', {code: res.code})
            // console.log(res2)
            // if (res2.status === 200) {
            //   console.log(res2.data)
            //   // self.token = result.data
            //   // console.log(self.token)
            //   wx.setStorageSync('token', res2.data)
            // }
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
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
