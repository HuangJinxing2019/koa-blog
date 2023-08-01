<template>
  <Modal
    :value="show"
    title="类型编辑"
    @on-visible-change="handleCancel"
    :mask-closable="false"
  >
    <Form ref="formRef" :model="formData" :rules="formRules" :label-width="80">
      <FormItem prop="name" label="文章标题">
        <Input
          v-model="formData.title"
          :maxlength="32"
          show-word-limit
          placeholder="请输入1~12字符名称"
        />
      </FormItem>
      <FormItem prop="categoryId" label="文章分类">
        <i-select v-model="formData.categoryId">
          <i-option :value="item.id" v-for="item of categoryList">{{item.name}}</i-option>
        </i-select>
      </FormItem>
      <FormItem prop="open" label="是否公开">
        <i-switch v-model="formData.open" />
      </FormItem>
    </Form>
    <template #footer>
      <Button @click="handleCancel(false)">取消</Button>
      <Button type="primary" @click="confirmSubmit">提交</Button>
    </template>
  </Modal>
</template>

<script>
import SingleUpload from '~/components/imageUplad/SingleUpload.vue'
import { queryCategoryListAll, createBlogs } from "~/config/api";

export default {
  name: 'AddBlogsModal',
  components: { SingleUpload },
  emits:['update:show', 'success'],
  props:{
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      formData: {
        title: '',
        categoryId: '',
        open: true,
      },
      formRules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        categoryId: [{ required: true, type: 'number', message: '请选择文章类型', trigger: 'change' }],
      },
      categoryList: [],
    }
  },
  methods: {
    async getCategoryList(){
      const { data } = await this.$axios.post(queryCategoryListAll)
      this.categoryList = data.data
    },
    confirmSubmit(){
      this.$refs.formRef.validate(async (valid) => {
        if(!valid) return
        const { data } = await this.$axios.post(createBlogs, this.formData);
        this.$emit('update:show', false)
        this.$emit('success', data.data)
      })
    },
    handleCancel(status){
      this.$emit('update:show', status)
    }
  },
  watch: {
    show(newValue){
      if(newValue) {
        this.formData.title = ''
        this.formData.categoryId = ''
        this.formData.open = true
        if(this.categoryList.length === 0) this.getCategoryList()
      }
    }
  }
}
</script>

<style scoped></style>
