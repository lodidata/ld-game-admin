<template>
  <div id="MessageManage">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div class="query_con">
        <div class="item">
          <span>{{i18n_lang.messageManage0}}</span>
          <Input v-model="query.title" :placeholder="i18n_lang.messageManage1" style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.messageManage2}}</span>
          <Input v-model="query.admin_name" :placeholder="i18n_lang.messageManage3" style="width: 100px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.messageManage34}}</span>
          <Input v-model="query.recipient" :placeholder="`${i18n_lang.messageManage35}`" style="width: 150px" />
        </div>
        <div class="item">
          <span>{{i18n_lang.messageManage4}}</span>
          <DatePicker
            v-model="query.start_time"
            :options="dateOpt"
            :editable="false"
            type="date"
            placeholder=""
            style="width: 120px"
          ></DatePicker>
          <span>-</span>
          <DatePicker
            v-model="query.end_time"
            :options="dateOpt"
            :editable="false"
            type="date"
            placeholder=""
            style="width: 120px"
          ></DatePicker>
        </div>
        <div class="item">
          <span>{{i18n_lang.messageManage36}}</span>
          <Select v-model="query.admin_uid" clearable style="width:100px">
            <Option value="-1">{{i18n_lang.messageManage37}}</Option>
            <Option value="0">{{i18n_lang.messageManage38}}</Option>
            <Option value="1">{{i18n_lang.messageManage39}}</Option>
          </Select>
        </div>
      </div>
      <div class="query_btns">
        <Button type="primary" icon="ios-search" style="margin-right: 5px" @click="getData()">
          {{i18n_lang.messageManage5}}
        </Button>
        <Button type="primary" icon="md-refresh" @click="reset">{{i18n_lang.messageManage6}}</Button>
      </div>
    </Card>
    <Button type="primary" style="margin-top:10px" icon="md-add" @click="handleAdd">
      {{i18n_lang.messageManage7}}
    </Button>

    <MyTable rowspan filter :columns="columns" :data="dataSource" border></MyTable>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.messageManage40}${page.total}${i18n_lang.messageManage41}` }}</div>
    <Page
      class="page_box"
      show-sizer
      :current="page.currentPage"
      :page-size="page.pageSize"
      :page-size-opts="page.pageSizes"
      :total="page.total"
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    ></Page>

    <!-- 新增 -->
    <Modal
      v-model="visible"
      :title="i18n_lang.messageManage7"
      :width="600"
      :styles="{ top: '20px' }"
      @on-cancel="handleCloseModal"
    >
      <Spin v-if="loading.modal" fix></Spin>
      <Form v-if="visible" ref="editForm" :model="editInfo" :label-width="80" :rules="ruleValidate">
        <FormItem :label="i18n_lang.messageManage8" prop="send_type">
          <Select v-model="editInfo.send_type" style="width:200px">
            <Option :value="1">{{i18n_lang.messageManage9}}</Option>
            <Option :value="3">{{i18n_lang.messageManage10}}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="editInfo.send_type === 1" :label="i18n_lang.messageManage11" prop="level">
          <MoreOptionCheck
            v-model="editInfo.level"
            :option-data="memberLevel"
            option-label="name"
            option-key="name"
          ></MoreOptionCheck>
        </FormItem>
        <FormItem v-if="editInfo.send_type === 3" :label="i18n_lang.messageManage12" prop="userList">
          <Input v-model="editInfo.userList" type="textarea" :placeholder="i18n_lang.messageManage13" />
        </FormItem>
        <FormItem :label="i18n_lang.messageManage14" prop="title"> <Input v-model="editInfo.title" /> </FormItem>
        <FormItem :label="i18n_lang.messageManage15" prop="desc">
          <Input v-model="editInfo.desc" type="textarea" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btn.add" @click="addMsg">{{i18n_lang.messageManage16}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import MoreOptionCheck from '_c/MoreOptionCheck'
import columns from './columns'
import { computeDay } from '@/libs/handleDate'
import { formatDateToString } from '@/libs/date'

const initQuery = {
  title: '', // 标题
  admin_name: '', // 发布人
  recipient: '', //接收人
  start_time: computeDay(), // 开始时间
  end_time: computeDay(), // 结束时间
  admin_uid: '-1' //发布人
}

const initAdd = {
  send_type: '', // 发送对象类型
  title: '', // 标题
  desc: '', // 内容

  level: [], // 会员等级
  userList: '', // 自定义接收人
  admin_uid: '' // 管理员id
}
export default {
  components: {
    MyTable,
    MoreOptionCheck
  },
  data() {
    const i18n_lang = this.$t('messageManage');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        modal: false,
        btn: {
          modal: false
        }
      },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 4320000000
        }
      },
      visible: false,
      query: { ...initQuery },
      dataSource: [], // data数据
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1,
        pageSizes: [20, 100, 1000, 2000]
      },
      editInfo: { ...initAdd },
      memberLevel: [], // 会员等级
      ruleValidate: {
        title: [{ required: true, message: i18n_lang.messageManage17 }],
        send_type: [{ required: true, message: i18n_lang.messageManage18 }],
        desc: [{ required: true, message: i18n_lang.messageManage19 }]
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 设置每页条数
    changePageSize(pageSize) {
      this.page.currentPage = 1
      this.page.pageSize = pageSize
      this.getData()
    },
    // 切换分页
    changePage(index) {
      this.page.currentPage = index
      this.getData()
    },
    async getData() {
      this.loading.page = true
      const query = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      query.admin_uid === '-1' ? query.admin_uid = '' : query.admin_uid
      if (query.start_time && query.end_time) {
        query.start_time = formatDateToString(new Date(query.start_time))
        query.end_time = formatDateToString(new Date(query.end_time))
      }
      // console.log('query', this.query, formatDateToString(new Date(this.query.start_time)))
      const res = await this.$axios.request({
        url: '/message/show',
        method: 'GET',
        params: query
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    reset() {
      this.query = { ...initQuery }
      this.getData()
    },
    // 获取会员等级、层级
    async getLevel() {
      const res = await this.$axios.request({
        url: '/user/level',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.memberLevel = res.data
    },
    // 打开新增
    async handleAdd() {
      this.editInfo = { ...initAdd }
      this.visible = true
      if (!this.memberLevel.length) {
        this.loading.modal = true
        await this.getLevel()
        this.loading.modal = false
      }
    },
    // 关闭modal
    handleCloseModal() {
      this.$refs['editForm'].resetFields()
    },
    async addMsg() {
      this.loading.btn.modal = true
      this.$refs['editForm'].validate(async valid => {
        if (!valid) {
          this.loading.btn.modal = false
        } else {
          const req = {
            ...this.editInfo
          }
          req.admin_uid = this.userInfo.id
          if (this.editInfo.send_type === 1) {
            req.send_type_value = req.level.join(',')
          }
          if (this.editInfo.send_type === 3) {
            req.send_type_value = req.userList
          }
          delete req.userList
          delete req.level

          const res = await this.$axios.request({
            url: '/message/new',
            method: 'POST',
            data: req
          })
          this.loading.btn.modal = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible = false
          this.getData()
        }
      })
    },
    // 发布/删除
    async handleHandle(row, type) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/message/${row.id}`,
        method: type === 'delete' ? 'DELETE' : 'PATCH'
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible = false
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped></style>
