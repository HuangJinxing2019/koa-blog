<template>
  <div class="info">
    <img class="avatar" :src="userInfo.avatar || require('~/static/images/avatar.jpg')" />
    <div class="content">
      <div class="name">{{ userInfo.nickname }}</div>
      <div class="job"><Icon type="ios-briefcase" /> {{userInfo.job || '-'}}</div>
      <div class="sex">性别：{{ sexStr[userInfo.sex] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: {
    userInfo: {
      type: Object,
      default: {},
    }
  },
  data(){
    return{
      sexStr: ['未知', '男', '女']
    }
  },
}
</script>

<style lang="scss" scoped>
  .info{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: var(--bg-color-card-rgba);
    .avatar{
      display: block;
      position: absolute;
      top: -30px;
      left: 30px;
      width: 130px;
      height: 130px;
      border-radius: 2px;
    }
    .content{
      width: 100%;
      height: 100%;
      padding-left: 200px;
      box-sizing: border-box;
      .name{
        padding-top: 20px;
        font-size: 24px;
        font-weight: bold;
      }
      .job{
        margin-top: 16px;
      }
      .sex{
        margin-top: 10px;
      }
    }
  }
</style>
