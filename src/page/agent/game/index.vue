<template>
    <div id="agentGame">
        <Button @click="$router.push('/agent')" style="margin-bottom: 30PX;">返回代理列表</Button>
        <Spin fix v-if="loading.page"></Spin>
        <div>
            <Button v-auth="21" type="primary" @click="addGame('add')" style="marginTop:30px;marginBottom:30px;">新增</Button>
            <Table :columns="columns" :data="dataSource" border></Table>
            <Page
                class="page_box"
                :current="page.currentPage"
                :page-size="page.pageSize"
                :total="page.total"
                show-sizer
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                placement="top"
            ></Page>
        </div>


        <!-- 编辑 -->
        <Modal
            :title="`${editType == 'add'?'新增代理游戏':'编辑代理游戏'}`"
            v-model="visible.addModel"
            :width="500"
            :mask-closable="false"
            @on-cancel="visible.addModel = false"
        >
            <Form :model="addForm" ref="addForm" :rules="ruleValidateAdd">
                <FormItem label="厂商" :label-width="80" prop="menu_type">
                    <!-- <Input v-model="addForm.menu_type" placeholder="请输入" :disabled="(['add'].includes(editType) ? false : true)"></Input> -->
                    <Select
                        v-model="addForm.menu_type"
                        :loading="false"
                        @on-change="handleSelect"
                        :disabled="['edit'].includes(editType)"
                    >
                        <Option v-for="(option, index) in menu_type_list" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="管理后台地址" :label-width="80" prop="admin_url">
                    <Input v-model="addForm.admin_url" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="后台账户" :label-width="80" prop="agent_account">
                    <Input v-model="addForm.agent_account" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="后台密码" :label-width="80" prop="password">
                    <Input v-model="addForm.password" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="费率" :label-width="80" prop="rate">
                    <span slot="label">
                        {{'费率'}}
                        <Poptip trigger="hover" placement="bottom-start">
                            <Icon type="information-circled"></Icon>
                            <div slot="content">
                                <div>指代理商同三方游戏厂商间的费率（%）</div>
                            </div>
                        </Poptip>
                    </span>
                    <Input v-model="addForm.rate" placeholder="请输入" @on-keyup='inputChange'>
                        <span slot="append">%</span>
                    </Input>
                </FormItem>
                <FormItem label="第三方游戏代理账号" :label-width="80" prop="api_agent">
                    <Input v-model="addForm.api_agent" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="第三方游戏代理密钥" :label-width="80" prop="api_key">
                    <Input v-model="addForm.api_key" placeholder="请输入" type="textarea"></Input>
                </FormItem>
                <FormItem label="状态" :label-width="80" prop="status">
                    <RadioGroup v-model="addForm.status">
                        <Radio :label="1">开启</Radio>
                        <Radio :label="0">关闭</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-for="(item, index) in menu_type_list_obj" :key="index" :label="item.label" :label-width="80">
                    <Input v-model="item.value" :placeholder="item.placeholder"></Input>
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
    let initData = {
        menu_type: '',
        admin_url: '',
        agent_account: '',
        password: '',
        status: 1,
        rate: '',
        api_agent: '',
        api_key: '',
    }
    export default {
        data () {
            return {
                visible: {
                    addModel: false,
                },
                loading: {
                    page: 0,
                    addBtn: false
                },
                agent_code: '',
                columns: columns(this),
                dataSource: [],
                page: {
                    pageSize: 10,
                    total: 0,
                    currentPage: 1
                },
                ruleValidateAdd: {
                    menu_type: [{ required: true, message: '请选择厂商', trigger: 'blur' }],
                    admin_url: [{ required: true, message: '请输入', trigger: 'blur' }],
                    agent_account: [{ required: true, message: '请输入', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入', trigger: 'blur' }],
                    api_agent: [{ required: true, message: '请输入', trigger: 'blur' }],
                    api_key: [{ required: true, message: '请输入', trigger: 'blur' }],
                    status: [{ required: true }],
                },
                editType: 'add', // 修改类型
                addForm: {},
                menu_type_list: [],
                menu_type_list_obj: [],
            }
        },
        created () {
            this.agent_code = this.$route.query.agent_code;
            if (this.agent_code) {
                this.getData();
            }
        },
        methods: {
            // 查询
            async getData () {
                this.loading.page++
                let res = await this.$axios.request({
                    url: '/agent/game',
                    method: 'get',
                    params: {
                        page: this.page.currentPage,
                        page_size: this.page.pageSize,
                        agent_code: this.agent_code
                    }
                })
                if (res.status !== 200) {
                    this.$Message.error(res.message)
                } else {
                    this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
                    this.dataSource = res.data
                }
                this.loading.page--
            },
            // 添加用户弹框
            async addGame (type) {
                this.editType = type
                this.visible.addModel = true
                this.addForm = Object.assign({}, initData)
                this.menu_type_list_obj = []
                this.getMenuTypeList()
            },
            async handleEdit(row) {
                this.editType = 'edit'
                this.visible.addModel = true
                this.addForm = Object.assign({}, row)
                console.log(row.menu_type)
                // this.handleSelect(row.menu_type)
                this.menu_type_list_obj = []
                this.getMenuTypeList()
                await this.$axios.request({
                    url: `/agent/game/detail/${row.id}`,
                    method: 'get',
                }).then(res => {
                    const { lobby } = res.data
                    const obj = JSON.parse(lobby)
                    const a = Object.keys(obj)
                    this.menu_type_list_obj = a.map(item => {
                        return {label: item, value: obj[item], placeholder: obj[item]}
                    })
                })
            },
            // 保存
            save() {
                this.$refs['addForm'].validate(async valid => {
                    if (valid) {
                        if (this.editType === 'add') {
                            this.add()
                        } else if (this.editType === 'edit') {
                            this.edit()
                        }
                    }
                })
            },
            async add () {
                let lobby = {}
                if (this.menu_type_list_obj.length) {
                    
                    let is_null = false;

                    this.menu_type_list_obj.forEach(item => {
                        if (item.value.trim() === '') {
                            is_null = true
                        }
                        lobby[item.label] = item.value
                    })

                    if (is_null) {
                        this.$Message.error('厂商配置不能为空')
                        return;
                    }
                }
                this.loading.addBtn = true
                const res = await this.$axios.request({
                    url: `/agent/game`,
                    method: 'post',
                    data: {
                        agent_code: this.agent_code,
                        ...this.addForm,
                        lobby: JSON.stringify(lobby)
                    }
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                } else {
                    this.$Message.success(res.message)
                    this.visible.addModel = false
                    this.getData()
                }
                this.loading.addBtn = false
            },
            async edit () {
                let lobby = {}
                if (this.menu_type_list_obj.length) {

                    let is_null = false;

                    this.menu_type_list_obj.forEach(item => {
                        if (item.value.trim() === '') {
                            is_null = true
                        }
                        lobby[item.label] = item.value
                    })
                    
                    if (is_null) {
                        this.$Message.error('厂商配置不能为空')
                        return;
                    }
                }
                const { id, menu_type, agent_account, password, admin_url, rate, api_agent, api_key, status }  = this.addForm
                this.loading.addBtn = true
                let res = await this.$axios.request({
                    url: `/agent/game/${id}`,
                    method: 'put',
                    data: {
                        agent_code: this.agent_code,
                        menu_type,
                        agent_account,
                        password,
                        admin_url,
                        rate,
                        api_agent,
                        api_key,
                        status,
                        lobby: JSON.stringify(lobby)
                    }
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                } else {
                    this.$Message.success(res.message)
                    this.visible.addModel = false
                    this.getData()
                }
                this.loading.addBtn = false
            },
            async handleDelete(row) {
                let res = await this.$axios.request({
                    url: `/agent/game/${row.id}`,
                    method: 'delete'
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                } else {
                    this.$Message.success(res.message)
                    this.visible.addModel = false
                    this.getData()
                }
            },
            async handleStatus(row) {
                let res = await this.$axios.request({
                    url: `/agent/game/${row.id}`,
                    method: 'patch'
                })
                if (res.status !== 200) {
                    this.$Message.error(res.message)
                } else {
                    this.$Message.success(res.message)
                    this.getData()
                }
            },
            // 设置每页条数
            changePageSize (pageSize) {
                this.page.pageSize = pageSize
                this.getData()
            },
            // 翻页
            changePage (val) {
                this.page.currentPage = val
                this.getData()
            },
            inputChange(node) {
                this.addForm.rate = node.target.value.replace(/[^\d.]/g,'')
            },
            async getMenuTypeList() {
                await this.$axios.request({
                    url: `/common/select/game/menu`,
                    method: 'get',
                }).then(res => {
                    this.menu_type_list = res.data.map(item => {return {label: item.menu_type, value: item.menu_type, api_config: JSON.parse(item.api_config)}})
                })
            },
            handleSelect(menu_type) {
                const obj = this.menu_type_list.find(item => {
                    return item.value === menu_type
                })
                if (obj) {
                    const a = Object.keys(obj.api_config)
                    this.menu_type_list_obj = a.map(item => {
                        return {label: item, value: '', placeholder: obj.api_config[item]}
                    })
                }
            },
        }
    }
</script>
  
<style lang="less" scoped>
</style>