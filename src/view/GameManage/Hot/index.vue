<template>
  <div>
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
  import UploadImg from '_c/UploadImg'
  export default {
    data() {
      const i18n_lang = this.$t('gameManage');
      return {
        i18n_lang: i18n_lang,
        columns: columns(this),
        loading: {
          btn: false
        },
        visible: {
          imageModal: false,
          nameModal: false
        },
        dataSource: [],
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
    created() {
      this.getHotgame()
    },
    components: {
      UploadImg
    },
    methods: {
      // 进入二级菜单
      subMenu(row) {
        this.$router.push({
          name: 'hotSubMenu',
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
      // 名称编辑
      handleEditName(row){
        this.editId = row ? row.id : ''
        this.nameInfo.oldName = row.name ? row.name : ''
        this.visible.nameModal = true
      },
      // 获取热门游戏
      async getHotgame() {
        this.loading.page = true
        const res = await this.$axios.request({
          url: '/game/newHot',
          method: 'GET',
          params: {
            // type: 'hot'
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
        this.dataSource = res.data
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
          url: '/game/newHot',
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
        this.getHotgame()
      },
      // 名称编辑
      async nameSave(){
        this.$refs['nameInfo'].validate(async valid => {
          if (valid) {
            this.loading.btn = true
            const req = {
              id: this.editId,
              type: 'p',
              name: this.nameInfo.newName
            }
            const res = await this.$axios.request({
              url: '/game/newHot/name',
              method: 'POST',
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
            this.getHotgame()
          }
        })
      },
      // 开启/关闭游戏
      async handleStatus(row) {
        this.loading.page = true
        const res = await this.$axios.request({
          url: `/game/newHot`,
          method: 'PATCH',
          data: {
            alias: row.alias,
            status: row.status === 'enabled' ? 'disabled' : 'enabled',
            type: 'p'
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
        this.getHotgame()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
