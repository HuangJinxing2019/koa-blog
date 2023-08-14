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
      mapData: null,
    }
  },
  async asyncData({ $axios, params, req, query }){
    const mapData = new Map();
    try {
      const { data: { data: userInfo } } = await $axios.post(getServerDomain(req) + queryUserInfo, { openid: params.id })
      const { data: { data: categoryList }}  = await $axios.post(getServerDomain(req) + queryCategoryListAll);
      let queryData = {
        pageSize: 20,
        pageNum: 1,
        categoryId: query.categoryId || '',
        creator: userInfo.creator,
      }
      mapData.set(0, {
        queryData: { ...queryData, categoryId: '' },
        list: [],
        more: true
      })
      categoryList.forEach(item => {
        mapData.set(item.id, {
          queryData: { ...queryData, categoryId: item.id },
          list: [],
          more: false,
        })
      })
      const { data: { data: { pages, list } } } = await $axios.post(getServerDomain(req) + queryUserBlogsListPage, queryData)
      let map = mapData.get(Number(query.categoryId) || 0)
      map.list = list
      map.more = map.queryData.pageNum !== pages;
      return {
        mapData,
        userInfo,
        categoryList,
        articleList: list,
        openid: params.id,
        categoryId: Number(query.categoryId) || null
      }
    } catch (err){
      console.log(err)
    }
  },
  methods: {
    categoryChange(id){
      this.categoryId = id
      this.getCategoryArticleList()
    },
    async getCategoryArticleList(){
      let map = this.mapData.get(this.categoryId || 0);
      if(map.list.length === 0){
        const { data: { data: { pages, list } } } = await this.$axios.post(queryUserBlogsListPage, map.queryData)
        this.articleList = list
        map.list = list
        map.more = map.queryData.pageNum !== pages
      } else {
        this.articleList = map.list
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
