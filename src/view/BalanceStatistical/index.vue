<template>
  <div>
    <Spin v-if="loading.page" fix></Spin>
    <Table border :columns="columns" :data="dataSource"></Table>
  </div>
</template>

<script>
import columns from './columns'
export default {
  data() {
    const i18n_lang = this.$t('balanceStatistical');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      dataSource: [],
      loading: {
        page: false
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: 'cash/third/balance',
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
      this.dataSource = res.data || []
    }
  }
}
</script>
