<template>
    <div id="homePage"> 
        <div v-if="!showHome">sorry，您没有首页权限！</div>
        <div v-else>
            <Row :gutter="20">
                <div class="page-count-box">
                    <Col span="12">
                        <Row :gutter="20">
                            <div style="display: flex; justify-content: space-between;">
                                <Col span="12">
                                    <Card>
                                        <div class="count-box-main">
                                            <div>代理总数（个）</div>
                                            <div>{{ agent.total }}</div>
                                            <div>
                                                <span>近一个月新增代理{{agent.nearly_one_month}}个</span>
                                                <span v-auth="8"  @click="$router.push({path: '/agent'})">查看</span>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span="12">
                                    <Card>
                                        <div class="count-box-main">
                                            <div>月结账单总笔数</div>
                                            <div>{{ bill.total }}</div>
                                            <div>
                                                <span>近一个月新增{{ bill.nearly_one_month }}笔</span>
                                                <span v-auth="6"  @click="$router.push({path: '/monthlyBill'})">查看</span>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </div>
                        </Row>
                    </Col>
                    <Col span="12">
                        <Row :gutter="20">
                            <div style="display: flex; justify-content: space-between;">
                                <Col span="12">
                                    <Card>
                                        <div class="count-box-main">
                                            <div>已接入游戏厂商总数（个）</div>
                                            <div>{{ game_menu.total }}</div>
                                            <div>
                                                <span>近一个月新增接入游戏厂商{{ game_menu.nearly_one_month }}个</span>
                                                <span v-auth="30"  @click="$router.push({path: '/game/gameManages'})">查看</span>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span="12">
                                    <Card>
                                        <div class="count-box-main">
                                            <div>已接入游戏总数（个）</div>
                                            <div>{{ game_3th.total }}</div>
                                            <div>
                                                <span>近一个月新增接入游戏{{ game_3th.nearly_one_month }}个</span>
                                                <span v-auth="25"  @click="$router.push({path: '/game/gameAllList'})">查看</span>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            </div>
                        </Row>
                    </Col>
                </div>
            </Row>
            <!--  -->
            <Row style="margin-top: 20px;" :gutter="20">
                <div style="display: flex; justify-content: space-between;">
                    <Col span="12">
                        <Card>
                            <!-- <div class="card-title">月结账单统计数据（多种货币折线）</div> -->
                            <div style="display: flex; justify-content: flex-end;">
                                <DatePicker type="daterange" split-panels placeholder="选择时间" style="width: 200px" size="small" @on-change="onChangeDate"></DatePicker>
                            </div>
                            <echartsLine  :data="data_1" style="height: 300px; margin-top: 20px;"></echartsLine>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card>
                            <div class="card-title">累计月结交收金额（按货币类型）</div>
                            <Table :columns="columns_2" :data="data_2">
                                <template #action="{ row, index }">
                                    <Button type="text" size="small" style="margin-right: 5px" @click="handleView(row)">详情</Button>
                                </template>
                            </Table>
                            <div class="page-box">
                                <Page :current="data_2_page.currentPage" :page-size="data_2_page.pageSize" :total="data_2_page.total" page size="small" @on-change="getSettlement" />
                            </div>
                        </Card>
                    </Col>
                </div>
            </Row>
            <Row style="margin-top: 20px;" :gutter="20">
                <div style="display: flex; justify-content: space-between;">
                    <Col span="12">
                        <Card>
                            <div class="card-title">游戏统计数据</div>
                            <Table :columns="columns_3" :data="data_3">
                                <template #action="{ row, index }">
                                    <Button type="text" size="small" style="margin-right: 5px" @click="handleGameView(row)">详情</Button>
                                </template>
                            </Table>
                            <div class="page-box">
                                <Page :current="data_3_page.currentPage" :page-size="data_3_page.pageSize" :total="data_3_page.total" size="small" @on-change="getGame" />
                            </div>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card>
                            <div style="display: flex; justify-content: space-between;">
                                <div class="card-title">单月月结交收金额排名（按货币类型）</div>
                                <DatePicker type="month" split-panels placeholder="选择时间" style="width: 120px" size="small" v-model="data4_query.statistics_at" @on-change="onChangeMonthlyDate"></DatePicker>
                            </div>
                            <Table :columns="columns_4" :data="data_4">
                                <template #action="{ row, index }">
                                    <Button type="text" size="small" style="margin-right: 5px" @click="handleMonthlyView(row)">详情</Button>
                                </template>
                            </Table>
                            <div class="page-box">
                                <Page :current="data_4_page.currentPage" :page-size="data_4_page.pageSize" :total="data_4_page.total" size="small" @on-change="getBillRanking" />
                            </div>
                        </Card>
                    </Col>
                </div>
            </Row>
        </div>
    </div>
