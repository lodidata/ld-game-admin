<template>
    <div id="MonthlyBill">
      <Spin fix v-if="loading.page"></Spin>
      <Card dis-hover class="operate_box">
        <div class="left-c"></div>
        <Row>
            <Col span="12" style="font-size: 20px; line-height: 30px;">月结账单</Col>
            <Col v-if="!export_status" span="12" style="display: flex; justify-content: right;">
                <Button v-auth="65" type="primary" @click="$router.push({path:'monthlyBill/addBill'})" >新增账单</Button>
                <Button v-auth="72" type="primary"  style="margin: 0 5px 0" @click="$router.push({path:'monthlyBill/import'})">批量导入</Button>
                <Button v-auth="73" type="primary" style="margin: 0 5px 0" @click="doExport">批量导出</Button>
                <Button v-auth="73" type="primary" style="margin: 0 5px 0" @click="doAllExport">全部导出</Button>
            </Col>
            <Col v-else span="12" style="display: flex; justify-content: right;">
              <Button type="default" style="margin-right: 5px;" @click="cancelExport">取消</Button>
              <Button type="primary" @click="exportTable">导出</Button>
            </Col>
        </Row>
      </Card>
      <Card dis-hover class="query_box">
        <div class="query_con mb30">
          <div class="item">
            <span>代理账号</span>
            <Input v-model="query.agent_code" style="width:120px;" />
          </div>
          <div class="item">
            <span>品牌名称</span>
            <Input v-model="query.brand_name" style="width:120px;" />
          </div>
          <div class="item">
            <span>厂商</span>
            <Input v-model="query.menu_type" style="width:120px;" />
          </div>
          <div class="item">
            <span>币种</span>
            <Select v-model="query.currency_id" style="width:140px">
              <Option value>全部</Option>
              <!-- <Option :value="item" v-for="(item, i) in currencyList" :key="i">{{ item }}</Option> -->
              <Option v-for="item in currencyList" :value="item.id" :key="item.id">{{ item.value }}</Option>
            </Select>
          </div>
          <div class="item">
            <span>时间范围</span>
            <DatePicker type="daterange" placement="bottom-end" :transfer="true" style="width: 200px" :options="options"
            @on-change="handleChangeDate"
            v-model="dataValue" />
          </div>
          <div cass="item">
            <span style="float: left; line-height: 32px; margin-right: 5px;">费率</span>
            <Input v-model="query.rate" style="float: left; width:120px;">
              <template #append>
                <span>%</span>
              </template>
            </Input>
          </div>
          <div class="item">
            <span>汇率</span>
            <Input v-model="query.exchange_rate" style="width:120px;" />
          </div>
          <div class="query_btns" >
            <Button type="primary" @click="getData()">查询</Button>
            <Button type="primary" @click="reset">重置</Button>
          </div>
        </div>
      </Card>
      <div style="marginTop:30px">
        <Table ref="selection" :columns="columns" :data="dataSource" border></Table>
  
        <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{
        `数据总计：${page.total}条` }}</div>
        <Page class="page_box" :current="page.currentPage" :page-size="page.pageSize" :total="page.total" show-sizer
          @on-change="getData" @on-page-size-change="changePageSize" placement="top"></Page>
      </div>
    </div>
  </template>
    
  <script>
  import columns from './columns.js'
  import columns_select from './columns_select.js'
  import { addSearch } from '@/libs/util'
