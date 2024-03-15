<template>
    <div id="teamPage">
        <Row style="display: flex; justify-content: space-between;">
            <!-- 组织结构树 -->
            <Col span="4">
                <Card shadow>
                    <!-- 当前组织架构 -->
                    <div class="team-tree-header">当前组织架构</div>
                    <Tree :data="teamList" :children-key="'team'" @on-select-change="handleTeamNodeClick"></Tree>
                    <!-- 其他组织架构 -->
                    <div class="team-tree-header">其他组织架构</div>
                    <Tree :data="otherTeamList" :children-key="'team'" @on-select-change="handleOtherTeamNodeClick"></Tree>
                </Card>
            </Col>
            <!-- 成员表单 -->
            <Col span="20" style="margin-left: 20px;">
                <Card shadow>
                    <template #title>
                        <div class="group-name">{{ currentTeam.group_name }}<span>    (总用户数 {{member_count}})</span></div>
                        <div class="flex justify-between">
                            <div></div>
                            <div>
                                <Button class="ml-3" @click="openFormTeam('view')">查看团队</Button>
                                <Button v-if="!is_other" v-auth="504" class="ml-3" @click="openFormTeam('add')">新建团队</Button>
                                <Button v-if="!is_other" v-auth="505" class="ml-3" @click="openFormTeam('edit')">编辑团队</Button>
                                <Button v-if="!is_other" v-auth="506" class="ml-3" @click="openFormTeam('delete')">删除团队</Button>
                                <Button v-if="!is_other" v-auth="508" class="ml-3" @click="openFormMember('add')">添加成员</Button>
                            </div>
                        </div>
                    </template>
                    <!-- 表格 -->
                    <Table :columns="columns" :data="dataSource"></Table>
                    <Page
                        class="page_box"
                        v-if="total > 0"
                        :total="total"
                        show-sizer
                    />
                </Card>
            </Col>
        </Row>

        <!-- 团队 -->
        <Modal
            v-model="teamDialog.visible"
            :title="teamDialog.title"
            :width="500"
            @on-cancel="handleCloseTeamModal"
        >
            <Spin v-if="teamDialog.loading" size="large" fix></Spin>
            <Form
                ref="teamDataFormRef"
                :model="teamFormData"
                :label-width="100"
            >
                <FormItem :label="'上级团队'" prop="group_name">
                    <Input v-model="teamFormData.group_name" :disabled="true"/>
                </FormItem>
                <FormItem :label="'团队名称'" prop="name">
                    <Input v-model="teamFormData.name" :disabled="(['add', 'edit'].includes(teamDialog.type) ? false : true)" />
                </FormItem>
                <FormItem :label="'团队ID'" prop="id">
                    <Input v-model="teamFormData.id" placeholder="系统自动生成" :disabled="true" />
                </FormItem>
                <FormItem :label="'状态'" prop="status">
                    <i-switch
                        v-model="teamFormData.status"
                        :true-value="0"
                        :false-value="1"
                        :disabled="(['add', 'edit'].includes(teamDialog.type) ? false : true)"
                    >
                    </i-switch>
                </FormItem>
            </Form>
            <Divider />
            <div class="tips" v-if="teamDialog.type === 'delete'">
                <div>删除说明</div>
                <div>1.当前团队状态为：停用</div>
                <div>2.当前管理账号具有此权限</div>
                <div>3.删除后，队内成员自行解散，对应角色和权限收回</div>
            </div>
            <div class="tips" v-else>
                团队状态：启用状态，团成员可以行使此团队内的角色和数据权限，停用状态则不可以使用。
            </div>
            <div slot="footer">
            <Button type="primary" :loading="teamDialog.loading" @click="handleTeamSubmit">{{i18n_lang.adminList18}}</Button>
            </div>
        </Modal>

        <!-- 成员 -->
        <Modal
            v-model="memberDialog.visible"
            :title="memberDialog.title"
            :width="500"
            @on-cancel="handleCloseMemberModal"
        >
            <Spin v-if="memberDialog.loading" size="large" fix></Spin>
            <Form
                ref="memberDataFormRef"
                :model="memberFormData"
                :label-width="100"
            >
                <FormItem :label="'所属团队'" prop="team_id">
                    <Select
                        v-model="memberFormData.team_id"
                        style="width:200px"
                        :disabled="(['add'].includes(memberDialog.type) ? false : true)"
                    >
                        <Option v-for="item in teamOptionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="'成员账号'" prop="admin_id" v-if="['add'].includes(memberDialog.type)">
                    <Select
                        v-model="memberFormData.admin_id"
                        filterable
                        :remote-method="remoteMethod"
                        :loading="false"
                        @on-change="handleSelect"   
                    >
                        <Option v-for="(option, index) in usernameOptionList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="'成员名称'" prop="admin_username" v-else>
                    <Input v-model="memberFormData.admin_username" placeholder="系统自动生成" :disabled="true" />
                </FormItem>
                <FormItem :label="'成员名称'" prop="name">
                    <Input v-model="memberFormData.name" placeholder="系统自动生成" :disabled="true" />
                </FormItem>
                <FormItem :label="'成员状态'" prop="status_dsc">
                    <Input v-model="memberFormData.status_dsc" placeholder="系统自动生成" :disabled="true" />
                </FormItem>
                <FormItem :label="'团队角色'" prop="role_id">
                    <Select
                        v-model="memberFormData.role_id"
                        style="width:200px"
                        :disabled="(['add', 'edit'].includes(memberDialog.type) ? false : true)"
                    >
                        <Option v-for="item in roleOptionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
            <Divider />
            <div class="tips" v-if="memberDialog.type === 'delete'">
                <div>1移出后，此成员会被移出该团队，其角色和权限将被收回</div>
                <div>2.如需彻底删除此账号，请前往<a type="primary">账号管理</a></div>
            </div>
            <div class="tips" v-else>
                <div>成员数据权限：小于等于团队权限</div>
                <div>用户权限=角色（功能权限）+数据权限=用户可操作的业务范围</div>
                <div v-if="memberDialog.type === 'add'">还没有成员账号？<a type="primary">点击此处前往创建账号</a></div>
            </div>
            <div slot="footer">
            <Button type="primary" :loading="memberDialog.loading" @click="handleMemberSubmit">{{i18n_lang.adminList18}}</Button>
            </div>
        </Modal>

    </div>
