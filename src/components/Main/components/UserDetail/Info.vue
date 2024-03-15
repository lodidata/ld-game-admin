<template>
  <div id="Info">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="info-box">
      <div>
        <span class="name">{{ info.username }}</span>
        {{i18n_lang.components64}} {{ info.last_login_time }} {{i18n_lang.components65}}
        {{ info.last_login_ip }} ({{ info.last_login }}) {{i18n_lang.components66}}
      </div>
      <div>
        <span class="title">{{i18n_lang.components67}}</span>
        <span>{{ info.truename || i18n_lang.components68 }}</span>
        <span style="margin-left:10px">
          <Button size="small" @click="handleEditTruename()">{{i18n_lang.components80}}</Button>
        </span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components69}}</span>
        <Tag :color="info.state === 1 ? 'success' : 'error'" type="dot">
          <span>{{ info.state === 1 ? i18n_lang.components70 : i18n_lang.components71 }}</span>
        </Tag>
        <Poptip
          confirm
          :title="`${i18n_lang.components72} ${info.state === 1 ? i18n_lang.components71 : i18n_lang.components70} ${info.username}`"
          @on-ok="handleState(info.state === 1 ? 0 : 1)"
        >
          <Button :type="info.state === 1 ? 'error' : 'success'" size="small">
            <span>{{ info.state === 1 ? i18n_lang.components71 : i18n_lang.components70 }}</span>
          </Button>
        </Poptip>
      </div>
      <div>
        <span class="title">{{i18n_lang.components73}}</span>
        <span>{{ formatMoney(info.balance, 1) }}</span>
        <span style="margin-left: 5px;" @click="handleBalance">
          <Icon type="md-add-circle"/>
        </span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components74}}</span>
        <span>{{ info.agent || i18n_lang.components68 }}</span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components75}}</span>
        <span>{{ info.ranting }}</span>
      </div>
      <div v-if="info.permission">
        <span class="title">{{i18n_lang.components76}}</span>
        <span>
          <Checkbox v-model="info.permission.refuse_withdraw" disabled>{{i18n_lang.components77}}</Checkbox>
          <Checkbox v-model="info.permission.refuse_sale" disabled>{{i18n_lang.components78}}</Checkbox>
          <Checkbox v-model="info.permission.refuse_rebate" disabled>{{i18n_lang.components79}}</Checkbox>
          <Checkbox v-model="info.permission.refuse_bkge" disabled>{{i18n_lang.components258}}</Checkbox>
          <Checkbox v-model="info.permission.maintaining_login" disabled>{{i18n_lang.components259}}</Checkbox>
        </span>
        <span style="margin-left:10px">
          <Button size="small" @click="handleEditPerminssion()">{{i18n_lang.components80}}</Button>
        </span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components81}}</span>
        <span>{{ info.tag_name }}</span>
        <Button style="margin-left: 10px;" size="small" @click="handleEditTags">{{i18n_lang.components82}}</Button>
      </div>
      <div>
        <span class="title">{{i18n_lang.components83}}</span>
        <span>{{ concat }}</span>
        <span style="margin-left: 5px;" @click="handleEditConcat">
          <Icon type="md-add-circle"/>
        </span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components84}}</span>
        <span>{{i18n_lang.components85}} {{ info.user_data.deposit_num }} {{i18n_lang.components86}}{{ formatMoney(info.user_data.deposit_amount, 1) }}</span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components87}}</span>
        <span>{{i18n_lang.components85}} {{ info.user_data.withdraw_num }} {{i18n_lang.components86}}{{ formatMoney(info.user_data.withdraw_amount, 1) }}</span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components88}}</span>
        <span>{{i18n_lang.components85}} {{ info.user_data.active_num }} {{i18n_lang.components86}}{{ formatMoney(info.user_data.active_amount, 1) }}</span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components277}}</span>
        <span>{{i18n_lang.components85}} {{ info.withdrawal_user_cnt }} {{i18n_lang.components86}}{{ formatMoney(info.withdrawal_user_amount, 1) }}</span>
      </div>
      <div>
        <span class="title">{{i18n_lang.components278}}</span>
        <span>{{i18n_lang.components85}} {{ info.deposit_user_cnt }} {{i18n_lang.components86}}{{ formatMoney(info.deposit_user_amount, 1) }}</span>
      </div>
    </div>

    <!-- 修改姓名 -->
    <Modal v-model="visible.truename" :title="i18n_lang.components108">
      <Form v-if="visible.truename" ref="editConcat" :model="edit.concat" :label-width="80">
        <FormItem :label="i18n_lang.components108">
          <Input v-model="edit.concat.truename" :placeholder="i18n_lang.components109"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btnConcat" @click="changeConcat">{{i18n_lang.components112}}</Button>
      </div>
    </Modal>
    <!-- 标签 -->
    <Modal v-model="visible.tags" :title="`${i18n_lang.components89}${info.username}${i18n_lang.components90}`">
      <Row v-if="visible.tags" style="height:40px">
        <Col span="4">{{i18n_lang.components91}}</Col>
        <Col span="16">
          <Select v-model="edit.tags" style="width:100px" :placeholder="i18n_lang.components92">
            <Option v-for="(it,i) in tags" :key="i" :value="it.id">{{ it.title }}</Option>
          </Select>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" :loading="loading.btnTags" @click="changeTags">{{i18n_lang.components93}}</Button>
      </div>
    </Modal>

    <!-- 联系方式 -->
    <Modal v-model="visible.concat" :title="i18n_lang.components94">
      <Form v-if="visible.concat" ref="editConcat" :model="edit.concat" :label-width="80">
        <FormItem :label="i18n_lang.components95">
          <Input v-model="edit.concat.nickname" :placeholder="i18n_lang.components96"/>
        </FormItem>
        <FormItem label="QQ：">
          <Input v-model="edit.concat.qq" :placeholder="i18n_lang.components97"/>
        </FormItem>
        <FormItem :label="i18n_lang.components98">
          <Input v-model="edit.concat.mobile" :placeholder="i18n_lang.components99"/>
        </FormItem>
        <FormItem :label="i18n_lang.components100">
          <Input v-model="edit.concat.wechat" :placeholder="i18n_lang.components101"/>
        </FormItem>
        <FormItem :label="i18n_lang.components102">
          <Input v-model="edit.concat.email" :placeholder="i18n_lang.components103"/>
        </FormItem>
        <FormItem :label="i18n_lang.components104">
          <Input v-model="edit.concat.address" :placeholder="i18n_lang.components105"/>
        </FormItem>
        <FormItem :label="i18n_lang.components106">
          <DatePicker
            v-model="edit.concat.birth"
            format="yyyy-MM-dd"
            type="date"
            :placeholder="i18n_lang.components107"
            style="width: 200px"
            @on-change="changeStartTime"
          ></DatePicker>
        </FormItem>
        <FormItem :label="i18n_lang.components108">
          <Input v-model="edit.concat.truename" :placeholder="i18n_lang.components109"/>
        </FormItem>
        <FormItem :label="i18n_lang.components110">
          <Input v-model="edit.concat.idcard" :placeholder="i18n_lang.components111"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" :loading="loading.btnConcat" @click="changeConcat">{{i18n_lang.components112}}</Button>
      </div>
    </Modal>

    <!-- 账户余额 -->
    <Modal v-model="visible.balance" :width="800" :title="`${i18n_lang.components113}${info.username}${i18n_lang.components114}`">
      <Spin v-if="loading.modal" size="large" fix></Spin>
      <Table border :columns="columns" :data="balance"></Table>
    </Modal>

    <!-- 权限 -->
    <Modal v-model="visible.permission" :title="`${i18n_lang.components113}${info.username}${i18n_lang.components115}`">
      <Row v-if="visible.permission" style="height:40px">
        <Col span="4">{{i18n_lang.components116}}</Col>
        <Col v-if="Object.keys(eidtPermission).length" span="16">
        <Checkbox v-model="eidtPermission.refuse_withdraw">{{i18n_lang.components117}}</Checkbox>
        <Checkbox v-model="eidtPermission.refuse_sale">{{i18n_lang.components118}}</Checkbox>
        <Checkbox v-model="eidtPermission.refuse_rebate">{{i18n_lang.components119}}</Checkbox>
        <Checkbox v-model="eidtPermission.refuse_bkge">{{i18n_lang.components258}}</Checkbox>
        <Checkbox v-model="eidtPermission.maintaining_login">{{i18n_lang.components259}}</Checkbox>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="primary" :loading="loading.permission" @click="handlePermission">{{i18n_lang.components120}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { MathDiv } from '@/libs/formatMath'
import columns from './columns/info'
const initConcat = {
  username:'',
  nickname: '',
  truename: '',
  qq: '',
  mobile: '',
  wechat: '',
  email: '',
  address: '',
  birth: '',
  idcard: ''
}
export default {
  name: 'Info',
  props: ['id'],
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        btnTags: false,
        btnConcat: false,
        modal: false,
        permission: false
      },
      visible: {
        tags: false,
        concat: false,
        balance: false,
        truename: false,
        permission: false
      },
      eidtPermission: {},
      info: {
        user_data: {}
      },
      tags: [],
      map: {},
      edit: {
        tags: '',
        concat: { ...initConcat }
      },
      balance: [],
      columns: columns(this),
      transfer: {
        name: '',
        value: '',
        max: 0
      }
    }
  },
  computed: {
    concat() {
      let text = ''
      const map = { mobile: this.i18n_lang.components121, email: this.i18n_lang.components122, wechat: this.i18n_lang.components123 }
      Object.keys(map).forEach(k => {
        if (this.info[k]) {
          if (text.length) text = text + '/'
          text += this.info[k] + '(' + map[k] + ')'
        }
      })
      return text || this.i18n_lang.components68
    }
  },
  mounted() {
    this.getData()
    this.getTags()
    this.getBalance()
  },
  methods: {
    // 格式化时间
    changeStartTime(date) {
      console.log(date, 'start')
      this.edit.concat.birth = date
    },
    formatMoney(a, b) {
      return MathDiv(a, b)
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/info/base/${this.id}`,
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.info = res.data
      this.info.permission = {
        refuse_rebate: !!res.data.refuse_rebate, // 禁止返水
        refuse_sale: !!res.data.refuse_sale, // 禁止优惠
        refuse_withdraw: !!res.data.refuse_withdraw ,// 禁止提款
        refuse_bkge: !!res.data.refuse_bkge ,// 禁止返佣
        maintaining_login: !!res.data.maintaining_login ,// 维护可进
      }
      console.log(this.edit.concat)
      const concat = this.edit.concat
      Object.keys(concat).forEach(k => {
        concat[k] = this.info[k]
      })
      this.edit.concat = { ...concat }
    },
    handleEditTruename(){
      this.visible.truename = true
    },
    // 获取用户余额
    async getBalance() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/info/balance/${this.id}`,
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.balance = res.data
    },
    // 启用/停用
    async handleState(state) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/user/state/${this.info.id}`,
        method: 'PUT',
        data: {
          state
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 || res.state === 11050 || res.state === 11051 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) return
      this.getData()
    },
    handleEditPerminssion() {
      this.eidtPermission = Object.assign({}, this.info.permission)
      this.visible.permission = true
    },
    // 修改权限
    async handlePermission() {
      this.loading.permission = true
      const res = await this.$axios.request({
        url: `/user/info/setting/${this.id}`,
        method: 'PUT',
        data: {
          auth_status: {
            refuse_rebate: this.eidtPermission.refuse_rebate ? 1 : 0,
            refuse_sale: this.eidtPermission.refuse_sale ? 1 : 0,
            refuse_withdraw: this.eidtPermission.refuse_withdraw ? 1 : 0,
            refuse_bkge: this.eidtPermission.refuse_bkge ? 1 : 0,
            maintaining_login: this.eidtPermission.maintaining_login ? 1 : 0
          }
        }
      })
      this.loading.permission = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$Message.error(res.message)
      } else {
        this.visible.permission = false
        this.$Message.success(res.message)
        this.getData()
      }
    },
    // 处理修改联系方式
    handleEditConcat() {
      this.visible.concat = true
    },
    // 处理修改标签
    handleEditTags() {
      this.getTags()
      this.visible.tags = true
    },
    // 展开余额详情
    handleBalance() {
      this.visible.balance = true
    },
    // 刷新第三方余额
    async handleRefresh(row, index) {
      this.loading.modal = true
      const res = await this.$axios.request({
        url: `/game/third/${this.id}`,
        method: 'GET',
        params: {
          game_type: row.game_type
        }
      })
      this.loading.modal = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      // 更新 balance
      row.balance = res.data.balance
      this.balance.splice(index, 1, row)
    },
    // 转入
    async handleTransfer(row) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/game/third/rollout/${this.id}`,
        method: 'PUT',
        data: {
          game_type: row.game_type
        }
      })
      this.loading.page = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.getBalance()
    },
    // 会员标签列表
    async getTags() {
      if (this.tags.length) return
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/user/labels',
        method: 'GET',
        params: {
          page: 1,
          page_size: 100
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
      this.tags = res.data
    },
    // 修改标签
    async changeTags() {
      if (this.edit.tags === '') {
        this.visible.tags = false
        return
      }
      this.loading.btnTags = true
      const res = await this.$axios.request({
        url: `/user/info/tag/${this.info.id}`,
        method: 'PUT',
        data: {
          tag: this.edit.tags
        }
      })
      this.loading.btnTags = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible.tags = false
      this.getData()
    },
    // 修改联系方式
    async changeConcat() {
      this.loading.btnConcat = true
      const res = await this.$axios.request({
        url: `/user/info/base/${this.info.id}`,
        method: 'PUT',
        data: this.edit.concat
      })
      this.loading.btnConcat = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.visible.concat = false
      this.visible.truename = false
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
#Info {
  min-height: 300px;
  font-size: 15px;
  .info-box {
    .name {
      padding-right: 6px;
      font-size: 16px;
      font-weight: 700;
    }
    .status {
      margin-right: 10px;
    }
    > div {
      padding: 0 6px 10px;
      display: flex;
      align-items: center;
      .title {
        font-weight: 700;
      }
    }
  }
}
.ivu-form-item {
  margin-bottom: 16px !important;
}
</style>
