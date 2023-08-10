<template>
  <div>
    <HeaderUser />
    <div class="content">
      <nuxt />
    </div>
  </div>
</template>
<script>
  import HeaderUser from "~/components/HeaderUser/index.vue";
  export default {
    components: {
      HeaderUser,
    }
  }
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    height: calc(100vh - 58px);
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
</style>
