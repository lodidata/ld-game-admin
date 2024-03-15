<template>
  <div>
    <Form ref="parentForm" :model="editInfo" :rules="ruleValidate" :label-width="100">
      <FormItem :label="`${i18n_lang.activeList274}`" prop="msg_title">
        <Input v-model="editInfo.msg_title" :placeholder="`${i18n_lang.activeList275}`"></Input>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList276}`" prop="msg_content">
        <Input v-model="editInfo.msg_content" type="textarea" :rows="3" :placeholder="`${i18n_lang.activeList277}`"></Input>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList278}`" prop="give_away">
        <RadioGroup v-model="editInfo.give_away" size="large">
          <Radio :label="1">{{i18n_lang.activeList279}}</Radio>
          <Radio :label="2">{{i18n_lang.activeList280}}</Radio>
          <Radio :label="3">{{i18n_lang.activeList281}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList282}`" prop="phone_list" v-if="editInfo.give_away == 1">
        <Input v-model="editInfo.phone_list" type="textarea" :rows="3" :placeholder="`${i18n_lang.activeList283}`"></Input>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList284}`" prop="user_level" v-if="editInfo.give_away == 2">
        <Select v-model="user_level" multiple @on-change="getUserLevel($event)" :placeholder="`${i18n_lang.activeList285}`" style="width:500px;">
          <Option :key="''" :value="''">{{i18n_lang.activeList286}}</Option>
          <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList287}`" prop="batch_url" v-if="editInfo.give_away == 3">
        <UploadImg
          v-model="editInfo.batch_url"
          :batchUrl="true"
          style="width: 500px;background-color: transparent; border: 1px solid #ddd;"
          @input="batchUrlFn"
          @getTable="getTable"
          @clearFile="clearFile"
        ></UploadImg>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList288}`" prop="give_amount">
        <Input v-model="editInfo.give_amount" :placeholder="``"></Input>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList289}`" prop="dm_num">
        <Input v-model="editInfo.dm_num" :placeholder="``"></Input>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList290}`" prop="notice_type">
        <RadioGroup v-model="editInfo.notice_type" size="large">
          <Radio :label="1">{{i18n_lang.activeList291}}</Radio>
          <Radio :label="2">{{i18n_lang.activeList292}}</Radio>
          <Radio :label="3">{{i18n_lang.activeList293}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList294}`" prop="is_now_give">
        <RadioGroup v-model="editInfo.is_now_give" size="large">
          <Radio :label="1">{{i18n_lang.activeList295}}</Radio>
          <Radio :label="0">{{i18n_lang.activeList296}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="`${i18n_lang.activeList297}`" prop="give_amount_time">
        <DatePicker
          v-model="editInfo.give_amount_time"
          type="datetime"
          :placeholder="`${i18n_lang.activeList298}`"
          format="yyyy-MM-dd HH:mm:ss"
          style="width: 160px"
          @on-change="changeTime"
        ></DatePicker>
      </FormItem>
      <FormItem>
        <Button
            type="primary"
            :loading="loading.modalButton"
            @click="submit"
          >{{i18n_lang.activeList299}}</Button>
        </FormItem>
      <!-- </FormItem> -->
    </Form>
  </div>
</template>

<script>
  import UploadImg from './UploadImg'
  import { formatDateTimeToString } from '@/libs/date'
  export default {
    name: 'GivePrizes',
    props: {
      info: {
          type: Object,
          default: () => ({})
      },
      editType: String,
      type_id: '',
      curTab: ''
    },
    components: {
      UploadImg
    },
    data() {
      const i18n_lang = this.$t('activeList');
      const data = {
        i18n_lang: i18n_lang,
        loading: {
          modalButton: false
        },
        editInfo: {
          msg_title: '',           //消息标题 批量赠送彩金相关
          msg_content: '',         //消息内容
          give_away: 1,           //赠送条件：1-指定用户，2-指定等级，3-批量赠送
          phone_list: '',          //指定手机号列表，多个手机号码之间英文逗号隔开
          user_level: '',          //指定用户等级列表，多个等级值之间英文逗号隔开
          batch_url: '',           //批量上传时，上传文件后返回的url
          give_amount: '',         //赠送彩金的数量
          dm_num: '',              //打码量
          notice_type: 1,         //通知类型：1-短信，2-邮箱，3-站内信息通知
          is_now_give: 0,         //是否立即赠送: 1-是，0-否
          give_amount_time: ''     ,//赠送彩金时间，格式 2022-07-18 00:00:00
          template_id: '',
          type_id: ''
        },
        user_level: [],
        levelList: [],
        ruleValidate: {
          msg_title: [{ required: true, message: `${i18n_lang.activeList275}`, trigger: 'blur' }],
          msg_content: [{ required: true, message: `${i18n_lang.activeList277}`, trigger: 'blur' }],
          phone_list: [
            // { required: true, message: `${i18n_lang.activeList217}`, trigger: 'blur'},
            // {
            //   required: true,
            //   validator: (rule, value, cb) => {
            //     if (this.editInfo.phone_list === '' && this.editInfo.give_away === 1) {
            //       return cb(i18n_lang.activeList217)
            //     } else {
            //       return cb()
            //     }
            //   }
            // }
          ],
          user_level: [],//{ required: true, message: `${i18n_lang.activeList285}`, trigger: 'blur' }
        }
      }
      return data
    },
    watch: {
      // info: {
      //   handler(oldValue, newValue) {
      //     console.log('this.info', newValue)
      //     if(newValue.msg_title){
      //       this.editInfo = {
      //         msg_title: newValue.msg_title,
      //         msg_content: newValue.msg_content,
      //         give_away: newValue.give_away,
      //         phone_list: newValue.phone_list,
      //         user_level: newValue.user_level,
      //         batch_url: newValue.batch_url,
      //         give_amount: newValue.give_amount,
      //         dm_num: newValue.dm_num,
      //         notice_type: newValue.notice_type,
      //         is_now_give: newValue.is_now_give,
      //         give_amount_time: newValue.give_amount_time
      //       }
      //     }
      //   },
      //   deep: true
      // },
      type_id: {
        handler(oldValue, newValue) {
          this.editInfo.type_id = this.editInfo.active_type_id ? this.editInfo.active_type_id : this.type_id
        },
        deep: true
      }
    },
    mounted() {
      this.editInfo = this.info
      this.editInfo.template_id = this.curTab
      this.editInfo.type_id = this.editInfo.active_type_id ? this.editInfo.active_type_id : this.type_id
      // this.editInfo.give_amount = this.editInfo.give_amount ? this.editInfo.give_amount / 100 : ''
      this.editInfo.give_amount = this.editInfo.give_amount ? this.editInfo.give_amount : ''
      // this.editInfo.dm_num = this.editInfo.dm_num ? this.editInfo.dm_num / 100 : ''
      this.editInfo.dm_num = this.editInfo.dm_num ? this.editInfo.dm_num : ''
      this.editInfo.notice_type = +this.editInfo.notice_type
      this.editInfo.withdraw_require_val = 0
      this.editInfo.sort = 0
      this.editInfo.send_max = 0
      this.levelListFn()
      // this.upTemlate()
    },
    methods: {
      changeTime(date){
        this.editInfo.give_amount_time = date
      },
      batchUrlFn(url){
        this.editInfo.batch_url = url
      },
      clearFile(){
        this.editInfo.batch_url = ''
      },
      getUserLevel(event){
        event.forEach((item, index) => {
          if(item == ''){
            this.user_level = []
            this.levelList.forEach((items, indexs) => {
              this.user_level.push(items.level)
            })
          }
        })
      },
      getTable(){
        this.upTemlate()
      },
      // 获取等级
      async levelListFn() {
        const res = await this.$axios.request({
          url: '/memberslevel/levelList',
          method: 'GET',
          params: {}
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        };
        this.levelList = res.data
        if(this.editInfo.user_level){
          this.user_level = []
          this.editInfo.user_level.split(',').forEach((item, index) => {
            this.user_level.push(+item)
          })
        }
      },
      // 获取下载模板
      async upTemlate() {
        const res = await this.$axios.request({
          url: '/report/handsel/upTemlate',
          method: 'GET',
          responseType: 'blob',
          params: {}
        })
        if (res.status !== 200) {
          this.$Message.error(res.message)
          return
        };
        const url = window.URL.createObjectURL(new Blob([res], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'template file.txt')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      },
      // 提交数据
      async submit(){
        // if(this.editInfo.give_away == 1 && !this.editInfo.phone_list) return this.$Message.error(this.i18n_lang.activeList301)
        // if(this.editInfo.give_away == 2 && !this.user_level.length) return this.$Message.error(this.i18n_lang.activeList285)
        // return console.log(this.editInfo, this.user_level.length)
        this.loading.modalButton = true
        this.$refs['parentForm'].validate(async valid => {
          if(valid){
            const req = {...this.editInfo}
            if(this.user_level.length && req.give_away == 2){
              this.user_level.forEach((item, index) => {
                req.user_level += index == 0 ? `${item}` : `,${item}`
              })
            }
            req.give_amount_time = req.give_amount_time ? formatDateTimeToString(new Date(req.give_amount_time)) : ''
            // req.give_amount = req.give_amount * 100
            req.give_amount = req.give_amount
            // req.dm_num = req.dm_num * 100
            req.dm_num = req.dm_num
            delete req.bind_info
            delete req.luckydraw_condition
            let objType = {};
            if (this.editType === 'add') {
              objType = {
                url: '/active',
                method: 'POST',
                data: req
              }
            } else {
              objType = {
                url: `/active/${this.info.id}`,
                method: 'PUT',
                data: req
              }
            }
            const res = await this.$axios.request(objType)
            this.loading.modalButton = false
            if (res.status == 200 && res.state == 0) {
              this.$Message.success(res.message)
              this.$emit('onSuccess', true)
            } else {
              this.$Message.error(res.message)
            }
          }else{
            this.loading.modalButton = false
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .ivu-form-item {
    display: flex;
    align-items: center;
  }
  .ivu-form-label-top .ivu-form-item-label {
    padding: 0;
  }
  .ivu-input-wrapper {
    width: 500px;
  }
</style>
