<template>
  <view class="userinfo">
    <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" :click="getUserInfo"> 获取头像昵称 </button>
    <view v-else>
      <img :click="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="cover">
      <p class="userinfo-nickname">{{userInfo.nickName}}</p>
    </view>
  </view>
  <view class="usermotto">
    <span class="user-motto">{{motto}}</span>
  </view>
</template>
<script>
export default {
  data: {
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  create () {
    console.log()
  },
  methods: {
    getUserInfo: (e) => {
      console.log(e)
      this.userInfo = e.detail.userInfo
      this.hasUserInfo = true
    }
  }
}
</script>

<style >

</style>
