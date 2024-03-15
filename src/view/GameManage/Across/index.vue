<template>
  <div class="card">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Table border :columns="columns" :data="dataSource"></Table>

    <!-- 热门游戏排序 -->
    <Modal v-model="visible.modal" :title="i18n_lang.gameManage2" :width="900" :styles="{ top: '20px' }">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <div class="sort-box">
        <div class="item">
          <div v-for="(item,index) in allGame" :key="item.id">
            <div class="tab_head">
              <h1 class="showBox" @click="handleShow(index)">
                {{ item.name }}
                <Icon type="ios-arrow-forward" :class="{'tips':isShow===index}"/>
              </h1>
            </div>
            <Draggable
              v-show="isShow===index"
              v-model="item.childrens"
              element="ul"
              :options="dragOptions"
              :move="handleMove"
              class="list-group"
            >
              <div
                v-for="element in item.childrens"
                :key="element.id"
                class="list-group-item list"
                :style="{ borderColor: mapColors[item.id] }"
              >
                <p>{{ element.game_name }}</p>
              </div>
            </Draggable>
          </div>
        </div>
        <div class="item">
          <div>
            <div class="tab_head"><h1>{{i18n_lang.gameManage3}}</h1></div>
            <Draggable
              v-model="hotGame"
              element="ul"
              :options="sortOptions"
              :move="handleMove"
              class="sort-list-group list-group-large"
              @change="handleChange"
            >
              <div
                v-for="(element, i) in hotGame"
                :key="element.id"
                class="list-group-item list list-sort"
                :style="{ borderColor: mapColors[element.game_id] }"
              >
                <p>{{ mapTxt[element.game_id] }}-{{ element.game_name }}</p>
                <i class="del" @click="delOption(i)">x</i>
              </div>
            </Draggable>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleConfirm">{{i18n_lang.gameManage4}}</Button>
        <Button @click="visible.modal = false">{{i18n_lang.gameManage5}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'
import Draggable from 'vuedraggable'

const colors = ['#8FCDDA', '#F2C047', '#C7D35E', '#DF7D81', '#B980AE', '#ADDDF7']
const txt = ['天美棋牌', 'TG棋牌', '开元棋牌', '新世界棋牌']

export default {
  components: {
    Draggable
  },
  data() {
    const i18n_lang = this.$t('gameManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false,
        modalButton: false
      },
      isShow: 0,
      visible: {
        modal: false
      },
      columns: columns(this),
      allGame: [], // 所有游戏
      hotGame: [], // 热门游戏
      acrossGame: [], // 横板游戏
      mapColors: {},
      mapTxt: {}
    }
  },
  computed: {
    // 获取一级面板
    dataSource() {
      const hotGame = {
        name: this.i18n_lang.gameManage6,
        type: 'hot'
      }
      return [hotGame, ...this.acrossGame]
    },
    dragOptions() {
      return {
        animation: 0,
        group: { name: 'column', pull: 'clone', put: false },
        ghostClass: 'ghost',
        disabled: false
      }
    },
    // 排序
    sortOptions() {
      return {
        animation: 0,
        group: 'column',
        ghostClass: 'ghost'
        // disabled: true
      }
    }
  },
  created() {
    this.getData()
    this.getAllgame()
  },
  methods: {
    // 获取所有游戏
    async getAllgame() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game/across/hot',
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
      // 如果热门游戏没有子游戏，则排序他自己
      this.allGame = res.data
      this.allGame.forEach((o, i) => {
        this.mapColors[o.id] = colors[i]
        this.mapTxt[o.id] = txt[i]
      })
    },
    // 获取热门游戏
    async getHotgame() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game/hot',
        method: 'GET',
        params: {
          type: 'hot'
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
      this.hotGame = res.data
    },
    // 获取横板游戏
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game/across',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message,
          params: {
            type: 'p'
          }
        })
        return
      }
      this.acrossGame = res.data
    },
    // 默认显示第一个，点击切换显示
    handleShow(index) {
      console.log(index)
      this.isShow = index
    },
    // 交换元素
    async swapItems(current, target) {
      const data = this.acrossGame
      data[current] = data.splice(target, 1, data[current])[0]
      this.loading.page = true
      const req = this.acrossGame.map((o, i) => ({ id: o.id, across_sort: i + 1 }))
      const res = await this.$axios.request({
        url: '/game/across/sort',
        method: 'PUT',
        data: {
          data: req,
          type: 'p'
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    },
    // 关闭/开启游戏
    async handleStatus(row) {
      const res = await this.$axios.request({
        url: `/game/across/status`,
        method: 'PATCH',
        data: {
          id: row.id,
          across_status: row.across_status === 'enabled' ? 'disabled' : 'enabled',
          type: 'p'
        }
      })
      if (res.status !== 200) {
        return this.$msg({
          type: 'error',
          message: res.message
        })
      }
      this.$msg({
        type: 'success',
        message: res.message
      })
      this.getData()
    },
    // 移除元素
    delOption(index) {
      // 隐藏或推回原来的数组
      // this.hotGame.splice(index, 1)
      // console.log(this.hotGame)

      let item = this.hotGame[index]
      item = this.hotGame.splice(index, 1)[0]
      const parentGame = this.allGame.find(o => o.id === item.game_id)
      parentGame.childrens.push(item)
    },
    // 添加热门游戏
    addHotGame() {
      this.visible.modal = true
      this.getHotgame()
    },
    handleChange(val) {
      const arr = []
      this.hotGame = this.hotGame.filter(item => {
        if (arr.includes(item.id)) return false
        arr.push(item.id)
        return true
      })

      console.log(this.hotGame, '12313')
    },
    // 拖拽元素
    handleMove({ relatedContext, draggedContext }) {
      // console.log(draggedContext.element.id)
      // const ele = this.hotGame.find(item => item.id === draggedContext.element.id)
      // if (ele) {
      //   return false
      // } else {
      //   return true
      // }
    },
    async handleConfirm() {
      const hotGame = JSON.parse(JSON.stringify(this.hotGame))
      const allGame = JSON.parse(JSON.stringify(this.allGame))
      const sortHotGame = hotGame.map((o, i) => {
        return {
          id: o.id,
          across_sort: i + 1,
          is_hot: 1
        }
      })
      let games = []
      allGame.forEach(o => {
        games = games.concat(o.childrens)
      })
      const length = sortHotGame.length
      const unSortGame = games.map((o, i) => {
        if (o) {
          return {
            id: o.id,
            across_sort: length + i + 1,
            is_hot: 0
          }
        }
      })

      const req = {
        data: [...sortHotGame, ...unSortGame]
      }
      this.loading.modalButton = true
      const res = await this.$axios.request({
        url: '/game/hot',
        method: 'PUT',
        data: req
      })
      this.loading.modalButton = false
      if (res.status !== 200) {
        return this.$msg({
          type: 'error',
          message: res.message
        })
      }
      this.$msg({
        type: 'success',
        message: res.message
      })
      this.visible.modal = false
    },
    // 进入二级菜单
    subMenu(row) {
      this.$router.push({
        name: 'acrossSubMenu',
        query: {
          game: row.name,
          id: row.id,
          type: 'c'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
