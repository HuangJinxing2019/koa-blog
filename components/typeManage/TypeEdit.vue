<template>
  <Modal
    v-model="showModal"
    title="类型编辑"
    :mask-closable="false"
    :loading="loading"
    name="file"
    @on-ok="asyncOK">
    <Form :model="formData" :rules="formRules" :label-width="80">
      <FormItem prop="name" label="分类名称">
        <Input v-model="formData.name" :maxlength="12" show-word-limit placeholder="请输入1~12字符名称" />
      </FormItem>
      <FormItem prop="name" label="分类图片">
        <SingleUpload />
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import SingleUpload from "~/components/imageUplad/SingleUpload.vue";
export default {
  name: "TypeEdit",
  components: { SingleUpload },
  data(){
    return{
      showModal: true,
      loading: false,
      formData: {
        name: '',
        imgUrl: '',
      },
      formRules: {
        name: [{required: true, message: '请输入分类名称', maxlength: 12, trigger: 'blur'}]
      }
    }
  },
  methods: {
    asyncOK(){

    },
  }
}
</script>

<style scoped>

</style>