import { Input } from 'iview'
  
  export default {
    data() {
        return {
            id: "",
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
                agent_code: "",
                brand_name: "",
                menu_type: "",
                currency_id: "",
                rate: "",
                exchange_rate: "",
                start_bill_date: "",
                end_bill_date: "",
            },
            dataValue: ["", ""],
            options: {
                disabledDate(date) {
                    // return date && date.valueOf() > Date.now() - 86400000
                    return date && date.valueOf() > Date.now();
                }
            },
            addForm: {
                checked: []
            },
            editType: "add",
            ruleValidateAdd: {
                name: [{ required: true, message: "请输入6-16位数字、字母", min: 6, max: 16 }],
                truename: [
                    {
                        required: true,
                        message: "请输入6-16位数字、字母、汉字",
                        min: 6,
                        max: 16
                    }
                ],
                password: [{ required: true, message: "请输入6-16位数字、字母", min: 6, max: 16 }],
                password_confirm: [{ required: true, message: "请输入6-16位数字、字母", min: 6, max: 16 }],
                role: [{ required: true, message: "请选择角色" }]
            },
            currencyList: [],
            export_status: false,
        };
    },
    created() {
        if (this.$route.query && this.$route.query.currency_id) {
            this.query.currency_id = Number(this.$route.query.currency_id)
        }
        if (this.$route.query && this.$route.query.start_bill_date && this.$route.query.end_bill_date) {
            this.query.start_bill_date = this.$route.query.start_bill_date
            this.query.end_bill_date = this.$route.query.end_bill_date
            this.dataValue = [this.query.start_bill_date, this.query.end_bill_date] 
        }
        this.getCurrencyList();
        this.getData();
    },
    methods: {
        // 编辑
        async handleEdit(row) {
            this.$router.push({
                path: "monthlyBill/addBill",
                query: {
                    id: row.id
                }
            });
        },
        async handleDelete(row) {
            let res = await this.$axios.request({
                url: `/bill/${row.id}`,
                method: "delete",
            });
            if (res.state !== 0) {
                this.$Message.error(res.message);
            }
            else {
                this.$Message.success(res.message);
                this.getData();
            }
        },
        async getData(i = 1) {
            this.page.currentPage = i;
            this.loading.page++;
            let query = {
                page: this.page.currentPage,
                page_size: this.page.pageSize,
                ...this.query
            };
            let res = await this.$axios.request({
                url: "/bill",
                method: "get",
                params: query
            });
            if (res.state !== 0) {
                this.$Message.error(res.message);
            }
            else {
                this.dataSource = res.data;
                this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0;
            }
            this.loading.page--;
        },
        // 获取货币类型
        async getCurrencyList() {
            let res = await this.$axios.request({
                url: "/common/select/currency",
                method: "get",
            });
            if (res.state !== 0) {
                this.$Message.error(res.message);
            }
            else {
                this.currencyList = Object.entries(res.data).map(item => ({id: Number(item[0]), value: item[1]}))
            }
        },
        reset() {
            this.query = {
                agent_code: "",
                brand_name: "",
                menu_type: "",
                currency_type: "",
                rate: "",
                exchange_rate: "",
                start_bill_date: "",
                end_bill_date: "",
            };
            this.dataValue = [,];
            this.page = {
                pageSize: 10,
                total: 0,
                currentPage: 1
            };
            this.getData();
        },
        // 设置每页条数
        changePageSize(pageSize) {
            this.page.pageSize = pageSize;
            this.getData();
        },
        // 翻页
        // changePage(val) {
        //   this.page.currentPage = val
        //   this.getData()
        // }
        // 选择日期
        handleChangeDate(val) {
            [this.query.start_bill_date, this.query.end_bill_date] = val;
        },
        chnageLimitRecharge(val) {
            console.log(val);
        },
        doExport() {
            this.export_status = true;
            this.columns = columns_select(this);
        },
        cancelExport() {
            this.$refs.selection.selectAll(false);
            this.export_status = false;
            this.columns = columns(this);
        },
        async exportTable() {
            const selectList = this.$refs.selection.getSelection();
            if (selectList.length === 0) {
                this.$Message.error("请至少选中一条数据导出");
                return;
            }
            else {
                // let res = await this.$axios.request({
                //     url: '/bill/report',
                //     method: 'get',
                //     params: {
                //       ids: (selectList.map(item => item.id)).join(',')
                //     }
                // })
                // if (res.state !== 0) {
                //     this.$Message.error(res.message)
                // } else {
                // }
                const url = (window.location.protocol.indexOf("https") >= 0 ? "https://" : "http://") + window.setting.reqUrl + "/bill/report?ids=" + (selectList.map(item => item.id)).join(",");
                const link = document.createElement("a");
                link.style.display = "none";
                link.href = url;
                link.setAttribute("download", "excel.xls");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                this.cancelExport();
            }
        },
        doAllExport() {
            const url = (window.location.protocol.indexOf("https") >= 0 ? "https://" : "http://") + window.setting.reqUrl + "/bill/report" + addSearch(this.query);
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "excel.xls");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
    components: { Input }
}
  </script>

<style lang="less" scoped>
    .operate_box {
        margin-bottom: 10px;
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
    