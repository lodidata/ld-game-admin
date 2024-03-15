<template>
  <div id="MemberManage">
    <Spin fix v-if="loading.page"></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con mb30">
        <div class="item">
          <span>厂商名称</span>
          <Input v-model="query.menu_name" style="width:120px;" />
        </div>
        <div class="item">
          <span>厂商标识</span>
          <Input v-model="query.menu_type" style="width:120px;" />
        </div>
        <div class="item">
          <span>货币</span>
          <Select v-model="query.currency_id" style="width:120px">
            <!-- <Option v-for="item in currencyList" :value="item" :key="item">{{ item }}</Option> -->
            <Option v-for="item in currencyList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="item">
          <span>上架时间：</span>
          <DatePicker v-model="timeDate" @on-change="SelectTime" type="daterange" :options="optionsTime" :editable="false"
            format="yyyy-MM-dd" placement="left-start" placeholder="选择日期" style="width: 220px" clearable></DatePicker>
        </div>
        <div class="item">
          <span>状态</span>
          <Select v-model="query.status" style="width:100px">
            <Option value>全部</Option>
            <Option :value="item.id" v-for="(item, i) in stateList" :key="i">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="query_btns">
          <Button type="primary" @click="getData()">查询</Button>
          <Button type="primary" @click="reset">重置</Button>
        </div>
      </div>

    </Card>
    <div style="marginTop:30px">
      <Table :columns="columns" :data="dataSource" border></Table>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
        `数据总计：${page.total}条` }}</div>
      <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer
        @on-change="getData" @on-page-size-change="changePageSize" placement="top"></Page>
    </div>
    <!-- 编辑 -->

    <Modal :title="`编辑`" v-model="visible.addModel" :width="600" :mask-closable="false"
      @on-cancel="visible.addModel = false">
      <Form v-if="visible.addModel" :model="addForm" ref="addForm" :rules="ruleValidateAdd">
        <FormItem label="维护开始时间" prop="start_uworked_at" v-if="editType === 'add' || editType === 'edit'">
          <DatePicker v-model="addForm.start_uworked_at" :options="optionsTime1" type="datetime" :editable="false"
            format="yyyy-MM-dd HH:mm" placement="left-start" placeholder="选择日期" style="width: 220px" clearable>
          </DatePicker>
        </FormItem>

        <FormItem label="维护结束时间" prop="end_uworked_at" v-if="editType === 'add' || editType === 'edit'">
          <DatePicker v-model="addForm.end_uworked_at" type="datetime" :options="optionsTime1" :editable="false"
            format="yyyy-MM-dd HH:mm" placement="left-start" placeholder="选择日期" style="width: 220px" clearable>
          </DatePicker>
        </FormItem>

        <FormItem label="工作状态" :label-width="90" prop="work_status" v-if="editType === 'add' || editType === 'edit'">
          <RadioGroup v-model="addForm.work_status">
            <Radio :label="0">维护</Radio>
            <Radio :label="1">工作</Radio>
          </RadioGroup>
        </FormItem>
      </Form>

      <div slot="footer">
        <Button type="primary" :loading="loading.addBtn" @click="saveDate">确认</Button>
      </div>
    </Modal>



    <!--  编辑货币 -->
    <Modal
      title="编辑货币"
      v-model="visible.currencyModel"
      :width="600"
      :mask-closable="false"
      @on-cancel="visible.currencyModel = false"
    >
      <Form v-if="visible.currencyModel" :model="currencyForm" ref="addForm">
        <FormItem label="厂商" prop="menu_name">
          <Input v-model="currencyForm.menu_name" style="width:300px;" :disabled="true" />
        </FormItem>
        <FormItem label="货币" prop="currency" :disable="true">
          <Select v-model="currencyForm.currency" multiple style="width:300px">
            <!-- <Option v-for="item in currencyList" :value="item" :key="item">{{ item }}</Option> -->
            <Option v-for="item in currencyList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px;">
        <span>本次操作增加的货币：</span>
        <Tag color="default" v-for="item in addCurrency" :key="item">{{ item }}</Tag>
      </div>
      <div>
        <span>本次操作减少的货币：</span>
        <Tag color="default" v-for="item in reduceCurrency" :key="item">{{ item }}</Tag>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="loading.currencyBtn" @click="saveCurrency">确认</Button>
      </div>
    </Modal>


  </div>
