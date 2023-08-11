<template>
  <div>
    <Upload
      :type="$slots.default.length === 0 ? 'drag' : 'select'"
      :accept="accept"
      :max-size="maxSize"
      :on-success="handleSuccess"
      :show-upload-list="false"
      :on-exceeded-size="onExceededSize"
      :on-format-error="onFormatError"
      :action="fileUpload"
    >
      <slot></slot>
      <div style="padding: 20px 0" v-if="$slots.default.length === 0">
        <div v-if="!value">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
        <div v-else>
          <img class="imgStyle" :src="value" />
        </div>
      </div>
    </Upload>
  </div>
</template>

<script>

import { fileUpload } from "~/config/api";
export default {
  name: "SingleUpload",
  props: {
    value:{
      type: String,
      default: null,
    },
    accept: {
      type: String,
      default: () => '.jpeg,.jpg,.png,.gif',
    },
    maxSize: {
      type: Number,
      default: () => 2 * 1024
    }
  },
  emits: ['update:value', 'success'],
  data(){
    return{
      fileUpload: fileUpload,
    }
  },
  methods: {
    handleSuccess(data){
      this.$emit('update:value', data.data)
      this.$emit('success', data.data)
    },
    onFormatError(){
      this.$Message.error('请上传后缀为' + this.accept + '的图片')
    },
    onExceededSize(){
      this.$Message.error('请上传' + Math.floor(this.maxSize / 1024) + 'M内的图片')
    }
  },
}
</script>

<style lang="scss" scoped>
.imgStyle {
  width: auto;
  max-width: 100%;
  max-height: 200px;
}
</style>
