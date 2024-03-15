<template>
  <div id="ServiceCount">
    <!-- 当日统计 -->
    <div class="row">
      <Spin v-if="todayInfo.loading" fix></Spin>
      <div class="col miniCard">
        <span>{{i18n_lang.serviceCount0}}</span>
        <span style="color:rgb(15, 190, 209)" class="fontSize">{{ todayInfo.acceptTotalCount }}</span>
      </div>
      <div class="col miniCard">
        <span>{{i18n_lang.serviceCount1}}</span>
        <Row style="text-align:center">
          <Col v-for="(val,index) in todayInfo.satisfaction.list" :key="index" span="6">{{ val }}</Col>
        </Row>
        <Row style="text-align:center">
          <Col
            v-for="(val,index) in todayInfo.satisfaction.counts"
            :key="index"
            span="6"
            style="color:rgb(255, 99, 96)"
            class="fontSize"
          >{{ val }}</Col>
        </Row>
      </div>
      <div class="col miniCard">
        <span>{{i18n_lang.serviceCount2}}</span>
        <span style="color:rgb(255, 99, 96)" class="fontSize">{{ todayInfo.curAcceptCount }}</span>
      </div>
      <div class="col miniCard">
        <span>{{i18n_lang.serviceCount3}}</span>
        <span style="color:rgb(255, 146, 105)" class="fontSize">{{ todayInfo.curWaitCount }}</span>
      </div>
      <div class="col miniCard">
        <span>{{i18n_lang.serviceCount4}}</span>
        <span style="color:rgb(255, 183, 47)" class="fontSize">{{ todayInfo.curOnlineCount }}</span>
      </div>
    </div>
    <div class="echars">
      <Row>
        <Col v-if="typeList.list" span="12" class="item">
          <div class="head">
            <h1>{{i18n_lang.serviceCount5}}</h1>
            <div class="date-btns">
              <span
                v-for="(it,i) in dates"
                :key="i"
                :class="{'active': typeList.type === it.type}"
                @click="changeTypeDays(it)"
              >{{ it.title }}</span>
            </div>
          </div>
          <Pie id="typePie" :typeData="typeList.title" :optionData="typeList.list" :width="540" :height="500"></Pie>
        </Col>
        <Col v-if="evaluateList.list" span="12" class="item">
          <div class="head">
            <h1>{{i18n_lang.serviceCount6}}</h1>
            <div class="date-btns">
              <span
                v-for="(it,i) in dates"
                :key="i"
                :class="{'active':evaluateList.type === it.type}"
                @click="changeEvaluateDays(it)"
              >{{ it.title }}</span>
            </div>
          </div>
          <Pie
            id="evaluatePie"
            :typeData="evaluateList.title"
            :optionData="evaluateList.list"
            :width="540"
            :height="500"
          ></Pie>
        </Col>
      </Row>
      <Row>
        <Col span="12" class="Lineitem">
          <div class="head">
            <h1>{{i18n_lang.serviceCount7}}</h1>
            <div class="date-btns">
              <span
                v-for="(it,i) in dates"
                :key="i"
                :class="{'active':recevieList.type === it.type}"
                @click="changeReceiveDays(it)"
              >{{ it.title }}</span>
            </div>
          </div>
          <LineChart
            id="reciveLine"
            :typeData="recevieList.typeData"
            :optionData="recevieList.optionData"
            :xData="recevieList.xData"
            width="100%"
            height="500px"
          ></LineChart>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import Pie from './components/Pie'
import LineChart from './components/Line'
import { formatDate, formatOPtDate } from './format.js'
import { computeDay } from '../../libs/handleDate.js'
import config from '@/config'

