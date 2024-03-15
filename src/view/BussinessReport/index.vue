<template>
  <div id="bussinessReport">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.bussinessReport0}}</span>
          <DatePicker v-model="query.timeArr" type="daterange" :options="dateOpt" :editable="false" format="yyyy-MM-dd"
            placement="top-start" placeholder="" style="width: 200px"></DatePicker>
          <Button class="btn" @click="searchDate(1)"> {{i18n_lang.bussinessReport1}} </Button>
          <Button class="btn" @click="searchDate(2)"> {{i18n_lang.bussinessReport2}} </Button>
          <Button class="btn" @click="searchDate(3)"> {{i18n_lang.bussinessReport3}} </Button>
        </div>
      </div>
      <div class="query_con game">
        <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">
          {{i18n_lang.bussinessReport4}}
        </Checkbox>
        <CheckboxGroup v-model="checkGame" @on-change="handleCheckGame">
          <Checkbox v-for="(item, i) in games" :key="i" :label="item.type">
            {{ item.name }}
          </Checkbox>
        </CheckboxGroup>
      </div>
      <div class="query_con">
        <div style="margin-left: 20px;">
          <Button type="primary" class="btn" icon="ios-search" @click="getReport"> {{i18n_lang.bussinessReport5}}
          </Button>
          <Button type="primary" class="btn" icon="md-refresh" @click="reset"> {{i18n_lang.bussinessReport6}} </Button>
          <Button type="primary" class="btn" icon="md-clipboard" @click="gotoDetail"> {{i18n_lang.bussinessReport7}}
          </Button>
        </div>
      </div>
    </Card>
    <div class="card-box">
      <Card class="card">
        <p class="title">{{i18n_lang.bussinessReport8}}</p>
        <p style="color: #0fbed1">{{ operates.game_order_user }}</p>
      </Card>
      <Card class="card">
        <p class="title">{{i18n_lang.bussinessReport9}}</p>
        <p style="color: #90ca66">{{ operates.game_order_cnt }}</p>
      </Card>
      <Card class="card">
        <p class="title">{{i18n_lang.bussinessReport10}}</p>
        <p style="color:#ff7f79">{{ operates.game_bet_amount }}</p>
      </Card>
      <Card class="card">
        <p class="title">{{i18n_lang.bussinessReport11}}</p>
        <p style="color:#ffbd56">{{ operates.game_code_amount }}</p>
      </Card>
      <Card class="card">
        <p class="title">{{i18n_lang.bussinessReport12}}</p>
        <p style="color: #ff9b81">{{ operates.game_prize_amount }}</p>
      </Card>
      <!-- <Card class="card">
        <p class="title">总入款</p>
        <p style="color: #b1a1f4">{{ operates.game_deposit_amount }}</p>
      </Card>
      <Card class="card">
        <p class="title">总出款</p>
        <p style="color:#d9597d">{{ operates.game_withdrawal_amount }}</p>
      </Card> -->
    </div>
  </div>
</template>

<script>
  import lotteryDateOption from '@/libs/lotteryDateOption'
  import {
    computeDay,
    getCurrentWeek,
    getLastWeek
  } from '@/libs/handleDate'
  import {
    formatDateToString
  } from '@/libs/date'

  const initQuery = {
    timeArr: [computeDay(-6), computeDay()],
    date_start: '',
    date_end: ''
  }

  export default {
    name: 'BussinessReport',
    data() {
      const i18n_lang = this.$t('bussinessReport');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false,
          modal: false,
          modalButton: false
        },
        visible: {
          modal: false
        },
        query: {
          ...initQuery
        },
        indeterminate: false,
        checkAll: true,
        games: [],
        checkGame: [],
        // dateOpt: {
        //   lotteryDateOption
        // },
        dateOpt: {
          disabledDate: date => {
            return date && date.valueOf() < Date.now() - 7776000000
          }
        },
        operates: {}
      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        await this.getGames()
        await this.getReport()
      },
      // 获取所有游戏
      async getGames() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/filter/game',
          method: 'GET',
          params: {
            type: 'child'
          }
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.games = res.data
        this.checkGame = this.games.map(o => o.type)
      },
      // 查询
      async getReport() {
        const req = {
          ...this.query
        }
        req.game_type = this.checkGame.join(',')
        // 处理时间
        if (req.timeArr[0] !== '') {
          if (new Date(req.timeArr[1]).getTime() - new Date(req.timeArr[0]).getTime() > 2678400000) {
            this.$msg({
              type: 'error',
              message: `${this.i18n_lang.bussinessReport13}`
            })
            return
          }
          req.start_time = formatDateToString(new Date(req.timeArr[0]))
          req.end_time = formatDateToString(new Date(req.timeArr[1]))
        }
        this.loading.page = true
        delete req.timeArr

        const res = await this.$axios.request({
          url: '/report/operates',
          method: 'GET',
          params: req
        })
        this.loading.page = false
        if (res.status !== 200) {
          this.$msg({
            type: 'error',
            message: res.message
          })
          return
        }
        this.operates = res.data
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false
        } else {
          this.checkAll = !this.checkAll
        }
        this.indeterminate = false
        if (this.checkAll) {
          this.checkGame = this.games.map(o => o.type)
        } else {
          this.checkGame = []
        }
      },
      handleCheckGame(data) {
        if (data.length === this.games.length) {
          this.indeterminate = false
          this.checkAll = true
        } else if (data.length > 0) {
          this.indeterminate = true
          this.checkAll = false
        } else {
          this.indeterminate = false
          this.checkAll = false
        }
      },
      searchDate(type) {
        let date
        switch (type) {
          case 1:
            date = [computeDay(-1), computeDay(-1)]
            break
          case 2:
            date = getCurrentWeek()
            break
          case 3:
            date = getLastWeek()
            break
        }
        this.query.timeArr = date
      },
      reset() {
        this.query = {
          ...initQuery
        }
        this.indeterminate = false
        this.checkAll = true
        this.checkGame = this.games.map(o => o.type)
      },
      // 查询详情
      gotoDetail() {
        this.$router.push({
          path: '/report/reportDetail',
          query: {
            game_type: this.checkGame.join(','),
            start_time: formatDateToString(new Date(this.query.timeArr[0])),
            end_time: formatDateToString(new Date(this.query.timeArr[1]))
          }
        })
      }
    }
  }
</script>

<style lang="less" scope>
  @import './index.less';
</style>
