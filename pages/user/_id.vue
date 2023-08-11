<template>
  <div class="wrapper">
    <UserCard :userInfo.sync="userInfo" />
    <ArticleList
      :categoryId.sync="categoryId"
      :articleList="articleList"
      :categoryList="categoryList"
      @categoryChange="categoryChange"
    />
  </div>
</template>

<script>

import UserCard from "~/components/user/UserCard.vue";
import { queryUserInfo, queryCategoryListAll, queryUserBlogsListPage } from "~/config/api";
import { getServerDomain } from "~/utils";
import ArticleList from "~/components/user/ArticleList/index.vue";
const mapData = new Map()
export default {
  name: "userInfo",
  layout: 'user',
  components: {
    UserCard,
    ArticleList
  },
  data(){
    return {
      openid: '',
      userInfo: {},
      categoryList: [],
      categoryId: null,
      articleList: [],
    }
  },
  async asyncData({ $axios, params, req, query }){
    try {
      const { data: { data: userInfo } } = await $axios.post(getServerDomain(req) + queryUserInfo, { openid: params.id })
      const { data: { data: categoryList }}  = await $axios.post(getServerDomain(req) + queryCategoryListAll);
      let queryData = {
        pageSize: 20,
        pageNum: 1,
        categoryId: query.categoryId || '',
        creator: userInfo.creator,
      }
      const { data: { data: { pages, list } } } = await $axios.post(getServerDomain(req) + queryUserBlogsListPage, queryData)
      mapData.set(query.categoryId || 0, {
        queryData,
        list,
        more: pages !== queryData.pageNum
      })
      console.log(list)
      return {
        userInfo,
        categoryList,
        articleList: list,
        openid: params.id,
        categoryId: Number(query.categoryId) || null
      }
    } catch (err){}
  },
  methods: {
    categoryChange(id){
      this.categoryId = id
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
