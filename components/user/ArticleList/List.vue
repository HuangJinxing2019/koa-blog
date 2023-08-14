<template>
  <ul class="ul-list">
    <li class="li-item" v-for="item of articleList" :key="item.id">
      <div class="content" :class="{'content-main': !!item.mainImgUrl}">
        <h1>{{ item.title }}</h1>
        <article class="article">{{ item.snippet }} safajkfhjaskfhasd水电费has加快递费has快递费哈杀戮空间和阿萨德发了哈圣诞节快乐发哈克里斯多积分海拉克斯的积分换</article>
        <Author :user-info="item.userInfo" />
      </div>
      <img v-if="item.mainImgUrl" class="mainImg" :src="item.mainImgUrl" alt="">
    </li>
  </ul>
</template>

<script>
import Author from "~/components/user/ArticleList/Author.vue";
export default {
  name: "List",
  components: {
    Author
  },
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
      display: flex;
      position: relative;
      width: 100%;
      padding: 20px;
      background-color: var(--bg-color-card);
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .content {
        width: 100%;
        box-sizing: border-box;
        flex: 1 1 auto;
        &.content-main{
          width: calc(100% - 120px);
        }
        h1{
          font-size: 16px;
          font-weight: bold;
        }
        .article{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 20px;
          color: var(--text-color-gray);
        }
      }
      .mainImg{
        flex: 0 0 auto;
        width: 100px;
        height: 80px;
        margin-left: 20px;
        object-fit: cover;
        border-radius: 2px;
      }
    }
  }
</style>
