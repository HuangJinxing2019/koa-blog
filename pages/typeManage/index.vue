<template>
  <div class="wrapper">
    <Form :model="queryData" :label-width="100" inline>
      <FormItem prop="name" label="标签名称">
        <Input v-model="queryData.name" placeholder="请输入" style="width: 240px"/>
      </FormItem>
      <FormItem :label-width="40">
        <Button type="primary" @click="() => { queryData.pageNum = 1; getList() }">查询</Button>
        <Button type="default" @click="resetChange" style="margin-left: 20px">重置</Button>
      </FormItem>
    </Form>
    <div class="table-toolbar">
      <Button type="primary" @click="handleAddType">新建分类</Button>
    </div>
    <Table border :loading="tableLoading" :columns="tableColumns" :data="list">
      <template #action="{ row, index }">
        <Button type="primary" @click="handleEdit(row)" size="small">
          编辑
        </Button>
        <Button type="error" @click="handleDelete(row)" size="small">
          删除
        </Button>
      </template>
    </Table>
    <div class="table-page">
      <Page :total="total" :current="queryData.pageNum" show-total @on-change="pageChange"></Page>
    </div>

    <type-edit :show.sync="showEdit" :data="editData" @success="getList"/>
  </div>
</template>

<script>
import TypeEdit from '~/components/typeManage/TypeEdit.vue'
import { queryCategoryPage, deleteCategory } from '~/config/api'
import { getServerDomain } from '~/utils'

export default {
  name: 'typeManage',
  components: { TypeEdit },
  data() {
    return {
      showEdit: false,
      tableLoading: false,
      queryData: {
        pageNum: 1,
        pageSize: 10,
        name: '',
      },
      tableColumns: [
        { title: '类型名称', key: 'name', align: 'center' },
        { title: '类型图片',  align: 'center', render: (h, { row }) => {
          return h('img', { attrs: { src: row.imgUrl }, style: {width: '80px', height: '40px'}})
        }},
        { title: '操作', slot: 'action', align: 'center', width: 200 },
      ],
      editData: {},
      list: [],
      total: 0,
    }
  },
  async asyncData({ $axios, req }) {
    try {
      const { data } = await $axios.post(
        getServerDomain(req) + queryCategoryPage
      )
      return {
        total: data.data.total,
        list: data.data.list,
      }
    } catch (err) {}
  },
  methods: {
    resetChange(){
      this.queryData.name = '';
      this.queryData.pageNum = 1;
      this.getList();
    },
    async getList(){
      try {
        this.tableLoading = true;
        const { data } = await this.$axios.post(queryCategoryPage, this.queryData)
        this.list = data.data.list
        this.total = data.data.total
        this.tableLoading = false
      } catch (err){
        this.tableLoading = false
      }
    },
    handleAddType() {
      this.showEdit = true
      this.editData = null;
    },
    handleEdit(item) {
      this.editData = {...item}
      this.showEdit = true;
    },
    handleDelete(row) {
      this.$Modal.confirm({
        title: '删除',
        content: `确认删除${row.name}吗？`,
        onOk: async () => {
          try {
            await this.$axios.post(deleteCategory, { id: row.id });
            this.$Message.success('删除成功')
            await this.getList();
          } catch (err){}
        }
      })
    },
    pageChange(e){
      this.queryData.pageNum = e
      this.getList();
    }
  },
}
</script>

<style scoped></style>