</template>
  
<script>
import columns from './columns.js'
import { formatDateTimeToString as dateFormat } from '@/libs/date'

import MoreOptionCheck from '../../components/MoreOptionCheck'
let initData = {
  menu_name: '',
  menu_type: '',
  status: '',
  start_created_at: '',
  end_created_at: ''
}
export default {
  components: {
    MoreOptionCheck
  },
  data() {
    return {
      timeDate: ['', ''],
      id: '',
      optionData: ['THB', 'SD', 'DD'],
      loading: {
        page: 0,
        addBtn: false,
        currencyBtn: false
      },
      visible: {
        addModel: false,
        currencyModel: false,
      },
      columns: columns(this),
      dataSource: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      query: {
        menu_name: '',
        menu_type: '',
        currency_id: '',
        status: '',
        start_created_at: '',
        end_created_at: ''
      },
      editId: null,
      optionsTime1: {
        disabledDate(date) {
          return date < (Date.now() - 86400000)
        }
      },
      optionsTime: {
        disabledDate(date) {
          const time = Date.now() - 86400000 * 365
          const data = date && date.valueOf()
          //return data < time || data > Date.now()
          return data > Date.now()
        }
      },
      roleList: [],
      stateList: [{ id: 1, name: '已上架' }, { id: 0, name: '已下架' }], // 状态数据
      addForm: {
        start_uworked_at: '',
        end_uworked_at: '',
        work_status: 1, // 0维护 1工作
      },
      editType: 'add', // 修改类型

      ruleValidateAdd: {
        // start_uworked_at: [{ required: true, message: '请选择日期' }],
        // end_uworked_at: [
        //   { required: true, message: '请选择日期' },
        //   {
        //     validator: (rule, value, cb) => {


        //       this.addForm.start_uworked_at < this.addForm.end_uworked_at ? cb() : cb(`开始日期不能大于结束日期`)

        //     }
        // }],
      },
      currencyList: [],
      currencyForm: {
        id: '',
        menu_name: '',
        currency: []
      },
      currency_current: [],
      currency_obj: {}
    }
  },
  computed: {
    addCurrency() {
      let arr = []
      this.currencyForm.currency.forEach(item => {
        if (!this.currency_current.includes(item)) {
          arr.push(this.currency_obj[item])
        }
      })
      return arr
    },
    reduceCurrency() {
      let arr = []
      this.currency_current.forEach(item => {
        if (!this.currencyForm.currency.includes(item)) {
          arr.push(this.currency_obj[item])
        }
      })
      return arr
    }
  },
  created() {
    if (this.$route.query && this.$route.query.currency_id) {
      this.query.currency_id = Number(this.$route.query.currency_id)
    }

    this.getData()
    this.getCurrencyList()
    // if (!this.roleList.length) {
    //   this.loading.addBtn = true
    //   this.getRole()
    //   this.loading.addBtn = false
    // }
  },
  methods: {
    // 选择时间
    SelectTime(val) {
      ;[this.query.start_created_at, this.query.end_created_at] = val
    },
    onGameManage(row) {
      this.$router.push({
        name: 'gameAllList',
        query: {
          menu_type: row.menu_type
        }
      })
    },
    handleChangeCheck() { },
    // 添加用户弹框
    async addMember(type) {
      this.editType = type
      this.visible.addModel = true
      //this.addForm = Object.assign({}, initData)
    },
    saveDate() {
      this.$refs['addForm'].validate(async valid => {
        if (valid) {
          this.loading.addBtn = true
          const res = await this.$axios.request({
            url: `/game/menu/${this.editId}`,
            method: 'PUT',
            data: {
              start_uworked_at: dateFormat(this.addForm.start_uworked_at),
              end_uworked_at: dateFormat(this.addForm.end_uworked_at),
              work_status: this.addForm.work_status
            }
          })

          if (res.state !== 0) {
            this.$Message.error(res.message)
            this.loading.addBtn = false
            return
          }
          this.loading.addBtn = false
          this.visible.addModel = false
          this.$Message.success('维护设置成功')
          this.addForm = {
            start_uworked_at: '',
            end_uworked_at: '',
          },
            this.getData()
        }
      })
    },
    // 保存用户信息
    async save() {
      this.loading.addBtn = true
      this.$refs['addForm'].validate(async valid => {
        this.loading.addBtn = false
        if (valid) {
          if (this.editType === 'add') {
            this.add()
          } else if (this.editType === 'edit') {
            this.editData()
          } else {
            this.update()
          }
        }
      })
    },



    // 编辑接口
    async editData() {
      const role = this.addForm.role
      const res = await this.Fetch(`/admin/user/${this.addForm.id}`, {
        method: 'PUT',
        body: {
          name: this.addForm.name,
          truename: this.addForm.truename,
          role: role.join(',')
        }
      })
      if (res.state !== 0) {
        this.$Message.success(res.message)
        return
      }
      this.visible.addModel = false
      this.$Message.success('编辑成功')
      this.getData()
    },


    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page++
      let query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      let res = await this.$axios.request({
        url: '/game/menu',
        method: 'get',
        params: query
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.dataSource = res.data
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
      }
      this.loading.page--
    },

    // 启用停用
    async handleSwitch(row) {
      this.visible.addModel = true
      this.editId = row.id

      this.addForm.start_uworked_at = row.start_uworked_at
      this.addForm.end_uworked_at = row.end_uworked_at
      this.addForm.work_status = row.work_status

      // let status = row.status === 1 ? 0 : 1
      // let res = await this.Fetch(`/admin/user/status/${row.id}`, {
      //   method: 'PUT',
      //   body: {
      //     status: status
      //   }
      // })
      // if (res.status !== 200) {
      //   this.$Message.error(res.message)
      // } else {
      //   this.$Message.success(res.message)
      //   this.getData()
      // }
    },
    async handleStop(row) {
      let res = await this.$axios.request({
        url: `/game/menu/${row.id}`,
        method: 'patch',
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.getData(this.page.currentPage)
      }
    },

    // 获取货币类型
    async getCurrencyList() {
      let res = await this.$axios.request({
        url: '/common/select/currency',
        method: 'get',
      })
      if (res.state === 0) {
        this.currency_obj = res.data
        this.currencyList = Object.entries(res.data).map(item => ({id: Number(item[0]), value: item[1]}))
      }
    },


    // 编辑货币
    onEditCurrency(row) {
      const {id, currency, menu_name, currency_ids} = row
      this.currencyForm.id = id
      // this.currencyForm.currency = currency.split(',')
      // this.currency_current = currency.split(',')
      this.currencyForm.currency = currency_ids
      this.currency_current = currency_ids
      this.currencyForm.menu_name = menu_name
      this.visible.currencyModel = true
    },
    async saveCurrency() {
      this.loading.currencyBtn = true
      let res = await this.$axios.request({
        url: `/game/menu/currency/${this.currencyForm.id}`,
        method: 'PUT',
        data: {
          currency_id_str: (this.currencyForm.currency).join(',')
        }
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
        this.loading.currencyBtn = false
      } else {
        this.$Message.success(res.message)
        this.visible.currencyModel = false
        this.getData(this.page.currentPage)
        this.loading.currencyBtn = false
      }
    },

    // ip加白
    openIp(row) {
      this.$router.push({
        path: `gameManages/ip`,
        query: {
          menu_type: row.menu_type
        }
      })
    },

    reset() {
      this.query = {
        menu_name: '',
        menu_type: '',
        status: '',
        start_created_at: '',
        end_created_at: ''
      }
      this.timeDate = ['', '']
      this.page = {
        pageSize: 10,
        total: 0,
        currentPage: 1
      }
      this.getData()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 翻页
    // changePage(val) {
    //   this.page.currentPage = val
    //   this.getData()
    // }
  }
}
</script>
  
<style></style>
  