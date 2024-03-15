<template>
  <div id="LotteryIcon">
    <Spin v-if="loading.page" fix size="large"></Spin>
    <MyTable combinerow border :columns="columns" :data="dataSource"></MyTable>
    <!-- 编辑/新增 -->
    <Modal v-model="visible.modal" :title="i18n_lang.lotteryIcon0" :width="600" :label-width="80" :styles="{top: '20px'}" @on-cancel="handleCloseModal">
      <Row>
        <Col span="6">{{i18n_lang.lotteryIcon1}}</Col>
        <Col span="14">{{ editInfo.name }}</Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="6">{{i18n_lang.lotteryIcon2}}</Col>
        <Col span="14">
        <span>{{i18n_lang.lotteryIcon3}}
        </span>
        <UploadImg v-model="editInfo.index_f_img"></UploadImg>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="6">{{i18n_lang.lotteryIcon4}}</Col>
        <Col span="14">
        <UploadImg v-model="editInfo.index_c_img"></UploadImg>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="6">{{i18n_lang.lotteryIcon5}}</Col>
        <Col span="14">
        <UploadImg v-model="editInfo.buy_f_img"></UploadImg>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="6">{{i18n_lang.lotteryIcon6}}</Col>
        <Col span="14">
        <UploadImg v-model="editInfo.buy_c_img"></UploadImg>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="6">{{i18n_lang.lotteryIcon7}}</Col>
        <Col span="14">
        <UploadImg v-model="editInfo.open_img"></UploadImg>
        </Col>
      </Row>
      <div slot="footer">
        <!-- <Button type="info" @click="handleCloseModal">关闭</Button> -->
        <Button type="primary" :loading="loading.modalButton" @click="saveImg">{{i18n_lang.lotteryIcon8}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import UploadImg from '../../components/UploadImg'
import columns from './columns'
import { pidSortAndGroup } from './format.js'
import MyTable from '../../components/MyTable'
const ininData = {}
export default {
  components: {
    UploadImg,
    MyTable
  },
  data() {
    const i18n_lang = this.$t('lotteryIcon');
    return {
      i18n_lang: i18n_lang,
      loading: { // loading
        page: false,
        modalButton: false
      },
      // modal显示
      visible: {
        modal: false
      },
      // table
      columns: columns(this),
      dataSource: [],
      // edit
      editType: 'edit', // 编辑类型add/edit
      editInfo: {} // 编辑列表
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading.page = true
      this.dataSource = []
      const res = await this.$axios.request({
        url: `/lotteryImg`,
        method: 'GET'
      })

      this.loading.page = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      const groupAndSort = pidSortAndGroup(res.data)
      this.dataSource = groupAndSort.sort
      this.columns = columns(this, groupAndSort.group)
    },
    // 打开modal
    async handleOpenModal(data) {
      this.editInfo = Object.assign({}, data || ininData)
      this.visible.modal = !this.visible.modal
    },
    // 关闭modal
    handleCloseModal() {
      this.visible.modal = false
    },
    async saveImg(key, val) {
      // this.editInfo.id
      this.loading.modalButton = true
      const res = await this.$axios.request({
        url: '/lotteryImg',
        method: 'post',
        data: this.editInfo
      })
      this.loading.modalButton = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.handleCloseModal()
      }
      console.log(res)
      this.getData()
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
