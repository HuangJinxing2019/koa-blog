<template>
  <div class="author">
    <div class="name">{{ userInfo.nickname }}</div>
    <div class="tags">
      <span class="tag">标签1</span>
      <span class="tag">标签2</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  props: {
    userInfo: {
      type: Object,
      default: null,
    }
  },
}
</script>

<style lang="scss" scoped>
  .author {
    width: 100%;
    height: 18px;
    margin-top: 16px;
    color: var(--text-color-gray);
    .name{
      float: left;
    }
    .tags{
      float: right;
      .tag{
        display: inline-block;
        color: var(--text-color-gray);
        background-color: var(--bg-color-tag);
        padding: 2px 6px;
        font-size: 12px;
        margin-left: 5px;
        border-radius: 2px;
      }
    }
  }
</style>
