<template>
  <div class="leftCategory">
    <div
      class="category-item"
      :class="{ active: categoryId === null }"
      @click="handleClick(null)"
    >
      全部
    </div>
    <div
      class="category-item"
      :class="{ active: categoryId === item.id }"
      v-for="item of categoryList" :key="item.id"
      @click="handleClick(item.id)"
    >
      <a href="javascript:">
        {{ item.name }} <span>({{ item.openCount }})</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftCategory",
  props: {
    categoryList: {
      type: Array,
      default: [],
    },
    categoryId: {
      type: Number | null,
      default: null,
    }
  },
  emits: ['categoryChange'],
  methods: {
    handleClick(id){
      this.$emit('categoryChange', id)
      this.$router.push({
        path: this.$route.path,
        query: {
          categoryId: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .leftCategory{
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    background-color: var(--bg-color-card);
    border-radius: 4px;
    .category-item{
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      font-size: 16px;
      border-radius: 4px;
      span {
        font-size: 14px;
      }
      &:hover{
        background-color: var(--bg-color-user-menu-hover);
      }
      &.active{
        background-color: var(--bg-color-user-menu-active);
        a {
          color: var(--text-color-user-menu-active);
        }
      }
    }
  }
</style>
