

<template>
    <div>
        <!-- <Table :columns="columns10" :data="roleList" border></Table> -->
        <Card dis-hover class="query_box creat">
            <div class="query_con">

                <div class="item">
                    <span>{{ i18n_lang.addRole2 }}</span>
                    <Input placeholder="当前公司" v-model="group_name" disabled style="width: 140px" />
                </div>
                <div class="item">

                    <span>{{ i18n_lang.addRole3 }}</span>
                    <Input v-model.trim="role" placeholder :disabled="type == 'view' ? true : false" clearable
                        style="width: 140px" />
                </div>
                <div class="item">
                    <span>{{ i18n_lang.addRole4 }}</span>
                    <Input placeholder="自动生成" disabled style="width: 140px" />
                </div>
            </div>
            <div class="item" v-if="type !== 'view'">
                <Button icon="ios-close" @click="onCanale()">{{ i18n_lang.addRole0 }}</Button>

                <Button type="primary" v-auth="513" icon="ios-add" @click="saveData()">{{ i18n_lang.addRole1 }}</Button>
            </div>
            <div class="item" v-else>
                <Button icon="ios-close" @click="onCanale()">{{ i18n_lang.addRole11 }}</Button>


            </div>
        </Card>
        <Card style="width:100%" class="query_box">
            <div class="card-head">
                <div class="left">{{ i18n_lang.addRole5 }}</div>
                <div class="right" v-if="type !== 'view'">
                    <Button type="primary" icon="ios-add" @click="setAll">{{i18n_lang.addRole7 }}</Button>

                    <Button type="primary" icon="ios-close" @click="reset">{{ i18n_lang.addRole8 }}</Button>
                </div>
                <div class="right" v-else>

                </div>
            </div>

            <div class="content">
                <div class="head-box">
                    <div class="head arrow"></div>
                    <div class="head title">{{ i18n_lang.addRole9 }}</div>
                    <div class="head dec">{{ i18n_lang.addRole10 }}</div>
                </div>
                <div class="content-box" v-for="(item, i) in roleList" :key="item.id">
                    <div class="title-box">
                        <div class="head arrow " @click="onExpand(item, i)">
                            <Icon :class="pidIshow['isShow' + i] ? 'expanded' : ''" type="ios-arrow-forward"></Icon>
                        </div>
                        <div class="head title">{{ item.title }}</div>
                        <div class="head dec">

                        </div>
                    </div>
                    <div class="check-box " :class="pidIshow['isShow' + i] ? 'isShow' : ''"
                        v-for="(pidList) in item.children" :key="pidList.id">
                        <div class="head arrow ">

                        </div>
                        <div class="head title">
                            <CheckboxGroup v-model="pidArray" @on-change="checkPid">
                                <checkbox :disabled="type == 'view' ? true : false" :label="pidList.id">{{ pidList.title }}
                                </checkbox>
                            </CheckboxGroup>

                        </div>
                        <div class="head dec">
                            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                                <checkbox :disabled="type == 'view' ? true : false" v-for="(idList, i)  in pidList.children "
                                    :key="idList.id" :label="idList.id">{{
                                        idList.title }} 
                                </checkbox>
                            </CheckboxGroup>

                        </div>
                    </div>
                </div>
            </div>
        </Card>

    </div>
</template>

