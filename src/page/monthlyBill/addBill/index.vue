<template>
    <div id="addBill">
        <Card dis-hover class="operate_box">
            <div class="left-c"></div>
            <Row>
                <Col span="12" style="font-size: 20px; line-height: 30px;">{{ id ? '编辑账单' : '新增账单' }}</Col>
                <!-- <Col span="12" style="display: flex; justify-content: right;">
                    <Button type="default" @click="$router.push({path:'/monthlyBill'})" style="margin-right: 5px;">取消</Button>
                </Col> -->
            </Row>
        </Card>
        <Card dis-hover>
            <Form :model="addForm" :label-width="80" style="width: 400px;" ref="addForm" :rules="ruleValidateAdd">
                <FormItem label="代理账号" prop="agent_code">
                    <Select v-if="!id" v-model="addForm.agent_code" style="width:200px" filterable @on-change="changeAgentCode">
                        <Option v-for="item in agentList" :value="item.agent_code" :key="item.agent_code">{{ item.agent_code }}</Option>
                    </Select>
                    <Input v-else v-model="addForm.agent_code" :disabled="true"></Input>
                </FormItem>
                <FormItem label="品牌名称" prop="brand_name">
                    <Input v-model="addForm.brand_name" placeholder="关联代理账号" :disabled="true"></Input>
                </FormItem>
                <FormItem label="厂商名称" prop="menu_type">
                    <Select v-if="!id" v-model="addForm.menu_type" style="width:200px" @on-change="changeMenuType">
                        <Option v-for="item in menuList" :value="item.menu_type" :key="item.menu_type">{{ item.menu_type }}</Option>
                    </Select>
                    <Input v-else v-model="addForm.menu_type" :disabled="true"></Input>
                </FormItem>
                <FormItem label="时间范围">
                    <Row>
                        <Col span="11">
                            <FormItem prop="start_bill_date">
                                <DatePicker type="date" placeholder="请选择" format="yyyy-MM-dd" v-model="addForm.start_bill_date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="end_bill_date">
                                <DatePicker type="date" placeholder="请选择" format="yyyy-MM-dd" v-model="addForm.end_bill_date"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="币种" prop="currency">
                    <!-- <Select v-if="!id" v-model="addForm.currency_type" style="width:200px">
                        <Option v-for="item in currencyList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                    <Input v-else v-model="addForm.currency_type" :disabled="true"></Input> -->
                    <Input v-model="addForm.currency" :disabled="true"></Input>
                </FormItem>
                <FormItem label="有效投注" prop="valid_bet">
                    <Input v-model="addForm.valid_bet" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="输赢" prop="win_lose_bet">
                    <Input v-model="addForm.win_lose_bet" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="费率" prop="rate">
                    <Input v-model="addForm.rate" placeholder="选择厂商自动计算" :disabled="true">
                        <template #append>
                            <span>%</span>
                        </template>
                    </Input>
                </FormItem>
                <FormItem label="汇率" prop="exchange_rate">
                    <Input v-model="addForm.exchange_rate" placeholder="请输入" :disabled="true"></Input>
                </FormItem>
                <FormItem label="交收金额" prop="settlement">
                    <Row>
                        <Col span="20">
                            <Input v-model="addForm.settlement" placeholder="请输入"></Input>
                        </Col>
                        <Col span="4">
                            <Button type="text" @click="calculateBill">计算</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>

            <div style="margin-left: 80px;">
                <Button type="default" @click="$router.push({path:'/monthlyBill'})" style="margin-right: 5px;">取消</Button>
                <Button type="primary" v-if="!id" @click="add" :loading="loading.addBtn">保存新增</Button>
                <Button type="primary" v-else @click="save" :loading="loading.addBtn">保存</Button>
            </div>
        </Card>
    </div>
</template>

<script>
import { formatDateToString } from '@/libs/date.js'

