<template>
  <div class="register">
    <p class="title">注册账号</p>
    <Form ref="registerRef" :model="registerForm" :rules="rules">
      <FormItem prop="nickname" label="昵称">
        <Input type="text" maxlength="8" size="large" v-model="registerForm.nickname" placeholder="请输入昵称2~8字符"/>
      </FormItem>
      <FormItem prop="account" label="登录账号">
        <Input type="text" maxlength="11" size="large" v-model="registerForm.account" placeholder="请输入手机号"/>
      </FormItem>
      <FormItem prop="password" label="登录密码">
        <Input type="password" maxlength="16" size="large" v-model="registerForm.password" placeholder="请输入密码"/>
      </FormItem>
    </Form>
    <div class="registerBtn">
      <Button size="large" :loading="btnLoading" type="primary" long @click="handleRegister">立即注册</Button>
    </div>
  </div>
</template>
<script>

import { mapActions } from "vuex";

export default {
  name: 'Register',
  data(){
    return {
      btnLoading: false,
      registerForm: {
        account: '',
        password: '',
        nickname: '',
      },
      rules: {
        nickname: [{require: true, message: '请输入2~8位字符的昵称', trigger: 'blur', pattern: /^.{2,8}$/}],
        account: [{require: true, message: '请输入正确的手机号', trigger: 'blur', pattern: /^1[3-9]\d{9}$/}],
        password: [{require: true, message: '请输入8~16位带有大小写字母数字特殊字符', trigger: 'blur', pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,16}$/}]
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'register'
    }),
    handleRegister(){
      this.$refs.registerRef.validate(async (valid) => {
        if(!valid) return
        try {
          this.btnLoading = true
          await this.register(this.registerForm)
          await this.$router.replace('/')
        } catch (err){
           this.btnLoading = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.register{
  width: 100%;
  .title{
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }
  .registerBtn{
    margin-top: 50px;
  }
}
</style>
