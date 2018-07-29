<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <card v-for="book in bookList" :key="book.id" :book="book"></card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
  import card from '@/components/card'
  import TopSwiper from '@/components/TopSwiper'
  export default {
    components: {
      card,
      TopSwiper
    },
    data () {
      return {
        bookList: [],
        page: 1,
        more: true,
        tops: [],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
      }
    },
    mounted () {
      // 初始状态 true
      this.getBookList(true)
      // 获取轮播图
      this.getTop()
    },
    methods: {
      async getBookList (init) {
        if (init) {
          this.page = 1
          this.more = true
        }
        wx.showNavigationBarLoading()
        const res = await this.$ajax.get('/book/getBookList', {
          currentpage: this.page
        })
        // init 表示初始状态
        if (res.status === 200) {
          if (init) {
            this.bookList = res.data.pageList
            if (res.data.totalCount <= this.page * 10) {
              this.more = false
              wx.stopPullDownRefresh()
            }
          } else {
            // 不是初始状态 下拉刷新不能覆盖bookList 累加
            this.bookList = this.bookList.concat(res.data.pageList)
            if (res.data.totalCount <= this.page * 10) {
              this.more = false
              wx.stopPullDownRefresh()
            }
          }
        }
        // console.log(111, this.more)
        // 请求成功之后取消下拉刷新
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      },
      async getTop () {
        const res = await this.$ajax.get('/book/getTop', {
          num: 9
        })
        if (res.status === 200) {
          this.tops = res.data
          console.log(this.tops)
        }
      }
    },
    /* 下拉刷新时触发的函数 */
    onPullDownRefresh () {
      // 初始状态 true
      this.getBookList(true)
      // 获取轮播图
      this.getTop()
      // console.log('pulldown')
    },
    /* 上拉刷新 */
    onReachBottom () {
      if (!this.more) {
        // 没有更多
        return false
      }
      this.page = this.page + 1
      this.getBookList()
    }
  }
</script>
<style>


</style>
