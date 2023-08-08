<template>
  <div class="wrapper">
    <div id="vditor" class="vditor-content"></div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import 'vditor/dist/css/content-theme/dark.css'

let vditor;
export default {
  name: 'blogsEdit',
  data(){
    return{

    }
  },
  methods: {
    initVditor(){
      vditor = new Vditor('vditor', {
        width: '100%',
        height: 700,
        theme: 'dark',
        placeholder: '开始编辑...',
        outline: {
          enable: true,
          position: 'right'
        }
      })
    }
  },
  mounted(){
    this.initVditor()
  },
}
</script>

<style lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  .vditor-content{
    .vditor-reset{
      background-color: var(--bg-color-card-rgba);
      &:focus{
        background-color: var(--bg-color-card);
      }
    }
    .vditor-outline{
      background-color: var(--bg-color-card);
    }
    p {
      margin-bottom: 6px;
    }
  }
}
</style>
