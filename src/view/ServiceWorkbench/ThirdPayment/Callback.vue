<template>
  <div id="Callback">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.thirdPayment2}}</span>
          <Input v-model="query.order_number" placeholder="" style="width: 100px"></Input>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.thirdPayment3}}</Button>
      </div>
    </Card>
    <MyTable :columns="columns" :data="dataSource" border></MyTable>
  </div>
</template>
<script>
import columns from './columns/callBack.js'
import MyTable from '_c/MyTable'
export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('thirdPayment');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      query: {
        order_number: ''
      },
      dataSource: [],
      columns: columns(this)
    }
  },
  methods: {
    // 获取数据
    async getData() {
      if (this.query.order_number === '') {
        this.$Message.warning(this.i18n_lang.thirdPayment4)
        return
      }
      this.loading.page = true

      const req = {
        order_number: this.query.order_number
      }
      const res = await this.$axios.request({
        url: '/thirdLog',
        method: 'GET',
        params: req
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
    }
  }
}
</script>
