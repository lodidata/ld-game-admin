<template>
  <div id="level">
    <Spin v-if="loading.page" size="large" fix></Spin>
    <Button type="primary" icon="md-add" @click="handleEdit()">{{i18n_lang.memberLevel1}}</Button>
    <Table :columns="columns" :data="dataSource" border style="margin-top:20px;"></Table>
    <div style="padding:10px 0 0; font-size: 16px;text-align: end;">{{ `${i18n_lang.memberLevel41}${page.total}${i18n_lang.memberLevel42}` }}</div>
    <MyPage
      class="page_box"
      :current="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      show-sizer
      @onChange="getData"
      @changePageSize="changePageSize"
    ></MyPage>

    <!-- 查看 -->
    <Modal
      id="levelDetailModal"
      v-model="visible.modal"
      :title="i18n_lang.memberLevel2"
      :width="900"
      :styles="{top: '20px'}"
    >
      <Spin v-if="loading.edit" size="large" fix></Spin>
      <Tabs value="levelDetail" name="tab2">
        <TabPane :label="i18n_lang.memberLevel3" name="levelDetail" tab="tab2" class="tab_box">
          <p class="title">{{i18n_lang.memberLevel4}}</p>
          <Row>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.memberLevel5}}</p>
                <span>{{ detailData.LevelDetailData.name }}</span>
              </div>
            </Col>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.memberLevel6}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.deposit_money,1) }}</span>
              </div>
            </Col>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.memberLevel7}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.lottery_money,1) }}</span>
              </div>
            </Col>
          </Row>
          <p class="title">{{i18n_lang.memberLevel8}}</p>
          <Row>
            <Col span="8">
              <div class="item">
                <img :src="detailData.LevelDetailData.icon" style="width:60px;">
              </div>
            </Col>
          </Row>
          <!-- <p class="title">{{i18n_lang.memberLevel9}}</p>
          <Row>
            <Col span="16">
              <div class="item">
                <p style="display: block;">{{i18n_lang.memberLevel10}}</p>
                <p>
                  <span
                    v-for="(item,index) in detailData.LevelDetailData.online"
                    :key="index"
                    class="detail"
                  >
                  {{ item }}
                  </span>
                </p>
              </div>
            </Col>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.memberLevel11}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.online_dml_percent,100) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span="16">
              <div class="item">
                <p style="display: block;">{{i18n_lang.memberLevel13}}</p>
                <p>
                  <span
                    v-for="(item,index) in detailData.LevelDetailData.offline"
                    :key="index"
                    class="detail"
                  >
                  {{ item }}
                  </span>
                </p>
              </div>
            </Col>
            <Col span="8">
              <div class="item">
                <p>{{i18n_lang.memberLevel14}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.offline_dml_percent,100) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
          </Row> -->
          <p class="title">{{i18n_lang.memberLevel15}}</p>
          <Row>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.memberLevel16}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.promote_handsel, 1) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.memberLevel17}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.transfer_handsel,1) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.memberLevel18}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.upgrade_dml_percent,1) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.memberLevel19}}</p>
                <span>{{ detailData.LevelDetailData.draw_count || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.memberLevel20}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.monthly_money,1) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
            <Col span="6">
              <div class="item">
                <p>{{i18n_lang.memberLevel21}}</p>
                <span>{{ formatMathDiv(detailData.LevelDetailData.monthly_percent,100) || i18n_lang.memberLevel12 }}</span>
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane :label="i18n_lang.memberLevel22" name="backWaterDetail" tab="tab2">
          <BackWaterSet ref="BackWaterSet" :is-edit-show="false"></BackWaterSet>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" @click="visible.modal = false">{{i18n_lang.memberLevel23}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyPage from '_c/MyPage'
import columns from './columns/level'
import { MathDiv, MathMul } from '@/libs/formatMath'
import BackWaterSet from '../MemberLevelDetail/BackWaterSetting'

export default {
  components: {
    MyPage,
    BackWaterSet
  },
  data() {
    const i18n_lang = this.$t('memberLevel');
    return {
      i18n_lang: i18n_lang,
      columns: columns(this),
      loading: {
        page: false,
        edit: false
      },
      visible: {
        modal: false
      },
      dataSource: [],
      detailData: {
        LevelDetailData: [],
        backwaterDetailData: []
      },
      curId: null,
      page: {
        pageSize: 20,
        total: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    // 浮点数
    formatMathDiv(a, b) {
      return MathDiv(a, b)
    },
    // 切换条数
    changePageSize(pageSize) {
      this.page.pageSize = pageSize
      this.getData()
    },
    // 获取数据
    async getData(i = 1) {
      this.page.currentPage = i
      this.loading.page = true
      const req = {
        page: this.page.currentPage,
        page_size: this.page.pageSize,
        ...this.query
      }
      const res = await this.$axios.request({
        url: '/memberslevel',
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      this.page.total = res.attributes ? res.attributes.total : 0
      this.dataSource = res.data
    },
    async handleEdit(row) {
      if (row) {
        this.$router.push({
          path: `memberLevelDetail`,
          query: {
            id: row.id
          }
        })
      } else {
        this.$router.push({
          path: `memberLevelDetail`
        })
      }
    },

    // 查看详情
    async handleDetail(row) {
      this.visible.modal = true
      this.detailData.LevelDetailData = row
      this.$refs.BackWaterSet.getData(row.id)
    },
    // 修改、新增
    save() {
      this.$refs['editForm'].validate(async valid => {
        if (valid) {
          this.loading.edit = true

          const req = { ...this.editInfo }
          // req.deposit_min = MathMul(req.deposit_min, 100)
          req.online_dml_percent = MathDiv(req.online_dml_percent, 100)
          req.offline_dml_percent = MathDiv(req.offline_dml_percent, 100)

          let url = '/level'
          const opt = {
            method: 'PUT',
            data: req
          }

          if (this.editType === 'add') {
            opt.method = 'POST'
            delete opt.data.id
          } else {
            url += `/${req.id}`
          }
          const res = await this.$axios.request({
            url,
            ...opt
          })
          this.loading.edit = false
          this.$msg({
            type: res.status !== 200 ? 'error' : 'success',
            message: res.message
          })
          if (res.status !== 200) return
          this.visible.modal = false
          this.getData()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#level {
  min-height: 608px;
  .desc {
    font-size: 14px;
    margin: 10px 0;
    color: #333;
    font-weight: bold;
  }
  /deep/ .ivu-table-cell {
    .pic {
      width: 60px;
    }
  }
}
#levelDetailModal {
  /deep/ .ivu-row {
    padding: 0 40px;
    .item {
      margin-bottom: 18px;
      p,
      span {
        font-size: 14px;
        display: inline-block;
        line-height: 28px;
        color: rgb(153, 153, 153);
        min-width: 70px;
        margin-right: 5px;
      }
      span {
        color: rgb(51, 51, 51);
        &.detail {
          color: rgb(255, 255, 255);
          background-color: rgb(45, 140, 240);
          border-color: rgb(45, 140, 240);
          padding: 0 8px;
          border-radius: 3px;
          margin-bottom: 6px;
          text-align: center;
        }
      }
    }
  }
}
</style>
