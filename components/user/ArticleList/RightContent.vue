<template>
  <div class="right-content">
    <img class="rightBg" v-if="category && category.imgUrl" :src="category && category.imgUrl">
    开发中，敬请期待
  </div>
</template>

<script>
export default {
  name: "RightContent",
  props: {
    category:{
      type: Object,
      default: null,
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-content{
    width: 100%;
    height: 200px;
    padding: 10px 0;
    background-color: var(--bg-color-card);
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
    line-height: 100px;
    .rightBg{
      display: block;
      width: 180px;
      height: 100px;
      margin: 0 auto;
      border-radius: 4px;
      object-fit: cover;
    }
  }
</style>
