<template>
  <div class="wrapper">
    <UserCard :userInfo="userInfo" />

  </div>
</template>

<script>

import UserCard from "~/components/user/UserCard.vue";
import { queryUserInfo } from "~/config/api";
import { getServerDomain } from "~/utils";

export default {
  name: "userInfo",
  layout: 'user',
  components: {
    UserCard,
  },
  data(){
    return {
      userInfo: {},
    }
  },
  async asyncData({ $axios , params, req }){
    try {
      const { data } = await $axios.post(getServerDomain(req) + queryUserInfo, { openid: params.id })
      return {
        userInfo: data.data
      }
    } catch (err){}

  }
}
</script>

<style lang="scss" scoped>

</style>