export default {
  components: {
    Pie,
    LineChart
  },
  data() {
    const i18n_lang = this.$t('serviceCount');
    return {
      i18n_lang: i18n_lang,
      todayInfo: {
        loading: false,
        acceptTotalCount: 0, // 今日接待会话
        satisfaction: {
          counts: [],
          list: []
        }, // 今日会话满意度
        curAcceptCount: 0, // 当前接待用户数
        curWaitCount: 0, // 当前等待用户数
        curOnlineCount: 0 // 当前客户在线人数
      },
      // 问题类型占比
      dates: [
        { title: i18n_lang.serviceCount8, type: 1 },
        { title: i18n_lang.serviceCount9, type: 0 },
        { title: i18n_lang.serviceCount10, type: 2 },
        { title: i18n_lang.serviceCount11, type: 3 }
      ],
      // 问题类型占比
      typeList: {
        title: [],
        list: [],
        type: 0
      },
      // 满意度占比
      evaluateList: {
        title: [],
        list: [],
        type: 0
      },
      // 接待用户
      recevieList: {
        typeData: [],
        optionData: [],
        xData: [],
        type: 0
      },
      boomClickState: true // 防止暴力点击
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 格式化时间按钮
    formatDate(v) {
      return formatDate(v)
    },
    init() {
      this.getTodayInfo()
      this.getTypeListData()
      this.getEvaluateDays()
      this.getReceiveData()
    },
    // 获取今日统计数据
    async getTodayInfo() {
      this.todayInfo.loading = true
      const res = await this.$axios.request({
        url: '/statistics/today',
        baseURL: config.imReqUrl,
        method: 'GET',
        params: { nodeId: config.nodeId }
      })
      this.todayInfo.loading = false
      if (res.status !== 200) {
        return this.$Message.error(res.message)
      } else {
        this.todayInfo = Object.assign({}, res.data)
      }
    },
    // 切换时间获取问题类型占比
    changeTypeDays(val) {
      this.typeList.type = val.type
      // 防止暴力点击
      if (this.boomClickState === false) return false
      this.boomClickState = false
      setTimeout(() => {
        this.boomClickState = true
      }, 1000)

      this.getTypeListData()
    },
    // 获取问题类型占比
    async getTypeListData() {
      this.typeList.list = []
      this.typeList.title = []
      const res = await this.$axios.request({
        url: '/statistics/problem',
        baseURL: config.imReqUrl,
        method: 'GET',
        params: {
          nodeId: config.nodeId,
          type: this.typeList.type
        }
      })
      if (res.status !== 200) {
        return this.$Message.error(res.message)
      } else {
        this.typeList.title = res.data.list
        res.data.counts.forEach((x, i) => {
          const obj = {
            value: x,
            name: res.data.list[i]
          }
          this.typeList.list.push(obj)
        })
      }
      console.log('this.typeList', this.typeList)
    },
    changeEvaluateDays(val) {
      this.evaluateList.type = val.type
      // 防止暴力点击
      if (this.boomClickState === false) return false
      this.boomClickState = false
      setTimeout(() => {
        this.boomClickState = true
      }, 1000)

      this.getEvaluateDays()
    },
    // 获取满意度占比
    async getEvaluateDays() {
      this.evaluateList.list = []
      this.evaluateList.title = []
      const res = await this.$axios.request({
        url: '/statistics/satisfaction',
        method: 'GET',
        baseURL: config.imReqUrl,
        params: {
          nodeId: config.nodeId,
          type: this.evaluateList.type
        }
      })
      if (res.status !== 200) {
        return this.$Message.error(res.message)
      } else {
        this.evaluateList.title = res.data.list
        res.data.counts.forEach((x, i) => {
          const obj = {
            value: x,
            name: res.data.list[i]
          }
          this.evaluateList.list.push(obj)
        })
      }
      console.log('this.evaluateList', this.evaluateList)
    },
    changeReceiveDays(val) {
      this.recevieList.type = val.type
      // 防止暴力点击
      if (this.boomClickState === false) return false
      this.boomClickState = false
      setTimeout(() => {
        this.boomClickState = true
      }, 1000)

      this.getReceiveData()
    },
    // 获取接待用户数
    async getReceiveData() {
      this.recevieList.optionData = []
      const res = await this.$axios.request({
        url: '/statistics/accept',
        baseURL: config.imReqUrl,
        method: 'GET',
        params: {
          nodeId: config.nodeId,
          type: this.recevieList.type
        }
      })
      if (res.status !== 200) {
        return this.$Message.error(res.message)
      } else {
        this.recevieList.xData = res.data.list.map(o => `${o}:00`)
        this.recevieList.optionData = [
          {
            name: this.i18n_lang.serviceCount12,
            type: 'line',
            data: res.data.counts
          }
        ]
      }
      console.log('this.recevieList', this.recevieList)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
