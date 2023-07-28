<template>
  <div class="wrapper">
    <div class="table-toolbar">
      <Button type="primary" @click="handleAddType">新建分类</Button>
    </div>
    <Table border :loading="tableLoading" :columns="tableColumns" :data="list">
      <template #action="{ row, index }">
        <Button type="primary" @click="handleEdit(row.id)" size="small">
          编辑
        </Button>
        <Button type="error" @click="handleDelete(row.id)" size="small">
          删除
        </Button>
      </template>
    </Table>
    <type-edit :show.sync="showEdit" @success="getList"/>
  </div>
</template>

<script>
import TypeEdit from '~/components/typeManage/TypeEdit.vue'
import { queryCategoryPage } from '~/config/api'
import { getServerDomain } from '~/utils'

export default {
  name: 'index',
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
          console.log(row)
          return h('img', { attrs: { src: row.imgUrl }, style: {width: '80px', height: '40px'}})
        }},
        { title: '操作', slot: 'action', align: 'center', width: 200 },
      ],
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
      this.getList()
      // this.showEdit = true
    },
    handleEdit(id) {
      console.log(id)
    },
    handleDelete(id) {
      console.log(id)
    },
  },
}
</script>

<style scoped></style>
