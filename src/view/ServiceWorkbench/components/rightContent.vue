<template>
  <div id="infoRight" class="info-area">
    <div>
      <ul class="mainheader tabs">
        <li @click="active.infoTab='info'">{{i18n_lang.serviceWorkbench66}}</li>
        <!-- <li :class="{'active':active.infoTab=='useful'}" @click="active.infoTab='useful'">常用语</li> -->
      </ul>
    </div>
    <ul class="info-main">
      <li v-if="active.infoTab=='info'" class="info-con">
        <template v-if="Object.keys(userInfo).length > 1 && !loading.page">
          <p>
            <span>{{i18n_lang.serviceWorkbench67}}</span>
            <span
              :class="{'link':userInfo.base_info.user_type === 1}"
              @click="openDetail"
            >{{ userInfo.base_info.user_name }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench68}}</span>
            <span>{{ userInfo.base_info.user_id }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench69}}</span>
            <span>{{ userInfo.base_info.online==0?i18n_lang.serviceWorkbench70:i18n_lang.serviceWorkbench71 }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench72}}</span>
            <span>{{ userInfo.base_info.user_tags }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench73}}</span>
            <span>{{ userInfo.base_info.user_level }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench74}}</span>
            <span
              v-if="userInfo.wallet_info && userInfo.wallet_info.length"
            >{{ MathDiv(userInfo.wallet_info[0].balance,100) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench76}}</span>
            <span>{{ MathDiv(userInfo.deposit_withdraw.deposit_sum,1) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench77}}</span>
            <span>{{ MathDiv(userInfo.deposit_withdraw.withdraw_sum,1) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench78}}</span>
            <span>{{ MathDiv(userInfo.earn_loss.earn_loss,1) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench79}}</span>
            <span>{{ MathDiv(userInfo.dml_info.free_money,1) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench80}}</span>
            <span>{{ MathDiv(userInfo.dml_info.require_bet,1) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench81}}</span>
            <span>{{ MathDiv(userInfo.dml_info.actual_bet,1) }}{{i18n_lang.serviceWorkbench75}}</span>
          </p>
          <!-- <p>
            <span>访问来源:</span>
            <span>{{ getDeviceType | getOrigin }}</span>
          </p>-->
          <p>
            <span>{{i18n_lang.serviceWorkbench82}}</span>
            <span>{{ userInfo.base_other.register_ip }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench83}}</span>
            <span>{{ userInfo.base_other.login_ip }}</span>
          </p>
          <p>
            <span>{{i18n_lang.serviceWorkbench84}}</span>
            <span>{{ userInfo.base_other.register_time }}</span>
          </p>
        </template>
        <template v-else-if="Object.keys(userInfo).length === 1 && !loading.page">
          <p>
            <span>{{i18n_lang.serviceWorkbench85}}</span>
            <span>{{ userInfo.base_info.user_name }}</span>
          </p>
        </template>
        <template v-else-if="loading.page">
          <div class="loading-container">
            <Spin>
              <Icon type="load-c" size="30" class="spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
          </div>
        </template>
        <template v-else>
          <div class="noUserInfo">
            <div>
              <img src="@/assets/images/service/zwxx.png" alt>
            </div>
            <div>{{i18n_lang.serviceWorkbench86}}</div>
          </div>
        </template>
      </li>
      <li v-if="active.infoTab=='useful'" class="useful">
        <div class="collapse-text">
          <CollapseTransition
            :collapse-data="collapseData"
            :is-admin="isAdmin"
            @title-submit="getNewTitile"
            @delet-submit="deleteTitle"
            @content-submit="getNewContent"
            @delet-content="deletContent"
            @add-content="getAddContent"
          ></CollapseTransition>
          <div v-if="addTitleShow" style="height:44px;">
            <div class="title" style="height:40px;">
              <div class="collapse-btn">
                <Input v-model="addTitleName" class="add-input"></Input>
                <div class="addBox-btn">
                  <span @click="addTitle">{{i18n_lang.serviceWorkbench87}}</span>
                  <span @click="cancelAddTitle">{{i18n_lang.serviceWorkbench88}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p v-if="!isAdmin" class="footer-edit" @click="footerEdit">
          <span>{{i18n_lang.serviceWorkbench89}}</span>
          <Icon type="ios-settings"></Icon>
        </p>
        <table v-else class="other-admin">
          <tbody>
            <tr>
              <td @click="addTitleShow=true">{{i18n_lang.serviceWorkbench90}}</td>
              <td @click="handelAddContent">{{i18n_lang.serviceWorkbench91}}</td>
              <td @click="footerEdit">{{i18n_lang.serviceWorkbench92}}</td>
            </tr>
          </tbody>
        </table>
        <Modal id="content-modal" v-model="visible" :title="i18n_lang.serviceWorkbench91" width="250">
          <Input v-model="addContent" type="textarea" :placeholder="i18n_lang.serviceWorkbench93"></Input>
          <div slot="footer">
            <Button type="primary" :loading="loading.modalButton" @click="addAd">{{i18n_lang.serviceWorkbench94}}</Button>
            <Button type="default" @click="cancelAd">{{i18n_lang.serviceWorkbench95}}</Button>
          </div>
        </Modal>
      </li>
    </ul>
  </div>
</template>

<script>
import CollapseTransition from '@/components/collapse-transition/collapse-transition'
import { MathDiv } from '@/libs/formatMath.js'
import { mapState } from 'vuex'
export default {
  components: {
    CollapseTransition
  },
  props: {
    client: {
      type: Object,
      default: null
    }
  },
  filters: {
    getOrigin: value => {
      if (value === 1) {
        return 'H5'
      } else if (value === 2) {
        return 'IOS'
      } else if (value === 3) {
        return 'andriod'
      } else if (value === 4) {
        return 'PC'
      } else {
        return '----'
      }
    }
  },
  data() {
    const i18n_lang = this.$t('serviceWorkbench');
    return {
      i18n_lang: i18n_lang,
      loading: {
        page: false,
        modalButton: false
      },
      active: {
        infoTab: 'info'
      },
      addTitleName: '', // 添加文件夹名称
      addContent: '', // 添加常用语
      content: {
        index: '',
        item: {}
      },
      addTitleShow: false,
      userId: '',
      userInfo: {},
      value: '1',
      isAdmin: false,
      visible: false,
      collapseData: []
    }
  },
  watch: {
    client(val) {
      if (val) {
        this.getUserInfo(val.thirdPartyId)
      } else {
        this.userInfo = {}
      }
    }
  },
  created() {
    this.getFileDate()
  },
  methods: {
    openDetail() {
      // 正式用户才能打开用户详情
      if (this.userInfo.base_info.user_type === 1) {
        this.$store.dispatch('detail/info', {
          username: this.userInfo.base_info.user_name,
          id: this.userInfo.base_info.user_id
        })
      }
    },
    // 浮点数相除
    MathDiv(a, b) {
      return MathDiv(a, b)
    },
    // 获取用户信息
    async getUserInfo(thirdPartyId) {
      if (!thirdPartyId) {
        this.userInfo = {}
        return
      }
      this.loading.page = true
      const res = await this.$axios.request({
        url: `/servicemanage/user/${thirdPartyId}`,
        method: 'GET'
      })
      if (res.status === 200) {
        this.loading.page = false
        const userName = res.data.base_info.user_name
        this.userInfo = res.data
      } else {
        this.$Message.error(res.data.message)
      }
    },
    // 获取文件夹/常用语信息
    async getFileDate() {
      const res = await this.$axios.request({
        url: `/servicemanage/language/folder`,
        method: 'GET'
      })
      if (res.status === 200) {
        this.collapseData = res.data
      } else {
        this.$Message.error(res.data.message)
      }
    },
    // 接收新标题的值
    async getNewTitile(newData, index, originTitle) {
      const res = await this.$axios.request({
        url: `/servicemanage/language/folder/${newData.id}`,
        method: 'PUT',
        data: {
          name: newData.newTitle
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        this.collapseData[index].name = originTitle
      }
    },
    // 删除文件夹
    async deleteTitle(Data) {
      const res = await this.$axios.request({
        url: `/servicemanage/language/folder/${Data.id}`,
        method: 'DELETE'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        console.log(res.message, 'res.data.message')
        this.$Message.success(res.message)
        this.getFileDate()
      }
    },
    // 编辑常用语
    async getNewContent(newData, index, originContent, subIndex) {
      const res = await this.$axios.request({
        url: `/servicemanage/language/ana/${newData.id}`,
        method: 'PUT',
        data: {
          content: newData.newText
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        this.collapseData[index].ana[subIndex].content = originContent
      }
    },
    // 删除常用语
    async deletContent(data, subIndex) {
      const res = await this.$axios.request({
        url: `/servicemanage/language/ana/${data.ana[subIndex].id}`,
        method: 'DELETE'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.getFileDate()
      }
    },
    // 保存新增文件夹
    async addTitle() {
      if (!this.addTitleName) this.$Message.error(this.i18n_lang.serviceWorkbench96)
      return
      const res = await this.$axios.request({
        url: `/servicemanage/language/folder`,
        method: 'POST',
        data: {
          name: this.addTitleName
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.addTitleShow = false
        this.addTitleName = ''
        this.getFileDate()
      }
    },
    // 取消新增文件夹
    cancelAddTitle() {
      this.addTitleShow = false
      this.addTitleName = ''
    },
    // 获取选中的文件夹的数据
    getAddContent(index, item) {
      console.log(index, item, '123')
      this.content.index = index
      this.content.item = item
    },
    // 添加常用语
    handelAddContent() {
      if (this.content.index === '') return this.$Message.warning(this.i18n_lang.serviceWorkbench97)
      this.visible = true
    },
    // 保存常用语
    async addAd() {
      this.loading.modalButton = true
      const res = await this.$axios.request({
        url: `/servicemanage/language/ana`,
        method: 'POST',
        data: {
          content: this.addContent,
          service_folder_id: this.content.item.id
        }
      })
      this.loading.modalButton = false
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        this.$Message.success(res.message)
        this.addContent = ''
        this.visible = false
        this.getFileDate()
      }
    },
    cancelAd() {
      this.addContent = ''
      this.visible = false
    },
    footerEdit() {
      this.isAdmin = !this.isAdmin
      if (this.isAdmin) {
        this.$Message.info(this.i18n_lang.serviceWorkbench98)
      } else {
        this.$Message.info(this.i18n_lang.serviceWorkbench99)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./rightContent.less');
#content-modal {
  /deep/.ivu-modal-mask {
    background: transparent;
  }
  /deep/.ivu-modal {
    left: 558px;
    top: 260px;
  }
}
#infoRight {
  .title {
    background-color: #e9e9e9;
    border-bottom: 1px solid #cacaca;
    position: relative;
    padding: 8px 0px 8px 10px;
    cursor: pointer;
    z-index: 2;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    .collapse-btn {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
    .add-input {
      width: 70%;
      position: relative;
      height: 25px;
      left: 10px;
      top: -5px;
      border-radius: 3px;
      transition: all 0.2s;
      font-size: 12px;
    }
    .addBox-btn {
      position: relative;
      right: -23px;
      font-size: 12px;
      top: 4px;
    }
    .addBox-btn span:nth-child(1) {
      color: #2d8cf0;
      margin-right: 4px;
    }
  }
}
</style>
