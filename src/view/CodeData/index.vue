<template>
  <div class="codeData">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form :model="formItem" class="formBox">
      <FormItem :label="i18n_lang.codeData0">
        <DatePicker
          v-model="formItem.timeArr"
          :options="dateOpt"
          :editable="false"
          type="daterange"
          split-panels
          :placeholder="i18n_lang.codeData1"
          style="width: 200px"
          clearable
          @on-change="selectDate"
        ></DatePicker>
      </FormItem>
      <FormItem :label="i18n_lang.codeData2">
        <Input
          v-model="formItem.user_name"
          size="large"
          clearable
          :placeholder="i18n_lang.codeData3"
          style="width:200px"
        />
      </FormItem>
      <Button size="large" type="primary" @click="search">{{i18n_lang.codeData4}}</Button>
    </Form>

    <Modal v-model="visible.modal" :title="i18n_lang.codeData5" :width="600">
      <ul class="gameBox">
        <li v-for="item in dataList" :key="item.id">
          <span>{{ item.name }}</span>：
          <span>{{ Number(item.dml)/100 }}</span>
          （
          <span>{{ Number(item.tmp_percent)/100 }}%</span>)
        </li>
      </ul>
      <div slot="footer">
        <p style="text-align:left">
          {{i18n_lang.codeData6}}
          <span style="color:#ed4014;margin-right:10px;">{{ totalObj.dml }}</span> {{i18n_lang.codeData7}}
          <span style="color:#19be6b;">{{ totalObj.amount }}</span>
        </p>
      </div>
    </Modal>
    <Table :columns="columns" :data="dataSource"></Table>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="getDataList"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>

<script>
import columns from './columns'
import lotteryDateOption from '@/libs/lotteryDateOption'
export default {
  data() {
    const i18n_lang = this.$t('codeData');
    return {
      i18n_lang: i18n_lang,
      visible: {
        modal: false
      },
      loading: {
        page: false
      },
      formItem: {
        timeArr: ['', ''],
        userName: ''
      },
      dateOpt: lotteryDateOption,
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      columns: columns(this),
      dataSource: [],
      dataList: []
    }
  },
  computed: {
    totalObj() {
      if (this.dataList.length !== 0) {
        return this.dataList.reduce(
          (acc, cur) => {
            return {
              // dml: acc.dml + Number(cur.dml) / 100,
              dml: acc.dml + Number(cur.dml),
              // amount: acc.amount + Number(cur.amount) / 100
              amount: acc.amount + Number(cur.amount)
            }
          },
          { dml: 0, amount: 0 }
        )
      }
      return { dml: 0, amount: 0 }
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    // 洗码数据列表
    async getDataList(i = 1) {
      this.loading.page = true
      this.page.currentPage = i

      const res = await this.$axios.request({
        url: 'funds/xima/list',
        method: 'GET',
        params: {
          user_name: this.formItem.user_name,
          start_time: this.formItem.timeArr[0],
          end_time: this.formItem.timeArr[1],
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      this.dataSource = res.data
      this.page.total = res.attributes.total
      // console.log(res)
    },
    // 详情
    async handleDetail(row) {
      this.visible.modal = true
      const res = await this.$axios.request({
        url: `funds/xima/info/${row.id}`,
        method: 'GET',
        params: {
          id: row.id
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      // console.log(res)
      this.dataList = res.data
    },
    // 选择日期
    selectDate() {
      console.log(this.formItem.timeArr)
    },
    // 查询
    search() {
      this.getDataList()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.codeData {
  .formBox {
    /deep/.ivu-form-item {
      width: 300px;
      display: inline-block;
    }
  }
}
.gameBox {
  position: relative;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 30%;
    margin: 10px 0;
  }
}
</style>
