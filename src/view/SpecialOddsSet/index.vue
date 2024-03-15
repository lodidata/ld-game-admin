<template>
  <div id="SpecialOddsSetter">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div>
        <span>{{i18n_lang.specialOddsSet0}}</span>
        <RadioGroup
          v-if="lotteryList.length"
          v-model="query.lottery_id"
          type="button"
          size="large"
          @on-change="lotteryTypeChange"
        >
          <Radio v-for="(it, i) in lotteryList" :key="i" :label="it.id">{{ it.name }}</Radio>
        </RadioGroup>
      </div>
    </Card>
    <MyTable
      editting
      combinerow
      border
      :columns="columns"
      :data="dataSource"
      @editChange="editChange"
    ></MyTable>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import columns from './columns'
import { pidSortAndGroup } from './format.js'

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('specialOddsSet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      dataSource: [],
      columns: columns(this),
      levelList: [],
      lotteryList: [],
      query: {
        lottery_id: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading.page = true
      const level = this.getLevel()
      const lottery = this.getLottery()
      Promise.all([level, lottery]).then(res => {
        if (this.lotteryList.length) {
          this.query.lottery_id = this.lotteryList[0].id
          this.getData()
        }
      })
    },
    async getLottery() {
      const res = await this.$axios.request({
        url: '/lottery/types?lottery_pid=1',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.lotteryList = res.data
    },
    // 修改彩种时
    lotteryTypeChange() {
      this.getData()
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/pc28/srate',
        method: 'GET',
        params: {
          lottery_id: this.query.lottery_id
        }
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
    async getLevel() {
      const res = await this.$axios.request({
        url: '/pc28/level',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.levelList = res.data
    },
    async editChange(val, key, row) {
      row[key] = val
      const obj = {
        odds: [row]
      }
      const res = await this.$axios.request({
        url: '/pc28/srate',
        method: 'PUT',
        data: obj
      })
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

<style></style>
