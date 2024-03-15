<template>
  <div id="SelfOpenManage">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box mb30">
      <div>
        <span>{{i18n_lang.selfOpenManage0}}</span>
        <RadioGroup
          v-if="lotteryList.length"
          v-model="query.lottery_id"
          type="button"
          size="large"
          @on-change="lotteryTypeChange"
        >
          <Radio v-for="(it, i) in lotteryList" :key="i" :label="it.lottery_id">
            <span>{{ it.lottery_name }}</span>
          </Radio>
        </RadioGroup>
      </div>
    </Card>
    <Button type="primary" class="mb30" icon="md-add" @click="setOpenPrize">{{i18n_lang.selfOpenManage1}}</Button>
    <Table :columns="columns" :data="dataSource" border></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.selfOpenManage71}${page.total}${i18n_lang.selfOpenManage72}` }}</div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      placement="top"
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>

    <!-- 手动开奖 -->
    <Modal v-model="visible" :title="i18n_lang.selfOpenManage2" :transfer="false">
      <Spin v-if="loading.modal" fix></Spin>
      <Form
        v-if="visible"
        ref="editForm"
        :model="editInfo"
        :label-width="110"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.selfOpenManage3">{{ currentInfo.lottery_name }}</FormItem>
        <FormItem :label="i18n_lang.selfOpenManage4">{{ editInfo.lottery_number }}</FormItem>
        <FormItem :label="i18n_lang.selfOpenManage5" prop="codes">
          <Row>
            <span v-for="(it,i) in currentInfo.count" :key="i" class="codes">
              <Input v-model="editInfo.codes[i]" :maxlength="getMaxDigit(currentInfo.pid)"/>
            </span>
            <Button type="primary" size="small" @click="search('editForm')">{{i18n_lang.selfOpenManage6}}</Button>
          </Row>
        </FormItem>
        <FormItem v-if="isSearchRes" :label="i18n_lang.selfOpenManage7">
          <p>{{i18n_lang.selfOpenManage8}}≈{{ searchRes.totalTou/100 }}</p>
          <p>{{i18n_lang.selfOpenManage9}}≈{{ searchRes.totalWin/100 }}</p>
          <p>{{i18n_lang.selfOpenManage10}}≈{{ searchRes.prizeProfit }}%</p>
          <p>{{i18n_lang.selfOpenManage11}}≈{{ searchRes.totalWinUsers }}</p>
          <p>{{i18n_lang.selfOpenManage12}}≈{{ searchRes.totalWinMin/100 }}</p>
          <p>{{i18n_lang.selfOpenManage13}}≈{{ searchRes.totalWinMax/100 }}</p>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="visible = false">{{i18n_lang.selfOpenManage14}}</Button>
        <Button type="primary" :loading="loading.modalButton" @click="saveCode('editForm')">{{i18n_lang.selfOpenManage15}}</Button>
      </div>
    </Modal>

    <!-- 设置开奖 -->
    <Modal v-model="openPrizeModal" :title="i18n_lang.selfOpenManage16" :transfer="false">
      <Form
        v-if="setInfo && openPrizeModal"
        ref="setInfo"
        :model="setInfo"
        :label-width="110"
        :rules="ruleValidate2"
      >
        <FormItem :label="i18n_lang.selfOpenManage41">
          <Row>
            <Col span="18">
              <Button :type="type === 1?'primary':'default'" @click="changeModule(1)">{{i18n_lang.selfOpenManage17}}</Button>
              <Button :type="type === 2?'primary':'default'" @click="changeModule(2)">{{i18n_lang.selfOpenManage18}}</Button>
              <Button :type="type === 3?'primary':'default'" @click="changeModule(3)">{{i18n_lang.selfOpenManage19}}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-if="type === 1" :label="i18n_lang.selfOpenManage20">
          <Row>
            <Col span="10">
              <FormItem prop="min_profit">
                <Input v-model="setInfo.min_profit" style="width:150px;"/>
              </FormItem>
            </Col>
            <Col span="2">—</Col>
            <Col span="11">
              <FormItem prop="max_profit">
                <Input v-model="setInfo.max_profit" style="width:150px;"/>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-if="type === 1" :label="i18n_lang.selfOpenManage21">
          <Row>
            <Col span="18">
              <FormItem prop="interval_profit">
                <Input v-model="setInfo.interval_profit"/>
              </FormItem>
            </Col>
            <Col span="6">
              <Tooltip max-width="100px">
&nbsp;&nbsp;
                <Icon type="ios-help" color="#999" size="18"/>
                <div slot="content" class="mark">{{i18n_lang.selfOpenManage22}}</div>
              </Tooltip>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-if="type === 2" :label="i18n_lang.selfOpenManage23">
          <Row>
            <Col span="24">
              <FormItem prop="jackpot">
                <Input v-model="setInfo.jackpot" style="width:150px;"/>{{i18n_lang.selfOpenManage24}}
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-if="type === 3">
          <Row>
            <Col span="24">
              <FormItem prop="isChecked">
                <Checkbox v-model="isChecked">{{i18n_lang.selfOpenManage25}}</Checkbox>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem v-else :label="i18n_lang.selfOpenManage26">
          <span v-if="type === 1">{{i18n_lang.selfOpenManage27}}</span>
          <span v-if="type === 2">
            {{i18n_lang.selfOpenManage28}}
            <br>{{i18n_lang.selfOpenManage29}}
            <br>{{i18n_lang.selfOpenManage30}}
            <br>{{i18n_lang.selfOpenManage31}}
            <span class="red">{{i18n_lang.selfOpenManage32}}</span>
          </span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleReset('setInfo')">{{i18n_lang.selfOpenManage33}}</Button>
        <Button type="primary" :loading="loading.openModalBtn" @click="saveOpenPrize('setInfo')">{{i18n_lang.selfOpenManage34}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'
import { MathDiv, MathMul } from '@/libs/formatMath'

export default {
  data() {
    const i18n_lang = this.$t('selfOpenManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false,
        modalButton: false,
        openModalBtn: false
      },
      query: {
        lottery_id: 0
      },
      type: 1,
      isChecked: false,
      openModalBtn: {},
      visible: false,
      openPrizeModal: false,
      currentInfo: {},
      dataSource: [],
      columns: columns(this),
      editInfo: {},
      setInfo: {},
      lotteryList: [],
      searchRes: {},
      isSearchRes: false,
      ruleValidate: {
        codes: [
          {
            trigger: 'change',
            validator: (rule, value, cb) => {
              if (this.editInfo.codes.length !== this.currentInfo.count) {
                cb(i18n_lang.selfOpenManage35)
              } else if (this.editInfo.codes.filter(x => !x).length) {
                cb(i18n_lang.selfOpenManage35)
              } else {
                cb()
              }
            }
          }
        ]
      },
      ruleValidate2: {
        min_profit: [
          {
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(i18n_lang.selfOpenManage36))
              } else {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  if (value < 0) {
                    callback(new Error(i18n_lang.selfOpenManage37))
                  }
                  callback()
                } else {
                  callback(new Error(i18n_lang.selfOpenManage37))
                }
              }
            }
          }
        ],
        max_profit: [
          {
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(i18n_lang.selfOpenManage36))
              } else {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  if (value < 0) {
                    callback(new Error(i18n_lang.selfOpenManage37))
                  }
                  callback()
                } else {
                  callback(new Error(i18n_lang.selfOpenManage37))
                }
              }
            }
          }
        ],
        interval_profit: [
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error(i18n_lang.selfOpenManage36))
              } else {
                if (Number(value) > 100.0 || Number(value) < 0) {
                  callback(new Error(i18n_lang.selfOpenManage38))
                }
                if (/^(\d+|\d+\.\d{1,2})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.selfOpenManage39))
                }
              }
            }
          }
        ],
        jackpot: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              Number(value) ? callback() : callback(new Error(i18n_lang.selfOpenManage36))
              if (value === '') {
                callback(new Error(i18n_lang.selfOpenManage36))
              } else {
                if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
                  callback()
                } else {
                  callback(new Error(i18n_lang.selfOpenManage36))
                }
              }
            }
          }
        ],
        isChecked: [
          {
            validator: (rule, value, callback) => {
              if (this.isChecked === false) {
                callback(new Error(i18n_lang.selfOpenManage40))
              } else {
                callback()
              }
            }
          }
        ],
        control_time: []
      },
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 设置开奖
    setOpenPrize() {
      this.type = 1
      this.isChecked = false
      this.openPrizeModal = true
    },
    changeModule(val) {
      this.type = val
    },
    // 保存开奖设置
    async saveOpenPrize(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let req
          if (this.type === 1) {
            req = {
              type: this.type,
              max_profit: MathDiv(this.setInfo.max_profit, 1),
              min_profit: MathDiv(this.setInfo.min_profit, 1),
              interval_profit: this.setInfo.interval_profit,
              lottery_id: this.currentInfo.lottery_id
            }
          } else if (this.type === 2) {
            req = {
              type: this.type,
              // jackpot: MathMul(this.setInfo.jackpot, 100),
              lottery_id: this.currentInfo.lottery_id
            }
          } else {
            req = {
              type: this.type,
              lottery_id: this.currentInfo.lottery_id
            }
          }
          const res = await this.$axios.request({
            url: '/lottery/selfaward/ways',
            method: 'PUT',
            data: req
          })
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.getOpenPrize()
          this.handleReset('setInfo')
          this.openPrizeModal = false
          this.getData()
        }
      })
    },
    handleReset(name) {
      this.openPrizeModal = false
      this.$refs[name].resetFields()
    },
    // 获取开奖方式及概率
    async getOpenPrize() {
      const res = await this.$axios.request({
        url: `/lottery/selfaward/ways?lottery_id=${this.currentInfo.lottery_id}`,
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.setInfo = res.data ? res.data[0] : ''
      if (this.setInfo) {
        // this.setInfo.max_profit = MathMul(this.setInfo.max_profit, 100)
        // this.setInfo.min_profit = MathMul(this.setInfo.min_profit, 100)
      }
    },
    // pid 39赛车和24十一选5位数特殊
    getMaxDigit(pid) {
      switch (pid) {
        case 39:
          return 2
        case 24:
          return 2
        default:
          return 1
      }
    },
    async init() {
      await this.getLotteryList()
      await this.getData()
      this.getOpenPrize()
    },
    // 切换彩种
    lotteryTypeChange() {
      this.currentInfo = this.lotteryList.filter(x => x.lottery_id === this.query.lottery_id)[0]
      this.page.currentPage = 1
      this.getData()
      this.getOpenPrize()
    },
    // 获取彩种列表
    async getLotteryList() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/selfaward/opentype',
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
      this.lotteryList = res.data
      this.currentInfo = { ...this.lotteryList[0] }
      this.query.lottery_id = this.currentInfo.lottery_id
    },
    // 分页切换
    changePageSize(i) {
      this.page.pageSize = i
      this.getData()
    },
    // 当前彩种期号数据
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        lottery_id: this.currentInfo.lottery_id,
        type: this.currentInfo.type,
        page: this.page.currentPage,
        page_size: this.page.pageSize
      }
      const res = await this.$axios.request({
        url: '/lottery/selfaward',
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
      this.dataSource = res.data ? res.data : []
    },
    // 打开弹框
    handleOpenResult(row) {
      this.editInfo = { ...row }
      this.editInfo.codes = []
      this.visible = true
      this.isSearchRes = false
    },
    // 检索
    async search(name) {
      this.$refs[name].validate(async valid => {
        if (!valid) return
        this.loading.modal = true
        this.isSearchRes = false
        const req = {
          lottery_id: this.currentInfo.lottery_id,
          number_id: this.editInfo.lottery_number,
          codes: JSON.stringify(this.editInfo.codes)
        }
        console.log(this.editInfo.codes)
        const res = await this.$axios.request({
          url: '/lottery/selfaward/award',
          method: 'GET',
          params: req
        })
        this.loading.modal = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.searchRes = res.data
        this.isSearchRes = true
      })
    },
    // 保存开奖号码
    async saveCode(name) {
      this.$refs[name].validate(async valid => {
        if (!valid) return
        const obj = {
          codes: this.editInfo.codes.join(','),
          end: '',
          lottery_id: this.currentInfo.lottery_id,
          model: '',
          number_id: this.editInfo.lottery_number,
          start: '',
          type: this.currentInfo.type
        }
        this.loading.modalButton = true
        const res = await this.$axios.request({
          url: '/lottery/selfaward/award',
          method: 'PUT',
          data: obj
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getData()
        this.visible = false
      })
    },
    // 取消手动开奖
    async handleCancel(row) {
      this.loading.page = true
      const req = {
        lottery_id: this.currentInfo.lottery_id,
        lottery_number: row.lottery_number,
        type: this.currentInfo.type
      }
      const res = await this.$axios.request({
        url: '/lottery/selfaward/cancel',
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
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
