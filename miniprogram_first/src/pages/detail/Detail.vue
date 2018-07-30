<template>
    <div>
      详情页 {{bookid}}
      <BookInfo :info='info'></BookInfo>
      <!-- 评论 -->
      <div class="comment">
        <p>评论: </p>
        <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="a brief comments"></textarea>
        <div class="location">
          ADD:
          <!-- :checked="location" location 有数据就显示 -->
          <switch color="#EA5A49" :checked="location" @change="getLoation"></switch>
          <span class="text-primary">{{location}}</span>
        </div>
        <div class="phone">
          DEV:
          <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
          <span class="text-primary">{{phone}}</span>
        </div>
      </div>
    </div>
</template>

<script>
    import BookInfo from '@/components/BookInfo'
    export default {
      name: 'detail',
      components: {
        BookInfo
      },
      data () {
        return {
          bookid: '',
          info: {},
          comment: '',
          location: '',
          phone: ''
        }
      },
      mounted () {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
      },
      methods: {
        async getDetail () {
          const res = await this.$ajax.get('/book/getDetail', {
            id: this.bookid
          })
          if (res.status === 200) {
            console.log(res.data)
            this.info = res.data
          }
        },
        getLoation (e) {
          const ak = 'wbtyiRGXoqK5I9kiZjP2HBWv8WPwCD6t'
          let url = 'http://api.map.baidu.com/geocoder/v2/'
          if (e.target.value) {
            wx.getLocation({
              type: 'wgs84',
              success: (res) => {
                console.log(res)
                // 纬度
                var latitude = res.latitude
                // 经度
                var longitude = res.longitude
                wx.request({
                  url,
                  data: {
                    ak,
                    location: `${latitude},${longitude}`,
                    output: 'json'
                  },
                  success: res => {
                    console.log(res)
                    if (res.data.status === 0) {
                      this.location = res.data.result.addressComponent.city
                    } else {
                      this.location = '未知地点'
                      // console.log('出错了')
                    }
                  }
                })
              }
            })
          } else {
            this.location = ''
          }
        },
        getPhone (e) {
          if (e.target.value) {
            // 选中
            const res = wx.getSystemInfoSync()
            // 手机型号
            this.phone = res.model
          } else {
            // 没选中
            this.phone = ''
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.comment{
  padding:0 15px;
  margin-top:10px;
  .textarea{
    background: #eee;
    width: 100%;
    padding: 10rpx;
    height: 200rpx;
  }
  .location{
    margin-top: 10px;
    font-size: 14px;
  }
  .phone{
    margin-top: 10px;
    font-size: 14px;
  }

}
</style>
