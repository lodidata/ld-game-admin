<template>
    <div id="MemberManage">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>模块</span>
            <Select v-model="query.module" style="width:140px">
              <Option value>全部</Option>
              <Option :value="item.key" v-for="(item, i) in model_list" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="item">
            <span>操作</span>
            <Select v-model="query.method" style="width:140px">
              <Option value>全部</Option>
              <Option :value="item.key" v-for="(item, i) in method_list" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="item">
            <span>状态</span>
            <Select v-model="query.status" style="width:100px">
              <Option value>全部</Option>
              <Option :value="item.id" v-for="(item, i) in stateList" :key="i">{{ item.name }}</Option>
            </Select>
          </div>
          <div class="item">
            <span>操作人</span>
            <Input v-model="query.operator" style="width:120px;" />
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
    </div>
  </template>
    
  <script>
  import columns from './columns.js'
  import MoreOptionCheck from '../../components/MoreOptionCheck'
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
          operator: '',
          status: '',
          module: '',
          method: ''
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
        stateList: [{ id: 1, name: '成功' }, { id: 0, name: '失败' }], // 状态数据
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
        },
        model_list: [],
        method_list: []
      }
    },
    created() {
    //   let { menu_type } = this.$route.query
    //   if (menu_type) {
    //     this.query.menu_type = menu_type
    //   }
    //   this.getGameList()
      this.getData()
      this.getSelect()
      
    },
    methods: {
    //   async handleStop(row){
    //     let res = await  this.$axios.request( {
    //       url: `/game/3th/${row.id}`,
    //       method: 'patch',
         
    //     })
    //     if (res.state !== 0) {
    //       this.$Message.error(res.message)
    //     } else {
    //       this.$Message.success(res.message)
    //       this.getData()
    //     }
    //   },
      // 选择时间
    //   SelectTime(val) {
    //     ;[this.query.start_created_at, this.query.end_created_at] = val
    //   },
      // 获取游戏类型
    //   async getGameList() {
    //     let res = await  this.$axios.request({
    //       url:'/game/type/select',
    //       method: 'get',
  
    //     })
    //     if (res.state !== 0) {
    //       this.$Message.error(res.message)
    //     } else {
    //       this.gameList = res.data
    //     }
    //   },
      handleChangeCheck() { },
      // 添加用户弹框
    //   async addMember(type) {
    //     this.editType = type
    //     this.visible.addModel = true
    //     // this.addForm = Object.assign({}, initData)
    //   },
    //   checkPassWord() {
    //     let state = true
    //     if (this.addForm.password !== this.addForm.password_confirm) {
    //       state = false
    //     }
    //     return state
    //   },
     
      async getData(i = 1) {
        this.page.currentPage = i
        this.loading.page++
        let query = {
          page: this.page.currentPage,
          page_size: this.page.pageSize,
          ...this.query
        }
        let res = await this.$axios.request( {
          url: '/admin/log',
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

      async getSelect() {
        let res = await this.$axios.request( {
          url: '/common/select/admin/log?type=0',
          method: 'get',
        })
        if (res.state === 0) {
          // 模块
          for (let [k, v] of Object.entries(res.data[0])) {
            this.model_list.push({key: k, name: v})
          }
          // 类型
          for (let [k, v] of Object.entries(res.data[1])) {
            this.method_list.push({key: k, name: v})
          }
        }
      },
     
     
      reset() {
        // this.timeDate = ['', '']
        this.query = {
            operator: '',
            status: ''
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
    