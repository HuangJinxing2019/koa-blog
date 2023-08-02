<template>
  <div class="wrapper">
    <Form :model="queryData" :label-width="100" inline>
      <FormItem prop="title" label="文章标题">
        <Input v-model="queryData.title" placeholder="请输入" style="width: 240px"/>
      </FormItem>
      <FormItem :label-width="40">
        <Button type="primary" @click="() => { queryData.pageNum = 1; getList() }">查询</Button>
        <Button type="default" @click="resetChange" style="margin-left: 20px">重置</Button>
      </FormItem>
    </Form>
    <div class="table-toolbar">
      <Button type="primary" @click="handleAddBlogs">新建文章</Button>
    </div>
    <Table border :loading="tableLoading" :columns="tableColumns" :data="list">
      <template #action="{ row, index }">
        <Button type="primary" @click="handleEdit(row.id)" size="small">
          编辑
        </Button>
        <Button type="error" @click="handleDelete(row)" size="small">
          删除
        </Button>
      </template>
    </Table>
    <add-blogs-modal :show.sync="showAdd" @success="addSuccessChange"/>
  </div>
</template>

<script>

import { queryBlogsListPage, deleteBlogs } from "~/config/api";
import { getServerDomain } from "~/utils";
import AddBlogsModal from "~/components/blogsManage/AddBlogsModal.vue";

export default {
  name: "index",
  components: { AddBlogsModal },
  data(){
    return{
      tableLoading: false,
      showAdd: false,
      queryData: {
        pageNum: 1,
        pageSize: 10,
        title: '',
      },
      tableColumns: [
        { title: '文章标题', key: 'title', align: 'center' },
        { title: '文章类型', key: 'categoryName', align: 'center' },
        { title: '操作', slot: 'action', align: 'center', width: 200 },
      ],
      list: [],
      total: 0,
    }
  },
  async asyncData({ $axios, req }){
    try {
      const { data } = await $axios.post(getServerDomain(req) + queryBlogsListPage)
      return {
        list: data.data.list,
        total: data.data.total
      }
    } catch (err){
      console.log(err)
    }
  },
  methods: {
    resetChange(){
      this.queryData.pageNum = 1
      this.queryData.title = ''
      this.getList();
    },
    addSuccessChange(data){
      console.log(data)
    },
    async getList(){
      try {
        this.tableLoading = true
        const { data } = await this.$axios.post(queryBlogsListPage, this.queryData)
        this.list = data.data.list
        this.total = data.data.total
        this.tableLoading = false
      } catch (err) {
        this.tableLoading = false
      }

    },
    handleAddBlogs(){
      this.showAdd = true
    },
    handleEdit(id){

    },
    handleDelete(row){
      this.$Modal.confirm({
        title: '删除',
        content: `确定删除文章${row.title}吗？`,
        onOk: async () => {
          await this.$axios.post(deleteBlogs, { id: row.id })
          this.$Message.success('删除成功')
          await this.getList();
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{

  }
</style>
