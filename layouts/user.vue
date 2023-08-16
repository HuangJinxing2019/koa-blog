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
    name: 'user',
    components: {
      HeaderUser,
    },
  }
</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    color: var(--text-color-def);
  }
</style>
