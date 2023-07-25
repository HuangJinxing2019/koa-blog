<template>
  <div class="header-admin">
    <div class="author">
      <Author />
    </div>
  </div>
</template>

<script>
import Author from "~/components/HeaderAdmin/Author.vue";
export default {
  name: "HeaderAdmin",
  components: {Author}
}
</script>

<style lang="scss" scoped>
  .header-admin{
    width: 100%;
    height: 100%;
    border-bottom: 1px solid var(--border-color-def);
    background: var(--bg-color-content);
    .author{
      float: right;
      margin-top: 5px;
      margin-right: 20px;
    }
  }
</style>
