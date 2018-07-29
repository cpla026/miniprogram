import Vue from 'vue'
import Book from './Book'

const app = new Vue(Book)
app.$mount()

export default{
  // 可覆盖 app 中的配置
  config: {
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }
}
