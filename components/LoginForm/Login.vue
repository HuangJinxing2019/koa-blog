<template>
  <div class="login">
    <p class="title">欢迎登录博客后台</p>
    <Form ref="loginRef" :model="loginForm" :rules="rules">
      <FormItem prop="account" label="登录账号">
        <Input type="text" size="large" v-model="loginForm.account" placeholder="请输入手机号"/>
      </FormItem>
      <FormItem prop="password" label="登录密码">
        <Input type="password" size="large" v-model="loginForm.password" placeholder="请输入密码"/>
      </FormItem>
    </Form>
    <div class="loginBtn">
      <Button size="large" :loading="btnLoading" type="primary" long @click="handleLogin">立即登录</Button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data(){
    return {
      btnLoading: false,
      loginForm: {
        account: '',
        password: '',
      },
      rules: {
        account: [{required: true, message: '请输入正确的手机号', trigger: 'blur', pattern: /^1[3-9]\d{9}$/}],
        password: [{required: true, message: '请输入8~16位带有大小写字母数字特殊字符', trigger: 'blur', pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,16}$/}]
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    handleLogin(){
      this.$refs.loginRef.validate(async (valid) => {
        if(!valid) return;
        try {
          this.btnLoading = true
          await this.login(this.loginForm)
          this.btnLoading = false
          await this.$router.replace('/')
        } catch (err) {
          this.btnLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width: 100%;
  .title{
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 60px;
    text-align: center;
  }
  .loginBtn{
    margin-top: 80px;
  }
}
</style>
