<template>
  <div id="LotterySwitch">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <MyTable combinerow editting :columns="columns" :data="dataSource" border @editChange="switchChange"></MyTable>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import columns from './columns/LotterySwitch'
import { pidSortAndGroup } from './format.js'

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('lotterySet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      dataSource: [],
      columns: columns(this)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/order/period',
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
      const groupAndSort = pidSortAndGroup(res.data)
      this.dataSource = groupAndSort.sort
      this.columns = columns(this, groupAndSort.group)
    },
    async switchChange(value, type, row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/lottery/order/${row.id}`,
        method: 'PATCH',
        data: {
          [type]: Number(value)
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#LotterySwitch {
  position: relative;
}
</style>
