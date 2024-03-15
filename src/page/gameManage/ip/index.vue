<template>
    <div id="agentIP" class="agnet-ip-page">
        <Button @click="$router.push('/game/gameManages')" style="margin-bottom: 30PX;">返回游戏厂商</Button>
        <Spin fix v-if="loading.page"></Spin>
        <div style="display: flex; justify-content: space-between;">
            <div class="addip-box" style="width: 400px;">
                <div class="h-title">新增IP地址加白</div>
                <Form :model="ipForm" ref="ipForm"  :label-width="60" @submit.native.prevent>
                    <FormItem label="IP地址" prop="ip">
                        <Input v-model="ipForm.ip" placeholder="请输入"></Input>
                    </FormItem>
                </Form>
                <div class="tips" style="display: flex; justify-content: right;">
                    <Button v-auth="83" type="primary" :loading="loading.addBtn" @click="handleSubmit">添加</Button>
                </div>
                <div>提示：需要线下通知运维把防火墙IP加白</div>
            </div>
            <div class="ip-list-box" style="width: 50%;">
                <div class="h-title">当前游戏厂商已经加白的IP地址</div>
                <Table :columns="columns" :data="dataSource"></Table>
            </div>
        </div>
    </div>
  </template>
  
<script>
    import columns from './columns.js'
    export default {
        data () {
            return {
                columns: columns(this),
                split: 0.5,
                visible: {
                    editModel: false,
                },
                loading: {
                    page: 0,
                    addBtn: false
                },
                menu_type: '',
                ipForm: {
                    ip: ''
                },
                ruleValidateIp: {
                    ip: [{ required: true, message: '请输入6-16正确的ip地址', min: 6, max: 16 }],
                },
                dataSource: [],
            }
        },
        created () {
            this.menu_type = this.$route.query.menu_type;
            if (this.menu_type) {
                this.getData()
            }
        },
        methods: {
            async handleSubmit() {
                if (this.ipForm.ip === '') {
                    this.$Message.error('不能输入空')
                    return;
                }
                this.loading.addBtn = true
                // this.$refs['ipForm'].validate(async valid => {
                // this.loading.addBtn = false
                //     if (valid) {
                //         let res = await this.Fetch('/agent/whitelist', {
                //             method: 'post',
                //             body: {
                //                 agent_code: this.agent_code,
                //                 ip: this.ipForm.ip
                //             }
                //         })
                //         if (res.status !== 200) {
                //             this.$Message.error(res.message)
                //         } else {
                //             this.ipForm.ip = '';
                //             this.getData()
                //         }
                //     }
                // })
                let res = await this.$axios.request({
                    url: '/game/menu/whitelist',
                    method: 'post',
                    data: {
                        menu_type: this.menu_type,
                        ip: this.ipForm.ip
                    }
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                    this.loading.addBtn = false
                } else {
                    this.$Message.success(res.message)
                    this.ipForm.ip = '';
                    this.loading.addBtn = false
                    this.getData()
                }
            },
            async handleDelete(row) {
                const res = await this.$axios.request({
                    url: `/game/menu/whitelist/${row.id}`,
                    method: 'delete',
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                } else {
                    this.$Message.success(res.message)
                    this.ipForm.ip = '';
                    this.getData()
                }
            },
            async getData () {
                this.loading.page++
                const res = await this.$axios.request({
                    url: '/game/menu/whitelist',
                    method: 'get',
                    params: {
                        menu_type: this.menu_type,
                        page: 1,
                        page_size: 100,
                    }
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                    return
                }
                this.dataSource = res.data
                this.loading.page--
            },
        }
    }
</script>
  
<style lang="less" scoped>
.agnet-ip-page {
    .addip-box  {
        margin-right: 100px;
    }
    .h-title {
        margin: 20px 0;
        font-size: 18px;
        font-weight: bold;
    }
    .tips {
        margin: 20px 0;
    }
}
</style>