export default {
    data() {
        return {
            loading: {
                addBtn: false,
            },
            addForm: {
                agent_code: '',
                brand_name: '',
                menu_type: '',
                start_bill_date: '',
                end_bill_date: '',
                currency: '',
                currency_id: '',
                valid_bet: '',
                win_lose_bet: '',
                rate: '',
                exchange_rate: 1,
                settlement: '',
            },
            agentList: [],
            menuList: [],
            currencyList: [],
            id: '',
            ruleValidateAdd: {
                agent_code: [{required: true, message: '请选择'}],
                brand_name: [{required: true, message: '请输入'}],
                menu_type: [{required: true, message: '请选择'}],
                currency: [{required: true, message: '请输入'}],
                valid_bet: [{required: true, message: '请输入'}],
                win_lose_bet: [{required: true, message: '请输入'}],
                rate: [{required: true, message: '请输入'}],
                exchange_rate: [{required: true, message: '请输入'}],
                settlement: [{required: true, message: '请输入'}],
                start_bill_date: [{required: true, message: '请输入'}],
                end_bill_date: [
                    {required: true, message: '请输入'},
                    {
                        validator: (rule, value, cb) => {
                            this.addForm.start_bill_date < this.addForm.end_bill_date ? cb() : cb(`开始日期不能大于结束日期`)
                        }
                    }
                ],
            },
        }
    },
    mounted() {


        this.id = this.$route.query.id;

        this.getAgentList()

        // 编辑查询详情
        if (this.id) {
            this.getDetail()
        }
    },
    methods: {
        add() {
            // this.loading.addBtn = true
            this.$refs['addForm'].validate(async valid => {
                // this.loading.addBtn = false
                if (valid) {
                    this.addForm.start_bill_date = formatDateToString(new Date(this.addForm.start_bill_date))
                    this.addForm.end_bill_date = formatDateToString(new Date(this.addForm.end_bill_date))
                    const { currency, ...obj } = this.addForm
                    this.loading.addBtn = true
                    let res = await this.$axios.request({
                        url: '/bill',
                        method: 'post',
                        data: {
                            ...obj
                        }
                    })
                    if (res.state !== 0) {
                        this.$Message.error(res.message)
                        this.loading.addBtn = false
                    } else {
                        this.$Message.success(res.message)
                        this.$router.push({path:'/monthlyBill'})
                        this.loading.addBtn = false
                    }
                }
            })
        },
        save() {
            // this.loading.addBtn = true
            this.$refs['addForm'].validate(async valid => {
                // this.loading.addBtn = false
                if (valid) {
                    this.addForm.start_bill_date = formatDateToString(new Date(this.addForm.start_bill_date))
                    this.addForm.end_bill_date = formatDateToString(new Date(this.addForm.end_bill_date))
                    const { currency, ...obj } = this.addForm
                    this.loading.addBtn = true
                    let res = await this.$axios.request({
                        url: `/bill/${this.id}`,
                        method: 'put',
                        data: {
                            ...obj
                        }
                    })
                    if (res.state !== 0) {
                        this.$Message.error(res.message)
                        this.loading.addBtn = false
                    } else {
                        this.$Message.success(res.message)
                        this.$router.push({path:'/monthlyBill'})
                        this.loading.addBtn = false
                    }
                }
            })
        },
        changeAgentCode(val) {
            const c_agent = this.agentList.find(item => item.agent_code === val)
            if (c_agent) {
                this.addForm.brand_name = c_agent.brand_name
                const c_menu = this.agentList.find(item => item.agent_code === val)
                console.log(c_menu)
                if (c_menu) {
                    this.addForm.currency = c_menu.currency
                    this.addForm.currency_id = c_menu.currency_id
                }
                // if (c_menu && c_menu.currency) {
                //     this.currencyList = c_menu.currency.split(',')
                // } else {
                //     this.currencyList = []
                // }
                this.getMenu(val)
            }
        },
        changeMenuType(val) {
            // this.getCurrencyList(val)
            if (this.addForm.agent_code && this.addForm.menu_type) {
                this.getRate()
            }
        },
        // 详情
        async getDetail() {
            let res = await this.$axios.request( {
                url: `/bill/detail/${this.id}`,
                method: 'get',
            })
            if (res.state !== 0) {
                his.$Message.error(res.message)
            } else {
                const { updated_at, created_at, id, menu_type, currency_type, ...obj } = res.data
                this.addForm = obj
                this.getMenu(this.addForm.agent_code)
                this.addForm.menu_type = menu_type
                // this.getCurrencyList(this.addForm.menu_type)
                const c_menu = this.agentList.find(item => item.agent_code === this.addForm.agent_code)
                if (c_menu && c_menu.currency) {
                    this.currencyList = c_menu.currency.split(',')
                } else {
                    this.currencyList = []
                }
                this.addForm.currency = currency_type
            }
        },
        // 代理
        async getAgentList() {
            let res = await this.$axios.request( {
              url: '/common/select/agent',
              method: 'get',
            })
            if (res.state !== 0) {
              this.$Message.error(res.message)
            } else {
                this.agentList = res.data
            }
        },
        // 计算交收金额
        async calculateBill() {
            const { win_lose_bet, rate, exchange_rate } = this.addForm
            if (win_lose_bet && rate && exchange_rate) {
                let res = await this.$axios.request( {
                    url: '/bill',
                    method: 'PATCH',
                    params: {
                        win_lose_bet,
                        rate,
                        exchange_rate
                    }
                })
                if (res.state !== 0) {
                    this.$Message.error(res.message)
                } else {
                    this.addForm.settlement = res.data.settlement
                }
            } else {
                this.$Message.error('输赢，费率，汇率必填')
            }
        },
        // 厂商 根据代理账号查询
        async getMenu(agent_code) {
            this.addForm.menu_type = '';
            let res = await this.$axios.request( {
              url: '/common/select/agent/game',
              method: 'get',
              params: {
                agent_code
              }
            })
            if (res.state !== 0) {
              this.$Message.error(res.message)
            } else {
                this.menuList = res.data
            }
        },
        // 获取货币类型  根据厂商筛选
        async getCurrencyList(menu_type) {
            // this.addForm.currency_type = '';
            // let res = await this.$axios.request( {
            //     url: '/game/menu/select',
            //     method: 'get',
            // })
            // if (res.state !== 0) {
            //     this.$Message.error(res.message)
            // } else {
            //     const c_menu = res.data.find(item => item.menu_type === menu_type)
            //     if (c_menu && c_menu.currency) {
            //         this.currencyList = c_menu.currency.split(',')
            //     }
            // }
        },
        // 获取单个费率
        async getRate() {
            let res = await this.$axios.request( {
                url: '/common/select/agent/game/rate',
                method: 'get',
                params: {
                    agent_code: this.addForm.agent_code,
                    menu_type: this.addForm.menu_type
                }
            })
            if (res.state !== 0) {
                this.$Message.error(res.message)
            } else {
                if (res.data.length) {
                    this.addForm.rate = res.data[0]
                }
            }
        },
        // setStartTime(val) {
        //     console.log(val)
        //     this.addForm.start_bill_date = val
        // },
        // endStartTime(val) {
        //     this.addForm.end_bill_date = val
        // }
    }
}
</script>
<style lang="less" scoped>
    .operate_box {
        // margin-bottom: 10px;
        .left-c {
            position: absolute;
            width: 5px;
            height: 100%;
            background: #2d8cf0;
            left: 0px;
            top: 0px;
        }
    }
</style>