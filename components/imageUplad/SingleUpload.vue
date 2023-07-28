<template>
  <div>
    <Upload
      type="drag"
      :accept="accept"

      :on-success="handleSuccess"
      :show-upload-list="false"
      :action="fileUpload">
      <div style="padding: 20px 0">
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
  emits: ['update:value'],
  data(){
    return{
      fileUpload: fileUpload,
    }
  },
  methods: {
    handleSuccess(data){
      this.$emit('update:value', data.data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .imgStyle{
    width: auto;
    max-width: 100%;
    max-height: 200px;
  }
</style>
