<template>
  <div id="QuesType">
    <Spin fix v-if="loading.page"></Spin>

    <Button type="primary" @click="handleEdit('')">{{i18n_lang.serviceSet18}}</Button>

    <div style="display:inline-block;margin-left:20px;">
      <span>{{i18n_lang.serviceSet19}}</span>
      <i-Switch v-model="changeOpenType" @on-change="changeType"/>
    </div>
    <Table :columns="columns" :data="dataSource" border style="margin-top:15px"></Table>

    <!-- 编辑 -->
    <Modal v-model="visible" :title="`${editType=='add'?i18n_lang.serviceSet20:i18n_lang.serviceSet21}${i18n_lang.serviceSet22}`" :width="600" @on-cancel="handleCloseModal">
      <Form v-if="visible" :model="editInfo" ref="editForm" :label-width="100" :rules="ruleValidate">
        <FormItem :label="i18n_lang.serviceSet23" prop="title">
          <Input v-model="editInfo.title"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.serviceSet24" prop="sort">
          <Input v-model="editInfo.sort"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.serviceSet25" prop="isOpen">
          <Select v-model="editInfo.isOpen" style="width:200px">
            <Option :value="1">{{i18n_lang.serviceSet26}}</Option>
            <Option :value="0">{{i18n_lang.serviceSet27}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer" class="footer">
        <Button @click="handleCloseModal">{{i18n_lang.serviceSet28}}</Button>
        <Button type="primary" @click="handleSave" :loading="loading.btn">{{i18n_lang.serviceSet29}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import config from '@/config'
import { formBuilder } from '@/libs/util'

const initEdit = {
  title: '',
  isOpen: ''
}
import columns from './columns/QuesType.js'
export default {
  data() {
    const i18n_lang = this.$t('serviceSet');
    return {
      i18n_lang: i18n_lang,
      dataSource: [],
      columns: columns(this),
      loading: {
        page: false,
        btn: false
      },
      editType: 'edit',
      editInfo: {
        ...initEdit
      },
      visible: false,
      ruleValidate: {
        title: [{ required: true, message: i18n_lang.serviceSet30 }],
        sort: [{ required: true, message: i18n_lang.serviceSet31 }],
        isOpen: [{ required: true, message: i18n_lang.serviceSet32 }]
      },
      changeOpenType: '' // 是否开启问题分类
    }
  },
  created() {
    this.getData()
    this.getClient()
  },
  methods: {
    // 修改开关状态
    async changeType(val) {
      this.loading.page = true
      const req = {
        problemSwitch: Number(val),
        nodeId: config.nodeId
      }
      const res = await this.$axios.request({
        url: '/problem/switch',
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
    },
    // 获取数据
    async getData(index) {
      this.loading.page = true
      this.dataSource = []
      const res = await this.$axios.request({
        url: '/problem/list',
        method: 'GET',
        baseURL: config.imReqUrl,
        params: {
          nodeId: config.nodeId
        }
      })
      this.loading.page = false

      if (res.status !== 200) {
        this.$Message.error(res.msg)
      } else {
        this.dataSource = res.data
      }
    },
    // 获取客服信息
    async getClient() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/client/get',
        baseURL: config.imReqUrl,
        method: 'GET',
        params: {
          nodeId: config.nodeId
        }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.msg)
      } else {
        this.changeOpenType = !!res.data.problemSwitch
      }
    },
    // 编辑
    handleEdit(row) {
      this.editType = row ? 'edit' : 'add'
      this.visible = true
      this.editInfo = { ...initEdit }
      if (row) {
        this.editType = 'edit'
        const editInfo = { ...row }
        delete editInfo._index
        delete editInfo._rowKey
        this.editInfo = editInfo
      }
    },
    handleCloseModal() {
      this.$refs['editForm'].resetFields()
      this.visible = false
    },
    handleSave(row) {
      this.$refs['editForm'].validate(async valid => {
        if (!valid) return
        const req = {
          ...this.editInfo
        }
        let url, method
        if (this.editType === 'add') {
          method = 'POST'
          url = '/problem/create'
          req.nodeId = config.nodeId
        } else {
          method = 'PUT'
          url = '/problem/update'
        }
        req.sort = Number(req.sort)
        if (isNaN(req.sort)) return this.$Message.error(this.i18n_lang.serviceSet34)

        this.loading.btn = true
        const res = await this.$axios.request({
          url,
          method,
          baseURL: config.imReqUrl,
          data: formBuilder(req)
        })
        this.loading.btn = false
        if (res.status !== 200) {
          this.$Message.error(res.msg)
        } else {
          this.visible = false
          this.$Message.success(res.msg || this.i18n_lang.serviceSet33)
          this.getData()
        }
      })
    },
    // 修改状态
    async handleStatus(row) {
      this.loading.page = true
      const req = {
        title: row.title,
        sort: row.sort,
        isOpen: !row.isOpen,
        id: row.id
      }
      const res = await this.$axios.request({
        url: '/problem/update',
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
    },
    // 删除
    async handleDel(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/servicemanage/other/questions/${row.id}`,
        method: 'DELETE'
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
