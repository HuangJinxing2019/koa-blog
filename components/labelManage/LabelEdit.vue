<template>
  <Modal
    :value="show"
    title="类型编辑"
    @on-visible-change="handleCancel"
    :mask-closable="false"
  >
    <Form ref="formRef" :model="formData" :rules="formRules" :label-width="80">
      <FormItem prop="name" label="分类名称">
        <Input
          v-model="formData.name"
          :maxlength="12"
          show-word-limit
          placeholder="请输入1~12字符名称"
        />
      </FormItem>
      <FormItem prop="remark" label="备注">
        <Input v-model="formData.remark" maxlength="64" show-word-limit type="textarea" placeholder="请输入..." />
      </FormItem>
    </Form>
    <template #footer>
      <Button @click="handleCancel(false)">取消</Button>
      <Button :loading="btnLoading" type="primary" @click="confirmSubmit">提交</Button>
    </template>
  </Modal>
</template>

<script>
import { createLabel, updateLabel } from "~/config/api";

export default {
  name: 'LabelEdit',
  emits: ['update:show', 'success'],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => null
    }
  },
  data(){
    return{
      btnLoading: false,
      formData: {
        name: '',
        remark: '',
      },
      formRules: {
        name: [{required: true, message: '请输入分类名称', maxlength: 12, trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleCancel(status){
      this.$emit('update:show', status)
    },
    confirmSubmit(){
      this.btnLoading = true
      this.$refs.formRef.validate(async (valid) => {
        if(!valid) return  this.btnLoading = false
        const url = this.formData.id ? updateLabel : createLabel;
        try {
          await this.$axios.post(url, this.formData)
          this.btnLoading = false
          this.$emit('update:show', false)
          this.$emit('success')
        }catch (err){
          this.btnLoading = false
        }
      })
    }
  },
  watch: {
    data(newValue){
      if(newValue){
        this.formData = { ...newValue }
      } else {
        this.formData = {
          name: '',
          remark: '',
        }
      }
    }
  }
}
</script>

<style scoped></style>
