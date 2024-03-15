<template>
  <div id="ChessOrder" style="width: 100%">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Tabs v-model="curTab">
      <TabPane v-for="item in menu" :key="item.id" :name="item.type" :label="item.name">
        <Table v-if="curTab === item.type" :type="item.type"></Table>
      </TabPane>
      <!-- <TabPane v-if="menu.includes('LONGCHEN')" label="龙城棋牌" name="LONGCHEN">
        <Table v-if="curTab === 'LONGCHEN'" type="LONGCHEN"></Table>
      </TabPane> -->
    </Tabs>
  </div>
</template>
<script>
import Table from './table'
export default {
  components: {
    Table
  },
  data() {
    const i18n_lang = this.$t('electronicOrder');
    return {
      i18n_lang: i18n_lang,
      curTab: '',
      loading: {
        page: false
      },
      menu: []
    }
  },
  created() {
    this.getMenu()
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
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      const data = res.data.find(o => o.type === 'GAME')
      this.menu = data.childs && data.childs.length ? data.childs : []
      // this.curTab = this.menu[0].type
      let parameter = sessionStorage.getItem('parameter') || '{}'
      this.curTab = JSON.parse(parameter).ElectronicOrder ? JSON.parse(parameter).ElectronicOrder.type_name : this.menu[0].type
    }
  }
}
</script>
