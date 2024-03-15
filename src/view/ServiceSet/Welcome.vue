<template>
  <div id="Welcome">
    <Spin fix v-if="loading.page"></Spin>
    <div class="title-wrap">
      <p class="title">{{i18n_lang.serviceSet42}}</p>
      <Input v-model="dataSource.title" :placeholder="i18n_lang.serviceSet43" style="width:500px" />
    </div>

    <Row>
      <Col span="12">
        <p class="title">{{i18n_lang.serviceSet44}}</p>
        <div class="content">
          <div class="item">
            <Form :model="dataSource" :label-width="100">
              <FormItem :label="i18n_lang.serviceSet45">
                <i-Switch v-model="dataSource.guideSwitch"></i-Switch>
                <span style="font-size: 14px;margin-left: 10px;">{{i18n_lang.serviceSet46}}</span>
              </FormItem>
              <FormItem label>
                <span>
                  <Input
                    v-model="dataSource.guideMsg"
                    type="textarea"
                    :rows="4"
                    :placeholder="i18n_lang.serviceSet47"
                    style="width:500px"
                  />
                </span>
              </FormItem>
            </Form>
          </div>
        </div>
      </Col>
      <Col span="12">
        <p class="title">{{i18n_lang.serviceSet48}}</p>
        <div class="content">
          <div class="item">
            <Form :model="dataSource" :label-width="100">
              <FormItem :label="i18n_lang.serviceSet49">
                <i-Switch v-model="dataSource.leaveSwitch"></i-Switch>
                <span style="font-size: 14px;margin-left: 10px;">{{i18n_lang.serviceSet50}}</span>
              </FormItem>
              <FormItem label>
                <span>
                  <Input
                    v-model="dataSource.leaveMsg"
                    type="textarea"
                    :rows="4"
                    :placeholder="i18n_lang.serviceSet51"
                    style="width:500px"
                  />
                </span>
              </FormItem>
            </Form>
          </div>
        </div>
      </Col>
    </Row>

    <Button style="width:150px" size="large" type="primary" @click="save">{{i18n_lang.serviceSet52}}</Button>
  </div>
</template>
<script>
import config from '@/config'
import { formBuilder } from '@/libs/util'

export default {
  data() {
    const i18n_lang = this.$t('serviceSet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      welcomeSet: '',
      dataSource: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取欢迎语
    async getData() {
      this.loading.page = true
      this.welcomeSet = ''

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
        this.dataSource = res.data
        this.dataSource.leaveSwitch = !!this.dataSource.leaveSwitch
        this.dataSource.guideSwitch = !!this.dataSource.guideSwitch
      }
    },
    async save() {
      if (!this.dataSource.title || this.dataSource.title.length > 30) {
        return this.$Message.error(this.i18n_lang.serviceSet53)
      }
      if (!this.dataSource.guideMsg || this.dataSource.guideMsg.length > 75) {
        return this.$Message.error(this.i18n_lang.serviceSet54)
      }
      if (!this.dataSource.leaveMsg || this.dataSource.leaveMsg.length > 75) {
        return this.$Message.error(this.i18n_lang.serviceSet55)
      }
      this.loading.page = true

      const { guideSwitch, guideMsg, leaveSwitch, leaveMsg, title } = this.dataSource
      const req = {
        guideSwitch,
        guideMsg,
        leaveSwitch,
        leaveMsg,
        title,
        nodeId: config.nodeId
      }

      const res = await this.$axios.request({
        url: '/client/update',
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
<style lang="less" scoped>
#Welcome {
  .title-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      margin-right: 15px;
    }
  }
  .item {
    margin-bottom: 28px;
    /deep/.ivu-form-item-label {
      font-size: 14px;
      display: inline-block;
      // line-height: 28px
      color: rgb(153, 153, 153);
      min-width: 60px;
      margin-right: 5px;
    }
    & > p,
    & > span {
      font-size: 14px;
      display: inline-block;
      line-height: 28px;
      color: rgb(153, 153, 153);
      min-width: 60px;
      margin-right: 5px;
    }
    & > span {
      color: rgb(51, 51, 51);
      &.detail {
        color: #f33;
        margin-left: 5px;
      }
    }
  }
}
</style>
