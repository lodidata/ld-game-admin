<template>
  <div id="HomeSort">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="mb30"><span>{{i18n_lang.lotterySet8}}</span></div>
    <div class="lottery-tab">
      <!-- 主列表 -->
      <div v-if="!isEdit" class="item">
        <div class="tab_head"><h1>{{i18n_lang.lotterySet9}}</h1></div>
        <div class="query">
          <div class="q-option">
            <div>
              {{i18n_lang.lotterySet10}}
              <Select v-model="query.lottery_pid" style="width:200px" @on-change="changeType">
                <Option v-for="(item, i) in typeList" :key="i" :value="item.id">
                  {{ item.name }}
                </Option>
              </Select>
            </div>
            <div>
              {{i18n_lang.lotterySet11}}
              <Select v-model="query.lottery_id" style="width:200px" @on-change="changeLottery">
                <Option v-for="(item, i) in lotteryMenu" :key="i" :value="item.id">
                  {{ item.name }}
                </Option>
              </Select>
            </div>
          </div>
        </div>
        <Draggable
          v-model="lotteryList"
          element="ul"
          :options="dragOptions"
          :move="handleMove"
          class="list-group"
        >
          <div
            v-for="element in lotteryList"
            :key="element.id"
            class="list-group-item lottert-list"
          >
            <p>{{ element.name }}</p>
            <p>{{ `[${element.type}]` }}</p>
          </div>
        </Draggable>
      </div>
      <div class="item">
        <div class="tab_head">
          <h1>{{i18n_lang.lotterySet12}}</h1>
          <div v-if="time.length">
            {{i18n_lang.lotterySet13}} <span>{{ time[0].start_time }}</span>- <span>{{ time[0].end_time }}</span>
          </div>
          <Button v-if="isEdit1" type="primary" @click="openOne">{{i18n_lang.lotterySet14}}</Button>
          <Button v-else type="primary" @click="saveOne">{{i18n_lang.lotterySet15}}</Button>
          <Button v-if="!isEdit1" @click="close">{{i18n_lang.lotterySet16}}</Button>
        </div>
        <Draggable
          v-model="list1"
          element="ul"
          :options="dragOptions1"
          :move="handleMove"
          class="list-group"
        >
          <div
            v-for="(element, i) in list1"
            v-show="element.state === 1"
            :key="element.id"
            class="list-group-item lottert-list"
          >
            <p>{{ element.name }}</p>
            <p>{{ `[${element.type}]` }}</p>
            <i v-if="!isEdit1" class="del" @click="delOption(i)">x</i>
          </div>
        </Draggable>
      </div>
      <div class="item">
        <div class="tab_head">
          <h1>{{i18n_lang.lotterySet17}}</h1>
          <div v-if="time.length">
            {{i18n_lang.lotterySet13}} <span>{{ time[1].start_time }}</span>- <span>{{ time[1].end_time }}</span>
          </div>
          <Button v-if="isEdit2" type="primary" @click="openTwo">{{i18n_lang.lotterySet14}}</Button>
          <Button v-else type="primary" @click="saveTwo">{{i18n_lang.lotterySet15}}</Button>
          <Button v-if="!isEdit2" @click="close">{{i18n_lang.lotterySet16}}</Button>
        </div>
        <Draggable
          v-model="list2"
          element="ul"
          :options="dragOptions2"
          :move="handleMove"
          class="list-group"
        >
          <div
            v-for="(element, i) in list2"
            v-show="element.state === 1"
            :key="element.id"
            class="list-group-item lottert-list"
          >
            <p>{{ element.name }}</p>
            <p>{{ `[${element.type}]` }}</p>
            <i v-if="!isEdit2" class="del" @click="delOption(i)">x</i>
          </div>
        </Draggable>
      </div>
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import { lotterySortAndGroup, filterData, sortData } from './format.js'

const initQuery = {
  lottery_id: '',
  lottery_pid: '',
  timeType: 1
}

export default {
  components: {
    Draggable
  },
  data() {
    const i18n_lang = this.$t('lotterySet');
    return {
      i18n_lang: i18n_lang,
      query: {
        ...initQuery
      },
      loading: {
        page: false
      },
      dataSource: [],
      time: [
        { start_time: '10:00:00', end_time: '23:59:59' },
        { start_time: '00:00:00', end_time: '9:59:59' }
      ],
      isEdit: true,
      isEdit1: true,
      isEdit2: true,
      list1: [],
      list2: [],
      lotteryList: [],
      lotteryMenu: [],
      lottery: {},
      typeList: []
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'lottery',
        ghostClass: 'ghost',
        disabled: this.isEdit
      }
    },
    dragOptions1() {
      return {
        animation: 0,
        group: 'lottery',
        ghostClass: 'ghost',
        disabled: this.isEdit1
      }
    },
    dragOptions2() {
      return {
        animation: 0,
        group: 'lottery',
        ghostClass: 'ghost',
        disabled: this.isEdit2
      }
    }
  },
  created() {
    this.getData()
    this.getlottery()
  },
  methods: {
    handleMove({ relatedContext, draggedContext }) {
      const draggedElement = draggedContext.element
      // 设置拖动元素的state = 1,即可视
      draggedElement.state = 1
    },
    // 获取已设置彩种数据
    async getData() {
      const res = await this.$axios.request({
        url: '/lottery/hot',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.list1 = res.data.day
      this.list2 = res.data.night
    },
    // 获取彩种
    async getlottery() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lotteryImg',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const result = lotterySortAndGroup(res.data)
      this.typeList = result.typeList
      this.typeList.unshift({
        id: '0',
        name: this.i18n_lang.lotterySet18
      })
      this.lottery = result.group
    },
    // 切换彩种类型
    changeType() {
      this.query.lottery_id = ''
      const pid = this.typeList.filter(x => x.id === this.query.lottery_pid)[0].id
      this.lotteryMenu = this.lottery[pid]
      this.getLotteryList()
    },
    // 切换彩种
    changeLottery() {
      this.getLotteryList()
    },
    // 获取彩种数据
    async getLotteryList() {
      const currentArr = !this.isEdit1 ? this.list1 : this.list2
      const res = await this.$axios.request({
        url: '/lottery/hot/menu',
        method: 'GET',
        params: this.query
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.lotteryList = filterData(res.data, currentArr)
    },
    openOne() {
      this.isEdit1 = false
      this.isEdit2 = true
      this.isEdit = false
      this.query = { ...initQuery }
      this.getLotteryList()
    },
    // 时间段1保存
    saveOne() {
      const list = sortData(this.list1)
      this.update({ data: list })
    },
    openTwo() {
      this.isEdit2 = false
      this.isEdit = false
      this.isEdit1 = true
      this.query = { ...initQuery }
      this.query.timeType = 2
      this.getLotteryList()
    },
    // 时间段2保存
    saveTwo() {
      const list = sortData(this.list2)
      this.update({ data: list })
    },
    // 保存修改
    async update(obj) {
      const res = await this.$axios.request({
        url: '/lottery/hot',
        method: 'PUT',
        data: obj
      })
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.close()
    },
    // 移除元素
    delOption(index) {
      const list = this.isEdit1 ? this.list2 : this.list1
      list[index].state = 0
    },
    // 取消按钮
    close() {
      this.isEdit1 = true
      this.isEdit2 = true
      this.isEdit = true
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./HomeSort.less');
</style>
