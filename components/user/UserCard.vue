<template>
  <div class="userCard" :style="{ backgroundImage: `url(${userInfo.coverImage || ''})` }">
    <div class="uploadBgImg" v-if="!userInfo.coverImage">
      <SingleUpload @success="handleSuccess">
        <Button><Icon type="md-camera" /> 上传封面图片</Button>
      </SingleUpload>
    </div>
    <Info :userInfo="userInfo"/>

  </div>
</template>

<script>
import Info from "~/components/user/Info.vue";
import SingleUpload from "~/components/imageUpload/SingleUpload.vue";
import { userUpdate } from "~/config/api";

export default {
  name: "UserCard",
  components: {
    Info,
    SingleUpload
  },
  props: {
    userInfo: {
      type: Object,
      default: null,
    }
  },
  emits: ['update:userInfo'],
  methods: {
    async handleSuccess(url){
      let params = {
        id: this.userInfo.id,
        coverImage: url,
      }
      await this.$axios.post(userUpdate, params);
      const newUserInfo = { ...this.userInfo, coverImage: url };
      this.$emit('update:userInfo', newUserInfo);
    }
  }
}
</script>

<style lang="scss" scoped>
  .userCard {
    width: 100%;
    height: 300px;
    background: var(--bg-color-content);
    border-radius: 4px;
    position: relative;
    background-size: cover;
    .uploadBgImg{
      width: 100%;
      text-align: right;
      padding: 20px;
      opacity: .6;
    }
  }
</style>
