<template>
  <div id="thirdPayment">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <!-- query -->
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.thirdPayment66}}</span>
          <Select v-model="query.code" style="width:100px">
            <Option value="">{{i18n_lang.thirdPayment6}}</Option>
            <Option v-for="(it,i) in payChannel" :key="i" :value="it.code">{{ it.name }}</Option>
          </Select>
        </div>

        <!-- <div class="item">
          <span>{{i18n_lang.thirdPayment7}}</span>
          <Select v-model="query.pay_scence" style="width:100px">
            <Option value="">{{i18n_lang.thirdPayment6}}</Option>
            <Option v-for="(it,i) in payType" :key="i" :value="it.pay_scene">{{ it.name }}</Option>
          </Select>
        </div> -->

        <div class="item">
          <span>{{i18n_lang.thirdPayment8}}</span>
          <Select v-model="query.status" style="width:100px">
            <Option value="">{{i18n_lang.thirdPayment6}}</Option>
            <Option value="1">{{i18n_lang.thirdPayment9}}</Option>
            <Option value="0">{{i18n_lang.thirdPayment10}}</Option>
          </Select>
        </div>
      </div>

      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.thirdPayment11}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.thirdPayment12}}</Button>
      </div>
    </Card>

    <!-- table -->
    <div style="marginTop:10px">
      <MyTable :columns="columns" :data="dataSource" border></MyTable>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.thirdPayment72}${page.total}${i18n_lang.thirdPayment73}` }}</div>
      <MyPage class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer @onChange="getData" @changePageSize="changePageSize"></MyPage>
    </div>

    <!-- 编辑 -->
    <Modal v-model="visible.edit" :title="i18n_lang.thirdPayment13" :width="600" :styles="{top: '20px'}" @on-cancel="handleCloseModal">
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Form v-if="visible.edit" ref="editForm" :model="editInfo" :label-width="100" :rules="ruleValidate">
        <FormItem :label="i18n_lang.thirdPayment66" prop="name">
          <Input v-model="editInfo.name" />
        </FormItem>
        <FormItem :label="i18n_lang.thirdPayment19" prop="sort">
          <Input v-model="editInfo.sort" />
        </FormItem>
        </FormItem>
        <FormItem :label="i18n_lang.thirdPayment20" prop="status">
          <Select v-model="editInfo.status" style="width:100px" :placeholder="i18n_lang.thirdPayment21">
            <Option :value="1">{{i18n_lang.thirdPayment9}}</Option>
            <Option :value="0">{{i18n_lang.thirdPayment10}}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.thirdPayment67" prop="request_url"><!-- v-if="popType=='payurl'" -->
          <Input v-model="editInfo.request_url" />
        </FormItem>
        <FormItem :label="`${i18n_lang.thirdPayment63}`" prop="pay_callback_domain">
          <Input v-model="editInfo.pay_callback_domain" :placeholder="`${i18n_lang.thirdPayment64}`"/>
        </FormItem>
      </Form>

      <div slot="footer" class="footer">
        <!-- <span v-if="!popType">{{i18n_lang.thirdPayment22}}</span> -->
        <Button @click="handleCloseModal">{{i18n_lang.thirdPayment23}}</Button>
        <Button type="primary" :loading="loading.btn.modal" @click="handleSave">{{i18n_lang.thirdPayment24}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './thirdColumns'
import MyTable from '_c/MyTable'
import MyPage from '_c/MyPage'
import { MathDiv, MathMul } from '@/libs/formatMath'

const initQuery = {
  code: '',
  status: ''
}

const initEdit = {
  name: '',
  status: 1,
  sort: '',
  request_url: '',
  pay_callback_domain: ''
}

export default {
  components: {
    MyTable,
    MyPage
  },
  data() {
    const i18n_lang = this.$t('thirdPayment');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        edit: false,
        btn: {
          modal: false
        }
      },
      query: { ...initQuery },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      columns: columns(this),
      payChannel: [], // 代付渠道
      payType: [], // 支付类型
      dataSource: [],
      visible: {
        edit: false
      },
      editInfo: { ...initEdit },
      ruleValidate: {
        name: [{ required: true, message: i18n_lang.thirdPayment68 }],
        request_url: [{ required: true, message: i18n_lang.thirdPayment69 }],
        // pay_callback_domain: [
        //   {required: true, message: i18n_lang.thirdPayment65 },
        //   {
        //     required: true,
        //     validator: (rule, value, callback) => {
        //       if(value.indexOf(`http://`) == -1 && value.indexOf(`https://`) == -1){
        //         return callback( i18n_lang.thirdPayment64 )
        //       }
        //     }
        //   }
        // ]
      },
      popType: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getPayData()
      // this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取支付渠道和类型
    async getPayData() {
      const res = await this.$axios.request({
        url: 'thirdAdvance/list/filter',////cash/3ths/pay
        method: 'GET'
      })
      if (res.status !== 200) {
        this.payChannel = []
        this.payType = []
        this.$msg({
          type: 'error',
          message: res.message
        })
      } else {
        this.payChannel = res.data
        // this.payType = res.data.pay_scene
      }
    },
    // 获取数据
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      this.dataSource = []

      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }

      const res = await this.$axios.request({
        url: '/thirdAdvance/list',
        method: 'GET',
        params: query
      })

      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      // console.log('res.data', Object.assign([], res.data))
      // console.log('res.data', res.data.bigpay)
      // this.dataSource.push(res.data.bigpay)
      // console.log('res.data', Object.values(res.data))
      // this.dataSource = Object.assign([], res.data)
      this.dataSource = Object.values(res.data)
    },
    // 重置
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    // 启用/停用数据
    async handleStatus(row) {
      this.loading.page = true

      const req = {
        status: row.status === 'disabled' ? 1 : 0
      }
      const res = await this.$axios.request({
        url: `/cash/3th/${row.id}`,
        method: 'PATCH',
        data: req
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
    async handleEdit(row, type) {
      this.popType = type ? type : ''
      this.editInfo = Object.assign({}, row)
      this.visible.edit = true
      // this.loading.edit = true
      // const res = await this.$axios.request({
      //   url: `/cash/3th/${row.id}`,
      //   method: 'GET'
      // })
      // // this.visible.edit = false
      // this.loading.edit = false

      // if (res.status !== 200) {
      //   this.$msg({
      //     type: 'error',
      //     message: res.message
      //   })
      //   this.editInfo = Object.assign({}, initEdit)
      // } else {
      //   res.data.max_money = MathDiv(res.data.max_money, 100)
      //   res.data.min_money = MathDiv(res.data.min_money, 100)
      //   res.data.money_day_stop = MathDiv(res.data.money_day_stop, 100)
      //   res.data.money_stop = MathDiv(res.data.money_stop, 100)
      //   this.editInfo = Object.assign({}, res.data)
      // }
    },
    handleCloseModal() {
      this.visible.edit = false
      this.editInfo = Object.assign({}, initEdit)
    },
    // 保存修改
    async handleSave() {
      this.loading.btn.modal = true
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.btn.modal = false
        } else {
          const req = {
            ...this.editInfo
          }
          const id = req.id ? req.id : ''
          delete req.balance
          delete req.id
          delete req.code
          delete req.partner_id
          const res = await this.$axios.request({
            url: `/thirdAdvance/list/${id}`,
            method: 'PUT',
            data: req
          })
          this.loading.btn.modal = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible.edit = false
          this.init()
          this.getData()
        }
      })
    },
    // 存款状态
    handleGo(row) {
      this.$router.push(`/cash/thirdDetail/${row.id}/${row.channel}`)
    }
  }
}
</script>
<style lang="less" scoped>
.footer {
  position: relative;
  & > span {
    position: absolute;
    left: 15px;
    color: red;
  }
}
</style>
