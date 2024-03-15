<template>
  <div id="SubMenu" class="card">
    <Button style="margin-bottom: 15px;" @click="backGameSort">{{i18n_lang.gameManage17}}</Button>
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Table border :columns="columns" :data="dataSource"></Table>
    <!-- 图标编辑 -->
    <Modal v-model="visible.modal" :title="i18n_lang.gameManage9" :width="600" :styles="{ top: '20px' }">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <UploadImg ref="uploadImg" v-model="gameIcon">
        <p>{{i18n_lang.gameManage18}}</p>
      </UploadImg>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleConfirm">{{i18n_lang.gameManage14}}</Button>
        <Button @click="visible.modal = false">{{i18n_lang.gameManage15}}</Button>
      </div>
    </Modal>
    <!-- 设置维护 -->
    <Modal v-model="visible.maintain" :title="i18n_lang.gameManage39" :width="600" :styles="{ top: '66px' }" :footer-hide="true">
      <Form ref="maintainForm" :model="form" :rules="ruleValidate" :label-width="100">
        <FormItem :label="i18n_lang.gameManage40" prop="m_start_time">
          <DatePicker
            v-model="form.m_start_time"
            type="datetime"
            :placeholder="i18n_lang.gameManage41"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="changeTtartTime"
          >
          </DatePicker>
        </FormItem>
        <FormItem :label="i18n_lang.gameManage42" prop="m_end_time">
          <DatePicker
            v-model="form.m_end_time"
            type="datetime"
            :placeholder="i18n_lang.gameManage43"
            format="yyyy-MM-dd HH:mm:ss"
            @on-change="changeEndTime"
          >
          </DatePicker>
        </FormItem>
      </Form>
      <div class="PopBtn">
        <Button type="primary" :loading="loading.maintainButton" @click="saveMaintainData()">{{i18n_lang.gameManage44}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { secondLevel, threeLevel } from './columns'
import UploadImg from '_c/UploadImg'
import { localSave } from '@/libs/util'

export default {
  name: 'SubMenu',
  components: {
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('gameManage');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false,
        modalButton: false,
        maintainButton: false
      },
      visible: {
        modal: false,
        maintain: false
      },
      columns: [],
      dataSource: [],
      game: '', // 游戏所属
      pid: '', // 一级菜单 id
      gameIcon: '', // 游戏图标
      type: 'c', // 默认为二级菜单 c/cs
      editId: '' ,// 编辑游戏的id
      form: {
        m_start_time: '',
        m_end_time: ''
      },
      ruleValidate: {
        m_start_time: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (this.form.m_start_time === '') {
                return cb(i18n_lang.gameManage41)
              } else {
                return cb()
              }
            }
          }
        ],
        m_end_time: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (this.form.m_end_time === '') {
                return cb(i18n_lang.gameManage43)
              } else {
                return cb()
              }
            }
          }
        ]
      },
      rowId: ""
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const { game, id, type } = this.$route.query
      this.game = game
      this.pid = id
      this.type = type
      if (Number(id) === 15 || Number(id) === 47) {
        this.columns = this.type === 'c' ? secondLevel(this) : threeLevel(this)
      } else {
        this.columns = this.type === 'c' ? secondLevel(this).filter(item => item.title !== this.i18n_lang.gameManage25) : threeLevel(this).filter(item => item.title !== this.i18n_lang.gameManage25)
      }
      this.getData()
    },
    async getData() {
      if (!this.pid) return
      this.loading.page = true
      const req = {
        type: this.type
      }
      let pid = ''
      if(this.type !== 'c'){
        this.pid.forEach((item, index) => {
          pid += index == 0 ? `${item}` : `,${item}`
        })
      }
      this.type === 'c' ? '' : (req.game_id = pid)
      const res = await this.$axios.request({
        url: '/game/newHot',
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
      this.dataSource = res.data
    },
    // 交换元素
    async swapItems(current, target) {
      const data = this.dataSource
      data[current] = data.splice(target, 1, data[current])[0]

      this.loading.page = true
      let req
      if(this.type === 'c'){
        req = this.dataSource.map((o, i) => ({ alias: o.alias, hot_sort: i + 1 }))
      }else{
        req = this.dataSource.map((o, i) => ({ id: o.id, hot_sort: i + 1 }))
      }
      // const req = this.dataSource.map((o, i) => ({ id: o.id, hot_sort: i + 1 }))
      const res = await this.$axios.request({
        url: '/game/sort',
        method: 'PUT',
        data: {
          data: req,
          type: this.type
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
    // 开启/关闭游戏
    async handleStatus(row) {
      this.loading.page = true
      let req = {
        status: row.status === 'enabled' ? 'disabled' : 'enabled',
        type: this.type
      }
      if(this.type === 'c'){
        req.alias = row.alias
      }else{
        req.id = row.id
      }
      const res = await this.$axios.request({
        url: `/game/newHot`,
        method: 'PATCH',
        data: {
          // id: this.type === 'c' ? row.alias : row.id,
          ...req
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
      this.$msg({
        type: 'success',
        message: `${this.i18n_lang.gameManage19}${row.status === 'enabled' ? this.i18n_lang.gameManage20 : this.i18n_lang.gameManage21}`
      })
      this.getData()
    },
    // 图标编辑
    handleEditIcon(row) {
      this.visible.modal = true
      this.editId = row.id
      this.gameIcon = row.img
    },
    // 确认按钮
    async handleConfirm() {
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
        type: this.type
      }
      req.hot_img = this.gameIcon
      // this.type === 'c' ? (req.img = this.gameIcon) : (req.game_img = this.gameIcon)
      const res = await this.$axios.request({
        url: '/game/newHot',
        method: 'POST',
        data: req
      })
      this.loading.modalButton = false
      this.visible.modal = false
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
    backGameSort() {
      localSave('gameManageTab', 'hot')
      this.$router.go(-1)
    },
    // 进入上级菜单
    subMenu(row) {
      this.$router.push({
        name: 'hotSubMenu',
        query: {
          game: row.name,
          id: row.id,
          type: 'cs'
        }
      })
    },
    //设置维护
    handleMaintain(row) {
      this.rowId = row.id
      this.visible.maintain = true
    },
    // 调整修改上传时间格式
    changeDate(dateA) {
      let dateee = new Date(dateA).toJSON();
      let date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
      return date;
    },
    // 设置维护开始时间
    changeTtartTime(date){
      this.form.m_start_time = date
    },
    // 设置维护结束时间
    changeEndTime(date){
      this.form.m_end_time = date
    },
    // 设置维护时间提交保存
    saveMaintainData(){
      this.$refs['maintainForm'].validate(async valid => {
        if(valid){
          this.loading.maintainButton = true
          const res = await this.$axios.request({
            url: `/game/across/${this.rowId}`,
            method: 'PUT',
            params: this.form
          })
          this.loading.maintainButton = false
          if (res.status !== 200) {
            this.$msg({
              type: 'error',
              message: res.message
            })
            return
          }
          this.rowId = ''
          this.visible.maintain = false
          this.init()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.hidden {
  opacity: 0;
  visibility: hidden;
  cursor: auto;
}
/deep/.thumb {
  width: 60px;
}
.title{
  line-height: 30px;
}
.PopBtn{
  text-align: center;
  &>Button{
    width: 120px;
  }
}
</style>
