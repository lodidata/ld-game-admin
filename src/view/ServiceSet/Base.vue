<template>
  <div id="Base">
    <Spin fix v-if="loading.page"></Spin>
    <Row>
      <Col span="12">
      <p class="title">{{i18n_lang.serviceSet3}}</p>
      <div class="content">
        <div class="item">
          <Form :model="dataSource" :label-width="100">
            <FormItem :label="i18n_lang.serviceSet4" prop="status">
              <i-Switch v-model="dataSource.service_reply_tip"></i-Switch>
              <span style="font-size: 14px;margin-left: 10px;"> {{i18n_lang.serviceSet5}}</span>
            </FormItem>
            <FormItem label="" prop="status">
              <Select v-model="dataSource.service_reply_duration" style="width:200px">
                <Option :value="item" v-for="(item,i) in overtime" :key="i">{{item}}{{i18n_lang.serviceSet17}}</Option>
              </Select>
            </FormItem>
            <FormItem label="" prop="status">
              <Input v-model="dataSource.service_reply_text" type="textarea" :rows="4" :placeholder="i18n_lang.serviceSet6" style="width:500px" />
            </FormItem>
          </Form>
          <span style="color:#999999">{{i18n_lang.serviceSet7}}</span>
        </div>
      </div>
      </Col>
      <Col span="12">
      <p class="title">{{i18n_lang.serviceSet8}}</p>
      <div class="content">
        <div class="item">
          <Form :model="dataSource" :label-width="100">
            <FormItem :label="i18n_lang.serviceSet9" prop="status">
              <i-Switch v-model="dataSource.user_reply_tip"></i-Switch>
              <span style="font-size: 14pxmargin-left: 10px"> {{i18n_lang.serviceSet5}}</span>
            </FormItem>
            <FormItem label="" prop="status">
              <Select v-model="dataSource.user_reply_duration" :placeholder="i18n_lang.serviceSet10" style="width:200px">
                <Option :value="item" v-for="(item,i) in overtime" :key="i">{{item}}{{i18n_lang.serviceSet17}}</Option>
              </Select>
            </FormItem>
            <FormItem label="" prop="status">
              <Input v-model="dataSource.user_reply_text" type="textarea" :rows="4" :placeholder="i18n_lang.serviceSet11" style="width:500px" />
            </FormItem>
          </Form>
          <span style="color:#999999">{{i18n_lang.serviceSet12}}</span>
        </div>

      </div>
      </Col>
    </Row>
    <Row>
      <p class="title">{{i18n_lang.serviceSet13}}</p>
      <div class="content">
        <Row>
          <Col span="12">
          <div class="item">
            <Form :model="dataSource" :label-width="100">

              <FormItem :label="i18n_lang.serviceSet14" prop="status">
                <Select v-model="dataSource.auto_finish_duration" :placeholder="i18n_lang.serviceSet10" style="width:200px">
                  <Option :value="item" v-for="(item,i) in closetime" :key="i">{{item}}{{i18n_lang.serviceSet17}}</Option>
                </Select>
              </FormItem>
            </Form>
            <span style="color:#999999">{{i18n_lang.serviceSet15}}</span>
          </div>
          </Col>
        </Row>
      </div>
    </Row>

    <Button style="width:150px" size="large" type="primary" @click="save">
      {{i18n_lang.serviceSet16}}
    </Button>
  </div>
</template>
<script>
import { MathDiv } from '../../libs/formatMath.js'
export default {
  data() {
    const i18n_lang = this.$t('serviceSet');
    return {
      i18n_lang: i18n_lang,
      loading: { page: false },
      dataSource: {},
      status: '',
      overtime: [1, 2, 3, 4, 5],
      closetime: [2, 5, 10, 15, 30, 45, 60]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading.page = true
      this.dataSource = {}
      const res = await this.$axios.request({
        url: `/servicemanage/other/config`,
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }

      this.dataSource = Object.assign({}, res.data)
      this.dataSource.service_reply_tip = !!this.dataSource.service_reply_tip
      this.dataSource.user_reply_tip = !!this.dataSource.user_reply_tip
      this.dataSource.auto_finish_duration = MathDiv(this.dataSource.auto_finish_duration, 60)
      this.dataSource.service_reply_duration = MathDiv(this.dataSource.service_reply_duration, 60)
      this.dataSource.user_reply_duration = MathDiv(this.dataSource.user_reply_duration, 60)
    },
    async save() {
      this.loading.page = true
      const req = {
        ...this.dataSource
      }

      req.service_reply_tip = Number(req.service_reply_tip)
      req.user_reply_tip = Number(req.user_reply_tip)

      const res = await this.$axios.request({
        url: `/servicemanage/other/config`,
        method: 'PUT',
        data: req
      })
      this.loading.page = false

      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.getData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
#Base {
  .item {
    margin-bottom: 28px;
    /deep/ .ivu-form-item-label {
      font-size: 14px;
      display: inline-block;
      // line-height: 28px
      color: rgb(153, 153, 153);
      min-width: 60px;
      margin-right: 5px;
    }
  }
}
</style>
