<template>
  <div id="addActivity">
    <Spin v-if="loading" size="large" fix></Spin>
    <Form
        v-if="Object.keys(detailObj).length"
        ref="editForm"
        :model="detailObj"
        :rules="ruleValidate"
        :label-width="110"
      >
        <FormItem :label="i18n_lang.rebateActivity2" prop="name"> <Input v-model="detailObj.name" /> </FormItem>
        <FormItem :label="i18n_lang.rebateActivity3" prop="status">
          <RadioGroup v-model="detailObj.status">
            <Radio label="enabled">{{i18n_lang.rebateActivity4}}</Radio>
            <Radio label="disabled">{{i18n_lang.rebateActivity5}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="i18n_lang.rebateActivity59" prop="condition_opt">
          <RadioGroup v-model="detailObj.condition_opt">
            <Radio label="winloss">{{i18n_lang.rebateActivity45}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :label="i18n_lang.rebateActivity46" prop="deposit_withdraw_fee_ratio">
          <Input v-model="detailObj.deposit_withdraw_fee_ratio" style="width: 200px;"/>%
        </FormItem>
        <FormItem :label="i18n_lang.rebateActivity47" prop="winloss_fee_ratio">
          <Input v-model="detailObj.winloss_fee_ratio" style="width: 200px;"/>%
        </FormItem>
        <FormItem :label="i18n_lang.rebateActivity48" prop="valid_user_num"> <Input v-model="detailObj.valid_user_num" style="width: 200px;"/></FormItem>
        <FormItem :label="i18n_lang.rebateActivity49" prop="valid_user_deposit">
          <span style="margin: 0 10px;">{{i18n_lang.rebateActivity50}}</span><Input v-model="detailObj.valid_user_deposit" style="width: 100px;"/>
          <span style="margin: 0 10px;">{{i18n_lang.rebateActivity51}}</span><Input v-model="detailObj.valid_user_bet" style="width: 100px;"/>
        </FormItem>
        <!-- <Radio label="day">每日返佣</Radio> -->
        <FormItem :label="i18n_lang.rebateActivity61" prop="bkge_date">
          <RadioGroup v-model="detailObj.bkge_date">
            <Radio label="week">{{i18n_lang.rebateActivity62}}</Radio>
            <Radio label="month">{{i18n_lang.rebateActivity63}}</Radio>
          </RadioGroup>
          <div>{{i18n_lang.rebateActivity64}}</div>
        </FormItem>
        <!-- <FormItem :label="i18n_lang.rebateActivity6" prop="stime">
        <Row style="display:flex;">
          <FormItem prop="stime">
            <DatePicker
              v-model="detailObj.stime"
              type="datetime"
              :placeholder="i18n_lang.rebateActivity7"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 160px"
            ></DatePicker>
          </FormItem>
          <Col span="2" style="text-align: center">-</Col>
          <FormItem prop="etime">
            <DatePicker
              v-model="detailObj.etime"
              type="datetime"
              :placeholder="i18n_lang.rebateActivity8"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 160px"
            ></DatePicker>
          </FormItem>
        </Row>
      </FormItem>
      <FormItem :label="i18n_lang.rebateActivity9" prop="game_ids">
        <CheckboxGroup v-model="detailObj.game_ids">
          <Checkbox v-for="item in gameList" :key="item.id" :label="item.id + ''">{{ item.name }}</Checkbox>
        </CheckboxGroup>
      </FormItem> -->
     <!-- <FormItem label="返佣时间" prop="bkge_time">
        <RadioGroup v-model="detailObj.bkge_date">
          <Radio label="day">每日返佣</Radio>
          <Radio label="week">每周返佣</Radio>
          <Radio label="month">每月返佣</Radio>
        </RadioGroup>
        <div>
          <span>{{ detailObj.bkge_date === 'day' ? '每日' : detailObj.bkge_date === 'week' ? '周一' : '1号' }}</span>
          <TimePicker
            v-model="detailObj.bkge_time"
            type="time"
            placeholder="选择日期时间"
            format="HH:mm:ss"
            style="width: 160px"
            @on-change="changeBkgeTime"
          ></TimePicker>
        </div>
      </FormItem> -->
     <!-- <FormItem :label="i18n_lang.rebateActivity10" prop="condition_opt">
        <CheckboxGroup v-model="detailObj.condition_opt" @on-change="checkAllGroupChange">
          <Checkbox label="lottery" disabled>{{i18n_lang.rebateActivity11}}</Checkbox>
        </CheckboxGroup>
      </FormItem> -->
      <!-- <Checkbox label="deposit">盈亏</Checkbox>
      <Checkbox label="winloss">充值</Checkbox> -->
     <!-- <FormItem :label="i18n_lang.rebateActivity22" prop="data_opt">
        <RadioGroup v-model="detailObj.data_opt">
          <Radio label="lottery">{{i18n_lang.rebateActivity12}}</Radio>
        </RadioGroup>
      </FormItem> -->
      <!-- <Radio label="deposit">按充值返佣</Radio>
      <Radio label="winloss">按盈亏返佣</Radio> -->
      <ul v-if="detailObj.rule.length" class="ul_list">
        <li v-for="(item,i) in detailObj.rule" :key="i">
          <p>
            <Button v-if="detailObj.rule.length - 1 === i" type="primary" @click="add">{{i18n_lang.rebateActivity13}}</Button>
            <Button v-if="detailObj.rule.length > 1 && i > 0" type="error" @click="del(i)">{{i18n_lang.rebateActivity52}}</Button>
            <span v-if="i == 0">{{i18n_lang.rebateActivity53}}</span>
          </p>
          <!-- <p>{{i18n_lang.rebateActivity14}}<Input v-model="item.rule_name" /></p> -->
          <div>
            <div>
              <Input v-model="item.min_winloss" :placeholder="i18n_lang.rebateActivity15" :disabled="i === 0 ? false : true" @on-blur="moneyVaild('min_lottery', 0, i, item.min_lottery, null)"/>
              <span>&le;{{i18n_lang.rebateActivity54}}&lt;</span>
              <Input v-model="item.max_winloss" :placeholder="`${i18n_lang.rebateActivity17}${item.min_lottery || 0}${i18n_lang.rebateActivity18}`" @on-blur="moneyVaild('max_lottery', 1, i, item.max_lottery, item.min_lottery)" />
            </div>
            <!-- <span class="placeholder"></span>
            <div v-show="detailObj.condition_opt.indexOf('deposit') >= 0">
              <Input v-model="item.min_deposit" :placeholder="i18n_lang.rebateActivity15" :disabled="i === 0 ? false : true" @on-blur="moneyVaild('min_deposit', 0, i, item.min_deposit, null)" />
              <span>&le;{{i18n_lang.rebateActivity23}}&lt;</span>
              <Input v-model="item.max_deposit" :placeholder="`${i18n_lang.rebateActivity17}${item.min_deposit || 0}${i18n_lang.rebateActivity18}`" @on-blur="moneyVaild('max_deposit', 1, i, item.max_deposit, item.min_deposit)" />
            </div>
            <span class="placeholder"></span>
            <div v-show="detailObj.condition_opt.indexOf('winloss') >= 0">
              <Input v-model="item.min_winloss" :placeholder="i18n_lang.rebateActivity15" :disabled="i === 0 ? false : true" @on-blur="moneyVaild('min_winloss', 0, i, item.min_winloss, null)" />
              <span>&le;{{i18n_lang.rebateActivity24}}&lt;</span>
              <Input v-model="item.max_winloss" :placeholder="`${i18n_lang.rebateActivity17}${item.min_winloss || 0}${i18n_lang.rebateActivity18}`" @on-blur="moneyVaild('max_winloss', 1, i, item.max_winloss, item.min_winloss)" />
            </div> -->
          </div>
          <p>{{i18n_lang.rebateActivity19}}<Input v-model="item.bkge_scale" />%</p>
        </li>
      </ul>
     <!-- <ul v-if="detailObj.rule.length" class="ul_list">
        <li v-for="(item,i) in detailObj.rule" :key="i">
          <p>
            <Button v-if="detailObj.rule.length - 1 === i" type="primary" @click="add">{{i18n_lang.rebateActivity13}}</Button>
            <Button v-if="detailObj.rule.length > 1 && i > 0" type="error" @click="del(i)">删除</Button>
          </p>
          <p>{{i18n_lang.rebateActivity14}}<Input v-model="item.rule_name" /></p>
          <div>
            <div v-show="detailObj.condition_opt.indexOf('lottery') >= 0">
              <Input v-model="item.min_lottery" :placeholder="i18n_lang.rebateActivity15" :disabled="i === 0 ? false : true" @on-blur="moneyVaild('min_lottery', 0, i, item.min_lottery, null)"/>
              <span>&le;{{i18n_lang.rebateActivity16}}&lt;</span>
              <Input v-model="item.max_lottery" :placeholder="`${i18n_lang.rebateActivity17}${item.min_lottery || 0}${i18n_lang.rebateActivity18}`" @on-blur="moneyVaild('max_lottery', 1, i, item.max_lottery, item.min_lottery)" />
            </div>
            <span class="placeholder"></span>
            <div v-show="detailObj.condition_opt.indexOf('deposit') >= 0">
              <Input v-model="item.min_deposit" :placeholder="i18n_lang.rebateActivity15" :disabled="i === 0 ? false : true" @on-blur="moneyVaild('min_deposit', 0, i, item.min_deposit, null)" />
              <span>&le;{{i18n_lang.rebateActivity23}}&lt;</span>
              <Input v-model="item.max_deposit" :placeholder="`${i18n_lang.rebateActivity17}${item.min_deposit || 0}${i18n_lang.rebateActivity18}`" @on-blur="moneyVaild('max_deposit', 1, i, item.max_deposit, item.min_deposit)" />
            </div>
            <span class="placeholder"></span>
            <div v-show="detailObj.condition_opt.indexOf('winloss') >= 0">
              <Input v-model="item.min_winloss" :placeholder="i18n_lang.rebateActivity15" :disabled="i === 0 ? false : true" @on-blur="moneyVaild('min_winloss', 0, i, item.min_winloss, null)" />
              <span>&le;{{i18n_lang.rebateActivity24}}&lt;</span>
              <Input v-model="item.max_winloss" :placeholder="`${i18n_lang.rebateActivity17}${item.min_winloss || 0}${i18n_lang.rebateActivity18}`" @on-blur="moneyVaild('max_winloss', 1, i, item.max_winloss, item.min_winloss)" />
            </div>
          </div>
          <p>{{i18n_lang.rebateActivity19}}<Input v-model="item.bkge_scale" />%</p>
        </li>
      </ul> -->
      <FormItem :label="i18n_lang.rebateActivity55">
        <RadioGroup v-model="is_html" size="large">
          <Radio label="1">{{i18n_lang.rebateActivity56}}</Radio>
          <Radio label="2">HTML</Radio>
        </RadioGroup>
      </FormItem>
      <Row>
        <FormItem prop="desc" :label="i18n_lang.rebateActivity60">
          <div v-show="is_html == '1'" id="myEdit" style="width:700px;"></div>
          <textarea v-show="is_html == '2'" v-model="detailObj.desc" style="width: 700px;height: 344px;border: 1px solid #dcdee2;padding: 0 15px;"></textarea>
        </FormItem>
      </Row>
      <Button type="primary" :loading="visible.modalButton" @click="save">{{ visible.modalButton ? i18n_lang.rebateActivity20 : i18n_lang.rebateActivity21 }}</Button>
    </Form>
  </div>
</template>

<script>
import { limitFloat } from '@/libs/tools.js'
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { MathMul, MathDiv } from '@/libs/formatMath.js'
const ininData = {
  // name: '', // 名称
  // stime: '', // 开始时间
  // etime: '', // 结束时间
  // game_ids: [], // 返佣类目 真人，电子，棋牌等
  bkge_date: 'week', // 返佣时间 day->每日,week->每周,month->每月
  // bkge_time: '', // 返佣具体时间
  // condition_opt: ['lottery'], // 返佣条件 lottery->有效投注,deposit->充值,winloss->盈亏
  // data_opt: 'lottery', // 返佣类型  lottery->有效投注,deposit->充值,winloss->盈亏
  // status: 'enabled', // 启用状态 enabled->启用，disabled->停用
  // rule: [] // 代理等级
  name: "",
  status: "enabled",
  condition_opt: "winloss",
  deposit_withdraw_fee_ratio: "",//充值提款手续费比例
  winloss_fee_ratio: "",//网站输赢费用比例
  valid_user_num: "",//最低有效用户数
  valid_user_deposit: "",//有效用户充值
  valid_user_bet: "",//有效用户下注
  rule: [],
  desc: ""
}
const vip_obj = {
  // rule_name: '', // 代理级别
  // min_lottery: '',
  // min_deposit: '',
  // min_winloss: '',
  // max_lottery: '',
  // max_deposit: '',
  // max_winloss: '',
  // bkge_scale: '' // 返佣比例
  min_winloss: '',
  max_winloss: '',
  bkge_scale: ''
}
const NUMBER_REG_GT0 = /^\+?[0-9][0-9]*$/
export default {
  props: {
    value: {
      type: Number,
      default: () => -1
    }
  },
  data() {
    const i18n_lang = this.$t('rebateActivity');
    return {
      i18n_lang: i18n_lang,
      editor: null, // 富文本
      disabledGroup: [],
      visible: {
        modal: false,
        modalButton: false
      },
      loading: false, // 页面loading
      detailObj: null, // 详情
      gameList: [], // 返佣类目列表
      ruleValidate: {
        // name: [{ required: true, message: i18n_lang.rebateActivity25 }],
        // stime: [{ required: true, message: i18n_lang.rebateActivity26 }],
        // etime: [{ required: true, message: i18n_lang.rebateActivity27 }],
        bkge_date: [{ required: true, message: i18n_lang.rebateActivity65 }],
        // bkge_time: [{ required: true, message: i18n_lang.rebateActivity28 }],
        // data_opt: [{ required: true, message: i18n_lang.rebateActivity29 }],
        // status: [{ required: true, message: i18n_lang.rebateActivity30 }],
        // condition_opt: [{ required: true, type: 'array', min: 1, message: i18n_lang.rebateActivity31, trigger: 'change' }],
        // game_ids: [{ required: true, type: 'array', min: 1, message: i18n_lang.rebateActivity32, trigger: 'change' }]
        name: [{ required: true, message: i18n_lang.rebateActivity25 }],
        status: [{ required: true, message: i18n_lang.rebateActivity30 }],
        condition_opt: [{ required: true, message: i18n_lang.rebateActivity57 }],
        deposit_withdraw_fee_ratio: [{ required: true, message: i18n_lang.rebateActivity58 }],
        winloss_fee_ratio: [{ required: true, message: i18n_lang.rebateActivity58 }],
        valid_user_num: [{ required: true, message: i18n_lang.rebateActivity58 }]
      },
      aa: vip_obj,
      is_html: '1',
      fileData: {
        base64: this.value || null,
        formData: null,
        fileName: '',
        file: this.value || null
      }
    }
  },
  watch: {
    value() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.editor = new Editor(`#myEdit`)
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
      this.detailObj.desc = html.replace(/<\/?o:p[^>]*>/gi,'')
    }
	this.editor.customConfig.pasteTextHandle = pasteStr => {
	  return pasteStr
	}
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    this.editor.txt.html(this.detailObj.desc)
  },
  methods: {
    checkAllGroupChange() {
      console.log(this.detailObj.condition_opt)
    },
    init() {
      this.getGaameList()
      if (this.value === -1) {
        this.detailObj = Object.assign({}, ininData)
        this.detailObj.rule = []
        this.detailObj.rule.push(vip_obj)
      } else {
        this.getDetail()
      }
    },
    // 获取详情
    async getDetail() {
      this.loading = true
      const res = await this.$axios.request({
        // url: `/active/bkge/detail/${this.value}`,
        url: '/active/newBkge',
        method: 'GET'
      })
      this.loading = false
      if (res.status !== 200) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return
      }
      console.log(res.data)
      this.detailObj = res.data ? res.data[this.value - 1] : {}
      if(res.data[this.value - 1].desc){
        this.editor.txt.html(this.detailObj.desc)
      }
      // if (Object.keys(this.detailObj).length) {
      //   this.detailObj.game_ids = this.detailObj.game_ids.split(',')
      //   this.detailObj.condition_opt = this.detailObj.condition_opt.split(',')
      //   if (this.detailObj.rule.length) {
      //     const str = ['rule_name', 'bkge_scale']
      //     this.detailObj.rule.map(y => {
      //       Object.keys(y).map(x => {
      //         if (str.indexOf(x) < 0) {
      //           y[x] = MathDiv(y[x], 100)
      //         }
      //       })
      //     })
      //   } else {
      //     this.detailObj.rule = []
      //     this.detailObj.rule.push(vip_obj)
      //   }
      // }
    },
    // 获取返佣类目
    async getGaameList() {
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      this.gameList = res.data ? res.data : []
    },
    changeStartTime(val) {
      this.detailObj.stime = val
    },
    changeEndTime(val) {
      this.detailObj.etime = val
    },
    changeBkgeTime(val) {
      this.detailObj.bkge_time = val
    },
    // 确认代理等级填写完整
    checkVipList() {
      let state = false
      const rule = this.detailObj.rule
      let validArr = ['rule_name', 'bkge_scale']
      this.detailObj.condition_opt.map(x => {
        if (x === 'lottery') {
          validArr.push(...['min_lottery', 'max_lottery'])
        }
        if (x === 'deposit') {
          validArr.push(...['min_deposit', 'max_deposit'])
        }
        if (x === 'winloss') {
          validArr.push(...['min_winloss', 'max_winloss'])
        }
      })
      console.log(validArr, 'validArr----', rule, this.detailObj.condition_opt)
      for (let i = 0; i < rule.length; i++) {
        Object.keys(rule[i]).map(x => {
          if (!rule[i][x] && validArr.indexOf(x) >= 0) {
            state = true
          }
        })
        if (state === true) break
      }
      return state
    },
    // 添加下一级
    add() {
      // if (this.checkVipList()) {
      //   this.$Message.warning(this.i18n_lang.rebateActivity33)
      //   return
      // }
      const tt = {
        min_winloss: '',
        max_winloss: '',
        bkge_scale: ''
      }
      // tt.min_lottery = this.detailObj.rule[this.detailObj.rule.length - 1].max_lottery
      // tt.min_deposit = this.detailObj.rule[this.detailObj.rule.length - 1].max_deposit
      tt.min_winloss = this.detailObj.rule[this.detailObj.rule.length - 1].max_winloss
      this.detailObj.rule.push(tt)
      // console.log('detailObj', this.detailObj)
      // const tt = {
      //   rule_name: '', // 代理级别
      //   min_lottery: '',
      //   min_deposit: '',
      //   min_winloss: '',
      //   max_lottery: '',
      //   max_deposit: '',
      //   max_winloss: '',
      //   bkge_scale: '' // 返佣比例
      // }
      // tt.min_lottery = this.detailObj.rule[this.detailObj.rule.length - 1].max_lottery
      // tt.min_deposit = this.detailObj.rule[this.detailObj.rule.length - 1].max_deposit
      // tt.min_winloss = this.detailObj.rule[this.detailObj.rule.length - 1].max_winloss
      // this.detailObj.rule.push(tt)
    },
    // 删除当前代理级别
    del(i) {
      this.detailObj.rule.splice(i, 1)
    },
    // 校验输入金额的格式'bet_valid'-》对应的字段, 0-》bet_valid的第几个元素, i-》dataSource的第几个元素, item.bet_valid[0]-》当前参数的值
    moneyVaild(type, subIndex, index, val, preVal) {
      console.log(val, preVal, '-------------------')
      if (!val || !NUMBER_REG_GT0.test(val)) {
        this.detailObj.rule[index][type] = ''
        return
      }
      // val = limitFloat(val)
      this.detailObj.rule[index][type] = val
      // preVal为对应类型的第一项
      // 校验后一项比前一项大
      if (subIndex === 1) {
        if (preVal - val >= 0 ) {
          this.detailObj.rule[index][type] = ''
        }
      }
    },
    changeDate(dateA) {
      let dateee = new Date(dateA).toJSON()
      let date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
      return date
    },
    save() {
      this.$refs['editForm'].validate(async valid => {
        if (valid) {
          // if (this.checkVipList()) {
          //   this.$Message.warning(this.i18n_lang.rebateActivity33)
          //   return
          // }
          const obj = Object.assign({}, this.detailObj)
          // obj.deposit_withdraw_fee_ratio = MathMul(obj.deposit_withdraw_fee_ratio, 100)
          // obj.winloss_fee_ratio = MathMul(obj.winloss_fee_ratio, 100)
          // obj.game_ids = obj.game_ids.join(',')
          // obj.condition_opt = obj.condition_opt.join(',')
          const str = ['rule_name', 'bkge_scale']
          // obj.stime = this.changeDate(obj.stime)
          // obj.etime = this.changeDate(obj.etime)
          // obj.rule.map(y => {
          //   Object.keys(y).map(x => {
          //     if (str.indexOf(x) < 0) {
          //       y[x] = MathMul(y[x], 100)
          //     }
          //   })
          // })
          this.visible.modalButton = true
          let typeObj = {}
          if (this.value === -1) {
            typeObj = {
              url: '/active/newBkge',
              method: 'post',
              data: obj
            }
          } else {
            typeObj = {
              url: `/active/newBkge/${this.detailObj.id}`,
              method: 'put',
              data: obj
            }
          }
          // if (this.value === -1) {
          //   typeObj = {
          //     url: '/active/bkge',
          //     method: 'post',
          //     data: obj
          //   }
          // } else {
          //   typeObj = {
          //     url: `/active/bkge/${this.detailObj.id}`,
          //     method: 'put',
          //     data: obj
          //   }
          // }
          const res = await this.$axios.request(typeObj)
          this.visible.modalButton = false
          if (res.status !== 200) {
            this.$Message.error(res.message)
          } else {
            this.$Message.success(res.message)
            this.$emit('onSuccess', true)
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#addActivity{
  .ul_list{
    & > li{
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 5px 15px;
      margin-bottom: 10px;
      p{
        display: flex;
        margin: 10px 0;
        /deep/.ivu-input-wrapper{
          width: 200px;
          margin-left: 15px;
        }
        &:nth-child(3){
          /deep/.ivu-input-wrapper{
            width: 100px;
            margin-left: 0;
          }
        }
        span{
          display: inline-block;
          text-align: center;
          line-height: 32px;
          &.placeholder{
            width: 30px;
          }
        }
        /deep/.ivu-btn{
          margin-right: 10px;
        }
      }
      div{
        display: flex;
        /deep/.ivu-input-wrapper{
          width: 200px;
          margin-left: 15px;
        }
        &:nth-child(3){
          /deep/.ivu-input-wrapper{
            width: 100px;
            margin-left: 0;
          }
        }
        span{
          display: inline-block;
          text-align: center;
          line-height: 32px;
          &.placeholder{
            width: 30px;
          }
        }
        /deep/.ivu-btn{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
