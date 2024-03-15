<template>
    <div id="MemberManage">
        <Spin fix v-if="loading.page"></Spin>
        <Card dis-hover class="query_box">
            <div class="query_con mb30">
                <div class="item">
                    <span>游戏类型</span>
                    <Select v-model="query.type_code" style="width:100px">
                        <Option value>全部</Option>
                        <Option :value="item" v-for="(item, i) in gameList" :key="item">{{ item }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>名称</span>
                    <Input v-model="query.type_name" style="width:120px;" />
                </div>


                <!-- <div class="item">
                    <span>维护时间：</span>
                    <DatePicker v-model="date" type="daterange" :editable="false"
                        format="yyyy-MM-dd" placement="left-start" placeholder="选择日期" style="width: 220px" clearable>
                    </DatePicker>
                </div> -->
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
            <!-- <Button type="primary" v-auth="56" @click="addMember('add')">新增</Button> -->
        </Card>
        <div style="marginTop:30px">
            <Table :columns="columns" :data="dataSource" border></Table>
            <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
      `数据总计：${page.total}条` }}</div>
            <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer
                @on-change="getData" @on-page-size-change="changePageSize" placement="top"></Page>
        </div>
        <!-- 新增/编辑 -->
        <Modal :title="`${editType == 'add' ? '新增账号' : '编辑账号'}`" v-model="visible.addModel" :width="600"
            @on-cancel="onHandleClose">
            <Form v-if="visible.addModel" :model="addForm" ref="addForm" :rules="ruleValidateAdd">
                <FormItem label="游戏类型" prop="type_code" v-if="editType === 'add' || editType === 'edit'">
                    <Input v-model="addForm.type_code" placeholder="请输入内容" :maxlength="16" />
                </FormItem>

                <FormItem label="游戏名称" prop="type_name" v-if="editType === 'add' || editType === 'edit'">
                    <Input v-model="addForm.type_name" placeholder="请输入内容" :maxlength="16" />
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="primary" :loading="loading.addBtn" @click="save">确认</Button>
            </div>
        </Modal>
    </div>
</template>
  
<script>
import columns from './columns.js'
import MoreOptionCheck from '../../components/MoreOptionCheck'
import {   formatDateTimeToString as dateFormat} from '@/libs/date'
export default {
    components: {
        MoreOptionCheck
    },
    data() {
        return {
            // 游戏类型
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
            date:[],
            query: {
                type_name: '',
                type_code: '',
                keep_at_from: "",
                keep_at_to:'',
                status: ''
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
                type_code: '',
                type_name: ''
            },
            editType: 'add', // 修改类型
            ruleValidateAdd: {
                //currency_type: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
                type_code: [{ required: true, message: '请输入内容' }],
                type_name: [
                    {
                        required: true,
                        message: '请输入内容',

                    }
                ]

            }
        }
    },
    // {{url}}/game/type/select?page=1&page_size=10
    created() {
        this.getGameList()
        this.getData()
        // if (!this.roleList.length) {
        //     this.loading.addBtn = true
        //     this.getRole()
        //     this.loading.addBtn = false
        // }
    },
    methods: {
        // 获取游戏类型
        async getGameList() {
            let res =  await this.$axios.request( {
                url: '/common/select/game/type',
                method: 'get',

            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.gameList = res.data
            }
        },
        async handleStop(row){
           // this.loading.addBtn = true
            let res =  await this.$axios.request( {
                url: `/game/type/${row.id}`,
                method: 'patch',
                data: this.addForm,
            })
          //  this.loading.addBtn = false
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.visible.addModel = false
                this.getData()
                this.$Message.success(res.message)
                this.addForm = {
                    type_code: '',
                    type_name: ''
                }
            }
        },
        // 添加用户弹框
        async addMember(type) {
            this.editType = type
            this.visible.addModel = true
            // this.addForm = Object.assign({}, initData)
        },
        onHandleClose(){
            this.visible.addModel = false
            this.addForm = {
                type_code: '',
                type_name: ''
            }
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
                        //this.update()
                    }
                }
            })
        },
        checkPassWord() {
            let state = true
            if (this.addForm.password !== this.addForm.password_confirm) {
                state = false
            }
            return state
        },
        // 新增接口
        async add() {


            this.loading.addBtn = true
            let res =  await this.$axios.request( {
                url: `/game/type`,
                method: 'post',
                data: this.addForm,
            })
            this.loading.addBtn = false
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.visible.addModel = false
                this.getData()
                this.$Message.success(res.message)
                this.addForm = {
                    type_code: '',
                    type_name: ''
                }
            }
        },

        // 编辑接口
        async editData() {
            this.loading.addBtn = true
            //const role = this.addForm.role
            const res = await this.$axios.request(  {
                url:`/game/type/${this.id}`,
                method: 'PUT',
                data: this.addForm
            })
            this.loading.addBtn = false
            if (res.state !== 0) {
                this.$Message.success(res.message)
                return
            }
            this.visible.addModel = false
            this.$Message.success('编辑成功')
            this.getData()
            this.addForm = {
                type_code: '',
                type_name: ''
            }
        },

       
        async getData(i = 1) {
            this.page.currentPage = i
            this.loading.page++
        //    console.log(this.date)
        //    if(this.date.length && this.date[0] !== '') {
        //     this.query.keep_at_from =  dateFormat( this.date[0])
        //     this.query.keep_at_to = dateFormat(this.date[1])
        //    } else {
        //     this.query.keep_at_from =  ''
        //     this.query.keep_at_to = ''
        //    }
            let query = {
                page: this.page.currentPage,
                page_size: this.page.pageSize,
                ...this.query
            }
            let res =  await this.$axios.request( {
                url: '/game/type',
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
            let status = row.status === 1 ? 0 : 1
            let res = await this.Fetch(`/admin/user/status/${row.id}`, {
                method: 'PUT',
                body: {
                    status: status
                }
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.getData()
            }
        },

        // 编辑/改密
        async handleEdit(row, type) {
            this.editType = type
            this.visible.addModel = true
            this.addForm.type_code = row.type_code
            this.addForm.type_name = row.type_name
            this.id = row.id
            // this.addForm.role = [row.role_id]
            // if (!row.role_id) this.addForm.role = []
        },
        // 删除
        async handleDelete(row) {
            let res =  await this.$axios.request( {
                url: `/admin/user/${row.id}`,
                method: 'delete'
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.getData()
            }
        },
        reset() {
            this.query = {
                name: '',
                status: ''
            }
            this.date = []
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
        //     this.page.currentPage = val
        //     this.getData()
        // }
    }
}
</script>
  
<style></style>
  