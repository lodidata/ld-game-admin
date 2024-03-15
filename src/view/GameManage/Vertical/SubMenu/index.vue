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
        maintainButton: false,
        btn: false
      },
      visible: {
        modal: false,
        maintain: false,
        nameModal: false
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
      rowId: "",
      nameInfo: {
        oldName: '',
        newName: ''
      },
      ruleNameValidate: {
        newName: [{ required: true, message: `${i18n_lang.gameManage52}`, trigger: 'blur' }]
      }
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
      this.type === 'c' ? (req.pid = this.pid) : (req.game_id = this.pid)
      const res = await this.$axios.request({
        url: '/game',
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
      const req = this.dataSource.map((o, i) => ({ id: o.id, sort: i + 1 }))
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
      const res = await this.$axios.request({
        url: `/game`,
        method: 'PATCH',
        data: {
          id: row.id,
          status: row.status === 'enabled' ? 'disabled' : 'enabled',
          type: this.type
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
      console.log(row)
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
      this.type === 'c' ? (req.img = this.gameIcon) : (req.game_img = this.gameIcon)
      const res = await this.$axios.request({
        url: '/game/img',
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
      localSave('gameManageTab', 'vertical')
      this.$router.go(-1)
    },
    // 进入上级菜单
    subMenu(row) {
      this.$router.push({
        name: 'verticalSubMenu',
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
            type: this.type,
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
          // this.getAllgame()
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
