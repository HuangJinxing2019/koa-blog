<template>
  <ul class="ul-list">
    <li class="li-item" v-for="item of articleList" :key="item.id">
      <h1>{{ item.title }}</h1>
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    articleList: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style lang="scss" scoped>
  .ul-list{
    width: 100%;
    .li-item{
      width: 100%;
      padding: 20px;
      background-color: var(--bg-color-card);
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 10px;
      h1{
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>
