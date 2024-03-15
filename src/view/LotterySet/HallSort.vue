<template>
  <div id="HallSort">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <div class="query_con">
      <span>{{i18n_lang.lotterySet2}}</span>
      <Button type="primary" class="mb30" @click="save()">{{ isEdit ? i18n_lang.lotterySet3 : i18n_lang.lotterySet4 }}</Button>
      <Button v-if="!isEdit" @click="close">{{i18n_lang.lotterySet7}}</Button>
    </div>
    <div class="title">{{i18n_lang.lotterySet5}}</div>
    <Draggable v-model="dataSource" element="ul" :options="dragOptions" class="list-group">
      <div v-for="element in dataSource" :key="element.id" class="list-group-item">
        <p>{{ element.name }}</p>
      </div>
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
  components: {
    Draggable
  },
  data() {
    const i18n_lang = this.$t('lotterySet');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false
      },
      dataSource: [],
      isEdit: true
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'lottery',
        ghostClass: 'ghost',
        disabled: this.isEdit
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    close() {
      this.isEdit = true
    },
    async getData() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/lottery/rank',
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
      this.dataSource = res.data
    },
    async save() {
      const filterArr = this.dataSource.filter(x => !x.sort)
      if (filterArr.length) {
        this.$msg({
          type: 'error',
          message: this.i18n_lang.lotterySet6
        })
        return
      }
      const arr = []
      this.dataSource.map((x, i) => {
        const t = {
          id: x.id,
          name: x.name,
          sort: i + 1
        }
        arr.push(t)
      })
      this.isEdit = !this.isEdit
      if (this.isEdit) {
        const res = await this.$axios.request({
          url: '/lottery/rank',
          method: 'POST',
          data: { data: arr }
        })
        this.$msg({
          type: res.status !== 200 ? 'error' : 'success',
          message: res.message
        })
        if (res.status !== 200) return
        this.getData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./HallSort.less');
</style>
