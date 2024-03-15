<template>
  <div class="luck-disk-active" style="width: 100%">
    <Form ref="parentForm" :model="editInfo" :rules="ruleValidate" :label-width="110">
      <FormItem :label="i18n_lang.activeList109" prop="title">
        <Input v-model="editInfo.title" :placeholder="i18n_lang.activeList110"></Input>
      </FormItem>
      <FormItem :label="i18n_lang.activeList111" prop="content">
        <Input v-model="editInfo.content" :placeholder="i18n_lang.activeList112"/>
      </FormItem>
      <Row>
        <Col span="8">
          <FormItem :label="i18n_lang.activeList113" prop="begin_time">
            <DatePicker
              v-model="editInfo.begin_time"
              type="datetime"
              :options="optionsStart"
              format="yyyy-MM-dd HH:mm:ss"
              :placeholder="i18n_lang.activeList114"
              style="width: 200px"
              @on-change="changeStartTime"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="1" style="padding-left: 10px; line-height: 30px;">&nbsp;-&nbsp;</Col>
        <Col span="6">
          <FormItem :label-width="1" prop="end_time">
            <DatePicker
              v-model="editInfo.end_time"
              type="datetime"
              :options="optionsEnd"
              format="yyyy-MM-dd HH:mm:ss"
              :placeholder="i18n_lang.activeList115"
              style="width: 200px"
              @on-change="changeEndTime"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <FormItem :label="i18n_lang.activeList116" prop="issue_mode">
        <RadioGroup v-model="editInfo.issue_mode" size="large">
          <Radio label="auto">{{i18n_lang.activeList117}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="i18n_lang.activeList118" prop="limit_times">
        <Input v-model="editInfo.limit_times"></Input>
      </FormItem>
      <FormItem :label="i18n_lang.activeList119" prop="recharge_limit">
        <div v-for="(todo,index) in recharge_limit" :key="index" class="recharge-limit">
          <div class="info">
            <span>{{i18n_lang.activeList120}}</span>
            <Input v-model="todo.money" :placeholder="i18n_lang.activeList121"></Input>
            <span>{{i18n_lang.activeList122}}</span>
            <Input v-model="todo.times" :placeholder="i18n_lang.activeList123"></Input>
          </div>
          <div class="btns">
            <span @click="addLimit">+</span>
            <span v-if="index !== 0" class="del" @click="delLimit">-</span>
          </div>
        </div>
      </FormItem>
      <FormItem :label="i18n_lang.activeList124" prop="status">
        <RadioGroup v-model="editInfo.status" size="large">
          <Radio label="enabled">{{i18n_lang.activeList125}}</Radio>
          <Radio label="disabled">{{i18n_lang.activeList126}}</Radio>
        </RadioGroup>
      </FormItem>
       <FormItem :label="i18n_lang.activeList43" prop="type_id">
        <Select v-model="editInfo.type_id" :placeholder="i18n_lang.activeList44" style="width:200px">
          <Option v-for="item in activeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="i18n_lang.activeList127" prop="sort">
        <Input v-model="editInfo.sort" :placeholder="i18n_lang.activeList128"></Input>
      </FormItem>
      <FormItem :label="i18n_lang.activeList129" prop="cover">
        <UploadImg v-model="editInfo.cover" @input="getUploadImgUrl"></UploadImg>
      </FormItem>
      <FormItem :label="i18n_lang.activeList130" prop="prize_list" style="position: relative">
        <span
          style="color: #ed3f14; position: absolute; left: -69px; font-size: 12px; font-family: SimSun"
        >*</span>
        <ul class="item-list">
          <li
            v-for="(item, index) in itemList"
            :key="index"
            :class="{active: curTab === item.id}"
            @click="changeTab(item, index)"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <div
          v-for="(item, i) in itemList"
          v-show="curTab === item.id && prizeList.length > 0"
          :key="i"
          class="prize-wrapper"
          :class="{animate: curTab === item.id}"
        >
          <Form :ref="`childForm${i}`" :model="prizeList[i]" :label-width="110" :rules="prizeRule">
            <FormItem :label="i18n_lang.activeList131" prop="award_id">
              <Select
                v-model="prizeList[i].award_id"
                style="width: 500px"
                :label-in-value="true"
                @on-change="awardNameChange"
              >
                <Option
                  v-for="(todo, index) in prizeListSelect"
                  :key="index"
                  :value="todo.id"
                  :disabled="optionDisable(todo.id)"
                >{{ todo.name }}</Option>
              </Select>
            </FormItem>
            <FormItem :label="i18n_lang.activeList132" prop="img">
              <UploadImg
                v-model="prizeList[i].img"
                style="background-color: transparent; margin-left: 110px; border: 1px solid #ddd"
                @input="prizeListImageUrl"
              ></UploadImg>
            </FormItem>
            <div
              v-for="(u_item, u_index) in prizeList[i].user_list"
              :key="u_index"
              class="user-list-wrapper"
            >
              <div class="user-list-left user-list">
                <FormItem :label="u_index === 0 ? i18n_lang.activeList133 : ''" prop="name">
                  <div class="appoint-user-item left">
                    <Input
                      v-model="u_item.name"
                      :placeholder="i18n_lang.activeList134"
                      style="width: 73px;"
                      @on-focus="onFocusUserName(u_index)"
                      @on-change="onChangeUserName(u_index)"
                    ></Input>
                    <Button
                      v-if="u_item.auth === ''"
                      type="primary"
                      class="admin-btn query"
                      :loading="u_item.loading"
                      @click="authUser(u_item.name, u_index)"
                    >{{i18n_lang.activeList135}}</Button>
                    <Button v-if="u_item.auth === '0'" type="error" class="admin-btn query">{{i18n_lang.activeList136}}</Button>
                    <Button v-if="u_item.auth === '1'" type="primary" class="admin-btn query">{{i18n_lang.activeList137}}</Button>
                  </div>
                </FormItem>
              </div>
              <div class="user-list-right user-list">
                <FormItem :label-width="1" prop="times">
                  <div class="appoint-user-item right">
                    <p style="margin-right:13px;">{{i18n_lang.activeList138}}</p>
                    <Input
                      v-model="u_item.times"
                      :min="1"
                      style="width: 73px;"
                      @on-focus="onFocusUserName(u_index)"
                    ></Input>
                    <Button
                      v-if="prizeList[i].user_list.length > 1"
                      type="error"
                      class="admin-btn"
                      @click="removeUser(u_index)"
                    >{{i18n_lang.activeList139}}</Button>
                    <Button
                      v-if="u_index === prizeList[i].user_list.length - 1"
                      type="primary"
                      class="admin-btn"
                      @click="addUser"
                    >{{i18n_lang.activeList140}}</Button>
                  </div>
                </FormItem>
              </div>
            </div>
            <FormItem :label="i18n_lang.activeList141" prop="award_type">
              <Select v-model="prizeList[i].award_type" style="width:200px">
                <Option value="1">{{i18n_lang.activeList142}}</Option>
                <Option value="2">{{i18n_lang.activeList143}}</Option>
              </Select>
            </FormItem>
            <FormItem v-if="prizeList[i].award_type === '1'" :label="i18n_lang.activeList144" prop="award_money">
              <Input v-model="prizeList[i].award_money" :placeholder="i18n_lang.activeList145"></Input>
            </FormItem>
            <FormItem v-if="prizeList[i].award_type === '1'" :label="i18n_lang.activeList146" prop="withdraw_val">
              <Input v-model="prizeList[i].withdraw_val" :placeholder="i18n_lang.activeList147"></Input>
            </FormItem>
            <FormItem :label="i18n_lang.activeList148" prop="award_code">
              <Input v-model="prizeList[i].award_code" style="width: 180px;"></Input>&nbsp;%
              <span style="margin-left: 10px; color: red">{{i18n_lang.activeList149}}</span>
            </FormItem>
            <FormItem>
              <LuckRotate :circular-list="circularList"></LuckRotate>
            </FormItem>
          </Form>
        </div>
      </FormItem>
      <!-- <FormItem label="活动奖品编辑" prop="description">
        <Input type="textarea" :rows="5" v-model="editInfo.description"></Input>
      </FormItem>-->
      <!-- <FormItem label="活动规则编辑" prop="content">
        <Input v-model="editInfo.content" type="textarea" :rows="5"></Input>
        <span style="float: right; width: 200px; margin-right: 30px;">活动规则请不要使用数字编号，请以一个回车换行</span>
      </FormItem> -->
      <FormItem :label="i18n_lang.activeList150" prop="description">
        <div id="luckEdit" style="width:700px;"></div>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          :loading="loading.modalButton"
          @click="submit"
        >{{ loading.modalButton?i18n_lang.activeList151:i18n_lang.activeList152 }}</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import UploadImg from './UploadImg'
import LuckRotate from './LuckRotate'
import { formatDateTimeToString } from '@/libs/date'
import { MathMul, MathDiv } from '@/libs/formatMath'

const USER_ITEM = { name: '', id: '', times: '', auth: '', loading: false }
const NUMBER_REG_GT0 = /^\+?[0-9][0-9]*$/

const validatorNumberGt0 = (rule, value, cb) => {
  if (value) {
    value = value.toString()
  } else {
    return cb()
  }
  if (value) {
    console.log('!NUMBER_REG_GT0.test(value)', !NUMBER_REG_GT0.test(value), value)
    if (!NUMBER_REG_GT0.test(value)) {
      return cb('请输入正整数')
    }
  }
  return cb()
}
export default {
  name: 'LuckDiskActive',
  components: {
    UploadImg,
    LuckRotate
  },
  props: {
    info: {
        type: Object,
        default: () => ({})
    },
    editType: String,
    activeList: {
        type: Array,
        default: () => []
    }
  },
  data() {
    const i18n_lang = this.$t('activeList');
    const data = {
      i18n_lang: i18n_lang,
      editor: null, // 富文本
      fileData: {
        base64: this.value || null,
        formData: null,
        fileName: '',
        file: this.value || null
      },
      fileUrl: '',
      loading: {
        modalButton: false
      },
      curTab: 1,
      currentPrize: 0,
      editInfo: {
        title: '',
        begin_time: '',
        end_time: '',
        issue_mode: 'auto',
        limit_times: '',
        luckydraw_condition: '', // 充值额度
        status: 'enabled',
        sort: '',
        type_id: '',
        cover: '',
        // description: '',
        content: ''
      },
      recharge_limit: [{ money: '', times: '' }], // 充值额度列表
      optionsStart: {
        disabledDate(date) {
          if (data.editInfo.end_time) {
            return date && date.valueOf() > new Date(data.editInfo.end_time).valueOf()
          }
        }
      },
      optionsEnd: {
        disabledDate(date) {
          if (data.editInfo.begin_time) {
            return date && date.valueOf() < new Date(data.editInfo.begin_time).valueOf()
          }
        }
      },
      ruleValidate: {
        title: [{ required: true, message: i18n_lang.activeList154, max: 200, trigger: 'blur' }],
        begin_time: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (data.editInfo.begin_time === '') {
                return cb(i18n_lang.activeList155)
              } else {
                return cb()
              }
            }
          }
        ],
        end_time: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (data.editInfo.end_time === '') {
                return cb(i18n_lang.activeList156)
              } else {
                return cb()
              }
            }
          }
        ],
        type_id: [{ required: true, message: i18n_lang.activeList66 }],
        issue_mode: [{ required: true, message: i18n_lang.activeList157, trigger: 'blur' }],
        limit_times: [
          {
            required: false,
            validator: validatorNumberGt0
          }
        ],
        recharge_limit: [],
        status: [{ required: true, message: i18n_lang.activeList158, trigger: 'blur' }],
        sort: [
          {
            required: true,
            validator: (rule, value, cb) => {
              value = value.toString()
              if (value) {
                if (!NUMBER_REG_GT0.test(value)) {
                  return cb(i18n_lang.activeList159)
                }
              } else {
                return cb(i18n_lang.activeList160)
              }
              return cb()
            },
            trigger: 'blur'
          }
        ],

        cover: [{ required: true, message: i18n_lang.activeList161, trigger: 'blur' }],
        // description: [{ required: true, message: '请输入活动奖品编辑', trigger: 'blur' }],
        content: [
          {
            required: true,
            validator: (rule, value, cb) => {
              if (!value) {
                return cb(i18n_lang.activeList162)
              } else if (value.replace(/\s?/g, '') === '') {
                return cb(i18n_lang.activeList163)
              }
              return cb()
            },
            trigger: 'blur'
          }
        ]
        // prize_list: [{ required: true, message: '请填写奖品列表', trigger: 'blur' }]
      },
      prizeList: [],
      prizeRule: {
        // award_name: [{ required: true, message: '请输入奖项名称', trigger: 'blur' }],
        award_id: [{ required: true, message: i18n_lang.activeList164, trigger: 'blur' }],
        img: [{ required: true, message: i18n_lang.activeList165, trigger: 'blur' }],
        award_type: [{ required: true, message: i18n_lang.activeList166, trigger: 'blur' }],
        award_money: [
          {
            required: true,
            validator: (rule, value, cb) => {
              value = value.toString()
              if (value) {
                if (!NUMBER_REG_GT0.test(value)) {
                  return cb(i18n_lang.activeList167)
                } else if (Number(value) < 1) {
                  return cb(i18n_lang.activeList168)
                }
              } else {
                return cb(i18n_lang.activeList169)
              }
              return cb()
            },
            trigger: 'blur'
          }
        ],
        withdraw_val: [
          {
            required: true,
            validator: (rule, value, cb) => {
              value = value.toString()
              if (value) {
                if (!NUMBER_REG_GT0.test(value)) {
                  return cb(i18n_lang.activeList167)
                }
              } else {
                return cb(i18n_lang.activeList170)
              }
              return cb()
            },
            trigger: 'blur'
          }
        ],
        award_code: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, cb) => {
              if (!value) {
                return cb(i18n_lang.activeList171)
              }
              const reg = /^\d+(\.\d+)?$/
              if (!reg.exec(value)) {
                return cb(i18n_lang.activeList172)
              }
              return cb()
            }
          }
        ],
        name: [
          {
            trigger: 'blur',
            validator: (rule, value, cb) => {
              const name = data.prizeList[data.currentPrize].user_list[data.userIndex].name
              const times = data.prizeList[data.currentPrize].user_list[data.userIndex].times
              const auth = data.prizeList[data.currentPrize].user_list[data.userIndex].auth
              if (times && !name) {
                return cb(i18n_lang.activeList173)
              }
              if (name && times) {
                if (auth === '') {
                  return cb(i18n_lang.activeList174)
                } else {
                  if (auth === '0') {
                    return cb(i18n_lang.activeList175)
                  } else {
                    return cb()
                  }
                }
              }
              return cb()
            }
          }
        ],
        times: [
          {
            trigger: 'blur',
            validator: (rule, value, cb) => {
              const name = data.prizeList[data.currentPrize].user_list[data.userIndex].name
              const times = data.prizeList[data.currentPrize].user_list[data.userIndex].times
              if (times) {
                const reg = new RegExp('^[0-9]*$')
                if (!reg.test(times)) {
                  return cb(i18n_lang.activeList176)
                } else {
                  return cb()
                }
              }
              if (name && !times) {
                return cb(i18n_lang.activeList177)
              }
              return cb()
            }
          }
        ]
      },
      prizeListSelect: [
        { id: '1', name: i18n_lang.activeList178 },
        { id: '2', name: i18n_lang.activeList179 },
        { id: '3', name: i18n_lang.activeList180 },
        { id: '4', name: i18n_lang.activeList181 },
        { id: '5', name: i18n_lang.activeList182 },
        { id: '6', name: i18n_lang.activeList183 },
        { id: '7', name: i18n_lang.activeList184 },
        { id: '8', name: i18n_lang.activeList185 },
        { id: '9', name: i18n_lang.activeList186 }
      ],
      itemList: [
        { id: 1, name: i18n_lang.activeList178 },
        { id: 2, name: i18n_lang.activeList179 },
        { id: 3, name: i18n_lang.activeList180 },
        { id: 4, name: i18n_lang.activeList181 },
        { id: 5, name: i18n_lang.activeList182 },
        { id: 6, name: i18n_lang.activeList183 },
        { id: 7, name: i18n_lang.activeList184 },
        { id: 8, name: i18n_lang.activeList185 }
      ],
      currentChangePrizes: ['', '', '', '', '', '', '', ''],
      userIndex: 0,
      circularList: {
        1: i18n_lang.activeList186,
        2: i18n_lang.activeList187,
        3: i18n_lang.activeList188,
        4: i18n_lang.activeList190,
        5: i18n_lang.activeList191,
        6: i18n_lang.activeList192,
        7: i18n_lang.activeList193,
        8: i18n_lang.activeList194
      }
    }
    return data
  },
  watch: {
    info: {
      handler() {
        if (this.editType === 'edit') {
          this.updateDefaultData()
        }
      },
      deep: true
    }
  },
  created() {
    this.handlePrizeList()

    if (this.editType === 'edit') {
      this.updateDefaultData()
    }
  },
  mounted() {
    this.editor = new Editor(`#luckEdit`)
    this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config;
    this.editor.customConfig.pasteFilterStyle = false
    this.editor.customConfig.pasteIgnoreImg = true
    this.editor.customConfig.customUploadImg = async (files, insert) => {
      let imgUrl
      this.fileData.formData = new FormData()
      this.fileData.formData.append('file', files[0])
      this.fileData.formData.append('name', files[0].name)
      const res = await this.$axios.request({
        url: `/upload`,
        method: 'POST',
        data: this.fileData.formData
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
      } else {
        imgUrl = res.data.url
      }
      insert(imgUrl)
    }
    this.editor.customConfig.onchange = html => {
      this.editInfo.description = html.replace(/<\/?o:p[^>]*>/gi,'')
    }
    this.editor.customConfig.pasteTextHandle = pasteStr => {
      return pasteStr
    }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    this.editor.txt.html(this.editInfo.description)
  },
  methods: {
    // 添加充值额度
    addLimit() {
      // let arr = this.recharge_limit.filter(x => !x.money || !x.times);
      // //所有不允许为空
      // if (arr.length) {
      //   this.$Message.warning('充值额度数据请填写完整');
      //   return;
      // }
      this.recharge_limit.push({ money: '', times: '' })
    },
    // 删除充值额度
    delLimit(index) {
      this.recharge_limit.splice(this.recharge_limit.findIndex((item, i) => i === index), 1)
    },
    // 校验充值额度是否填写正确
    checkRechargeLimit() {
      const arr = this.recharge_limit.filter(x => !x.money || !x.times)
      // 所有不允许为空
      if (arr.length) {
        this.$Message.warning(this.i18n_lang.activeList195)
        return false
      }
      // if (this.recharge_limit.length > 1) {
      //   let state = true;
      //   this.recharge_limit.map((x, i) => {
      //     if (i > 0) {
      //       if (Number(x.money) <= Number(this.recharge_limit[i - 1].money)) {
      //         this.$Message.warning('充值额度数据填写有误');
      //         state = false;
      //       }
      //     }
      //   });
      //   return state;
      // }
      return true
    },
    formatRechargeLimit() {
      const result = {}
      this.recharge_limit.map((x, i) => {
        // const m = MathMul(Number(x.money), 100)
        const m = Number(x.money)
        result[m] = x.times
      })
      return result
    },
    updateDefaultData() {
      this.editInfo = Object.assign({}, this.editInfo, this.info)
      const rule = typeof this.info.rule === 'string' ? JSON.parse(this.info.rule) : this.info.rule
      this.prizeList = rule.map((item, index) => {
        const n_item = Object.assign({}, item)
        n_item.award_id = String(n_item.award_id)
        n_item.award_type = String(n_item.award_type)
        this.currentChangePrizes[index] = n_item.award_id
        if (Number(n_item.award_type) === 1) {
          // n_item.award_money = Number(n_item.award_money) / 100
          n_item.award_money = Number(n_item.award_money)
          // n_item.withdraw_val = Number(n_item.withdraw_val) / 100
          n_item.withdraw_val = Number(n_item.withdraw_val)
        }
        n_item.user_list = n_item.user_list.map(u_item => {
          u_item.auth = '1'
          return u_item
        })
        const award_name = this.prizeListSelect.filter(v => v.id === n_item.award_id)[0].name
        this.circularList[`${index + 1}`] = award_name
        return n_item
      })
      const luckydraw_condition =
        typeof this.editInfo.luckydraw_condition === 'string'
          ? JSON.parse(this.editInfo.luckydraw_condition)
          : this.editInfo.luckydraw_condition
      // 旧数据luckydraw_condition是一个数字
      if (!Number(luckydraw_condition)) {
        this.recharge_limit = []

        for (const item in luckydraw_condition) {
          this.recharge_limit.push({
            money: MathDiv(Number(item), 1),
            times: luckydraw_condition[item]
          })
        }
      }
    },
    /**
     * 处理奖项列表
     */
    handlePrizeList() {
      this.prizeList = this.itemList.map(item => {
        return {
          award_name: '',
          img: '',
          award_id: '',
          award_type: '',
          award_money: '',
          withdraw_val: '',
          user_list: [JSON.parse(JSON.stringify(USER_ITEM))],
          award_code: ''
        }
      })
    },
    /**
     * 点击奖项tab
     */
    changeTab(item, index) {
      this.curTab = item.id
      this.currentPrize = index
    },
    changeStartTime(date) {
      this.editInfo.begin_time = date
    },
    changeEndTime(date) {
      this.editInfo.end_time = date
    },

    /**
     * 获取幸运轮盘图片上传地址
     */
    getUploadImgUrl(url) {
      this.editInfo.cover = url
    },
    /**
     * 获取每一个奖项的图片地址
     */
    prizeListImageUrl(url) {
      this.prizeList[this.currentPrize].img = url
    },
    /**
     * 奖项名称发生变化时将选中的奖项给到数组中记录
     */
    awardNameChange(item) {
      console.log(item, 'item')
      this.currentChangePrizes[this.currentPrize] = item.value
      this.editInfo.award_id = String(item.value)
      this.circularList[this.curTab] = item.label
      console.log(this.editInfo.award_id, ' this.circularList[this.curTab]')
    },
    /**
     * 当前奖项名称是否禁用
     */
    optionDisable(val) {
      return Number(val) !== 9
        ? this.currentChangePrizes.filter(item => item === val).length > 0
        : false
    },
    onFocusUserName(index) {
      this.userIndex = index
    },
    /**
     * 指定用户类输入框发生变化时触发
     */
    onChangeUserName(index) {
      this.prizeList[this.currentPrize].user_list[index].auth = ''
    },
    /**
     * 添加用户
     */
    addUser() {
      this.prizeList[this.currentPrize].user_list.push(JSON.parse(JSON.stringify(USER_ITEM)))
    },
    /**
     * 删除用户
     */
    removeUser(u_index) {
      if (this.prizeList[this.currentPrize].user_list.length > 1) {
        this.prizeList[this.currentPrize].user_list.splice(u_index, 1)
      } else {
        this.$Message.warning(this.i18n_lang.activeList196)
      }
    },
    async authUser(userName, index) {
      this.prizeList[this.currentPrize].user_list[index].loading = true
      const res = await this.$axios.request({
        url: '/active/exituser',
        method: 'GET',
        params: {
          userName
        }
      })
      this.prizeList[this.currentPrize].user_list[index].loading = false
      if (res.state === 0) {
        if (JSON.stringify(res.data) === '[]') {
          this.prizeList[this.currentPrize].user_list[index].auth = '0'
        } else {
          this.prizeList[this.currentPrize].user_list[index].auth = '1'
          this.prizeList[this.currentPrize].user_list[index].id = res.data.id
        }
      }
    },
    validateForm(kf) {
      let isValid = true
      for (let i = 0; i < this.itemList.length; i++) {
        const item = this.itemList[i]
        if (isValid) {
          this.$refs[`childForm${i}`][0].validate(async valid => {
            if (valid) {
              isValid = true
            } else {
              isValid = valid
              if (kf !== 1) {
                this.$Message.error(this.i18n_lang.activeList197)
              }
              this.loading.modalButton = false
              this.curTab = item.id
              return
            }
          })
        } else {
          break
        }
      }
      return isValid
    },
    changeDate(dateA) {
      let dateee = new Date(dateA).toJSON();
      let date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
      return date;
    },
    /**
     * 提交
     */
    submit() {
      this.$refs['parentForm'].validate(async valid => {
        if (valid) {
          // 先走表单是否为空的校验，然后再检测其他规则
          if (this.validateForm()) {
            // 检查充值额度是否填写正确
            if (!this.checkRechargeLimit()) return
            let auth = true
            this.prizeList.map(item => {
              item.user_list.map(u_item => {
                if (u_item.auth !== '1' && u_item.name && u_item.times) {
                  auth = false
                }
              })
            })
            if (!auth) {
              this.$Message.error(this.i18n_lang.activeList198)
              return
            }
            if (
              this.prizeList
                .filter(item => !!item.award_code)
                .map(item => Number(item.award_code))
                .reduce((p, n) => p + n) > 100
            ) {
              this.$Message.error(this.i18n_lang.activeList199)
              return
            }
            this.postSubmit()
          } else {
            return
          }
        } else {
          this.validateForm(1)
          this.$Message.error(this.i18n_lang.activeList200)
          this.loading.modalButton = false
          return
        }
      })
    },
    async postSubmit() {
      let prizeList = JSON.parse(JSON.stringify(this.prizeList))
      prizeList = prizeList.map(item => {
        const n_item = Object.assign({}, item)
        n_item.award_id = Number(n_item.award_id)
        n_item.award_name = this.prizeListSelect.filter(v => v.id === item.award_id)[0].name
        n_item.award_type = Number(n_item.award_type)
        if (n_item.award_money) {
          // n_item.award_money = Number(n_item.award_money) * 100
          n_item.award_money = Number(n_item.award_money)
          // n_item.withdraw_val = Number(n_item.withdraw_val) * 100
          n_item.withdraw_val = Number(n_item.withdraw_val)
        }
        n_item.user_list.map(u_item => {
          delete u_item.loading
          delete u_item.auth
        })
        if (n_item.assign) {
          delete n_item.assign
        }
        if (n_item.award_type === 2) {
          n_item.award_money = ''
          n_item.withdraw_val = ''
        }
        return n_item
      })
      const editInfo = Object.assign({}, this.editInfo)
      if (editInfo.assign) {
        delete editInfo.assign
      }
      if (this.editType === 'edit') {
        editInfo.begin_time = formatDateTimeToString(editInfo.begin_time)
        editInfo.end_time = formatDateTimeToString(editInfo.end_time)
      }
      editInfo.luckydraw_condition = JSON.stringify(this.formatRechargeLimit())
      editInfo.limit_times = Number(editInfo.limit_times)
      const body = Object.assign({}, editInfo, {
        rule: JSON.stringify(prizeList),
        template_id: '6'
      })
      body.begin_time = this.changeDate(body.begin_time)
      body.end_time = this.changeDate(body.end_time)
      this.loading.modalButton = true

      let objType = {}
      if (this.editType === 'add') {
        objType = {
          url: '/active',
          method: 'POST',
          data: body
        }
      } else {
        objType = {
          url: `/active/${this.info.id}`,
          method: 'PUT',
          data: body
        }
      }
      const res = await this.$axios.request(objType)
      this.loading.modalButton = false
      if (res.status === 200) {
        this.$Message.success(res.message)
        this.$emit('onSuccess', true)
      } else {
        this.$Message.error(res.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-input-wrapper {
  width: 500px;
}
.luck-disk-active {
  > .ivu-form {
    .ivu-form-item {
      margin-right: 110px;
    }
  }
  .item-list {
    display: flex;
    li {
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #dcdcdc;
      border-right: none;
      cursor: pointer;
      &:last-child {
        border-right: 1px solid #dcdcdc;
      }
      &.active {
        background-color: #2d8cf0;
        border-color: #2d8cf0;
        color: #fff;
      }
    }
  }
  .prize-wrapper {
    background-color: rgba(242, 242, 242, 1);
    padding-top: 10px;
    padding-bottom: 15px;
    &.animate {
      animation: scaleRotate 0.3s;
    }
    .ivu-form-item {
      margin-bottom: 25px;
    }
    /deep/.ivu-form-item-error-tip {
      left: 110px;
    }
    .user-list-wrapper {
      &:not(:first-child) {
        .user-list {
          .appoint-user-item.left {
            margin-left: 110px;
          }
        }
      }
      .user-list {
        display: inline-block;
        &.user-list-left {
          width: 300px;
        }
        &.user-list-right {
          width: 430px;
          /deep/.ivu-form-item-error-tip {
            left: 75px;
          }
        }
        .appoint-user-item {
          display: flex;
          margin-bottom: 20px;
          &.left {
            /deep/.ivu-form-item {
              margin-right: 0px;
            }
            // &:not(:first-child) {
            //   margin-left: 110px;
            // }
          }
          &:last-child {
            margin-bottom: 0px;
          }
          .admin-btn {
            margin-right: 10px;
          }
          > div {
            margin-right: 10px;
            flex: 0 0 73px;
          }
          span {
            flex: 0 0 75px;
            text-align: right;
            padding-right: 5px;
          }
          button {
            flex: 1;
            padding: 0px;
            &.query {
              flex: 0 0 76px;
            }
          }
        }
      }
    }
  }
  .recharge-limit {
    display: flex;
    margin-bottom: 8px;
    .info {
      .ivu-input-wrapper {
        width: 200px;
      }
      span {
        display: inline-block;
        padding: 0 5px 0 10px;
      }
    }
    .btns {
      padding: 0 10px;
      & > span {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #ccc;
        color: #ccc;
        border-radius: 50%;
        margin-right: 5px;
        cursor: pointer;
        user-select: none;
        font-size: 20px;
      }
    }
  }
}
@keyframes scaleRotate {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
