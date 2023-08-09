<template>
  <div class="publishInfo">
    <Form ref="formRef" :model="formData" :rules="rules" :label-width="100">
      <FormItem prop="labelIds" label="添加标签">
        <Select multiple v-model="formData.labelIds">
          <Option :value="item.id" v-for="item of labelList" :key="item.id">
            {{ item.name }}
          </Option>
        </Select>
      </FormItem>
      <FormItem prop="mainImgUrl" label="文章封面">
        <SingleUpload :value.sync="formData.mainImgUrl" />
      </FormItem>
      <FormItem prop="snippet" label="文章摘要">
        <Input
          type="textarea"
          :maxlength="100"
          show-word-limit
          v-model="formData.snippet"
          :rows="6"
        />
      </FormItem>
      <FormItem style="text-align: right">
        <Button :loading="btnLoading" type="primary" @click="publishChange">确认发布</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { queryLabelAll, publishBlogs } from '~/config/api'
import SingleUpload from '~/components/imageUplad/SingleUpload.vue'

export default {
  name: 'PublishInfo',
  components: { SingleUpload },
  props: {
    id: {
      type: Number | null,
      default: null,
    },
  },
  data() {
    return {
      btnLoading: false,
      formData: {
        labelIds: [],
        mainImgUrl: '',
        snippet: '',
      },
      rules: {
        labelIds: [
          { required: true, type: 'array', message: '请添加标签', trigger: 'change' },
        ],
        snippet: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' },
        ],
      },
      labelList: [],
    }
  },
  methods: {
    async getLabelList() {
      const { data } = await this.$axios.post(queryLabelAll)
      this.labelList = data.data
    },
    publishChange(){
      this.btnLoading = true;
      this.$refs.formRef.validate(async (valid) => {
        if(!valid) return this.btnLoading = false
        try {
          await this.$axios.post(publishBlogs, { id: this.id, ...this.formData })
          this.$Message.success('发布成功')
          this.btnLoading = false
          this.$router.back();
        } catch (err){
          this.btnLoading = false
        }
      })
    },
  },
  mounted() {
    this.getLabelList()
  },
}
</script>

<style lang="scss" scoped>
.publishInfo {
  text-align: left;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
