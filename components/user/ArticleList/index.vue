<template>
  <div class="articleList">
    <div class="leftMenu">
      <LeftCategory
        :category-list="categoryList"
        :categoryId="categoryId"
        @categoryChange="categoryChange"
      />
    </div>
    <div class="list">
      <List :articleList="articleList" />
    </div>
    <div class="rightContent">
      <RightContent />
    </div>
  </div>
</template>

<script>
import LeftCategory from "~/components/user/ArticleList/LeftCategory.vue";
import List from "~/components/user/ArticleList/List.vue";
import RightContent from "~/components/user/ArticleList/RightContent.vue";
export default {
  name: "ArticleList",
  components: {
    LeftCategory,
    List,
    RightContent
  },
  props: {
    categoryList: {
      type: Array,
      default: [],
    },
    articleList: {
      type: Array,
      default: [],
    },
    categoryId: {
      type: Number | null,
      default: null,
    }
  },
  emits: ['categoryChange'],
  methods:{
    categoryChange(id){
      this.$emit('categoryChange', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .articleList {
    position: relative;
    width: 100%;
    margin-top: 20px;
    .leftMenu {
      position: absolute;
      left: 0;
      top: 0;
      width: 200px;
    }
    .list {
      width: 100%;
      padding-left: 220px;
      padding-right: 220px;
      box-sizing: border-box;
    }
    .rightContent{
      position: absolute;
      right: 0;
      top: 0;
      width: 200px;
    }
  }
</style>
