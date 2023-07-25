<template>
  <div class="sidebarWrapper">
    <logo />
    <Menu width="220px" :active-name="activeName" :open-names="['1']">
      <MenuItem
        :name="item.id"
        v-for="item of menuData"
        :key="item.id"
        :to="item.path"
      >
        <icon :type="item.icon"></icon>
        {{ item.name }}
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
import Logo from '~/components/Sidebar/Logo.vue'
import sidebarData from '~/config/sidebarData'
export default {
  name: 'Sidebar',
  components: { Logo },
  data() {
    return {
      menuData: sidebarData,
      activeName: null,
    }
  },
  mounted() {
    const path = this.$route.path
    const menuItem = this.menuData.find(item => item.path === path)
    if(menuItem){
      this.activeName = menuItem.id
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebarWrapper {
  width: 100%;
}
</style>