</template>


<script>
import columns from './columns'

export default {
    data() {
        const i18n_lang = this.$t('adminList');
        return {
            i18n_lang: i18n_lang,
            columns: columns(this),
            dataSource: [],
            teamList: [],
            otherTeamList: [],
            currentTeam: {},
            member_count: 0,
            is_other: false,
            queryParams: {
                page: 1,
                qpage_size: 10
            },
            total: 0,
            // 团队弹窗
            teamDialog: {
                visible: false,
                title: '',
                loading: false,
                type: 'add'
            },
            teamFormData: {
                id: '',
                group_name: '',
                name: '',
                status: 1
            },
            // 成员弹窗
            memberDialog: {
                visible: false,
                title: '',
                loading: false,
                type: 'add'
            },
            memberFormData: {
                team_id: '',
                admin_id: '',
                admin_username: '',
                name: '',
                status_dsc: '',
                role_id: '',
            },
            teamOptionList: [],
            roleOptionList: [],
            usernameOptionList: [],

        }    
    },
    methods: {
        async getTeamList(is_default) {
            await this.$axios.request({
                url: `/team/list`,
                method: 'get'
            }).then(res => {
                const node_tree = res.data
                node_tree.expand = true
                node_tree.title = node_tree.name
                node_tree.team.forEach(item => {
                    item.title = item.name
                    item.user_total = node_tree.user_total
                    item.group_name = node_tree.name                                       
                })
                this.teamList = [node_tree];

                this.teamOptionList = node_tree.team.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
                
                // 进入页面默认选中当前组织下的第一个团队
                if (node_tree.team && is_default) {
                    this.currentTeam = node_tree.team[0];
                    this.member_count = this.currentTeam.user_total;
                    this.is_other = false;
                    this.getTeamMemberList()
                }
            })
        },
        async getOtherTeamList() {
            await this.$axios.request({
                url: `/team/other`,
                method: 'get'
            }).then(res => {
                const node_tree = res.data
                node_tree.forEach(item => {
                    item.title = item.name
                    item.team.forEach(item_child => {
                        item_child.title = item_child.name
                        item_child.user_total = item.user_total
                        item_child.group_name = item.name  
                    })
                })
                this.otherTeamList = node_tree;
            })
        },
        async getTeamMemberList() {
            await this.$axios.request({
                url: `/team`,
                method: 'get',
                params: {
                    ...this.queryParams,
                    id: this.currentTeam.id,
                }
            }).then(res => {
                this.dataSource = res.data
                if (res.attributes) {
                    this.total = res.attributes.total
                }
            })
            this.getRoleList(this.currentTeam.id)
        },
        handleTeamNodeClick(data) {
            if (!data.length) return
            const cur = data[0]
            if (cur.team) return
            this.currentTeam = data[0]
            this.member_count = this.currentTeam.user_total;
            this.is_other = false
            this.getTeamMemberList() 
        },
        handleOtherTeamNodeClick(data) {
            if (!data.length) return
            const cur = data[0]
            if (cur.team || !data.length) return 
            this.currentTeam = data[0]
            this.member_count = this.currentTeam.user_total;
            this.is_other = true
            this.getTeamMemberList()
        },
        // 团队
        openFormTeam(type) {
            this.teamDialog.type = type
            const { group_name, id, name, status } = this.currentTeam;
            if (type === 'add') {
                this.teamDialog.title = '新建团队';
                this.teamFormData.id = '';
                this.teamFormData.group_name = group_name;
                this.teamFormData.name = '';
                this.teamFormData.status = 1;
            } else {
                if (type === 'view') {
                    this.teamDialog.title = '查看团队';
                } else if (type === 'edit') {
                    this.teamDialog.title = '编辑团队';
                } else {
                    this.teamDialog.title = '删除团队';
                }
                this.teamFormData.id = id;
                this.teamFormData.group_name = group_name;
                this.teamFormData.name = name;
                this.teamFormData.status = status;
            } 
            this.teamDialog.visible  = true;
        },
        async handleTeamSubmit() {
            this.teamDialog.loading = true
            if (this.teamDialog.type === 'add') {
                await this.$axios.request({
                    url: `/team`,
                    method: 'post',
                    data: {
                        name: this.teamFormData.name,
                        status: this.teamFormData.status
                    }
                }).then(res => {
                    this.teamDialog.loading = false
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.teamDialog.visible = false
                    this.getTeamList()
                })
            }

            if (this.teamDialog.type === 'edit') {
                await this.$axios.request({
                    url: `/team`,
                    method: 'put',
                    data: {
                        id: this.teamFormData.id,
                        name: this.teamFormData.name,
                        status: this.teamFormData.status
                    }
                }).then(res => {
                    this.teamDialog.loading = false
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.teamDialog.visible = false
                    this.getTeamList()
                })
            }

            if (this.teamDialog.type === 'delete') {
                await this.$axios.request({
                    url: `/team`,
                    method: 'delete',
                    data: {
                        id: this.teamFormData.id,
                    }
                }).then(res => {
                    this.teamDialog.loading = false
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.teamDialog.visible = false
                    this.getTeamList(true)
                })
            }

        
        },
        handleCloseTeamModal() {
            this.$refs['teamDataFormRef'].resetFields()
        },
        // 成员
        async getRoleList(id) {
            await this.$axios.request({
                url: `/admin/role/team`,
                method: 'get',
                params: {
                    team_id: id
                }
            }).then(res => {
                this.roleOptionList = res.data.map(item => {
                    return {
                        label: item.role,
                        value: item.id
                    }
                })
            })
        },
        async remoteMethod(queryString) {
            if (queryString.length < 2) return;
            await this.$axios.request({
                url: `/group/user`,
                method: 'get',
                params: {
                    name: queryString
                }
            }).then(res => {
                this.usernameOptionList = res.data.map(item => {return {label: item.username, value: item.id}})
            })
        },
        openFormMember(type, row) {
            this.memberDialog.visible = true;
            this.memberDialog.type = type
            this.memberFormData.admin_id = ''
            if (type === 'add') {
                this.memberDialog.title = '添加成员'
                this.memberFormData.team_id = this.currentTeam.id;
            } else {
                
                if (type === 'edit') {
                    this.memberDialog.title = '编辑成员'
                }
                if (type === 'view') {
                    this.memberDialog.title = '查看成员'
                }
                if (type === 'delete') {
                    this.memberDialog.title = '移除成员'
                }
                this.memberFormData.team_id = this.currentTeam.id;
                this.memberFormData.admin_username = row.username;
                this.memberFormData.admin_id = row.id;
                this.memberFormData.name = row.name;
                this.memberFormData.status_dsc = row.status === 0 ? '启用' : '禁用';
                this.memberFormData.role_id = row.role[0].id;
            }
        },
        async handleMemberSubmit() {
            if (this.memberDialog.type === 'add') {
                await this.$axios.request({
                    url: `/team/user`,
                    method: 'post',
                    data: {
                        team_id: this.memberFormData.team_id,
                        admin_id: this.memberFormData.admin_id,
                        role_ids: [this.memberFormData.role_id]
                    }
                }).then(res => {
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.memberDialog.visible = false;
                    this.getTeamMemberList()
                })
            }

            if (this.memberDialog.type === 'edit') {
                await this.$axios.request({
                    url: `/team/user`,
                    method: 'put',
                    data: {
                        team_id: this.memberFormData.team_id,
                        admin_id: this.memberFormData.admin_id,
                        role_ids: [this.memberFormData.role_id]
                    }
                }).then(res => {
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.memberDialog.visible = false;
                    this.getTeamMemberList()
                })
            }

            if (this.memberDialog.type === 'delete') {
                await this.$axios.request({
                    url: `/team/user`,
                    method: 'delete',
                    data: {
                        team_id: this.memberFormData.team_id,
                        admin_id: this.memberFormData.admin_id,
                    }
                }).then(res => {
                    this.$msg({
                        type: res.status !== 200 ? 'error' : 'success',
                        message: res.message
                    })
                    this.memberDialog.visible = false;
                    this.getTeamMemberList()
                })
            }
        },
        handleSelect(admin_id) {
            this.memberFormData.admin_id = admin_id
        },
        handleCloseMemberModal() {
            this.$refs['memberDataFormRef'].resetFields()
        },

    },
    mounted() {
        this.getTeamList(true)
        this.getOtherTeamList()
    }
}


</script>

<style lang="less" scoped>
.group-name {
  font-size: 24px;
  >span {
    color: #909399;
    font-size: 18px;
  }
}

.team-tree-header {
  font-size: 12px;
  color: #409eff;
  background: rgba(64, 158, 255, 0.2);
  padding: 5px 5px;
  border-radius: 5px;
}
</style>