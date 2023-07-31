<template>
  <div>
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
      <Button type="primary" @click="handleAddType">新建标签</Button>
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
    <label-edit :show.sync="showEdit" :data="editData" @success="getList"/>
  </div>
</template>

<script>
import LabelEdit from "~/components/labelManage/LabelEdit.vue";
import { queryLabelPage, deleteLabel } from "~/config/api";
import { getServerDomain } from "~/utils";

export default {
  name: "labelManage",
  components: { LabelEdit },
  data(){
    return {
      tableLoading: false,
      showEdit: false,
      editData: null,
      queryData: {
        pageNum: 1,
        pageSize: 10,
        name: '',
      },
      tableColumns: [
        { title: '标签名称', key: 'name', align: 'center' },
        { title: '备注', key: 'remark', align: 'center' },
        { title: '操作', slot: 'action', align: 'center', width: 200 },
      ],
      list: [],
      total: 0,
    }
  },
  async asyncData({ $axios }){
    try {
      const { data } = await $axios.post(getServerDomain() + queryLabelPage)
      return {
        list: data.data.list,
        total: data.data.total
      }
    }catch (err){}
  },
  methods: {
    resetChange(){
      this.queryData.pageNum = 1;
      this.queryData.namg = '';
      this.getList();
    },
    async getList(){
      try {
        this.tableLoading = true
        const { data } = await this.$axios.post(queryLabelPage, this.queryData)
        this.list = data.data.list
        this.total = data.data.total
        this.tableLoading = false
      }catch (err){
        this.tableLoading = false
      }

    },
    handleAddType(){
      this.showEdit = true
      this.editData = null
    },
    handleEdit(row){
      this.showEdit = true
      this.editData = row
    },
    handleDelete(row){
      this.$Modal.confirm({
        title: '删除',
        content: `确认删除${row.name}吗？`,
        onOk: async () => {
          try {
            await this.$axios.post(deleteLabel, { id: row.id })
            this.$Message.success('删除成功')
          }catch (err){}
        }
      })
    },
    pageChange(e){
      this.queryData.pageNum = 1;
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>
