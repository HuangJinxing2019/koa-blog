<template>
  <div>
    <Upload
      type="drag"
      :action="fileUpload">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>Click or drag files here to upload</p>
      </div>
    </Upload>
  </div>
</template>

<script>

import { fileUpload } from "~/config/api";
export default {
  name: "SingleUpload",
  data(){
    return{
      fileUpload: fileUpload,
    }
  },
}
</script>

<style scoped>

</style>
