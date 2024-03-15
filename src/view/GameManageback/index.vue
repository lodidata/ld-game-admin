<template>
  <div id="GameManage">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div>
      <table class="tableBox">
        <thead>
          <tr class="blue">
            <td>{{i18n_lang.gameManageback0}}</td>
            <td>{{i18n_lang.gameManageback1}}</td>
          </tr>
        </thead>
        <tbody v-for="item in dataSorce" :key="item.id">
          <tr class="gray">
            <td :colspan="item.childrens ? 2 : 1">{{ item.name }}{{i18n_lang.gameManageback2}}</td>
            <td v-if="!item.childrens">
              <CommonSwitch
                size="large"
                :value="item.status === 'enabled'"
                :before-change="beforeChange"
                :confirm-text="confirmText(item)"
                @on-change="okSure(item)"
              >
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </CommonSwitch>
            </td>
          </tr>
          <tr v-for="game in item.childrens" :key="game.id">
            <td>{{ game.name }}</td>
            <td>
              <CommonSwitch
                size="large"
                :value="game.status === 'enabled'"
                :before-change="beforeChange"
                :confirm-text="confirmText(game)"
                @on-change="okSure(game)"
              >
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </CommonSwitch>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import CommonSwitch from '_c/CommonSwitch'
export default {
  name: 'GameManage',
  components: {
    CommonSwitch
  },
  data() {
    const i18n_lang = this.$t('gameManageback');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      switchStatus: true,
      dataSorce: []
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/game',
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
      this.dataSorce = res.data
    },
    async okSure(game) {
      const res = await this.$axios.request({
        url: `/game`,
        method: 'PATCH',
        data: {
          id: game.id,
          status: game.status === 'enabled' ? 'disabled' : 'enabled'
        }
      })
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.$msg({
        type: 'success',
        message: `${i18n_lang.gameManageback3}${game.status === 'enabled' ? this.i18n_lang.gameManageback4 : this.i18n_lang.gameManageback5}`
      })
      this.getDate()
    },
    // 确认提示文字
    confirmText(game) {
      return `${this.i18n_lang.gameManageback6}${game.status === 'enabled' ? this.i18n_lang.gameManageback4 : this.i18n_lang.gameManageback5} <span style='color:#f90'>${
        game.name
      }</span> ${this.i18n_lang.gameManageback7}`
    },
    // 操作前确认
    beforeChange(text) {
      return new Promise(resolve => {
        this.$Modal.confirm({
          title: this.i18n_lang.gameManageback8,
          content: text,
          loading: true,
          onOk: async() => {
            this.$Modal.remove()
            resolve(true)
          },
          onCancel: () => {
            resolve(false)
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
