<template>
  <div class="default-wrapper">
    <div class="sidebar sidebar_def">
      <Sidebar />
    </div>
    <div class="rightContent">
      <div class="header sidebar_def">
        <header-admin />
      </div>
      <div class="content content_def">
        <div class="info">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderAdmin from "~/components/HeaderAdmin/index.vue";
  import Sidebar from "~/components/Sidebar/index.vue";
  export default {
    name: 'default',
    components: { HeaderAdmin, Sidebar },
    head: {
      link: [
        // {rel: 'stylesheet', href: 'view-design/dist/styles/iview.css'},
        // {rel: 'stylesheet', href: '~/assets/css/resets.css'},
      ]
    }
  }
</script>
<style lang="scss" scoped>
  .default-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    .sidebar{
      height: 100%;
      background: var(--bg-color-card);
      overflow-y: auto;
      overflow-x: hidden;
      &.sidebar_def{
        width: 220px;
      }
    }
    .rightContent{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 220px;
      .header{
        width: 100%;
        height: 68px;
      }
      .content{
        width: 100%;
        height: calc(100% - 68px);
        padding: 20px;
        overflow: auto;
        .info{
          width: 100%;
          height: 100%;
          min-height: 100%;
          padding: 15px;
          box-sizing: border-box;
          background: var(--bg-color-content);
          border-radius: 4px;
        }
      }
    }
  }
</style>
