<template>
  <div class="wrapper">
    <div class="login">
      <login-form></login-form>
    </div>
  </div>
</template>
<script>
import LoginForm from "~/components/LoginForm/index.vue";
export default {
  name: 'LoginPage',
  layout: 'login',
  components: {LoginForm}
}
</script>
<style lang="scss" scoped>
.wrapper{
  width: 100%;
  height: 100vh;
  background-image: url(~static/images/loginBg.jpg);
  background-size: cover;
  .login{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 900px;
    height: 550px;
    background-color: var(--bg-color-card-rgba);
    margin-left: -450px;
    margin-top: -275px;
    border-radius: 20px;
  }
}
</style>
