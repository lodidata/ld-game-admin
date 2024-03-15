<template>
  <div id="LotterySwitch">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Card dis-hover class="query_box">
      <div>
        <span class="queryTit">{{i18n_lang.lotterySwitch0}}</span>
        <RadioGroup v-model="query.pid" type="button" size="large" @on-change="lotteryChange">
          <Radio v-for="(it,i) in lotteryList" :key="i" :label="it.id">{{ it.name }}{{i18n_lang.lotterySwitch1}}</Radio>
        </RadioGroup>
      </div>
      <div style="margin-top:20px">
        <span class="queryTit">{{i18n_lang.lotterySwitch2}}</span>
        <RadioGroup v-model="query.model" size="large">
          <Radio :label="1" :disabled="query.pid === 1">{{i18n_lang.lotterySwitch3}}</Radio>
          <!-- <Radio :label="2">{{i18n_lang.lotterySwitch4}}</Radio>
          <Radio :label="3">{{i18n_lang.lotterySwitch5}}</Radio> -->
          <!-- <Radio :label="4">直播</Radio> -->
        </RadioGroup>
      </div>
      <Button type="primary" style="margin-top:20px" icon="ios-search" @click="getData">{{i18n_lang.lotterySwitch6}}</Button>
    </Card>
    <MyTable combinerow editting :columns="columns" :data="dataSource" border @editChange="editChange" rowKey></MyTable>

    <!-- 编辑 -->
    <Modal id="eidt-dialog" v-model="visible.modal" :title="i18n_lang.lotterySwitch7" :width="600" :label-width="80" @on-cancel="handleCloseModal">
      <Form v-if="visible.modal" ref="editForm" :model="editInfo" :label-width="80" :rules="ruleValidate">
        <FormItem :label="i18n_lang.lotterySwitch8">
          <Input v-model="editInfo.play_text1" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :placeholder="i18n_lang.lotterySwitch9"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.lotterySwitch10">
          <Input v-model="editInfo.play_text2" type="textarea" :autosize="{minRows: 3,maxRows: 5}" :placeholder="i18n_lang.lotterySwitch11"></Input>
        </FormItem>
        <FormItem :label="i18n_lang.lotterySwitch12">
          <div v-for="(item,i) in editInfo.tags" :key="i" class="options-tips">
            <h1 class="title">{{ item.nm }}</h1>
            <ul>
              <li>
                <div>{{i18n_lang.lotterySwitch13}}</div>
                <div>{{i18n_lang.lotterySwitch14}}</div>
              </li>
              <li v-for="(it,j) in item.sv" :key="j">
                <div>{{ it }}</div>
                <div>
                  <Input v-model="item.tp[j]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="i18n_lang.lotterySwitch11"></Input>
                </div>
              </li>
            </ul>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="handleCloseModal">{{i18n_lang.lotterySwitch15}}</Button>
        <Button type="primary" :loading="loading.modalButton" @click="save">{{i18n_lang.lotterySwitch16}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTable from '_c/MyTable'
import columns from './columns'
import { handleGroupSort } from './format'
import { lotteryToTree } from '@/libs/lottery'

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('lotterySwitch');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modalButton: false
      },
      visible: {
        modal: false
      },
      lotteryList: {}, // 彩种列表
      query: {
        pid: 1,
        model: 1
      },
      dataSource: [],
      columns: columns(this),
      editInfo: {},
      ruleValidate: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getLotteryList()
      this.getData()
    },
    async getLotteryList() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/kinds/all',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.lotteryList = { ...lotteryToTree(res.data) }
      this.query.pid = Number(Object.keys(this.lotteryList)[0])
      this.lotteryChange(this.query.pid)
      this.loading.page = false
    },
    // 修改彩种时
    lotteryChange(i) {
      if (i === 1) {
        this.query.model = 2
      }
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/play/struct',
        method: 'GET',
        params: this.query
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const groupAndSort = handleGroupSort(res.data.list)
      this.dataSource = groupAndSort.sort
      this.columns = columns(this, groupAndSort.group)
    },
    // table发生改变
    async editChange(value, key, row) {
      if (key === 'open') {
        // 最少要保留玩法一个
        const num = this.dataSource.reduce((a, b) => {
          return a + Number(b.open)
        }, 0)
        if (num <= 1 && value === false) {
          this.$msg({
            type: 'error',
            message: this.i18n_lang.lotterySwitch17
          })
          return
        }
      }
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/play/struct',
        method: 'PATCH',
        data: {
          id: row.id,
          [key]: value
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
    // 打开modal
    async handleOpenModal(data) {
      this.editInfo = { ...data }
      this.visible.modal = !this.visible.modal
    },
    // 关闭modal
    handleCloseModal() {
      this.visible.modal = false
    },
    // 保存数据
    async save() {
      const obj = {
        id: this.editInfo.id,
        play_text1: this.editInfo.play_text1,
        play_text2: this.editInfo.play_text2,
        tags: this.editInfo.tags
      }
      this.loading.modalButton = true
      const res = await this.$axios.request({
        url: '/lottery/play/struct',
        method: 'PUT',
        data: obj
      })
      this.loading.modalButton = false
      this.$msg({
        type: res.status !== 200 ? 'error' : 'success',
        message: res.message
      })
      if (res.status !== 200) return
      this.handleCloseModal()
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
