<template>
  <div class="user-wrapper">
    <HeaderUser />
    <div class="scroll-content">
      <div class="content">
        <nuxt />
      </div>
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
.user-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
  .scroll-content {
    width: 100%;
    height: calc(100% - 58px);
    overflow-y: auto;
    position: relative;
    .content{
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      color: var(--text-color-def);
    }
  }
  @media screen and (max-width: 1232px) {
    .scroll-content {
      padding: 0 16px;
    }
  }
}

</style>
