<template>
  <div id="Bank">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Button style="margin-bottom:10px" icon="md-add" type="primary" @click="handleOpenModal('')">
      <span>{{i18n_lang.components38}}</span>
    </Button>
    <Table border :columns="columns" :data="dataSource"></Table>
    <!-- 编辑/新增 -->
    <Modal v-model="visible.modal" :title="`${editType === 'add' ? i18n_lang.components39 : i18n_lang.components40}${i18n_lang.components41}`" :width="600">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <Form
        v-if="visible.modal"
        ref="editForm"
        :model="editInfo"
        label-position="top"
        :rules="ruleValidate"
      >
        <FormItem :label="i18n_lang.components42" prop="bank_id">
          <Select
            v-model="editInfo.bank_id"
            :placeholder="i18n_lang.components43"
            filterable
            remote
            :remote-method="filterBank"
          >
            <Option v-for="(it, i) in bankList" :key="i" :value="it.id">{{ it.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label="i18n_lang.components44" prop="accountname">
          <Input v-model="editInfo.accountname"/>
        </FormItem>
        <FormItem :label="i18n_lang.components45" prop="card">
          <Input v-model="editInfo.card"/>
        </FormItem>
        <FormItem :label="i18n_lang.components46" prop="address">
          <Input v-model="editInfo.address"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          :loading="loading.btn.modal"
          @click="editType === 'add' ? addCard() : editCard()"
        >
          <span>{{i18n_lang.components47}}</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns/bank'
export default {
  props: ['id'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modal: false,
        btn: {
          modal: false
        }
      },
      visible: {
        modal: false
      },
      columns: columns(this),
      dataSource: [],
      bankList: [],
      filterBankList: [],
      editInfo: {
        bank_id: '', // 银行
        accountname: '', // 户名
        card: '', // 账号
        address: '' // 开户行
      },
      editType: 'add',
      ruleValidate: {
        bank_id: [{ required: true, message: i18n_lang.components48 }],
        accountname: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
				// !/^[\u4E00-\u9FA5\uf900-\ufa2d·]{2,15}$/.test(value)
                if (value.length > 100 || value.includes('··')) {
                  callback(new Error(i18n_lang.components49))
                }
                callback()
              } else {
                callback(new Error(i18n_lang.components50))
              }
            }
          }
        ],
        card: [{ required: true, message: i18n_lang.components51 }],
        address: [{ required: true, message: i18n_lang.components52 }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/info/${this.id}?type=bank`,
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
      this.dataSource = res.data.filter(x => x.state !== 'delete')
    },
    // 打开
    async handleOpenModal(row) {
      this.editType = row ? 'edit' : 'add'
      this.editInfo = Object.assign(
        {},
        row || {
          bank_id: '', // 银行
          accountname: '', // 户名
          card: '', // 账号
          address: '' // 开户行
        }
      )
      this.visible.modal = true
      if (!this.bankList.length) {
        await this.getBankList()
      }
    },
    // 获取所有银行列表
    async getBankList() {
      this.loading.modal = true
      const res = await this.$axios.request({
        url: '/banks',
        method: 'GET'
      })
      this.loading.modal = false
      this.bankList = res.data
      this.filterBankList = [...this.bankList]
    },
    filterBank(query) {
      if (query === '') {
        this.filterBankList = [...this.bankList]
      } else {
        const list = this.bankList.filter(o => o.name.includes(query))
        this.filterBankList = list
      }
    },
    // 新增银行卡
    async addCard() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) return
        this.loading.btn.modal = true
        const req = {
          ...this.editInfo,
          uid: this.id
        }
        const res = await this.$axios.request({
          url: '/user/info/bank',
          method: 'POST',
          data: req
        })
        this.loading.btn.modal = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData()
      })
    },
    // 修改银行卡
    async editCard() {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) return
        this.loading.btn.modal = true
        const req = {
          bank_id: this.editInfo.bank_id,
          accountname: this.editInfo.accountname,
          card: this.editInfo.card,
          address: this.editInfo.address
        }
        const res = await this.$axios.request({
          url: `/user/info/bank/${this.editInfo.id}`,
          method: 'PUT',
          data: req
        })
        this.loading.btn.modal = false
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.visible.modal = false
        this.getData()
      })
    },
    // 启用1/停用0
    async changeState(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/info/bank/${row.id}`,
        method: 'PATCH',
        data: {
          status: row.state === 'enabled' ? 0 : 1
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
    async delBankById(id) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/info/bank/${id}`,
        method: 'delete'
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Bank {
  position: relative;
  min-height: 300px;
  /deep/.enabled {
    color: #13ce66;
  }
  /deep/.disabled {
    color: #ff4949;
  }
}
</style>