<script>
// 存后台返回的功能权限id
const idList = []
// 存pid
const pidList = []
export default {
    data() {
        const i18n_lang = this.$t('addRole');

        return {
            type: '',
            rules: {
                //currency_type: [{ required: true, message: '请输入6-16位数字、字母', min: 6, max: 16 }],
                role: [{ required: true, message: i18n_lang.addRole14 }],


            },
            id: '',
            group_name: '',
            role: '',
            pidArray: [],
            i18n_lang,
            pidIshow: {},
            // 存权限数组
            roleList: [],
            checkAllGroup: [],
            indeterminate: false,
            isShow: false,
            checkAll: false,
            columns10: [
                {
                    type: 'expand',
                    width: 50,
                    _expanded: true,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    _expanded: true,
                    title: i18n_lang.addRole9,
                    width: 150,
                    key: 'title'
                },
                {
                    title: i18n_lang.addRole10,
                    key: 'age'
                },

            ],

        }
    },
    created() {
        let { type, id, role } = this.$route.query
        this.type = type
        this.role = role
        this.id = id
        if (type === 'add') {

            this.onGetMenu()
        } else if (type === 'view') {
            this.onGetRoleDetail(id)

        } else if (type === 'edit') {
            this.onGetRoleDetail(id)

        }

    },
    methods: {
        onCanale() {
            this.role = ''
            this.pidArray = []
            this.checkAllGroup = []
            this.$router.push({ name: 'roleManage' })
        },
        async onGetRoleDetail(id) {
            const res = await this.$axios.request({
                url: '/admin/role/edit/' + id,
                method: 'GET',

            })

            if (res.status !== 200) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            this.group_name = res.data.group_name
            this.roleList = [res.data.auth.pop()]
            this.roleList.forEach((item, index) => {

                this.$set(this.pidIshow, 'isShow' + index, index === 0 ? true : false)
                item.children && item.children.forEach(pidItem => {
                    pidList.push(pidItem)

                    //console.log(pidItem)
                    pidItem.children && pidItem.children.forEach(idItem => {
                        idList.push(idItem)
                        if (idItem.checked) {
                            this.checkAllGroup.push(idItem.id)
                            let isHave = this.pidArray.includes(idItem.pid)
                            if (!isHave) {
                                this.pidArray.push(idItem.pid)
                                this.$set(this.pidIshow, 'isShow' + index,  true)
                            } 

                        }
                    })
                })
            })
            // console.log(pidList)
            // console.log(idList)
            console.log(this.pidArray)
            this.roleList[0]._expanded = true
        },
        async saveData() {


            if (!this.role) {
                this.$Message.warning(this.i18n_lang.addRole15)
                ///admin/role/edit
                return
            }
            let obj = {
                role: this.role,
                auth: [...this.pidArray, ...this.checkAllGroup]
            }
            if (this.type === 'add') {
                const res = await this.$axios.request({
                    url: '/admin/role/edit/',
                    method: 'POST',
                    data: obj

                })
                if (res.state !== 0) {
                    this.$msg({
                        type: 'error',
                        message: res.message
                    })
                    return
                } else {
                    this.$msg({
                        type: 'success',
                        message: res.message
                    })
                    this.$router.push({ name: 'roleManage' })
                }
            }
            
            if (this.type === 'edit') {
                const res = await this.$axios.request({
                    url: '/admin/role/edit/'+this.id,
                    method: 'put',
                    data: obj

                })
                if (res.state !== 0) {
                    this.$msg({
                        type: 'error',
                        message: res.message
                    })
                    return
                } else {
                    this.$msg({
                        type: 'success',
                        message: res.message
                    })
                    this.$router.push({ name: 'roleManage' })
                }
            }
        },
        setAll() {


            idList.forEach(obj => {
                let isHave = this.pidArray.includes(obj.pid)
                if (!isHave) {
                    this.pidArray.push(obj.pid)

                }
                let isHaveId = this.checkAllGroup.includes(obj.id)
                if (!isHaveId) {
                    this.checkAllGroup.push(obj.id)

                }
            })
        },
        reset() {
            this.pidArray = []
            this.checkAllGroup = []
        },
        // 选中功能权限之一  页面权限变为选中
        checkAllGroupChange(data) {
            data.forEach(item => {
                let obj = idList.find(v => item === v.id)
                if (obj) {
                    let isHave = this.pidArray.includes(obj.pid)
                    if (!isHave) {
                        this.pidArray.push(obj.pid)
                    }
                }
            })
        },

        checkPid(data) {

            // console.log(data)
        },

        onExpand(item, i) {
            // item._expanded = !item._expanded
            this.pidIshow['isShow' + i] = !this.pidIshow['isShow' + i]
            // Vue.set(this.roleList,i, item)
            console.log(this.pidIshow)
        },
        /**
        * 查询
        */
        async onGetMenu() {
            const res = await this.$axios.request({
                url: '/admin/role/edit/',
                method: 'GET',

            })

            if (res.status !== 200) {
                this.$msg({
                    type: 'error',
                    message: res.message
                })
                return
            }
            this.group_name = res.data.group_name
            this.roleList = [res.data.auth.pop()]
            this.roleList.forEach((item, i) => {

                this.$set(this.pidIshow, 'isShow' + i, i === 0 ? true : false)
                item.children && item.children.forEach(pidItem => {
                    pidList.push(pidItem)
                    //console.log(pidItem)
                    pidItem.children && pidItem.children.forEach(idItem => {
                        idList.push(idItem)
                    })
                })
            })
            // console.log(pidList)
            // console.log(idList)
            this.roleList[0]._expanded = true


        }
    }
}
</script>

<style lang="less">
.creat .ivu-card-body {
    display: flex;
    justify-content: space-between;
}

.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
}

.content {
    position: relative;
    margin-top: 50px;
    min-height: 100%;
    border: 1px solid #dcdee2;
    border-bottom: 0;
    border-right: 0;
    color: #515a6e;
    font-size: 12px;

    .content-box {
        .head {
            background-color: #fff;
        }

        width: 100%;

        .check-box {
            display: none;

            &.isShow {
                display: flex;
            }
        }

        .title-box {
            display: flex;
        }

        .title-box,
        .check-box {

            align-items: center;


            &.isShow {
                visibility: visible;
            }

            .arrow {
                width: 50px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                border-right: 1px solid #dcdee2;
            }

            .expanded {
                transform: rotate(90deg);
            }

            .title {
                width: 150px;
                border-right: 1px solid #dcdee2;
            }

            .dec {
                width: ~"calc(100% - 200px)";
            }
        }

    }

    .head-box {
        width: 100%;
        display: flex;
        align-items: center;

        .arrow {
            width: 50px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-right: 1px solid #dcdee2;
        }

        .expanded {
            transform: rotate(90deg);
        }

        .title {
            width: 150px;
            border-right: 1px solid #dcdee2;
        }

        .dec {
            width: ~"calc(100% - 200px)";
        }
    }

    .head {

        height: 40px;
        padding-left: 5px;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        text-align: left;
        text-overflow: ellipsis;
        vertical-align: middle;
        border-bottom: 1px solid #e8eaec;
        background-color: #f8f8f9;
    }
}</style>