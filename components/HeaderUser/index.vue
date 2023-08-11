<template>
  <div class="headerUser">
    <header class="content">
      <Logo />
      <HeaderNav />
    </header>
  </div>
</template>

<script>
import Logo from "~/components/HeaderUser/Logo.vue";
import HeaderNav from "~/components/HeaderUser/Nav.vue";
export default {
  name: "HeaderUser",
  components: { Logo, HeaderNav },
}
</script>

<style lang="scss" scoped>
  .headerUser{
    width: 100%;
    height: 58px;
    background-color: var(--bg-color-content);
    .content {
      width: 100%;
      max-width: 1240px;
      height: 100%;
      margin: 0 auto;
      padding: 0 20px;
      line-height: 58px;
    }
  }
</style>
