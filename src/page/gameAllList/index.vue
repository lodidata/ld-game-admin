<template>
  <div id="MemberManage">
    <Spin fix v-if="loading.page"></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con mb30">
        <div class="item">
          <span>游戏厂商</span>
          <Input v-model="query.menu_type" style="width:120px;" />

        </div>
        <div class="item">
          <span>游戏名称</span>
          <Input v-model="query.game_name" style="width:120px;" />
        </div>
        <!-- <div class="item">
          <span>游戏类型</span>
          <Input v-model="query.game_type" style="width:120px;" />
        </div> -->
        <div class="item">
          <span>游戏类型</span>
          <Select v-model="query.game_type" style="width:100px">
            <Option value>全部</Option>
            <Option :value="item" v-for="(item, i) in gameList" :key="i">{{ item }}</Option>
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
        <div class="query_btns" >
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
  </div>
</template>
  
<script>
import columns from './columns.js'
import MoreOptionCheck from '../../components/MoreOptionCheck'
let initData = {
  menu_type: '',
  game_type: '',
  game_name: '',
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
      timeDate: [],
      gameList: [],
      id: '',
      optionData: ['THB', 'SD', 'DD'],
      loading: {
        page: 0,
        addBtn: false
      },
      visible: {
        addModel: false
      },
      columns: columns(this),
      dataSource: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      query: {
        menu_type: '',
        game_type: '',
        game_name: '',
        status: '',
        start_created_at: '',
        end_created_at: ''
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
        checked: []
      },
      editType: 'add', // 修改类型
      ruleValidateAdd: {
        name: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
        truename: [
          {
            required: true,
            message: '请输入6-16位数字、字母、汉字',
            min: 6,
            max: 16
          }
        ],
        password: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
        password_confirm: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
        role: [{ required: true, message: '请选择角色' }]
      }
    }
  },
  created() {
    let { menu_type, game_type } = this.$route.query
    if (menu_type) {
      this.query.menu_type = menu_type
    }
    if (game_type) {
      this.query.game_type = game_type
    }
    this.getGameList()
    this.getData()
    
  },
  methods: {
    async handleStop(row){
      let res = await  this.$axios.request({
        url: `/game/3th/${row.id}`,
        method: 'patch',
       
      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.getData()
      }
    },
    // 选择时间
    SelectTime(val) {
      ;[this.query.start_created_at, this.query.end_created_at] = val
    },
    // 获取游戏类型
    async getGameList() {
      let res = await  this.$axios.request({
        url:'/common/select/game/type',
        method: 'get',

      })
      if (res.state !== 0) {
        this.$Message.error(res.message)
      } else {
        this.gameList = res.data
      }
    },
    handleChangeCheck() { },
    // 添加用户弹框
    async addMember(type) {
      this.editType = type
      this.visible.addModel = true
      // this.addForm = Object.assign({}, initData)
    },
    // 保存用户信息
    // async save() {
    //   this.loading.addBtn = true
    //   this.$refs['addForm'].validate(async valid => {
    //     this.loading.addBtn = false
    //     if (valid) {
    //       if (this.editType === 'add') {
    //         this.add()
    //       } else if (this.editType === 'edit') {
    //         this.editData()
    //       } else {
    //         this.update()
    //       }
    //     }
    //   })
    // },
    checkPassWord() {
      let state = true
      if (this.addForm.password !== this.addForm.password_confirm) {
        state = false
      }
      return state
    },
   
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page++
      let query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      let res = await this.$axios.request( {
        url: '/game/3th',
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
   
   
    reset() {
      this.timeDate = ['', '']
      this.query = {
        menu_type: '',
        type_code: '',
        type_name: '',
        status: '',
        start_created_at: '',
        end_created_at: ''
      }
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
  