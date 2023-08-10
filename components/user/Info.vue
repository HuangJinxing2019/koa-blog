<template>
  <div class="info">
    <img class="avatar" :src="userInfo.avatar || require('~/static/images/avatar.jpg')" />
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
  }
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
      top: -46px;
      left: 30px;
      width: 130px;
      height: 130px;
      border-radius: 2px;
    }
  }
</style>
