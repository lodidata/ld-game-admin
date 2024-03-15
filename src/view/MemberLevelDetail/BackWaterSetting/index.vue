<template>
  <div id="BackWaterSet">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Tabs
      v-if="dataSource.length > 0"
      v-model="currentGame"
      :animated="false"
      @on-click="onTabClick"
    >
      <TabPane
        v-for="(item, index) in dataSource"
        :key="index"
        :label="item.name"
        :name="item.type"
      >
        <div style="padding-top: 10px;">
          <Lottery
            v-if="item.type === 'CP' && currentGame === 'CP'"
            key="CP"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            :type-text="i18n_lang.memberLevelDetail35"
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Lottery>
          <Tcp
            v-if="item.type === 'TCP' && currentGame === 'TCP'"
            key="TCP"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            :type-text="i18n_lang.memberLevelDetail35"
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Tcp>
          <Qp
            v-if="item.type === 'QP' && currentGame === 'QP'"
            key="Qp"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Qp>
          <By
            v-if="item.type === 'BY' && currentGame === 'BY'"
            key="By"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            :type-text="i18n_lang.memberLevelDetail36"
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></By>
          <Live
            v-if="item.type === 'LIVE' && currentGame === 'LIVE'"
            key="live"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            :type-text="i18n_lang.memberLevelDetail37"
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Live>
          <Game
            v-if="item.type === 'GAME' && currentGame === 'GAME'"
            key="game"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            :type-text="i18n_lang.memberLevelDetail38"
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Game>
          <Sport
            v-if="item.type === 'SPORT' && currentGame === 'SPORT'"
            key="sport"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Sport>
          <Table
            v-if="item.type === 'TABLE' && currentGame === 'TABLE'"
            key="sport"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Table>
          <Arcade
            v-if="item.type === 'ARCADE' && currentGame === 'ARCADE'"
            key="sport"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Arcade>
          <Esports
            v-if="item.type === 'ESPORTS' && currentGame === 'ESPORTS'"
            key="sport"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Esports>
          <Cookfight
            v-if="item.type === 'SABONG' && currentGame === 'SABONG'"
            key="sport"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Cookfight>
          <Bingo
            v-if="item.type === 'BINGO' && currentGame === 'BINGO'"
            key="BINGO"
            :list="item.list"
            :rebot-time="rebotTime"
            :type="item.type"
            type-text
            :get-data="getData"
            :is-edit-show="isEditShow"
            :user-id="Number($route.query.id)"
            @updateData="updateData"
          ></Bingo>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import CommonGame from './CommonGame.vue'

const Lottery = CommonGame
const Tcp = CommonGame
const Qp = CommonGame
const By = CommonGame
const Live = CommonGame
const Game = CommonGame
const Sport = CommonGame
const Table = CommonGame
const Arcade = CommonGame
const Esports = CommonGame
const Cookfight = CommonGame
const Bingo = CommonGame

export default {
  components: {
    Lottery,
    Tcp,
    Qp,
    By,
    Live,
    Game,
    Sport,
    Table,
    Arcade,
    Esports,
    Cookfight,
    Bingo
  },
  props: {
    isEditShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const i18n_lang = this.$t('memberLevelDetail');
    return {
      i18n_lang: i18n_lang,
      currentGame: 'BINGO',
      dataSource: [],
      rebotTime: '',
      loading: {
        page: false
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getData(this.$route.query.id)
    }
  },
  methods: {
    async getData(id) {
      this.loading.page = true
      const query = {
        user_level_id: id
      }
      const res = await this.$axios.request({
        url: '/lottery/hall/rebate',
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
      this.dataSource = res.data.alls || []
      this.currentGame = this.dataSource[0].type
      const time = Number(res.data.rebot_time)
      this.rebotTime = time
        ? `${time === 0 ? '00' : time < 10 ? `0${time}` : time}:00:00`
        : `00:00:00`
    },
    updateData() {
      this.getData(this.$route.query.id)
    },
    onTabClick(name) {
      console.log('name', name)
      this.currentGame = name
    }
  }
}
</script>

<style lang="less" scoped>
#BackWaterSet {
  position: relative;
}
</style>
