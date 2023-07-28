<template>
  <div class="wrapper">
    <div class="table-toolbar">
      <Button type="primary" @click="handleAddType">新建分类</Button>
    </div>
    <Table border :columns="tableColumns" :data="list">
      <template #action="{row, index}">
        <Button type="primary" @click="handleEdit(row.id)" size="small">编辑</Button>
        <Button type="error" @click="handleDelete(row.id)" size="small">删除</Button>
      </template>
    </Table>
    <type-edit />
  </div>
</template>

<script>
import TypeEdit from "~/components/typeManage/TypeEdit.vue";
import { queryCategoryPage } from "~/config/api";
import { getServerDomain } from "~/utils";

export default {
  name: "index",
  components: { TypeEdit },
  data(){
    return {
      tableColumns: [
        { title: '类型名称', key: 'name', align: 'center'},
        { title: '类型图片', key: 'img', align: 'center'},
        { title: '操作', slot: 'action', align: 'center', width: 200},
      ],
      list: [{id: 222, name: 1, img: 2}],
    }
  },
  async asyncData({ $axios, req }){
    const data = await $axios.post(getServerDomain(req) + queryCategoryPage);
    console.log(data)
  },
  methods: {
    handleAddType(){

    },
    handleEdit(id){
      console.log(id)
    },
    handleDelete(id){
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
