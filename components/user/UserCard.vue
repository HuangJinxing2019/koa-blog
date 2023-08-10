<template>
  <div class="userCard">
    {{ userInfo }}
    <Info :userInfo="userInfo"/>
  </div>
</template>

<script>
import Info from "~/components/user/Info.vue";
export default {
  name: "UserCard",
  components: {
    Info
  },
  props: {
    userInfo: {
      type: Object,
      default: null,
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
  }
</style>
