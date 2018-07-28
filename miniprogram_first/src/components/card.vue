<template>
  <div class="book-card">
    <!-- 封面 -->
    <div class="thumb">
      <image :src="book.image" mode="aspectFit" class="img"></image>
    </div>
    <!-- 详情 -->
    <div class="detail">
      <div class="row">
        <div class="right">
          {{book.rate}}
        </div>
        <div class="left">
          {{book.title}}
        </div>
      </div>
      <div class="row">
        <div class="right text-primary">
          浏览量:{{book.count}}
        </div>
        <div class="left">

          {{book.author}}
        </div>
      </div>
      <div class="row">
        <div class="right">
          yonghu
        </div>
        <div class="left">
          {{book.publisher}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['book']
}
</script>

<style lang="scss" scoped>
  .book-card{
    padding:5px;
    overflow: hidden;
    margin-top:5px;
    margin-bottom:5px;
    font-size:14px;
    .thumb{
      width:90px;
      height:90px;
      float: left;
      margin:0 auto;
      overflow:hidden;
      .img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .detail{
      margin-left: 100px;
      .row{
        line-height:20px;
        margin-bottom:3px;
      }
      .right{
        float: right;
      }
      .left{
        margin-right:80px;
      }
    }
  }
</style>
