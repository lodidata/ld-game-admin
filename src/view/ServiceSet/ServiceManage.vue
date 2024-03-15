<template>
  <div id="ServiceManage">
    <Spin v-if="loading.page" fix></Spin>
    <Table :columns="columns" :data="dataSource" border></Table>
    <Page
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @on-change="getData"
      @on-page-size-change="changePageSize"
    ></Page>

    <!-- 编辑 -->
    <Modal v-model="visible" :title="i18n_lang.serviceSet35" :width="600" :styles="{top: '20px'}" @on-cancel="handleCloseModal">
      <Form v-if="visible" ref="editForm" :model="editInfo" :label-width="100" :rules="ruleValidate">
        <FormItem :label="i18n_lang.serviceSet36">
          <Input v-model="editInfo.thirdPartyId" disabled></Input>
        </FormItem>
        <FormItem :label="i18n_lang.serviceSet37" prop="nickname">
          <Input v-model="editInfo.nickname"></Input>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="handleCloseModal">{{i18n_lang.serviceSet38}}</Button>
        <Button type="primary" :loading="loading.btn" @click="handleSave">{{i18n_lang.serviceSet39}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import columns from './columns/ServiceManage.js'
import config from '@/config'
import { formBuilder } from '@/libs/util'

export default {
  data() {
    const i18n_lang = this.$t('serviceSet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btn: false
      },
      visible: false,
      dataSource: [],
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      columns: columns(this),
      ruleValidate: {
        nickname: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== '') {
                if (/[`~!@#$%^&*()_+<>?:"{},.\/'[\]]/.test(value)) {
                  callback(new Error(i18n_lang.serviceSet40))
                }
                callback()
              } else {
                callback(new Error(i18n_lang.serviceSet41))
              }
            }
          }
        ]
      },
      editInfo: {
        thirdPartyId: '',
        nickname: '',
        id: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 分页
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(index) {
      this.page.currentPage = index || 1

      this.loading.page = true
      this.dataSource = []

      const query = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      }

      const res = await this.$axios.request({
        url: '/service/list',
        method: 'GET',
        baseURL: config.imReqUrl,
        params: {
          nodeId: config.nodeId,
          ...query
        }
      })

      this.loading.page = false

      if (res.status !== 200) {
        this.$Message.error(res.msg)
      } else {
        this.page.total = res.attributes ? res.attributes.total : 0
        this.dataSource = res.data
      }
    },
    // 修改名称
    handleEdit(row) {
      this.visible = true
      this.editInfo.thirdPartyId = row.thirdPartyId
      this.editInfo.nickname = row.nickname
      this.editInfo.id = row.id
    },
    handleCloseModal() {
      this.visible = false
      this.$refs['editForm'].resetFields()
    },
    handleSave() {
      this.loading.btn = true
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.btn.modal = false
        } else {
          const req = {
            id: this.editInfo.id,
            nickname: this.editInfo.nickname
          }
          const res = await this.$axios.request({
            url: '/service/update/nickname',
            method: 'PUT',
            baseURL: config.imReqUrl,
            data: formBuilder(req)
          })
          this.loading.btn = false
          if (res.status !== 200) {
            this.$Message.error(res.msg)
          } else {
            this.$Message.success(res.msg || this.i18n_lang.serviceSet33)
            this.visible = false
            this.getData()
          }
        }
      })
    },

    // 启用/停用
    async handleStatus(row) {
      this.loading.page = true
      const req = {
        state: !row.state,
        id: row.id
      }
      const res = await this.$axios.request({
        url: '/service/update/state',
        method: 'PUT',
        baseURL: config.imReqUrl,
        data: formBuilder(req)
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.msg)
      } else {
        this.$Message.success(res.msg || this.i18n_lang.serviceSet33)
        this.getData()
      }
    }
  }
}
</script>
