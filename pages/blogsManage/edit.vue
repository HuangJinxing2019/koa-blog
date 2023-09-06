<template>
  <div class="blogs-edit-wrapper" ref="contentRef">
    <div class="btns">
      <Button style="margin-right: 10px" @click="$router.back()">返回</Button>
      <Poptip placement="bottom-end" :width="500">
        <Button style="margin-right: 10px" type="primary">发布文章</Button>
        <template #content>
          <PublishInfo :id="id" />
        </template>
      </Poptip>
      <Icon v-if="!isFullScreen" @click="fullScreenChange(true)" type="md-qr-scanner" size="30" />
      <Icon v-else @click="fullScreenChange(false)" type="md-contract" size="30" />
    </div>
    <div id="vditor" class="vditor-content"></div>
  </div>
</template>

<script>
import { blogsQueryById, blogsUpdateContent, fileUpload } from '~/config/api'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import 'vditor/dist/css/content-theme/dark.css'
import PublishInfo from "~/components/blogsManage/PublishInfo.vue";

let vditor;
export default {
  name: 'blogsEdit',
  components: { PublishInfo },
  data() {
    return {
      isFullScreen: false,
      id: null
    }
  },
  methods: {
    initVditor(value) {
      vditor = new Vditor('vditor', {
        width: 'auto',
        value,
        theme: 'dark',
        placeholder: '开始编辑...',
        codeTheme: 'solarized-dark256',
        cache: {
          enable: false,
        },
        outline: {
          enable: true,
          position: 'right',
        },
        preview: {
          hljs: {
            style: 'solarized-dark256',
            lineNumber: true,
          },
        },
        upload: {
          url: fileUpload,
          max: 1024 * 1024,
          linkToImgUrl: fileUpload,
          accept: 'image/*',
          multiple: true,
          fieldName: 'file',
          success: this.uploadSuccess,
        },
        blur: this.blurChange,
        tab: '  ',
      })
    },
    uploadSuccess(editor, msg){
      const value = vditor.getValue() + `\n ![](${JSON.parse(msg).data})`
      vditor.setValue(value)
    },
    async blurChange(value){
      await this.$axios.post(blogsUpdateContent, { id: this.id, content: value })
    },
    async getDetail(id) {
      const { data } = await this.$axios.post(blogsQueryById, { id })
      this.initVditor(data.data.content)
    },
    fullScreenChange(flag){
      if(flag){
        this.$refs.contentRef.requestFullscreen()
      }else {
        document.exitFullscreen()
      }
    },
    setIsFullScreen(){
      this.isFullScreen = !!document.fullscreenElement;
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getDetail(this.id)
    this.$refs.contentRef.addEventListener('fullscreenchange', this.setIsFullScreen, false)
  },
}
</script>

<style lang="scss">
.blogs-edit-wrapper {
  width: 100%;
  height: 100%;
  ol{
    list-style: str-index;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    text-align: right;
    margin-bottom: 10px;
  }
  .vditor-content {
    width: 100%;
    height: calc(100% - 45px) !important;
    .vditor-reset {
      background-color: var(--bg-color-card-rgba);
      &:focus {
        background-color: var(--bg-color-card);
      }
    }
    .vditor-outline {
      background-color: var(--bg-color-card);
    }
    p {
      margin-bottom: 6px;
    }
  }
  .vditor-reset blockquote{
    border-left-color: #ffc517;
    border-radius: 2px;
    background: rgba(255, 197, 23, 0.06);
    padding: 6px 10px 3px 10px;
    &::before,
    &::after{
      content: none;
    }
  }
  .vditor-reset code:not(.hljs):not(.highlight-chroma){
    background-color: rgba(83, 86, 91, 0.36);
  }
}
</style>
