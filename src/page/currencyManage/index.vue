<template>
    <div id="MemberManage">
        <Spin fix v-if="loading.page"></Spin>
        <Card dis-hover class="query_box">
            <div class="query_con mb30">
                <div class="item">
                    <span>货币</span>
                    <Select v-model="query.currency_id" style="width:100px">
                        <Option value>全部</Option>
                        <!-- <Option :value="item" v-for="(item, i) in currencyList" :key="item">{{ item }}</Option> -->
                        <Option v-for="item in currencyList" :value="item.id" :key="item.id">{{ item.value }}</Option>
                    </Select>
                </div>
                <div class="item">
                    <span>货币名称</span>
                    <Input v-model="query.currency_name" style="width:120px;" />
                </div>


                <!-- <div class="item">
                    <span>状态</span>
                    <Select v-model="query.status" style="width:100px">
                        <Option value>全部</Option>
                        <Option :value="item.id" v-for="(item, i) in stateList" :key="i">{{ item.name }}</Option>
                    </Select>
                </div> -->
                <div class="query_btns">
                    <Button type="primary" @click="getData()">查询</Button>
                    <Button type="primary" @click="reset">重置</Button>
                </div>
            </div>
        </Card>
        <div style="display: flex; justify-content: flex-end;">
            <Button type="primary" v-auth="43" @click="addMember('add')">新增</Button>
        </div>
        <div style="marginTop:10px">
            <Table :columns="columns" :data="dataSource" border></Table>
            <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
                `数据总计：${page.total}条` }}</div>
            <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer
                @on-change="getData" @on-page-size-change="changePageSize" placement="top"></Page>
        </div>
        <!-- 新增/编辑 -->
        <Modal :title="`${editType == 'add' ? '新增货币' : '编辑货币'}`" v-model="visible.addModel" :width="600"
            :mask-closable="false" @on-cancel="onHandleClose">
            <Form v-if="visible.addModel" :model="addForm" ref="addForm" :rules="ruleValidateAdd">
                <FormItem label="货币类型" prop="currency_type" v-if="editType === 'add' || editType === 'edit'">
                    <Input v-model="addForm.currency_type" placeholder="请输入内容" :maxlength="16" />
                </FormItem>

                <FormItem label="货币名称" prop="currency_name" v-if="editType === 'add' || editType === 'edit'">
                    <Input v-model="addForm.currency_name" placeholder="请输入内容" :maxlength="16" />
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
let initData = {
    name: '',
    truename: '',
    password: '',
    password_confirm: '',
    role: []
}
export default {
    components: {
        MoreOptionCheck
    },
    data() {
        return {
            optionData: ['THB', 'SD', 'DD'],
            loading: {
                page: 0,
                addBtn: false
            },
            // 编辑id
            id: 0,
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
                currency_id: '',
                currency_name: '',
                // status: ''
            },
            optionsTime: {
                disabledDate(date) {
                    const time = Date.now() - 86400000 * 365
                    const data = date && date.valueOf()
                    //return data < time || data > Date.now()
                    return data > Date.now()
                }
            },
            // 货币类型
            currencyList: [],
            roleList: [],
            stateList: [{ id: 1, name: '已上架' }, { id: 0, name: '已下架' }], // 状态数据
            addForm: {
                currency_type: '',
                currency_name: ''
            },
            editType: 'add', // 修改类型
            ruleValidateAdd: {
                //currency_type: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
                currency_type: [{ required: true, message: '请输入内容' }],
                currency_name: [
                    {
                        required: true,
                        message: '请输入内容',

                    }
                ]

            }
        }
    },
    // /currency/type 货币类型
    created() {
        this.getCurrencyList()
        this.getData()
    },
    methods: {
        handleChangeCheck() { },
        // 添加用户弹框
        async addMember(type) {
            this.editType = type
            this.visible.addModel = true
        },
        // 获取货币类型
        async getCurrencyList() {
            let res = await this.$axios.request({
                url: '/common/select/currency',
                method: 'get',

            })
            if (res.status !== 200) {
                this.$Message.error(res.message)
            } else {
                this.currencyList = Object.entries(res.data).map(item => ({id: Number(item[0]), value: item[1]}))
            }
        },
        // 保存用户信息
        async save() {
            // this.loading.addBtn = true
            this.$refs['addForm'].validate(async valid => {
                // this.loading.addBtn = false
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
        // 新增货币接口
        onHandleClose() {
            this.visible.addModel = false
            this.addForm = {
                currency_type: '',
                currency_name: ''
            }
        },
        async add() {
            this.loading.addBtn = true
            let res = await this.$axios.request({
                url: `/currency`,
                method: 'post',
                data: this.addForm,
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
                this.loading.addBtn = false
            } else {
                this.loading.addBtn = false
                this.visible.addModel = false
                this.addForm = {
                    currency_type: '',
                    currency_name: ''
                }
                this.getData()
            }
        },

        // 编辑接口
        async editData() {
            this.loading.addBtn = true
            const res = await this.$axios.request({
                url: `/currency/${this.id}`,
                method: 'PUT',
                data: this.addForm
            })
            if (res.state !== 0) {
                this.$Message.success(res.message)
                this.loading.addBtn = false
                return
            }
            this.loading.addBtn = false
            this.visible.addModel = false
            this.$Message.success('编辑成功')
            this.getData()
            this.addForm = {
                currency_type: '',
                currency_name: ''
            }
        },


        async getData(i = 1) {
            // if (i) this.page.currentPage = i;
            this.page.currentPage = i
            this.loading.page++
            let query = {
                page: this.page.currentPage,
                page_size: this.page.pageSize,
                ...this.query
            }
            let res = await this.$axios.request({
                url: '/currency',
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
        async handleStop(row) {
            let status = row.status === 1 ? 0 : 1
            const res = await this.$axios.request({
                url: `/currency/${row.id}`,
                method: 'patch',

            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.getData()
            }
        },

        // 编辑货币
        async handleEdit(row, type) {
            this.editType = type
            this.visible.addModel = true
            this.addForm.currency_name = row.currency_name
            this.addForm.currency_type = row.currency_type
            this.id = row.id
        },
        // 删除
        async handleDelete(row) {
            let res = await this.Fetch(`/admin/user/${row.id}`, {
                method: 'delete'
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                this.$Message.success(res.message)
                this.getData()
            }
        },
        handleView(row, type) {
            if (type === 'agent') {
                this.$router.push({ path: '/agent', query: { currency_id: row.id } })
            }

            if (type === 'gameManages') {
                this.$router.push({ path: '/game/gameManages', query: { currency_id: row.id } })
            }
        },
        reset() {
            this.query = {
                name: '',
                status: ''
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
  