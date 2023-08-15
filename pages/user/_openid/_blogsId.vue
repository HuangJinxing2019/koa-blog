<template>
  <div class="wrapper">
    文章详情
  </div>
</template>

<script>

export default {
  name: "_blogsId",
  layout: 'user',
  data(){
    return {

    }
  },
  async asyncData({ $axios, params, req }){

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .blogs-detail{
    width: 100%;
    max-width: 1200px;
  }
</style>
