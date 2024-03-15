<template>
  <div id="ReceivableBank">
    <Spin v-if="loading.page" fix size="large"></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.receivableBank10}}</span>
          <Select v-model="query.type" style="width:100px">
            <Option value>{{i18n_lang.receivableBank11}}</Option>
            <Option v-for="(it, i) in payTypeList" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.receivableBank12}}</span>
          <Select v-model="query.bank_id" style="width:100px">
            <Option value>{{i18n_lang.receivableBank11}}</Option>
            <Option v-for="(it, i) in bankList" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.receivableBank13}}</span>
          <Select v-model="query.state" style="width:100px">
            <Option value>{{i18n_lang.receivableBank11}}</Option>
            <Option value="enabled">{{i18n_lang.receivableBank14}}</Option>
            <Option value="default">{{i18n_lang.receivableBank15}}</Option>
          </Select>
        </div>
        <div class="item">
          <span>{{i18n_lang.receivableBank16}}</span>
          <Input v-model="query.name" placeholder style="width: 100px"/>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" @click="getData()">{{i18n_lang.receivableBank17}}</Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.receivableBank18}}</Button>
        <Button type="primary" icon="md-add" @click="handleOpenModal('')">{{i18n_lang.receivableBank19}}</Button>
      </div>
    </Card>

    <MyTable filter border :columns="columns" :data="dataSource"></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.receivableBank99}${page.total}${i18n_lang.receivableBank100}` }}</div>
    <MyPage
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @onChange="getData"
      @changePageSize="changePageSize"
    ></MyPage>

    <!-- 编辑 -->
    <Modal
      v-model="visible.edit"
      :width="800"
      :title="`${editType === 'add' ? i18n_lang.receivableBank20 : i18n_lang.receivableBank21}${i18n_lang.receivableBank22}`"
      :styles="{ top: '20px' }"
    >
      <Spin v-if="loading.edit" fix></Spin>
      <Form
        v-if="visible.edit"
        ref="editForm"
        :model="editInfo"
        :label-width="120"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.receivableBank23" prop="type">
          <Select v-model="editInfo.type" :placeholder="i18n_lang.receivableBank24">
            <Option v-for="(it, i) in payTypeList" :key="i" :value="Number(it.id)">{{ it.name }}</Option>
          </Select>
        </FormItem>
        <template v-if="editInfo.type === 1">
          <FormItem :label="i18n_lang.receivableBank25" prop="bank_id">
            <Select v-model="editInfo.bank_id" :placeholder="i18n_lang.receivableBank24">
              <Option v-for="(it, i) in bankList" :key="i" :value="it.id">{{ it.name }}</Option>
            </Select>
          </FormItem>
          <FormItem :label="i18n_lang.receivableBank26" prop="address">
            <Input v-model="editInfo.address"/>
          </FormItem>
        </template>
        <template><!-- v-if="editInfo.type != 1" -->
          <FormItem :label="i18n_lang.receivableBank27" prop="address">
            <span>{{i18n_lang.receivableBank28}}</span>
            <UploadImg ref="uploadImg" v-model="editInfo.qrcode"></UploadImg>
          </FormItem>
        </template>
        <FormItem :label="i18n_lang.receivableBank29" prop="name">
          <Input v-model="editInfo.name"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank30" prop="card">
          <Input v-model="editInfo.card"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank31" prop="limit_once_min">
          <Input v-model="editInfo.limit_once_min"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank32" prop="limit_once_max">
          <Input v-model="editInfo.limit_once_max"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank33" prop="limit_day_max">
          <Input v-model="editInfo.limit_day_max"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank34" prop="limit_max">
          <Input v-model="editInfo.limit_max"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank35" prop="comment">
          <Input v-model="editInfo.comment"/>
        </FormItem>
        <FormItem :label="`可用等级配置`" prop="level">
          <Select v-model="editInfo.level" multiple @on-change="getUserLevel($event)" :placeholder="` `" style="width:648px;">
            <!-- <Option :key="''" :value="''">全部</Option> -->
            <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank36" prop="sort">
          <Input v-model="editInfo.sort"/>
        </FormItem>
        <FormItem :label="i18n_lang.receivableBank37" prop="state">
          <Select v-model="editInfo.state" :placeholder="i18n_lang.receivableBank24">
            <Option value="enabled">{{i18n_lang.receivableBank14}}</Option>
            <Option value="default">{{i18n_lang.receivableBank15}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <span>{{i18n_lang.receivableBank38}}</span>
        <Button style="margin-left: 5px;" type="primary" @click="handleConfirm">{{i18n_lang.receivableBank39}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns/receivable.js'
import MyTable from '_c/MyTable'
import MyPage from '_c/MyPage'
import UploadImg from '_c/UploadImg'
import { MathDiv, MathMul } from '@/libs/formatMath'

const initQuery = {
  type: '', // 收款类型
  bank_id: '', // 收款银行
  status: '', // 状态
  name: '' // 收款户名
}

const initEdit = {
  type: '', // 收款类型
  bank_id: '', // 收款银行
  address: '', // 开户行
  name: '', // 户名
  card: '', // 账号
  limit_once_max: '', // 单笔最高
  limit_once_min: '', // 单笔最低
  limit_day_max: '', // 日停用金额
  limit_max: '', // 总停用金额
  sort: '', // 排序
  state: '', // 状态 enabled停用default启用
  comment: '', // 存款说明
  qrcode: '' ,// 二维码
  level: [] //等级
}

export default {
  components: {
    MyTable,
    UploadImg,
    MyPage
  },
  data() {
    const i18n_lang = this.$t('receivableBank');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: 0,
        edit: false
      },
      visible: {
        edit: false
      },
      payTypeList: [], // 收款类型
      bankList: [], // 银行列表
      query: { ...initQuery },
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      },
      editType: 'add',
      editInfo: {},
      ruleValidate: {
        type: [{ required: true, message: i18n_lang.receivableBank40 }],
        bank_id: [{ required: true, message: i18n_lang.receivableBank41 }],
        address: [{ required: true, message: i18n_lang.receivableBank42 }],
        name: [{ required: true, message: i18n_lang.receivableBank43 }],
        card: [{ required: true, message: i18n_lang.receivableBank44 }],
        limit_once_min: [{ required: true, message: i18n_lang.receivableBank45 }],
        limit_once_max: [{ required: true, message: i18n_lang.receivableBank46 }],
        limit_day_max: [{ required: true, message: i18n_lang.receivableBank47 }],
        limit_max: [{ required: true, message: i18n_lang.receivableBank48 }],
        sort: [{ required: true, message: i18n_lang.receivableBank49 }],
        state: [{ required: true, message: i18n_lang.receivableBank50 }],
        comment: [
          {
            validator: (rule, value, callback) => {
              if (value === '' || value === null) {
                callback()
              } else {
                if (value.length > 20) {
                  callback(new Error(i18n_lang.receivableBank51))
                } else {
                  callback()
                }
              }
            }
          }
        ],
        qrcode: [{ required: true, message: i18n_lang.receivableBank52 }]
      },
      levelList: []
    }
  },
  created() {
    this.init()
    this.levelListFn()
  },
  methods: {
    init() {
      this.getPayTypeList()
      this.getBankList()
    },
    // 获取收款类型
    async getPayTypeList() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/cash/deposit/paytype?type=1',
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
      this.payTypeList = res.data
    },
    // 获取收款银行列表
    async getBankList() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/bank/list',
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
      this.bankList = res.data
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      this.dataSource = []

      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      const res = await this.$axios.request({
        url: '/cash/account',
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
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    reset() {
      this.query = Object.assign({}, initQuery)
      this.getData()
    },
    handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      this.editInfo = Object.assign({}, row || initEdit)
      if(!row){
        this.editInfo.level= []
        this.levelList.forEach((item, index) => {
          this.editInfo.level.push(item.level)
        })
      }
      this.editInfo.limit_once_min = MathDiv(this.editInfo.limit_once_min, 1)
      this.editInfo.limit_once_max = MathDiv(this.editInfo.limit_once_max, 1)
      this.editInfo.limit_day_max = MathDiv(this.editInfo.limit_day_max, 1)
      this.editInfo.limit_max = MathDiv(this.editInfo.limit_max, 1)
      this.visible.edit = true
    },
    getUserLevel(event){
      // console.log(`event`, event)
      // event.forEach((item, index) => {
      //   if(item == ''){
      //     this.user_level = []
      //     this.levelList.forEach((items, indexs) => {
      //       this.user_level.push(items.level)
      //     })
      //   }
      // })
    },
    async levelListFn() {
      const res = await this.$axios.request({
        url: '/memberslevel/levelList',
        method: 'GET',
        params: {}
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      };
      this.levelList = res.data
    },
    // 确认按钮
    async handleConfirm() {
      // if (this.$refs.uploadImg) {
      //   await this.$refs.uploadImg.upload()
      // }
      this.$nextTick(() => {
        this.save()
      })
    },
    async save() {
      this.loading.edit = true
      const req = {
        type: this.editInfo.type, // 收款类型
        bank_id: this.editInfo.bank_id, // 收款银行
        address: this.editInfo.address, // 开户行
        name: this.editInfo.name, // 户名
        card: this.editInfo.card, // 账号
        // limit_once_min: MathMul(this.editInfo.limit_once_min, 100), // 日停用金额
        // limit_once_max: MathMul(this.editInfo.limit_once_max, 100), // 日停用金额
        // limit_day_max: MathMul(this.editInfo.limit_day_max, 100), // 日停用金额
        // limit_max: MathMul(this.editInfo.limit_max, 100), // 总停用金额
        sort: this.editInfo.sort, // 排序
        state: this.editInfo.state, // 状态 enabled停用default启用
        comment: this.editInfo.comment, // 存款说明
        qrcode: this.editInfo.qrcode ,// 二维码
        level: this.editInfo.level, //可用等级配置
      }
      let url
      if (this.editType === 'add') {
        url = `/cash/account`
      } else {
        url = `/cash/account/${this.editInfo.id}`
      }
      const res = await this.$axios.request({
        url,
        method: this.editType === 'add' ? 'POST' : 'PUT',
        data: req
      })
      this.loading.edit = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return

      this.visible.edit = false
      this.getData()
    },
    // 启用/停用
    async handleState(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/cash/account/${row.id}`,
        method: 'PATCH',
        data: {
          status: row.state === 'enabled' ? 0 : 1
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
    // 删除
    async handleDelete(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/cash/account/${row.id}`,
        method: 'DELETE'
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
#ReceivableBank {
  /deep/.ivu-table-cell {
    .img {
      width: 100%;
    }
  }
  .footer {
    position: relative;
    & > span {
      position: absolute;
      left: 15px;
      color: red;
    }
  }
}
</style>
