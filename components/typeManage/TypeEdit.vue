<template>
  <Modal
    :value="show"
    title="类型编辑"
    @on-visible-change="handleCancel"
    :mask-closable="false">
    <Form ref="formRef" :model="formData" :rules="formRules" :label-width="80">
      <FormItem prop="name" label="分类名称">
        <Input v-model="formData.name" :maxlength="12" show-word-limit placeholder="请输入1~12字符名称" />
      </FormItem>
      <FormItem prop="imgUrl" label="分类图片">
        <SingleUpload :value.sync="formData.imgUrl"/>
      </FormItem>
    </Form>
    <template #footer>
      <Button @click="handleCancel(false)">取消</Button>
      <Button type="primary" @click="confirmSubmit">提交</Button>
    </template>
  </Modal>
</template>

<script>
import SingleUpload from "~/components/imageUplad/SingleUpload.vue";
import { createCategory, updateCategory } from "~/config/api";
export default {
  name: "TypeEdit",
  components: { SingleUpload },
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  data(){
    return{
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
  emits: ['update:show', 'success'],
  methods: {
    confirmSubmit(){
      this.$refs.formRef.validate(async (valid) => {
        if(!valid) return
        try {
          this.loading = true
          await this.$axios.post(createCategory, this.formData)
          this.loading = false
          this.$Message.success('操作成功')
          this.$emit('update:show', false)
          this.$emit('success')
        }catch (err){
          this.loading = false
        }
      })
    },
    handleCancel(status){
      this.$emit('update:show', status)
    }
  }
}
</script>

<style scoped>

</style>
