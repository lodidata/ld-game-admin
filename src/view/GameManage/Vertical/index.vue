<template>
  <div id="VerticalGame" class="card">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Table border :columns="columns" :data="dataSource"></Table>
    <!-- 图标编辑 -->
    <Modal v-model="visible.imageModal" :title="i18n_lang.gameManage9" :width="600" :styles="{ top: '20px' }">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <UploadImg ref="uploadImg" v-model="gameIcon">
        <p>{{i18n_lang.gameManage18}}</p>
      </UploadImg>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleConfirmIcon">{{i18n_lang.gameManage14}}</Button>
        <Button @click="visible.modal = false">{{i18n_lang.gameManage15}}</Button>
      </div>
    </Modal>
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
    <!-- 名称编辑 -->
    <Modal v-model="visible.nameModal" :title="`${i18n_lang.gameManage48}`" :width="600" :styles="{ top: '20px' }">
      <Form
      ref="nameInfo"
      :model="nameInfo"
      :label-width="100"
      :rules="ruleNameValidate"
      >
        <FormItem :label="`${i18n_lang.gameManage49}`" prop="oldName">
          <Input v-model="nameInfo.oldName" disabled :placeholder="` `"/>
        </FormItem>
        <FormItem :label="`${i18n_lang.gameManage50}`" prop="newName">
          <Input v-model="nameInfo.newName" :placeholder="` `"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn" @click="nameSave()">{{i18n_lang.gameManage51}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns'
import Draggable from 'vuedraggable'
import UploadImg from '_c/UploadImg'

const colors = ['#8FCDDA', '#F2C047', '#C7D35E', '#DF7D81', '#B980AE', '#ADDDF7']
const txt = ['天美棋牌', 'TG棋牌', '开元棋牌', '新世界棋牌']
export default {
  components: {
    Draggable,
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('gameManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        modal: false,
        modalButton: false,
        imageModal: false,
        btn: false
      },
      isShow: 0,
      visible: {
        modal: false,
        imageModal: false,
        nameModal: false
      },
      columns: columns(this),
      allGame: [], // 所有游戏
      hotGame: [], // 热门游戏
      verticalGame: [], // 横板游戏
      mapColors: {},
      mapTxt: {},
      editId: '',
      gameIcon: '',
      nameInfo: {
        oldName: '',
        newName: ''
      },
      ruleNameValidate: {
        newName: [{ required: true, message: `${i18n_lang.gameManage52}`, trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 获取一级面板
    dataSource() {
      // const hotGame = {
      //   name: this.i18n_lang.gameManage6,
      //   type: 'hot'
      // }
      // return [hotGame, ...this.verticalGame]
      return [...this.verticalGame]
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
        // url: '/game/across/hot',
        url: '/game/hot',
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
    //获取竖版游戏
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game',
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
      this.verticalGame = res.data
    },
    // 默认显示第一个，点击切换显示
    handleShow(index) {
      this.isShow = index
    },
    // 交换元素
    async swapItems(current, target) {
      const data = this.verticalGame
      data[current] = data.splice(target, 1, data[current])[0]
      this.loading.page = true
      const req = this.verticalGame.map((o, i) => ({ id: o.id, sort: i + 1 }))
      const res = await this.$axios.request({
        url: '/game/sort',
        method: 'PUT',
        data: {
          data: req
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
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game',
        method: 'PATCH',
        data: {
          id: row.id,
          type: 'p',
          status: row.status === 'enabled' ? 'disabled' : 'enabled'
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
        // url: '/game/across/hot',
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
        name: 'verticalSubMenu',
        query: {
          game: row.name,
          id: row.id,
          type: 'c'
        }
      })
    },
    // 图标编辑
    handleEditIcon(row) {
      this.visible.imageModal = true
      this.editId = row ? row.id : ''
      this.gameIcon = row ? row.img : ''
    },
    // 确认按钮
    async handleConfirmIcon() {
      this.loading.modalButton = true
      // await this.$refs.uploadImg.upload()
      this.$nextTick(() => {
        this.sureEditIcon()
      })
    },
    // 确认编辑图标
    async sureEditIcon() {
      if (!this.gameIcon) {
        this.loading.modalButton = false
        return this.$msg({
          type: 'error',
          message: this.i18n_lang.gameManage16
        })
      }
      const req = {
        id: this.editId,
        type: 'p',
        img: this.gameIcon
      }
      // this.type === 'c' ? (req.img = this.gameIcon) : (req.game_img = this.gameIcon)
      const res = await this.$axios.request({
        url: '/game/img',
        method: 'POST',
        data: req
      })
      this.loading.modalButton = false
      this.visible.imageModal = false
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
    // 名称编辑
    handleEditName(row){
      this.nameInfo.newName = ''
      this.editId = row ? row.id : ''
      this.nameInfo.oldName = row.name ? row.name : ''
      this.visible.nameModal = true
    },
    // 名称编辑
    async nameSave(){
      this.$refs['nameInfo'].validate(async valid => {
        if (valid) {
          this.loading.btn = true
          const req = {
            type: 'p',
            name: this.nameInfo.newName
          }
          const res = await this.$axios.request({
            url: `/game/${this.editId}`,
            method: 'PUT',
            data: req
          })
          this.loading.btn = false
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
          this.visible.nameModal = false
          this.getData()
          this.getAllgame()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
