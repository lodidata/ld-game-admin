<template>
  <div class="washCode">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Form :model="formItem">
      <FormItem :label="i18n_lang.washCode0">
        <RadioGroup v-model="formItem.status" size="large" @on-change="setSwith">
          <Radio label="1">{{i18n_lang.washCode1}}</Radio>
          <Radio label="0">{{i18n_lang.washCode2}}</Radio>
        </RadioGroup>
      </FormItem>

      <div>
        <RadioGroup v-model="formItem.fristMent" type="button" size="large" @on-change="handleMenu">
          <Radio v-for="item in menuList" :key="item.id" :label="item.id">{{ item.name }}</Radio>
        </RadioGroup>
      </div>

      <div style="margin:20px 0">
        <RadioGroup v-model="formItem.twoSecond" type="button" size="large" @on-change="handleNav">
          <Radio v-for="todo in secondMenu" :key="todo.id" :label="todo.id">{{ todo.name }}</Radio>
        </RadioGroup>
      </div>

      <div class="tableBox">
        <p>{{i18n_lang.washCode3}}</p>
        <MyTable
          editting
          border
          :columns="columns"
          :data="dataSoure"
          style="width:800px"
          @editChange="editChange"
        ></MyTable>
      </div>

      <div style="display:flex;margin-top:20px">
        <FormItem :label="i18n_lang.washCode4" style="width:300px;">
          <Input v-model="formItem.value1" size="large" :placeholder="i18n_lang.washCode5" style="width:200px"/>
          <span>%</span>
        </FormItem>
        <Button size="large" type="primary" style="height:36px;" @click="saveData">{{i18n_lang.washCode6}}</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import columns from './columns'
import MyTable from '_c/MyTable'

export default {
  components: {
    MyTable
  },
  data() {
    const i18n_lang = this.$t('washCode');
    return {
      i18n_lang: i18n_lang,
      formItem: {
        status: '',
        fristMent: '',
        value1: ''
      },
      loading: {
        page: false
      },
      menuList: [],
      secondMenu: [],
      columns: columns(this),
      dataSoure: []
    }
  },
  mounted() {
    this.getMenu()
    this.getStatus()
    this.getCode()
  },
  methods: {
    // 获取菜单
    async getMenu() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
      }
      // console.log(res)
      try {
        this.menuList = res.data
        this.secondMenu = res.data.length !== 0 ? this.menuList[0]['childs'] : []
        this.formItem.fristMent = res.data[0].id
        this.formItem.twoSecond = res.data[0]['childs'][0].id
        this.getSetDate(this.formItem.twoSecond)
      } catch (err) {
        console.log(err)
      }
    },
    // 选择一级菜单
    handleMenu() {
      const list = this.menuList.filter(o => o.id === this.formItem.fristMent)
      this.secondMenu = list.length !== 0 ? list[0].childs : []
      this.formItem.twoSecond = this.secondMenu.length !== 0 ? this.secondMenu[0].id : ''
      this.getSetDate(this.formItem.twoSecond)
    },
    // 选择二级菜单
    handleNav() {
      // console.log(this.formItem.twoSecond, '---')
      const game_type_id = this.formItem.twoSecond
      this.getSetDate(game_type_id)
    },
    // 获取配置
    async getSetDate(game_type_id) {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/system/xima',
        method: 'GET',
        params: { game_type_id }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      // console.log(res.data)
      this.dataSoure = res.data || []

      if (this.dataSoure.length !== 0) {
        this.dataSoure.forEach(o => {
          o.percent = Number(o.percent) / 100
        })
      }
    },
    // 设置洗码百分比
    async setWashCode(id, percent) {
      const res = await this.$axios.request({
        url: `/system/xima/${id}`,
        method: 'PUT',
        data: { id, percent }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      this.getSetDate(this.formItem.twoSecond)
    },
    // 获取洗码开关
    async getStatus() {
      const res = await this.$axios.request({
        url: '/system/single',
        method: 'GET',
        params: {
          module: 'xima',
          key: 'switch'
        }
      })
      // console.log(res)
      this.formItem.status = res.data.value
    },
    // 设置洗码开关
    async setSwith() {
      const res = await this.$axios.request({
        url: '/system/single',
        method: 'PUT',
        data: {
          module: 'xima',
          key: 'switch',
          value: Number(this.formItem.status) // 1，开，0，关
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      this.$Message.info(this.i18n_lang.washCode7)
      console.log(res)
    },
    // 编辑table
    editChange(val, key, row) {
      // console.log(val, key, row, '---')
      const id = row.id
      const percent = Number(val) * 100
      this.setWashCode(id, percent)
    },
    // 获取洗码提现打码量
    async getCode() {
      const res = await this.$axios.request({
        url: '/system/single',
        method: 'GET',
        params: {
          module: 'xima',
          key: 'percent'
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      console.log(res)
      this.formItem.value1 = Number(res.data.value) / 100
    },
    // 设置洗码提现打码量
    async setCode() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/system/single',
        method: 'PUT',
        params: {
          module: 'xima',
          key: 'percent',
          value: Number(this.formItem.value1) * 100
        }
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return false
      }
      this.$Message.success(this.i18n_lang.washCode8)
      this.getCode()
    },
    // 保存
    saveData() {
      this.setCode()
    }
  }
}
</script>

<style lang="less" scoped>
.washCode {
  .tableBox {
    p {
      width: 800px;
      height: 40px;
      line-height: 40px;
      background: #f8f8f9;
      border: 1px #e8eaec solid;
      border-bottom: none;
      text-indent: 10px;
      transform: translateY(30px);
    }
  }
}
</style>
