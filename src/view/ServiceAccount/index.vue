<template>
  <div id="ServiceAccount">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="table-box">
      <div class="table-head">
        <p>{{i18n_lang.serviceAccount0}}</p>
        <Button class="addcon" @click="addAccount('qq')">{{i18n_lang.serviceAccount1}}</Button>
      </div>
      <Table class="table" border :columns="columns.qq" :data="dataSource.qq"></Table>
    </div>
    <div class="table-box">
      <div class="table-head">
        <p>{{i18n_lang.serviceAccount2}}</p>
        <Button class="addcon" @click="addAccount('wechat')">{{i18n_lang.serviceAccount3}}</Button>
      </div>
      <Table class="table" border :columns="columns.wechat" :data="dataSource.wechat"></Table>
    </div>

    <!-- 编辑/新增 -->
    <Modal
      v-model="visible.modal"
      :title="`${editType === 'add' ? i18n_lang.serviceAccount4 : i18n_lang.serviceAccount5}${editInfo.type === 'qq' ? 'QQ' : i18n_lang.serviceAccount6}${i18n_lang.serviceAccount7}`"
      :width="600"
      :styles="{ top: '20px' }"
      @on-cancel="handleCloseModal"
    >
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <Form
        v-if="visible.modal"
        ref="editForm"
        :model="editInfo"
        label-position="top"
        :rules="ruleValidate"
      >
        <FormItem :label="editInfo.type === 'qq' ? i18n_lang.serviceAccount8 : i18n_lang.serviceAccount9" prop="account">
          <Input v-model="editInfo.account"/>
        </FormItem>
        <FormItem :label="i18n_lang.serviceAccount10" prop="name">
          <Input v-model="editInfo.name"/>
        </FormItem>
        <FormItem :label="i18n_lang.serviceAccount11" prop="avatar">
          <UploadImg ref="uploadImg" v-model="editInfo.avatar"></UploadImg>
        </FormItem>
        <FormItem :label="i18n_lang.serviceAccount12" prop="status">
          <RadioGroup v-model="editInfo.status">
            <Radio :label="1">{{i18n_lang.serviceAccount13}}</Radio>
            <Radio :label="2">{{i18n_lang.serviceAccount14}}</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.modalButton" @click="handleConfirm">{{i18n_lang.serviceAccount15}}</Button>
        <Button @click="cancel">{{i18n_lang.serviceAccount16}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import UploadImg from '_c/UploadImg'
import columns from './columns'

const initAccount = {
  type: 'qq', // 账户类型
  account: '', // 账户
  name: '', // 昵称
  avatar: '', // 头像
  status: 1 // 状态
}

export default {
  name: 'ServiceAccount',
  components: {
    UploadImg
  },
  data() {
    const i18n_lang = this.$t('serviceAccount');
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
      dataSource: {
        qq: [],
        wechat: []
      },
      columns: {
        qq: columns(this, 'qq'),
        wechat: columns(this, 'wechat')
      },
      editType: 'add', // 编辑类型 add/edit
      editInfo: { ...initAccount }, // 编辑信息
      ruleValidate: {
        account: [
          {
            required: true,
            validator: (rule, value, cb) => (value.trim() ? cb() : cb(i18n_lang.serviceAccount17))
          }
        ],
        name: [
          {
            required: true,
            validator: (rule, value, cb) => (value.trim() ? cb() : cb(i18n_lang.serviceAccount18))
          }
        ],
        avatar: [{ required: true, message: i18n_lang.serviceAccount19 }],
        status: [{ required: true, message: i18n_lang.serviceAccount20 }]
      }
    }
  },
  created() {
    this.getData('qq')
    this.getData('wechat')
  },
  methods: {
    // 获取数据
    async getData(type) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/servicemanage/account',
        method: 'GET',
        params: {
          type
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
      this.dataSource[type] = res.data
    },
    // 新增客服账号
    addAccount(type) {
      this.handleOpenModal(type)
    },
    // 打开 modal
    async handleOpenModal(type, data) {
      this.editType = data ? 'edit' : 'add'
      this.editInfo = Object.assign({}, data || initAccount)
      this.editInfo.type = type
      this.visible.modal = !this.visible.modal
    },
    cancel() {
      this.visible.modal = false
      this.handleCloseModal()
    },
    // 关闭 modal
    handleCloseModal() {
      this.$refs['editForm'].resetFields()
    },
    // 确认按钮
    async handleConfirm() {
      this.loading.modalButton = true
      // await this.$refs.uploadImg.upload()
      this.$nextTick(() => {
        this.editType === 'add' ? this.addServicer() : this.editServicer()
      })
    },
    // 新增
    addServicer() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.modalButton = false
          return
        }
        const req = { ...this.editInfo }
        const res = await this.$axios.request({
          url: '/servicemanage/account',
          method: 'POST',
          data: req
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData(req.type)
      })
    },
    // 编辑
    editServicer() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.modalButton = false
          return
        }
        const req = { ...this.editInfo }
        const res = await this.$axios.request({
          url: `/servicemanage/account/${this.editInfo.id}`,
          method: 'PUT',
          data: req
        })
        this.loading.modalButton = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData(req.type)
      })
    },
    // 启用/停用
    async handleStop(type, row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/servicemanage/account/${row.id}`,
        method: 'PUT',
        data: {
          ...row,
          status: row.status === 1 ? 2 : 1
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData(type)
    },
    // 删除
    async deleteServicer(type, row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/servicemanage/account/${row.id}`,
        method: 'DELETE'
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData(type)
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
