<template>
  <div class="blogs-edit-wrapper">
    <div class="btns">
      <Button @click="$router.back()">返回</Button>
      <Poptip placement="bottom-end" :width="500">
        <Button type="primary">发布文章</Button>
        <template #content>
          <PublishInfo :id="id" />
        </template>
      </Poptip>
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
      id: null
    }
  },
  methods: {
    initVditor(value) {
      vditor = new Vditor('vditor', {
        width: '100%',
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
  },
  mounted() {
    this.id = this.$route.query.id
    this.getDetail(this.id)
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
}
</style>
