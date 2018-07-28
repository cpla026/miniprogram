<template>
  <div>
    图书列表页面
    <card v-for="book in bookList" :key="book.id" :book="book"></card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>
<script>
  import card from '@/components/card'
  export default {
    components: {
      card
    },
    data () {
      return {
        bookList: [],
        page: 0,
        more: true
      }
    },
    mounted () {
      this.getBookList()
    },
    methods: {
      async getBookList () {
        wx.showNavigationBarLoading()
        const res = await this.$ajax.get('/book/getBookList')
        if (res.status === 200) {
          this.bookList = res.data
          console.log(this.bookList)
        }
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }
    },
    /* 下拉刷新触发 */
    onPullDownRefresh () {
      this.getBookList()
      console.log('pulldown')
    }
  }
</script>
<style>


</style>
