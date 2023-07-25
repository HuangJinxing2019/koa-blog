<template>
  <div class="author">
    <Poptip placement="bottom" trigger="hover" :transfer="true">
      <img class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
      <span class="name">{{ userInfo?.nickname }}</span>
      <template #content>
        <div class="poptip-content">
          <p class="item">
            <a href="javascript:"><Icon type="ios-paper-outline" /> 我的文档</a>
          </p>
          <p class="item" @click="handleLogout">
            <a href="javascript:">
              <Icon type="md-log-out" /> 退出登录
            </a>
          </p>
        </div>
      </template>
    </Poptip>
  </div>
</template>
<script>
  export default {
    name: 'Author',
    data(){
      return {

      }
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      }
    },
    methods:{
      handleLogout(){
        console.log('退出登录')
      }
    }
  }
</script>
<style scoped lang="scss">
  .author{
    .avatar{
      width: 44px;
      height: 44px;
      border-radius: 50%;
      text-align: center;
    }
  }
  .name{
    font-size: 14px;
    margin-left: 4px;
  }

  .poptip-content {
    .item{
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .item:not(:last-child){
      border-bottom: 1px solid var(--border-color-def);
    }
  }
</style>
