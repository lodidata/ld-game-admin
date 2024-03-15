<template>
  <div>
    <ul class="collapse-ul-transition">
      <li v-for="(item, index) in collapseData" :key="index" :value="`${index + 1}`">
        <div class="title" :class="{showIcon: !!isAdmin,clickActive:index==isCur}">
          <div class="collapse-btn">
            <span v-if="item.ana && item.ana.length > 0">
              <Icon v-if="!collapseModel[index].show" class="iconSpan" type="android-add"></Icon>
              <Icon v-else class="iconSpan" type="android-remove"></Icon>
            </span>
            <span
              v-if="!admin[index].isExit"
              class="text-title"
              @click.stop="collapseTitle($event, item, index)"
            >{{ item.name }}</span>
            <Input v-else v-model="item.newTitle" class="input" :maxlength="20" @paste="return false"></Input>
          </div>
          <div class="admin-btn">
            <div class="editIcon icon" @click="editTitle($event, item, index)">
              <Icon v-if="!admin[index].isExit" type="edit"></Icon>
              <Icon v-else type="checkmark-round"></Icon>
            </div>
            <div class="removeIcon icon" @click="cancelTitle($event, item, index)">
              <Icon type="trash-a"></Icon>
            </div>
          </div>
        </div>
        <Transition
          name="fade"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          @before-leave="beforeLeave"
          @leave="leave"
          @after-leave="afterLeave"
        >
          <div v-show="collapseModel[index].show" class="contentWrapper">
            <p v-for="(subItem, subIndex) in item.ana" :key="subIndex" class="content" :class="{showIcon: !!isAdmin}">
              <span v-if="!admin[index].list[subIndex].isExit" class="text">
                {{ subItem.content }}
                <Icon
                  style="vertical-align:middle;margin-left:6px;"
                  size="20"
                  type="chatbox-working"
                  @click.native="sendCommonMsg(subItem.content)"
                ></Icon>
              </span>
              <Input v-else v-model="subItem.newText" type="textarea" cols="20" class="textarea"></Input>
              <span class="admin-btn">
                <div class="editIcon icon" @click="editContent($event, subItem, index, subIndex)">
                  <Icon v-if="!admin[index].list[subIndex].isExit" type="edit"></Icon>
                  <Icon v-else type="checkmark-round"></Icon>
                </div>
                <div class="removeIcon icon" @click="cancelContent($event,item, index, subIndex)">
                  <Icon type="trash-a"></Icon>
                </div>
              </span>
            </p>
          </div>
        </Transition>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    collapseData: {
      type: Array,
      default() {
        return []
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const i18n_lang = this.$t('components');
    return {
      i18n_lang: i18n_lang,
      collapseModel: [],
      admin: [],
      isCur: 0
    }
  },
  watch: {
    collapseData: {
      handler() {
        this.createdData()
      },
      deep: true
    }
  },
  created() {
    this.createdData()
  },
  methods: {
    // 触发发送常用语消息
    sendCommonMsg(res) {
      console.log('211212-------------------', res)
      // window.eventBus.$emit('sendCommonMsg', res)
      // this.$store.commit('im/sendCommonMsg', res)
    },
    /**
     * 编辑标题
     */
    editTitle(event, item, index) {
      if (this.admin[index].isExit) {
        this.admin[index].isExit = !this.admin[index].isExit
        if (item.name === item.newTitle) return
        if (!item.newTitle) return this.$Message.error(this.i18n_lang.components0)
        const originTitle = item.name
        item.name = item.newTitle
        this.$emit('title-submit', item, index, originTitle)
      } else {
        item.newTitle = item.name
        this.changeTitleAdmin(event, item, index, true)
      }
    },
    /**
     * 删除编辑标题
     */
    cancelTitle(event, item, index) {
      if (this.collapseData.length <= 1) return this.$Message.error(this.i18n_lang.components1)
      this.$emit('delet-submit', item)
      this.changeTitleAdmin(event, item, index, false)
    },
    changeTitleAdmin(event, item, index, isExit) {
      this.admin = this.admin.map((item, itemIndex) => {
        if (itemIndex === index) {
          item.isExit = isExit
        }
        return item
      })
    },
    editContent(event, item, index, subIndex) {
      if (this.admin[index].list[subIndex].isExit) {
        this.admin[index].list[subIndex].isExit = !this.admin[index].list[subIndex].isExit
        if (item.content === item.newText) return
        if (!item.newText) return this.$Message.error(this.i18n_lang.components2)
        const originContent = item.content
        item.content = item.newText
        this.$emit('content-submit', item, index, originContent, subIndex)
      } else {
        item.newText = item.content
        this.changeContentAdmin(index, subIndex, true)
      }
    },
    cancelContent(event, item, index, subIndex) {
      this.$emit('delet-content', item, subIndex)
      this.changeContentAdmin(index, subIndex, false)
    },
    changeContentAdmin(index, subIndex, isExit) {
      this.$set(this.admin, index, {
        list: (() => {
          const list = this.admin[index].list.map((subItem, i) => {
            if (i === subIndex) {
              subItem.isExit = isExit
            }
            return subItem
          })
          return list
        })()
      })
    },
    // 新增文件夹
    addTitle() {},
    collapseTitle(event, item, index) {
      this.getTitleIndex(index, item)
      this.collapseModel = this.collapseModel.map((item, itemIndex) => {
        if (itemIndex === index) {
          item.show = !item.show
        }
        return item
      })
    },
    // changeContent(subItem) {
    //   subItem.isExit = !item.isExit
    // },
    // 获取title的index值
    getTitleIndex(index, item) {
      this.isCur = index
      this.$emit('add-content', index, item)
    },
    beforeEnter(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },

    enter(el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }
      el.style.overflow = 'hidden'
    },

    afterEnter(el) {
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
    },

    beforeLeave(el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },

    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },

    afterLeave(el) {
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    },
    createdData() {
      let model = []
      model = this.collapseData.map(() => ({ show: false }))
      if (model.length > 0) {
        model[0].show = true
      }
      this.collapseModel = model
      this.admin = this.collapseData.map(item => {
        const obj = {}
        obj.isExit = false
        if (item.ana) {
          obj.list = item.ana.map(subItem => {
            return {
              isExit: false,
              active: false
            }
          })
        }
        return obj
      })
      console.log('this.admin', this.admin)
    }
  }
}
</script>

<style lang="less" scoped>
@import './collapse-transition.less';
</style>
