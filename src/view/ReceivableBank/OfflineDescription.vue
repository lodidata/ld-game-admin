<template>
  <div id="OfflineDescription">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Table border :columns="columns" :data="dataSource"></Table>
    <!-- 编辑 -->
    <Modal v-model="visible.edit" :width="600" :title="i18n_lang.receivableBank2" :styles="{ top: '20px' }">
      <Spin v-if="loading.edit" fix></Spin>
      <Form v-if="visible.edit" ref="editForm" :model="editInfo" :label-width="120">
        <FormItem :label="i18n_lang.receivableBank3" prop="typeName">
          <span>{{ editInfo.typeName }}</span>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank4" prop="name">
          <Input
            v-model="editInfo.title"
            type="textarea"
            :placeholder="i18n_lang.receivableBank5"
            style="width: 400px"
          />
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank9">
          <span>{{i18n_lang.receivableBank6}}</span>
        </FormItem>
      </Form>
      <div slot="footer"><Button @click="save">{{i18n_lang.receivableBank7}}</Button></div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns/offline.js'
const initEdit = {
  id: '',
  typeName: '',
  title: ''
}
export default {
  data() {
    const i18n_lang = this.$t('receivableBank');
    return {
      i18n_lang: i18n_lang,
      typeName: '',
      columns: columns(this),
      dataSource: [],
      loading: {
        page: false,
        edit: false
      },
      visible: {
        edit: false
      },
      editInfo: { ...initEdit }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading.page = true
      this.dataSource = []
      const res = await this.$axios.request({
        url: '/cash/channel',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.dataSource = res.data
    },
    // 启用/停用
    async handleStatus(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/cash/channel/${row.id}`,
        method: 'PUT',
        data: {
          status: row.status_name === this.i18n_lang.receivableBank8 ? 0 : 1
        }
      })

      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 编辑
    handleOpenModal(row) {
      this.visible.edit = true
      this.editInfo.typeName = row.type_name
      this.editInfo.title = row.title
      this.editInfo.id = row.id
    },
    // 保存
    async save() {
      if (this.editInfo.title == null || this.editInfo.title.length > 15) {
        this.$Message.warning(this.i18n_lang.receivableBank5)
        return
      }
      this.loading.edit = true
      const res = await this.$axios.request({
        url: `/cash/channel/${this.editInfo.id}`,
        method: 'PUT',
        data: {
          title: this.editInfo.title
        }
      })
      this.loading.edit = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible.edit = false
      this.getData()
    }
  }
}
</script>