</template>

<script>
import { Button } from 'iview'
import { mapState } from 'vuex'
import echartsLine from './line.vue'

export default {
    computed: {
        ...mapState({
            allRoutes: state => state.user.allRoutes
        })
    },
    data() {
        return {
            showHome: false,
            agent: {
                nearly_one_month: 0,
                total: 0
            },
            bill: {
                nearly_one_month: 0,
                total: 0
            },
            game_3th: {
                nearly_one_month: 0,
                total: 0
            },
            game_menu: {
                nearly_one_month: 0,
                total: 0
            },
            data_1: {},
            data1_query: {
                statistics_at_from: '',
                statistics_at_to: ''
            },
            columns_2: [
                {
                    title: '币种',
                    key: 'currency_type',
                    align: 'center',
                },
                {
                    title: '账单数量',
                    key: 'bill_num',
                    align: 'center',
                },
                {
                    title: '累计金额',
                    key: 'total_settlement',
                    align: 'center',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data_2: [],
            data_2_page: {
                currentPage: 1,
                pageSize: 5,
                total: 0
            },
            columns_3: [
                {
                    title: '游戏类型',
                    key: 'game_type',
                    align: 'center',
                },
                {
                    title: '厂商数量',
                    key: 'total_game_menu_num',
                    align: 'center',
                },
                {
                    title: '游戏数量',
                    key: 'total_game_num',
                    align: 'center',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data_3: [],
            data_3_page: {
                currentPage: 1,
                pageSize: 5,
                total: 0
            },
            columns_4: [
                {
                    title: '排名',
                    type: 'index',
                    align: 'center',
                },
                {
                    title: '币种',
                    key: 'currency_type',
                    align: 'center',
                },
                {
                    title: '代理数量',
                    key: 'bill_num',
                    align: 'center',
                },
                {
                    title: '累计交收金额',
                    key: 'total_settlement',
                    align: 'center',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data_4: [],
            data4_query: {
                statistics_at: ''
            },
            data_4_page: {
                currentPage: 1,
                pageSize: 5,
                total: 0,
                statistics_at_from: '',
                statistics_at_to: '',
            },
        };
    },
    components: {
        echartsLine,
    },
    created() {
        const myDate = new Date();
        const year = myDate.getFullYear(); // 获取当前年份
        const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
        this.data4_query.statistics_at = `${year}/${month}`;
    },
    mounted() {
        this.showHome = this.allRoutes.indexOf(1) > -1 ? true : false
        if (this.showHome) {
            this.getData()
            this.getBillLine()
            this.getSettlement()
            this.getGame()
            this.getBillRanking()
        }
    },
    methods: {
        // 代理|账单|厂商|游戏统计
        async getData() {
            const res = await this.$axios.request({
                url: "/home/statistics",
                method: "GET"
            });
            if (res.state !== 0) {
                this.$msg({ type: "error", message: res.message });
            }
            else {
                const { agent, bill, game_3th, game_menu } = res.data;
                this.agent.total = agent.total;
                this.agent.nearly_one_month = agent.nearly_one_month;
                this.bill.total = bill.total;
                this.bill.nearly_one_month = bill.nearly_one_month;
                this.game_3th.total = game_3th.total;
                this.game_3th.nearly_one_month = game_3th.nearly_one_month;
                this.game_menu.total = game_menu.total;
                this.game_menu.nearly_one_month = game_menu.nearly_one_month;
            }
        },
        // 月结账单统计数据列表
        async getBillLine() {
            const res = await this.$axios.request({
                url: "/home/statistics/bill/line",
                method: "GET",
                params: {
                    statistics_at_from: (this.data1_query.statistics_at_from).substring(0, 7),
                    statistics_at_to: (this.data1_query.statistics_at_to).substring(0, 7)
                }
            });
            if (res.state !== 0) {
                this.$msg({ type: "error", message: res.message })
            } else {
                this.data_1 = res.data
            }
        },
        // 累计月结账单交收金额(按货币类型)
        async getSettlement(i = 1) {
            this.data_2_page.currentPage = i;
            const res = await this.$axios.request({
                url: "/home/statistics/bill/settlement",
                method: "GET",
                params: {
                    page: this.data_2_page.currentPage,
                    page_size: this.data_2_page.pageSize,
                }
            });
            if (res.state !== 0) {
                this.$msg({ type: "error", message: res.message })
            } else {
                this.data_2 = res.data
                this.data_2_page.total = res.attributes.total
            }
        },
        // 单月月结交收金额排名(按货币类型)
        async getBillRanking(i = 1) {
            this.data_4_page.currentPage = i;
            const res = await this.$axios.request({
                url: "/home/statistics/bill/ranking",
                method: "GET",
                params: {
                    page: this.data_4_page.currentPage,
                    page_size: this.data_4_page.pageSize,
                    statistics_at: this.data4_query.statistics_at,
                }
            });
            if (res.state !== 0) {
                this.$msg({ type: "error", message: res.message })
            } else {
                this.data_4 = res.data
                this.data_4_page.total = res.attributes.total
                this.data_4_page.statistics_at_from = (res.attributes.statistics_at_from).substring(0, 10)
                this.data_4_page.statistics_at_to = (res.attributes.statistics_at_to).substring(0, 10)
            }
        },
        // 游戏统计数据
        async getGame(i = 1) {
            this.data_3_page.currentPage = i
            const res = await this.$axios.request({
                url: "/home/statistics/game",
                method: "GET",
                params: {
                    page: this.data_3_page.currentPage,
                    page_size: this.data_3_page.pageSize,
                }
            });
            if (res.state !== 0) {
                this.$msg({ type: "error", message: res.message })
            } else {
                this.data_3 = res.data
                this.data_3_page.total = res.attributes.total
            }
        },
        onChangeDate(val) {
            this.data1_query.statistics_at_from = val[0]
            this.data1_query.statistics_at_to = val[1]
            this.getBillLine()
        },
        onChangeMonthlyDate (val) {
            this.data4_query.statistics_at = val
            this.getBillRanking()
        },
        handleView(row) {
            this.$router.push({
                path: '/monthlyBill',
                query: {
                    currency_id: row.id
                }
            })
        },
        handleGameView(row) {
            this.$router.push({
                path: '/game/gameAllList',
                query: {
                    game_type: row.game_type
                }
            })
        },
        handleMonthlyView(row) {
            this.$router.push({
                path: '/monthlyBill',
                query: {
                    currency_id: row.id,
                    start_bill_date: this.data_4_page.statistics_at_from,
                    end_bill_date: this.data_4_page.statistics_at_to
                }
            })
        }
    },
}

</script>


<style lang="less">
#homePage {
    .page-count-box {
        display: flex;
        justify-content: space-between;
        .count-box-main {
            // min-width: 300px;
            >div {
                &:nth-child(1) {
                    font-size: 14px;
                }
                &:nth-child(2) {
                    font-size: 24px;
                    line-height: 48px;
                }
                &:nth-child(3) {
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                    font-size: 12px;
                    >span {
                        &:nth-child(2) {
                            cursor: pointer;
                            &:hover {
                                color: #2D8cF0;
                            }
                        }
                    }
                }
            }
        }
    }
    .card-title {
        line-height: 36px;
        font-size: 16px;
    }
    .page-box {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
}

</style>