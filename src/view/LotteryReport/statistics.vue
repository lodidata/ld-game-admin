<template>
  <div id="LotteryReport">
    <Spin v-if="loading.page" fix></Spin>

    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.lotteryReport7}}</span>
          <Input v-model="query.lottery_number" :placeholder="i18n_lang.lotteryReport8" />
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" @click="search">{{i18n_lang.lotteryReport3}}</Button>
        <Button type="primary" @click="reset">{{i18n_lang.lotteryReport4}}</Button>
      </div>
    </Card>
    <Spin v-if="loading.page" fix></Spin>
    <Table style="margin-top:10px" border :columns="columnsMain" :data="dataSource"></Table>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>
    <div class="desc">{{i18n_lang.lotteryReport5}} {{ updatedTime }}</div>

    <Modal v-model="visible" :title="i18n_lang.lotteryReport9" :width="1000">
      <Spin v-if="loading.table" size="large" fix></Spin>
      <div class="defineTable">
        <ul class="head">
          <li>{{i18n_lang.lotteryReport10}}</li>
          <li>{{i18n_lang.lotteryReport11}}</li>
          <li>{{i18n_lang.lotteryReport10}}</li>
          <li>{{i18n_lang.lotteryReport11}}</li>
          <li>{{i18n_lang.lotteryReport10}}</li>
          <li>{{i18n_lang.lotteryReport11}}</li>
          <li>{{i18n_lang.lotteryReport10}}</li>
          <li>{{i18n_lang.lotteryReport11}}</li>
          <li>{{i18n_lang.lotteryReport10}}</li>
          <li>{{i18n_lang.lotteryReport11}}</li>
        </ul>
        <div class="body">
          <ul>
            <li v-for="item in dataDetail.slice(0,10)" :key="item.num">{{ item.num }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(0,10)" :key="item.num">{{ item.val }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(10,20)" :key="item.num">{{ item.num }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(10,20)" :key="item.num">{{ item.val }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(20,30)" :key="item.num">{{ item.num }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(20,30)" :key="item.num">{{ item.val }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(30,40)" :key="item.num">{{ item.num }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(30,40)" :key="item.num">{{ item.val }}</li>
          </ul>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(40,50)" :key="item.num">{{ item.num }}</li>
          </ul>
          <ul>
            <li v-for="item in dataDetail.slice(40,50)" :key="item.num">{{ item.val }}</li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import columnsReport from './columnsReport'

export default {
  data() {
    const i18n_lang = this.$t('lotteryReport');
    return {
      i18n_lang: i18n_lang,
      columnsMain: columnsReport(this),
      visible: false,
      loading: {
        page: false,
        table: false
      },
      query: { lottery_number: '' },
      dataSource: [],
      dataDetail: [],
      updatedTime: '',
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取统计列表
    async getData(index) {
      try {
        this.page.currentPage = index || 1
        this.loading.page = true
        const res = await this.$axios.request({
          url: `/state/lhc`,
          method: 'GET',
          params: { page: this.page.currentPage, page_size: this.page.pageSize, ...this.query }
        })

        this.loading.page = false
        if (res.status !== 200) {
          this.$Message.error(res.message)
        } else {
          this.dataSource = res.data
          this.page.total = res.attributes ? res.attributes.count : 0
          this.updatedTime = res.attributes.last_time
        }
      } catch (err) {
        console.log(err)
      }
    },
    /**
     * 详情
     */
    async handleDetail(row) {
      try {
        this.visible = true
        this.loading.table = true
        const res = await this.$axios.request({
          url: '/state/lhc/detail',
          method: 'GET',
          params: { lottery_number: row.lottery_number }
        })

        if (Object.keys(res.data).length) {
          const arr = []
          for (const i in res.data) {
            arr.push({ num: i, val: res.data[i] })
          }
          this.dataDetail = arr
        } else {
          this.dataDetail = []
        }
        // console.log(this.dataDetail, '---')
      } catch (err) {
        console.log(err)
      } finally {
        this.loading.table = false
      }
    },
    // 查询
    search() {
      this.getData()
    },
    reset() {
      this.query.lottery_number = ''
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#LotteryReport {
  .query_con {
    .item {
      display: flex;
      align-items: center;
    }
  }
  .desc {
    font-size: 14px;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
}

.defineTable {
  width: 100%;
  box-sizing: border-box;
  border: 1px #dddddd solid;
  min-height: 450px;
  .head {
    width: 100%;
    display: flex;
    background: #dddddd;
    li {
      width: 10%;
      line-height: 40px;
      text-align: center;
    }
  }
  .body {
    width: 100%;
    display: flex;
    ul {
      width: 10%;
      text-align: center;
      &:nth-child(odd){
        background: #f1f1f1;
      }
      li {
        line-height: 40px;
        text-align: center;
        border-bottom:1px #dddddd solid;
        &:last-child{
           border-bottom:none;
        }
      }
    }
  }
}
</style>
