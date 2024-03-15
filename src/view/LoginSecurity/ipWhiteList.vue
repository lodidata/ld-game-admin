<template>
  <div id="LoginWhiteList" class="loginWhiteListWrapper">
    <Form>
      <FormItem :label="i18n_lang.loginSecurity12">
        <RadioGroup v-model="isOpen" style="margin-top: -5px" @on-change="onChange">
          <Radio label="open">{{i18n_lang.loginSecurity3}}</Radio>
          <Radio label="close">{{i18n_lang.loginSecurity4}}</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <Card>
      <div class="formWrapper">
        <p class="ip">
          <span class="currentIp">{{i18n_lang.loginSecurity13}}</span> <span>{{ currentIp }}</span>
        </p>
        <div class="query">
          <Form :model="ipWhiteForm" label-position="left" :label-width="60" inline>
            <Row>
              <Col>
                <FormItem :label="i18n_lang.loginSecurity14" style="margin-bottom: 10px">
                  <Input v-model="ipWhiteForm.ip" class="ipInput" :placeholder="i18n_lang.loginSecurity15" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem style="margin-bottom: 0;">
                  <Button type="primary" icon="ios-search" @click="doQuery('query')">{{i18n_lang.loginSecurity16}}</Button>
                </FormItem>
              </Col>
            </Row>
           </Form>
        </div>
      </div>
    </Card>
    <div class="content">
      <div class="addIp"><Button type="primary" icon="md-add" @click="addIp">{{i18n_lang.loginSecurity17}}</Button></div>
      <MyTable
        :columns="columns"
        :data="dataSource"
        :loading="isLoadingTable"
        border
        style="margin-top: 20px"
      >
      </MyTable>
      <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.loginSecurity49}${page.total}${i18n_lang.loginSecurity50}` }}</div>
    </div>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      show-sizer
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    ></Page>
    <Modal v-model="addModal" width="600" closable :title="modalTitle">
      <Form v-if="addModal" ref="submitForm" :model="submitForm" :label-width="80" :rules="submitRules">
        <FormItem :label="i18n_lang.loginSecurity14" prop="ip">
          <Input v-model="submitForm.ip" :placeholder="i18n_lang.loginSecurity15" />
        </FormItem>
        <FormItem :label="i18n_lang.loginSecurity18" prop="mark">
          <Input v-model="submitForm.mark" type="textarea" :placeholder="i18n_lang.loginSecurity19" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="addModal = false">{{i18n_lang.loginSecurity20}}</Button>
        <Button type="primary" :loading="loading" @click="onOkModal">{{i18n_lang.loginSecurity21}}</Button>
      </div>
    </Modal>
    <Modal v-model="removeModal" :title="i18n_lang.loginSecurity22">
      <p>{{ page.currentPage === 1 && dataSource && dataSource.length === 1 && isOpen === 'open' ? i18n_lang.loginSecurity23 : `${i18n_lang.loginSecurity24}${currentRow && currentRow.ip}` }}</p>
      <div slot="footer">
        <Button type="text" @click="removeModal = false">{{i18n_lang.loginSecurity20}}</Button>
        <Button type="primary" :disabled="page.currentPage === 1 && dataSource && dataSource.length === 1 && isOpen === 'open'" @click="onRemoveModal">{{i18n_lang.loginSecurity21}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import columns from './columns/ipWhiteList'
export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('loginSecurity');
    const validatorIp = (rule, value, callback) => {
      const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g
      const isIp = value.match(reg)
      if (!isIp) {
        callback(new Error(i18n_lang.loginSecurity25))
      } else {
        callback()
      }
    }
    return {
      i18n_lang: i18n_lang,
      currentIp: '',
      ipWhiteForm: {
        ip: ''
      },
      submitRules: {
        // 规则校验
        ip: [{ validator: validatorIp, required: true, trigger: 'blur' }],
        mark: [{ max: 100, message: i18n_lang.loginSecurity26, trigger: 'blur' }]
      },
      columns: columns(this),
      dataSource: [],
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      submitForm: {
        // 新增或者修改的数据
        ip: '',
        remark: ''
      },
      addModal: false, // 控制新增或者修改modal框
      modalTitle: i18n_lang.loginSecurity27,
      modalType: 1, // 1 为新增 2 为修改
      currentRowIndex: 0, // 当前行的index索引
      loading: false, // 按钮加载的状态
      isLoadingTable: false, // 是否在重新加载table
      removeModal: false, // 控制删除modal框,
      currentRow: null, // 当前行数据
      isOpen: ''
    }
  },
  watch: {},
  created() {
    this.doQuery()
    this.getIpWhiteSwitch()
  },
  methods: {
    // 设置页码
    changePage(currentPage) {
      this.page.currentPage = currentPage
      this.doQuery()
    },
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.doQuery()
    },
    async doQuery(type) {
      if (type === 'query') {
        this.page.currentPage = 1
      }
      this.isLoadingTable = true
      const res = await this.$axios.request({
        url: '/ip/limit',
        method: 'GET',
        params: {
          ip: this.ipWhiteForm.ip,
          page: this.page.currentPage,
          page_size: this.page.pageSize
        }
      })
      if (res.state === 0) {
        this.page.total = res.attributes && res.attributes.total ? res.attributes.total : 0
        this.dataSource = res.data.list
        this.currentIp = res.data.ip
        this.isLoadingTable = false
      }
    },
    // 新增白名单框
    addIp() {
      this.addModal = true
      this.modalTitle = this.i18n_lang.loginSecurity27
      this.modalType = 1
      this.submitForm.ip = ''
      this.submitForm.mark = ''
    },
    // 编辑白名单框
    edit(row, index) {
      this.modalTitle = this.i18n_lang.loginSecurity28
      this.addModal = true
      this.modalType = 2
      this.currentRowIndex = index
      this.submitForm.ip = row.ip
      this.submitForm.mark = row.mark
      this.currentRow = row
    },
    // 点击新增或者修改白名单框的确认按钮
    onOkModal() {
      this.$refs.submitForm.validate(valid => {
        if (!valid) {
          return false
        }
        if (this.modalType === 2) {
          this.refreshData(2)
        } else {
          this.refreshData()
        }
      })
    },
    /**
     * @param type 1 默认值代表新增 2 代表修改 3代表删除
     */
    async refreshData(type = 1) {
      const queryUrl = type === 1 ? '/ip/limit' : `/ip/limit/${this.currentRow.id}`
      const req =
        type === 3
          ? null
          : {
            ip: this.submitForm.ip,
            mark: this.submitForm.mark
          }
      const res = await this.$axios.request({
        url: queryUrl,
        method: type === 1 ? 'POST' : type === 2 ? 'PATCH' : 'DELETE',
        data: req
      })
      if (res.state === 0) {
        if (type === 3) {
          if (this.dataSource.length === 1 && this.page.currentPage > 1) {
            this.page.currentPage -= 1
          }
        }
        this.doQuery()
        this.addModal = false
        this.removeModal = false
        this.$msg({
          type: 'success',
          message: this.i18n_lang.loginSecurity29
        })
      } else {
        this.$msg({
          type: 'error',
          message: res.message
        })
      }
    },
    // 打开删除白名单框
    remove(row, index) {
      this.removeModal = true
      this.submitForm.ip = row.ip
      this.submitForm.mark = row.mark
      this.currentRowIndex = index
      this.currentRow = row
    },
    // 点击删除白名单框的确认按钮
    onRemoveModal() {
      if (
        this.page.currentPage === 1 &&
        this.dataSource &&
        this.dataSource.length === 1 &&
        this.isOpen === 'open'
      ) {
        return
      }
      this.refreshData(3)
    },
    async onChange(value) {
      if (!this.dataSource || this.dataSource.length < 1) {
        this.$Message.warning(this.i18n_lang.loginSecurity30)
        this.isOpen = 'close'
        return
      }
      const result = await this.$axios.request({
        url: '/ip/switch',
        method: 'PUT',
        data: {
          switch: value === 'open'
        }
      })
      if (result.state === 0) {
        this.$msg({
          type: 'success',
          message: `${this.i18n_lang.loginSecurity8}${value === 'open' ? this.i18n_lang.loginSecurity3 : this.i18n_lang.loginSecurity4}${this.i18n_lang.loginSecurity31}`
        })
      }
    },
    async getIpWhiteSwitch() {
      const res = await this.$axios.request({
        url: '/ip/switch',
        method: 'GET'
      })
      if (res.state === 0) {
        this.isOpen = res.data.switch ? 'open' : 'close'
      }
    }
  }
}
</script>
