<template>
  <div class="container">
    <Input type="text" placeholder="请输入"></Input>
    <Card title="我是卡片">
      <Button type="primary" @click="openChange">232323</Button>
    </Card>
    <div style="margin: auto; margin-top: 30px;">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>
<script>
import { queryBlogsListPage } from '~/config/api'
import { getServerDomain } from '~/utils'
export default {
  name: 'IndexPage',
  data() {
    return {
      isLogin: false,
      columns1: [
        {
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Address',
          key: 'address',
        },
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
      ],
    }
  },
  async asyncData() {

  },
  async created() {
    try {
      const { data } = await this.$axios.post(queryBlogsListPage, {})
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    openChange() {
      this.$Modal.confirm({
        title: '是否删除',
        onOk: () => {},
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  color: var(--text-color-def);
}
</style>
