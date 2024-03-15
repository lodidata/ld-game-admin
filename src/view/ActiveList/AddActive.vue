<template>
  <div v-if="editInfo" id="AddActive">
    <div class="mytabs_tb">
      <ul v-if="editType === 'add'" class="mytabs"
        :style="{
          'width': `calc( (${activeType.length} * 160px) + 2px )`
        }"
      >
        <li
          v-for="(it,i) in activeType"
          :key="i"
          :class="{'active':curTab === it.id}"
          @click="changeTab(it.id)"
        >
          <span>{{ it.name }}</span>
        </li>
      </ul>
    </div>
    <LuckDiskActive v-if="curTab == 6" :activeList="activeList" :info="editInfo" :edit-type="editType" @onSuccess="onSuccess"></LuckDiskActive>
    <GivePrizes v-else-if="curTab == 12" :info="editInfo" :edit-type="editType" :curTab="curTab" :type_id="type_id" @onSuccess="onSuccess"></GivePrizes>
    <Form
      v-else
      ref="editInfo"
      :model="editInfo"
      label-position="top"
      :rules="ruleValidate"
      :label-width="100"
    >
      <FormItem :label="i18n_lang.activeList6" prop="title"><!-- 优惠活动名称 -->
        <Input v-model="editInfo.title" :placeholder="i18n_lang.activeList7"></Input>
      </FormItem>
      <FormItem :label="i18n_lang.activeList8" prop="content"><!-- 活动简介 -->
        <Input v-model="editInfo.content" :placeholder="i18n_lang.activeList9"/>
      </FormItem>
      <FormItem :label="i18n_lang.activeList10" prop="begin_time"><!-- 有效时间 -->
        <Row>
          <Col span="11">
            <FormItem prop="begin_time">
              <DatePicker
                v-model="editInfo.begin_time"
                type="datetime"
                :placeholder="i18n_lang.activeList11"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 160px"
                @on-change="changeStartTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <FormItem prop="end_time">
              <DatePicker
                v-model="editInfo.end_time"
                type="datetime"
                :placeholder="i18n_lang.activeList11"
                format="yyyy-MM-dd HH:mm:ss"
                style="width: 160px"
                @on-change="changeEndTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </FormItem>

      <!-- 充值分类 活动条件 赠送调整 活动时间 -->
      <FormItem v-if="curTab == 10 || curTab == 11 || curTab == 13" :label="curTab == 10 ? i18n_lang.activeList272 : curTab == 11 ? i18n_lang.activeList247 : i18n_lang.activeList302">
        <div>
          <RadioGroup v-model="editInfo.give_condition"><!-- 1:单日首笔,2:单日累计,3:周累计,4:月累计,5:单日单笔 -->
            <Radio :label="1" v-if="curTab == 11">{{i18n_lang.activeList248}}</Radio>
            <Radio :label="2">{{i18n_lang.activeList249}}</Radio>
            <Radio :label="3">{{i18n_lang.activeList250}}</Radio>
            <Radio :label="4">{{i18n_lang.activeList251}}</Radio>
            <Radio :label="5" v-if="curTab == 11">{{i18n_lang.activeList397}}</Radio>
          </RadioGroup>
          <div v-if="curTab == 10">
            <p v-if="editInfo.give_condition == 2">{{i18n_lang.activeList375}}</p>
            <p v-if="editInfo.give_condition == 3">{{i18n_lang.activeList376}}</p>
            <p v-if="editInfo.give_condition == 4">{{i18n_lang.activeList377}}</p>
          </div>
          <div v-if="curTab == 11">
            <p v-if="editInfo.give_condition == 1">{{i18n_lang.activeList378}}</p>
            <p v-if="editInfo.give_condition == 2">{{i18n_lang.activeList379}}</p>
            <!-- <p v-if="editInfo.give_condition == 3">{{i18n_lang.activeList380}}</p> -->
            <p v-if="editInfo.give_condition == 4">{{i18n_lang.activeList381}}</p>
          </div>
          <div v-if="curTab == 13">
            <p v-if="editInfo.give_condition == 2">{{i18n_lang.activeList382}}</p>
            <p v-if="editInfo.give_condition == 3">{{i18n_lang.activeList383}}</p>
            <p v-if="editInfo.give_condition == 4">{{i18n_lang.activeList384}}</p>
          </div>
        </div>
        <!-- <Row v-if="editInfo.give_condition == 5">
          <Col span="11">
            <FormItem prop="">
              <DatePicker
                v-model="condition.startTime"
                type="date"
                :placeholder="``"
                format="yyyy-MM-dd"
                style="width: 160px"
                @on-change="changeConditionStartTime"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
            <FormItem prop="">
              <DatePicker
                v-model="condition.endTime"
                type="date"
                :placeholder="``"
                format="yyyy-MM-dd"
                style="width: 160px"
                @on-change="changeConditionEndTime"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row> -->
      </FormItem>

      <!-- 注册送 -->
      <FormItem v-if="curTab === 5" :label="i18n_lang.activeList12"><!-- 绑定资料 -->
        <CheckboxGroup v-model="editInfo.bind_info_list">
          <Checkbox label="1">{{i18n_lang.activeList13}}</Checkbox>
          <Checkbox label="2">{{i18n_lang.activeList14}}</Checkbox>
          <Checkbox label="3">{{i18n_lang.activeList15}}</Checkbox>
        </CheckboxGroup>
      </FormItem>

      <!-- 赠送条件 -->
      <FormItem v-if="curTab == 14" :label="`${i18n_lang.activeList439_4_4}`">
        <RadioGroup v-model="condition_14" size="large">
          <Radio label="1">{{`${i18n_lang.activeList440_4_4}`}}</Radio>
        </RadioGroup>
      </FormItem>

      <!-- 注册送 -->
      <!-- 新增活动和首次充值送300%除外 -->
      <FormItem v-if="curTab != 4 && curTab != 7 && curTab != 8 && curTab != 9" :label="i18n_lang.activeList16" prop="issue_mode"><!-- 赠送方式 -->
        <RadioGroup v-model="editInfo.issue_mode" size="large">
          <Radio label="manual" v-if="curTab != 14">{{i18n_lang.activeList17}}</Radio>
          <Radio label="auto">{{i18n_lang.activeList18}}</Radio>
          <!-- <Radio label="contact">{{i18n_lang.activeList246}}</Radio> -->
        </RadioGroup>
      </FormItem>
      <!-- 赠送方式 -->
      <FormItem v-if="curTab == 4" :label="i18n_lang.activeList16" prop="state">
        <RadioGroup v-model="editInfo.state" size="large">
          <Radio label="manual">{{i18n_lang.activeList17}}</Radio>
          <Radio label="auto">{{i18n_lang.activeList18}}</Radio>
          <Radio label="contact">{{i18n_lang.activeList246}}</Radio>
          <Radio label="apply">{{i18n_lang.activeList389}}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 活动赠送次数 -->
      <FormItem v-if="curTab == 4 && editInfo.state == 'apply'" :label="`${i18n_lang.activeList390}`" prop="send_times">
        <RadioGroup v-model="editInfo.send_times" size="large">
          <Radio :label="1">{{i18n_lang.activeList391}}</Radio>
          <Radio :label="2">{{i18n_lang.activeList392}}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 可发起申请次数 -->
      <FormItem v-if="curTab == 4 && editInfo.state == 'apply'" :label="`${i18n_lang.activeList393}`" prop="apply_times">
        <Input v-model="editInfo.apply_times" :placeholder="``"></Input>
      </FormItem>
      <!-- 申请条件 -->
      <FormItem v-if="curTab == 4 && editInfo.state == 'apply'" :label="`${i18n_lang.activeList394}`">
        <span>{{`${i18n_lang.activeList395}：`}}<Switch v-model="editInfo.condition_recharge"></Switch></span>
        <span style="margin-left: 10px;">{{`${i18n_lang.activeList396}：`}}<Switch v-model="isLevel"></Switch></span>
      </FormItem>
      <!-- 会员等级 -->
      <FormItem v-if="curTab == 4 && isLevel && editInfo.state == 'apply'" :label="`${i18n_lang.activeList396}`">
        <Select v-model="user_level" multiple @on-change="getUserLevel($event)" :placeholder="`${i18n_lang.activeList285}`" style="width:500px;">
          <Option :key="''" :value="''">{{i18n_lang.activeList286}}</Option>
          <Option v-for="item in levelList" :key="item.level" :value="item.level">{{ item.name }}</Option>
        </Select>
      </FormItem>

      <!-- 注册送/实名认证 -->
      <FormItem v-if="curTab === 5 || curTab === 1 || curTab === 14" :label="curTab === 14 ? `${i18n_lang.activeList441_4_4}` : i18n_lang.activeList19" prop="rule"><!-- 固定奖金 -->
        <Input v-model="editInfo.rule" :placeholder="curTab === 14 ? `${i18n_lang.activeList442_4_4}` : i18n_lang.activeList20"></Input>
      </FormItem>
      <!-- 注册送注册送/实名认证 -->
      <!-- 每日首冲/新人首冲 -->
      <FormItem v-if="curTab === 2 || curTab === 3 || curTab == 11" :label="i18n_lang.activeList21" prop="send_type"><!-- 赠送金额 -->
        <RadioGroup v-model="editInfo.send_type" size="large">
          <Radio label="1">{{i18n_lang.activeList22}}</Radio>
          <Radio label="2">{{i18n_lang.activeList23}}</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem v-if="curTab === 2 || curTab === 3 || curTab == 11" :label="i18n_lang.activeList24"><!-- 充值优惠 -->
        <Row>
          <Col v-if="editInfo.send_type === '1'">
            <FormItem>
              <Button type="primary" @click="addOption">{{i18n_lang.activeList25}}</Button>
              <p v-for="(it,index) in editInfo.moneyList" :key="index">
                <Input v-model="it[0]" style="width:100px;" :disabled="index != 0"></Input>
                <span>{{ `&lt;${i18n_lang.activeList26}&lt;=` }}</span>
                <Input v-model="it[1]" style="width:100px;"></Input>
                <span>{{ index+1 == editInfo.moneyList.length ? ` ${i18n_lang.activeList27} `:' ' }}{{ ` ${i18n_lang.activeList28} ` }}</span>
                <Input v-model="it[2]" style="width:100px;"></Input>
                <span v-if="curTab == 11">{{i18n_lang.activeList398}}</span>
                <Input v-if="curTab == 11" v-model="it[3]" style="width:100px;"></Input>
                <Button v-if="index != 0" type="primary" @click="del(index)">{{i18n_lang.activeList29}}</Button>
              </p>
            </FormItem>
          </Col>
          <Col v-if="editInfo.send_type === '2'">
            <FormItem>
              <Button type="primary" @click="addOption">{{i18n_lang.activeList25}}</Button>
              <p v-for="(it,index) in editInfo.ruleList" :key="index">
                <Input v-model="it[0]" style="width:100px;" :disabled="index != 0"></Input>
                <span>{{ `&lt;${i18n_lang.activeList26}&lt;=` }}</span>
                <Input v-model="it[1]" style="width:100px;"></Input>
                <span>{{ index+1 === editInfo.ruleList.length ? ` ${i18n_lang.activeList27} `:' ' }}{{ ` ${i18n_lang.activeList28} ` }}</span>
                <Input v-model="it[2]" style="width:100px;"></Input>
                <span>%</span>
                <span v-if="curTab == 11">{{i18n_lang.activeList398}}</span>
                <Input v-if="curTab == 11" v-model="it[3]" style="width:100px;"></Input>
                <Button v-if="index !== 0" type="primary" @click="del(index)">{{i18n_lang.activeList29}}</Button>
              </p>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="(editInfo.send_type === '2' && curTab != 7) || curTab == 11" prop="send_max" :label="i18n_lang.activeList30"><!-- 赠送上限 -->
        <Input v-model="editInfo.send_max" :placeholder="i18n_lang.activeList31" style="width:200px;"></Input>
      </FormItem>
      <!-- 奖励发放时间 -->
      <FormItem v-if="curTab == 11 && editInfo.give_condition == 3" :label="`${i18n_lang.activeList399}`">
        <span style="float: left;">{{`${i18n_lang.activeList352}`}}</span>
        <Select v-model="editInfo.issue_day" :disabled="curTab == 9" style="width: 168px;float: left;">
          <Option v-for="item in weekList" :key="item.id" :value="item.id">{{ item.name }}</Option>
        </Select>
        <BackWaterTimePicker
          :value="timeValue"
          @changeTime="changeTime"
          :disabled-minutes="disabled_minutes"
          :disabled-seconds="disabled_seconds"
          :timeType="'week'"
          style="float: left;margin-left: 10px;"
        ></BackWaterTimePicker>
      </FormItem>

      <FormItem v-if="curTab === 2 || curTab === 3 || curTab == 11" :label="i18n_lang.activeList32" prop="vender_type"><!-- 充值方式 -->
        <RadioGroup v-model="editInfo.vender_type" size="large">
          <Radio label="1">{{i18n_lang.activeList33}}</Radio>
          <Radio label="2">{{i18n_lang.activeList34}}</Radio>
          <Radio label="3">{{i18n_lang.activeList35}}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 每日首冲/新人首冲 -->
      <!-- 新增活动和首次充值送300%除外 --><!-- 提现打码量% -->
      <FormItem v-if="curTab != 4 && curTab != 7 && curTab != 8 && curTab != 9 && curTab != 10 && curTab != 11 && curTab != 13" :label="i18n_lang.activeList36" prop="withdraw_require_val">
        <Input v-model="editInfo.withdraw_require_val" :placeholder="i18n_lang.activeList37"></Input>
      </FormItem>

      <!-- 首次充值送300% -->
      <FormItem v-if="curTab == 7" :label="i18n_lang.activeList214"><!-- 需要申请 -->
        <RadioGroup v-model="apply_for">
          <Radio label="1">{{i18n_lang.activeList222}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem v-if="curTab == 7" :label="i18n_lang.activeList215"><!-- 充值优惠 -->
        <Row>
          <div>{{i18n_lang.activeList216}} <Input v-model="discounts.discounts0" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input> %，{{i18n_lang.activeList218}} <Input v-model="discounts.discounts1" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input>，{{i18n_lang.activeList219}} <Input v-model="discounts.discounts2" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input> %，</div>
          <div>{{i18n_lang.activeList220}} <Input v-model="discounts.discounts3" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input> %，{{i18n_lang.activeList218}} <Input v-model="discounts.discounts4" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input>，{{i18n_lang.activeList219}} <Input v-model="discounts.discounts5" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input> %，</div>
          <div>{{i18n_lang.activeList221}} <Input v-model="discounts.discounts6" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input> %，{{i18n_lang.activeList218}} <Input v-model="discounts.discounts7" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input>，{{i18n_lang.activeList219}} <Input v-model="discounts.discounts8" style="width: 60px;" :placeholder="i18n_lang.activeList217"></Input> %，</div>
        </Row>
      </FormItem>
      <FormItem v-if="curTab == 7" :label="i18n_lang.activeList229" prop="minMoney"><!-- 最低充值金额 -->
        <Input v-model="minMoney" :placeholder="i18n_lang.activeList217"></Input>
      </FormItem>
      <FormItem v-if="curTab == 7" :label="i18n_lang.activeList223"><!-- 限玩游戏 -->
        <RadioGroup v-model="limit">
          <Radio label="1">{{i18n_lang.activeList224}}</Radio>
        </RadioGroup>
      </FormItem>

      <!-- 周返水 --><!-- v-model="curTab" -->
      <Tabs v-if="curTab == 8 && gameMenu.length > 0 || curTab == 9 && gameMenu.length > 0" v-model="currentGameId">
        <TabPane v-for="item in gameMenu" :key="item.id" :name="item.id.toString()" :label="item.name"></TabPane>
      </Tabs>
      <h1 class="title" v-if="curTab == 8 || curTab == 9">
        <span>{{i18n_lang.activeList230}}</span>
      </h1>
      <FormItem v-if="curTab == 8 || curTab == 9" :label="``">
        <div>
          <RadioGroup v-model="moneyType"><!-- editInfo.moneyType  @on-change="moneyTypeChange" -->
            <Radio label="loss" :disabled="isEdit">{{i18n_lang.activeList231}}</Radio>
            <Radio label="betting" :disabled="isEdit">{{i18n_lang.activeList232}}</Radio>
          </RadioGroup>
        </div>
      </FormItem>
      <FormItem v-if="curTab == 8 || curTab == 9" :label="``">
        <div>
          <RadioGroup v-model="childMoneyType">
            <Radio label="fixed" :disabled="isEdit">{{i18n_lang.activeList233}}</Radio>
            <Radio label="percentage" :disabled="isEdit">
              <span v-html="`${i18n_lang.activeList234}${moneyType === 'loss' ? i18n_lang.activeList235 : i18n_lang.activeList236}${i18n_lang.activeList237}`"></span>
            </Radio>
          </RadioGroup>
        </div>
      </FormItem>
      <FormItem v-if="curTab == 8 || curTab == 9">
        <div v-for="(item, index) in moneyRange" :key="index" class="money-content">
          <div class="money-item common-item">
            <div class="input-wrapper">
              <Input
                v-model="item.range[0]"
                class="input"
                :class="{'ivu-form-item-error': (isClick && !item.range[0]) || (isClick && Number(item.range[0]) > Number(item.range[1]))}"
                :disabled="isEdit"
                style="width: 100px"
                @on-blur="limitFloat(index,'range',item.range[0],0)"
              />
            </div>
            <span>&lt;={{ moneyType === 'loss' ? i18n_lang.activeList235 : i18n_lang.activeList236 }} &lt;</span>
            <div class="input-wrapper">
              <Input
                v-model="item.range[1]"
                class="input"
                :class="{'ivu-form-item-error': (isClick && !item.range[1]) || (isClick && Number(item.range[0]) > Number(item.range[1]))}"
                :disabled="isEdit"
                style="width: 100px"
                @on-blur="limitFloat(index,'range',item.range[1],1)"
              />
            </div>
          </div>
          <div class="common-item">
            <span class="back-water-text">{{i18n_lang.activeList238}}</span>
            <div class="input-wrapper">
              <Input
                v-model="item.reabte"
                class="input"
                :class="{'ivu-form-item-error': isClick && !item.reabte}"
                :disabled="isEdit"
                style="width: 100px"
                @on-blur="limitFloat(index,'rebate',item.reabte)"
              />
            </div>
            <span>{{ childMoneyType === 'fixed' ? i18n_lang.activeList239 : '%' }}</span>
          </div>
          <div class="common-item">
            <span class="back-water-text da-ma">{{i18n_lang.activeList240}}</span>
            <div class="input-wrapper">
              <Input
                v-model="item.daMa"
                class="input"
                :class="{'ivu-form-item-error': isClick && !item.daMa}"
                :disabled="isEdit"
                style="width: 100px"
                @on-blur="limitFloat(index,'daMa',item.daMa)"
              />
            </div>
            <span>%</span>
          </div>
          <Button
            v-if="!isEdit && moneyRange.length > 1"
            type="primary"
            class="remove-btn"
            @click="remove(index)"
          >
            <span>{{i18n_lang.activeList241}}</span>
          </Button>
        </div>
        <div class="add-btn">
          <Button v-if="!isEdit" type="primary" @click="add">{{i18n_lang.activeList242}}</Button>
        </div>
      </FormItem>
      <h1 class="title" v-if="curTab == 8 || curTab == 9">
        <span>{{i18n_lang.activeList243}}</span>
        <span class="rule">{{i18n_lang.activeList244}}</span>
      </h1>
      <FormItem v-if="curTab == 8 || curTab == 9" :label="i18n_lang.activeList245">
        <span style="float: left;">{{curTab == 8 ? `${i18n_lang.activeList352}` : `${i18n_lang.activeList353}`}}</span>
        <Select v-model="editInfo.issue_day" :disabled="curTab == 9" style="width: 168px;float: left;">
          <Option v-for="item in curTab == 8 ? weekList : dayList" :key="item.id" :value="item.id">{{ item.name }}</Option>
        </Select>
        <BackWaterTimePicker
          :value="timeValue"
          :disabled="curTab == 9"
          @changeTime="changeTime"
          :disabled-minutes="disabled_minutes"
          :disabled-seconds="disabled_seconds"
          :timeType="curTab == 9 ? 'day' : 'week'"
          style="float: left;margin-left: 10px;"
        ></BackWaterTimePicker>
      </FormItem>

      <!-- 游戏分类 -->
      <!-- 指定游戏渠道 -->
      <FormItem v-if="curTab == 5 || curTab == 10 || curTab == 13" :label="curTab == 10 ? i18n_lang.activeList253 : i18n_lang.activeList303">
        <Select v-model="game_menu_name" multiple @on-change="getGameMenuName($event)" :placeholder="curTab == 10 ? i18n_lang.activeList270 : i18n_lang.activeList304" style="width:500px;">
          <Option v-for="item in gameChannels" :key="item.type" :value="item.type">{{ item.rename }}</Option>
        </Select>
        <p v-if="curTab == 5" style="color: rgb(220, 222, 226);">{{i18n_lang.activeList315}}</p>
      </FormItem>
      <!-- 解除限制 -->
      <FormItem v-if="curTab == 5" :label="`${i18n_lang.activeList316}`">
        <div class="money-content">
          <div class="money-item common-item">
            <span>{{i18n_lang.activeList317}}</span>
            <div class="input-wrapper">
              <Input v-model="limit_value_5.expend" class="input" style="width: 100px"></Input>
            </div>
            <span>{{i18n_lang.activeList318}}</span>
            <div class="input-wrapper">
              <Input v-model="limit_value_5.recharge" class="input" style="width: 100px"></Input>
            </div>
          </div>
        </div>
      </FormItem>
      <!-- <FormItem :label="i18n_lang.activeList303">
        <CheckboxGroup v-model="gameChannelsList">
          <Checkbox v-for="item in gameChannels" :label="item.type">{{ item.rename }}</Checkbox>
        </CheckboxGroup>
      </FormItem> -->
      <!-- 指定游戏 -->
      <!-- <FormItem v-if="curTab == 10" :label="i18n_lang.activeList255">
        <Select v-model="game_id" multiple :placeholder="i18n_lang.activeList271" style="width:500px;">
          <Option v-for="item in specifyTheGame" :key="item.id + ''" :value="item.id + ''">{{ item.game_name }}</Option>
        </Select>
      </FormItem> -->
      <!-- 赠送条件 -->
      <FormItem v-if="curTab == 10" :label="i18n_lang.activeList256">
        <RadioGroup v-model="editInfo.luckydraw_condition.condi">
          <Radio :label="1">{{i18n_lang.activeList257}}</Radio>
          <Radio :label="2">{{i18n_lang.activeList258}}</Radio>
          <Radio :label="3">{{i18n_lang.activeList259}}</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 赠送条件 -->
      <FormItem v-if="curTab == 10" :label="i18n_lang.activeList260">
        <RadioGroup v-model="editInfo.luckydraw_condition.money">
          <Radio :label="1">{{i18n_lang.activeList261}}</Radio>
          <Radio v-if="editInfo.luckydraw_condition.condi != 3" :label="2">{{i18n_lang.activeList262}}</Radio>
          <Radio :label="3">{{i18n_lang.activeList259}}</Radio>
        </RadioGroup>
        <!-- <Input v-else v-model="editInfo.fixed_amount"></Input> -->
      </FormItem>
      <FormItem v-if="curTab == 10 && editInfo.luckydraw_condition.condi != 3">
        <div class="add-btn">
          <Button type="primary" @click="addFreeContent">{{i18n_lang.activeList242}}</Button>
        </div>
        <div v-for="(item, index) in freeContent" :key="index" class="money-content">
          <div class="money-item money-item-two common-item">
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.min" class="input" style="width: 50px"></Input>
            </div>
            <span>&lt;={{editInfo.luckydraw_condition.condi == 1 ? i18n_lang.activeList263 : i18n_lang.activeList264}} &lt;</span>
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.max" class="input" style="width: 50px"></Input>
            </div>
          </div>
          <div class="money-item money-item-two common-item">
            <span v-if="editInfo.luckydraw_condition.money == 1">{{i18n_lang.activeList261}}</span>
            <span v-if="editInfo.luckydraw_condition.money == 2">{{i18n_lang.activeList262}}</span>
            <span v-if="editInfo.luckydraw_condition.money == 3">{{i18n_lang.activeList259}}</span>
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.number" class="input" style="width: 50px"></Input>
            </div>
            <span v-if="editInfo.luckydraw_condition.money != 3">%</span>
          </div>
          <div class="money-item money-item-two common-item">
            <span>{{i18n_lang.activeList312}}</span>
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.dml" class="input" style="width: 50px"></Input>
            </div>
            <span>%</span>
          </div>
          <Button v-if="freeContent.length > 1" type="primary" class="remove-btn" @click="removeFreeContent(index)">{{i18n_lang.activeList241}}</Button>
        </div>
      </FormItem>
      <FormItem v-if="curTab == 10 && editInfo.luckydraw_condition.condi == 3">
        <div class="add-btn">
          <Button type="primary" @click="addFreeContent">{{i18n_lang.activeList242}}</Button>
        </div>
        <div v-for="(item, index) in freeContent" :key="index" class="money-content">
          <div class="money-item money-item-two common-item">
            <span>{{i18n_lang.activeList265}}</span>
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.min" class="input" style="width: 100px"></Input>
            </div>
            <!-- <span>&lt;=充值金额 &lt;</span>
            <div class="input-wrapper">
              <Input v-model="item.max" class="input" style="width: 100px"></Input>
            </div> -->
          </div>
          <div class="money-item money-item-two common-item">
            <span>{{editInfo.luckydraw_condition.money == 1 ? i18n_lang.activeList266 : i18n_lang.activeList267}}</span>
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.number" class="input" style="width: 100px"></Input>
            </div>
            <span v-if="editInfo.luckydraw_condition.money == 1">%</span>
          </div>
          <div class="money-item money-item-two common-item">
            <span>{{i18n_lang.activeList312}}</span>
            <div class="input-wrapper input-wrapper-two">
              <Input v-model="item.dml" class="input" style="width: 50px"></Input>
            </div>
            <span>%</span>
          </div>
          <Button v-if="freeContent.length > 1" type="primary" class="remove-btn" @click="removeFreeContent(index)">{{i18n_lang.activeList241}}</Button>
        </div>
      </FormItem>
      <!-- 赠送最大上限金额 -->
      <FormItem v-if="curTab == 10" :label="i18n_lang.activeList268" prop="send_max">
        <Input v-model="editInfo.send_max" :placeholder="i18n_lang.activeList269"></Input>
      </FormItem>

      <!-- 推广活动 -->
      <!-- 下级满足条件 -->
      <FormItem v-if="curTab == 13" :label="i18n_lang.activeList305">
        <div class="money-content">
          <div class="money-item common-item">
            <span>{{i18n_lang.activeList306}}</span>
            <div class="input-wrapper">
              <Input v-model="recharge_13.min" class="input" style="width: 100px"></Input>
            </div>
            <span>&lt;{{i18n_lang.activeList307}} &lt;=</span>
            <div class="input-wrapper">
              <Input v-model="recharge_13.max" class="input" style="width: 100px"></Input>
            </div>
          </div>
        </div>
        <div class="money-content">
          <div class="money-item common-item">
            <span>{{i18n_lang.activeList308}}</span>
            <div class="input-wrapper">
              <Input v-model="bet_amount_13.min" class="input" style="width: 100px"></Input>
            </div>
            <span>&lt;{{i18n_lang.activeList309}} &lt;=</span>
            <div class="input-wrapper">
              <Input v-model="bet_amount_13.max" class="input" style="width: 100px"></Input>
            </div>
          </div>
        </div>
      </FormItem>
      <!-- 赠送彩金 -->
      <FormItem v-if="curTab == 13" :label="i18n_lang.activeList310">
        <div class="money-content">
          <div class="money-item common-item">
            <div class="input-wrapper">
              <Input v-model="send_prize_13" class="input" style="width: 100px"></Input>
              <p style="color: #dcdee2;">{{i18n_lang.activeList311}}</p>
            </div>
            <span>{{i18n_lang.activeList312}}</span>
            <div class="input-wrapper">
              <Input v-model="send_bet_13" class="input" style="width: 100px"></Input>
              <p style="color: #dcdee2;">{{i18n_lang.activeList313}}</p>
            </div>
          </div>
        </div>
      </FormItem>
      <!-- 赠送彩金最大限额 -->
      <FormItem v-if="curTab == 13" :label="i18n_lang.activeList314">
        <div class="money-content">
          <div class="money-item common-item">
            <div class="input-wrapper">
              <Input v-model="editInfo.send_max" class="input" style="width: 100px"></Input>
            </div>
            <span>{{i18n_lang.activeList312}}</span>
            <div class="input-wrapper">
              <Input v-model="editInfo.send_bet_max" class="input" style="width: 100px"></Input>
            </div>
          </div>
        </div>
      </FormItem>

      <FormItem :label="i18n_lang.activeList38" prop="status"><!-- 状态 -->
        <RadioGroup v-model="editInfo.status" size="large">
          <Radio label="enabled">{{i18n_lang.activeList39}}</Radio>
          <Radio label="disabled">{{i18n_lang.activeList40}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="i18n_lang.activeList41" prop="sort"><!-- 排序 -->
        <Input v-model="editInfo.sort" :placeholder="i18n_lang.activeList42"></Input>
      </FormItem>
      <FormItem :label="i18n_lang.activeList43" prop="type_id"><!-- 活动分类 -->
        <Select v-model="editInfo.type_id" :placeholder="i18n_lang.activeList44" style="width:200px">
          <Option v-for="item in activeList" :key="item.id" :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem :label="i18n_lang.activeList45" prop="cover"><!-- 图片上传 -->
        <span>{{i18n_lang.activeList46}}</span>
        <UploadImg v-model="editInfo.cover"></UploadImg>
      </FormItem>
      <FormItem :label="i18n_lang.activeList225"><!-- 优惠文案格式 -->
        <RadioGroup v-model="is_html" size="large">
          <Radio label="1">{{i18n_lang.activeList226}}</Radio>
          <Radio label="2">{{i18n_lang.activeList227}}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label="i18n_lang.activeList47"><!-- 优惠规则编辑 -->
        <!-- <Row>
          <FormItem>
            <RadioGroup v-model="editInfo.content_type" size="large">
              <Radio :label="1">文字</Radio>
              <Radio :label="2">图片</Radio>
            </RadioGroup>
          </FormItem>
        </Row> -->
        <Row v-if="editInfo.content_type === 1">
          <FormItem prop="description">
            <!-- <Input
              v-model="editInfo.description"
              type="textarea"
              :autosize="{minRows: 8,maxRows: 15}"
              placeholder="请输入活动规则"
            ></Input> -->
            <div v-show="is_html == '1'" id="myEdit" style="width:700px;"></div>
            <textarea v-show="is_html == '2'" v-model="editInfo.description" style="width: 700px;height: 344px;border: 1px solid #dcdee2;padding: 0 15px;"></textarea>
          </FormItem>
        </Row>
        <Row v-else>
          <FormItem prop="content">
            <span>{{i18n_lang.activeList48}}</span>
            <UploadImg v-model="editInfo.content"></UploadImg>
          </FormItem>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="loading.modalButton" @click="saveActive">
          <span>{{ loading.modalButton?`${i18n_lang.activeList49} `:`${i18n_lang.activeList50} ` }}</span>
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import UploadImg from './UploadImg'
import LuckDiskActive from './LuckDiskActive'
import GivePrizes from './GivePrizes'
import { arrToString } from './format.js'
// import { formatDateTimeToString } from '@/libs/date'
import { MathDiv, MathMul } from '@/libs/formatMath'
import BackWaterTimePicker from '_c/TimePicker'
import { limitFloat } from '@/libs/tools.js'
export default {
  components: {
    UploadImg,
    LuckDiskActive,
    GivePrizes,
    BackWaterTimePicker
  },
  props: ['editInfo', 'editType'],
  data() {
    const i18n_lang = this.$t('activeList');
    return {
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
      activeType: [
        { id: '1', name: i18n_lang.activeList51 },
        { id: '2', name: i18n_lang.activeList52 },
        { id: '3', name: i18n_lang.activeList53 },
        { id: '4', name: i18n_lang.activeList54 },
        { id: '5', name: i18n_lang.activeList55 },
        { id: '6', name: i18n_lang.activeList56 },
        { id: '7', name: i18n_lang.activeList228 },
        // { id: '8', name: '周返水' },
        // { id: '9', name: '月返水' }
      ],
      activeList: [], // 活动分类列表
      curTab: 1,
      ruleValidate: {
        title: [{ required: true, message: i18n_lang.activeList57, trigger: 'blur' }],
        rule: [{ required: true, message: i18n_lang.activeList443_4_4, trigger: 'blur' }],
        ruleList: [{ required: true, message: i18n_lang.activeList59, trigger: 'blur' }],
        vender_type: [{ required: true, message: i18n_lang.activeList60, trigger: 'change' }],
        content_type: [{ required: true, message: i18n_lang.activeList61, trigger: 'blur' }],
        content: [{ required: true, message: i18n_lang.activeList62, trigger: 'blur' }],
        description: [{ required: true, message: i18n_lang.activeList63, trigger: 'blur' }],
        cover: [{ required: true, message: i18n_lang.activeList64, trigger: 'blur' }],
        sort: [{ required: true, message: i18n_lang.activeList65, trigger: 'blur' }],
        // type_id: [{ required: true, message: i18n_lang.activeList66 }],
        status: [{ required: true, message: i18n_lang.activeList67, trigger: 'blur' }],
        issue_mode: [{ required: true, message: i18n_lang.activeList68, trigger: 'change' }],
        send_max: [{ required: true, message: i18n_lang.activeList69, trigger: 'blur' }],
        send_type: [{ required: true, message: i18n_lang.activeList70, trigger: 'change' }],
        withdraw_require_val: [{ required: true, message: i18n_lang.activeList71 }],
        begin_time: [
          {
            required: true,
            validator: (rule, value, cb) => {
              // console.log(value, 222);
              if (this.editInfo.begin_time === '') {
                return cb(i18n_lang.activeList72)
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
              if (this.editInfo.end_time === '') {
                return cb(i18n_lang.activeList73)
              } else {
                return cb()
              }
            }
          }
        ]
      },
      is_html: '1',
      apply_for: '1',
      limit: '1',
      discounts: {
        discounts0: '',
        discounts1: '',
        discounts2: '',
        discounts3: '',
        discounts4: '',
        discounts5: '',
        discounts6: '',
        discounts7: '',
        discounts8: '',
        discounts9: ''
      },
      minMoney: '',
      currentGameId: '',
      gameMenu: [],
      weekList: [
        {
          id: 7,
          name: `${i18n_lang.activeList354}`
        },
        {
          id: 1,
          name: `${i18n_lang.activeList355}`
        },
        {
          id: 2,
          name: `${i18n_lang.activeList356}`
        },
        {
          id: 3,
          name: `${i18n_lang.activeList357}`
        },
        {
          id: 4,
          name: `${i18n_lang.activeList358}`
        },
        {
          id: 5,
          name: `${i18n_lang.activeList359}`
        },
        {
          id: 6,
          name: `${i18n_lang.activeList360}`
        }
      ],
      dayList: [
        {
          id: 1,
          name: '1'
        },
        {
          id: 2,
          name: '2'
        },
        {
          id: 3,
          name: '3'
        },
        {
          id: 4,
          name: '4'
        },
        {
          id: 5,
          name: '5'
        },
        {
          id: 6,
          name: '6'
        },
        {
          id: 7,
          name: '7'
        },
        {
          id: 8,
          name: '8'
        },
        {
          id: 9,
          name: '9'
        },
        {
          id: 10,
          name: '10'
        },
        {
          id: 11,
          name: '11'
        },
        {
          id: 12,
          name: '12'
        },
        {
          id: 13,
          name: '13'
        },
        {
          id: 14,
          name: '14'
        },
        {
          id: 15,
          name: '15'
        },
        {
          id: 16,
          name: '16'
        },
        {
          id: 17,
          name: '17'
        },
        {
          id: 18,
          name: '18'
        },
        {
          id: 19,
          name: '19'
        },
        {
          id: 20,
          name: '20'
        },
        {
          id: 21,
          name: '21'
        },
        {
          id: 22,
          name: '22'
        },
        {
          id: 23,
          name: '23'
        },
        {
          id: 24,
          name: '24'
        },
        {
          id: 25,
          name: '25'
        },
        {
          id: 26,
          name: '26'
        },
        {
          id: 27,
          name: '27'
        },
        {
          id: 28,
          name: '28'
        }
      ],
      isEdit: false,
      isClick: false,
      timeValue: '',
      disabled_minutes: Array.from(Array(60)).map((u, i) => i),
      disabled_seconds: Array.from(Array(60)).map((u, i) => i),
      moneyType: 'loss',
      childMoneyType: 'fixed',
      moneyRange: [
        {
          reabte: '',
          daMa: '',
          range: ['', '']
        }
      ],
      backwaterList:[],
      game_menu_name: [],
      gameChannels: [],
      game_id: [],
      specifyTheGame: [
        {
          id: 1,
          name: '游戏1'
        },
        {
          id: 2,
          name: '游戏2'
        }
      ],
      freeContent: [
        {
          min: '',
          max: '',
          number: '',
          dml: ''
        }
      ],
      fixed_amount: '',
      condition: {
        startTime: '',
        endTime: ''
      },
      timeOut: null,
      type_id: '',
      limit_value_5: {
        expend: '',
        recharge: ''
      },
      recharge_13: {
        min: '',
        max: ''
      },
      bet_amount_13: {
        min: '',
        max: ''
      },
      send_prize_13: '',
      send_bet_13: '',
      gameChannelsList: [],
      isLevel: true,
      user_level: [],
      levelList: [],
      condition_14: "1",//app登录活动赠送条件
    }
  },
  watch: {
    editInfo() {
      if (this.editType === 'edit') {
        this.changeTab(this.editInfo.template_id)
      } else {
        this.changeTab(1)
      }
    },
    currentGameId(newName, oldName) {
      let that = this
      if(oldName){
        that.backwaterList.forEach((item) => {
          if(item.game_menu_id == oldName){
            item.type = that.moneyType
            item.data = {
              status: that.childMoneyType,
              value: that.moneyRange
            }
          }else{
            that.backwaterList.push({
              game_menu_id: oldName,
              type: that.moneyType,
              data: {
                status: that.childMoneyType,
                value: that.moneyRange
              }
            })
          }
        })
        if(that.backwaterList.length == 0){
          that.backwaterList.push({
            game_menu_id: oldName,
            type: that.moneyType,
            data: {
              status: that.childMoneyType,
              value: that.moneyRange
            }
          })
        }
      }
      if(that.backwaterList.length){
        that.moneyRange = []
        that.backwaterList.forEach( item => {
          if(item.game_menu_id == newName) {
            that.moneyType = item.type
            that.childMoneyType = item.data.status
            that.moneyRange = item.data.value
          }else{
            if(!that.moneyRange.length){
              that.moneyType = 'loss'
              that.childMoneyType = 'fixed',
              that.moneyRange = [
                {
                  reabte: '',
                  daMa: '',
                  range: ['', '']
                }
              ]
            }
          }
        })
      }
      that.backwaterList = that.deWeightObject(that.backwaterList)
    },
    'editInfo.luckydraw_condition.condi'(newName, oldName){
      if(newName == 3 && this.editInfo.luckydraw_condition.money == 2){
        this.editInfo.luckydraw_condition.money = 1
      }
    }
  },
  created() {
    if (this.editType === 'edit') {
      this.changeTab(this.editInfo.template_id)
    } else {
      this.changeTab(1)
    }
    this.classTemplate()
    this.classList()
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
    // 周月流水 start
    changeTime(time) {//选择返水时间
      // console.log(time)
      this.timeValue = time
    },
    limitFloat(index, key, val, i) {
      return
      if (key === 'range') {
        this.moneyRange[index][key].splice(i, 1, limitFloat(val))
      } else {
        this.moneyRange[index][key] = limitFloat(val)
      }
    },
    /*** 点击新增 */
    add() {
      this.moneyRange.push({
        reabte: '',
        daMa: '',
        range: [this.moneyRange[this.moneyRange.length - 1].range[1], ''],
        isAdd: true
      })
    },
    /*** 点击删除 */
    remove(index) {
      this.moneyRange.splice(index, 1)
    },
    async activeWater(){
      const res = await this.$axios.request({
        url: '/active/water',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      this.currentGameId = res.data[0].id.toString()
      this.gameMenu = res.data
    },
    deWeightObject(Arrar){
      const objList = {}, arrarList = []
      for(var i = 0; i<Arrar.length; i++){
        if(!objList[Arrar[i].game_menu_id]){
          arrarList.push(Arrar[i]);
          objList[Arrar[i].game_menu_id] = true;
        }
      }
      return arrarList
    },
    // 周月流水 end

    //游戏类型start
    // 点击新增金额类型
    addFreeContent(){
      this.freeContent.push({
        min: this.freeContent[this.freeContent.length - 1].max,
        max: '',
        number: '',
        dml: '',
        isAdd: true
      })
    },
    //删除金额类型
    removeFreeContent(index){
      this.freeContent.splice(index, 1)
    },
    // 游戏渠道变化
    getGameMenuName(event){
      if(this.timeOut) clearTimeout(this.timeOut)
      let game_id = ''
      // this.timeOut = setTimeout(() => {
      //   // this.gameChannels.forEach((item, index) => {
      //   //   event.forEach((items, indexs) => {
      //   //     if
      //   //   })
      //   // })
      //   this.getGamelist()
      // },2000)
    },
    //游戏类型end

    // 切换活动类型
    changeTab(id) {
      // console.log(id)
      this.curTab = id
      if (this.editType === 'add') {
        this.editInfo.title = this.activeType.filter(x => Number(x.id) === Number(id))[0].name
      }
      if(id == 4){
        this.levelListFn()
        if(this.editInfo.condition_user_level){
          this.isLevel = true
        }else{
          this.isLevel = false
        }
      }
      if(id == 5){
        this.getGameMenu()
        if(this.editType === 'edit'){
          this.game_menu_name = this.editInfo.game_type ? this.editInfo.game_type.split(',') : []
          this.limit_value_5 = {
            // expend: this.editInfo.limit_value ? this.editInfo.limit_value.split(',')[0] / 100 : '',
            expend: this.editInfo.limit_value ? this.editInfo.limit_value.split(',')[0] : '',
            // recharge: this.editInfo.limit_value ? this.editInfo.limit_value.split(',')[1] / 100 : ''
            recharge: this.editInfo.limit_value ? this.editInfo.limit_value.split(',')[1] : ''
          }
        }
      }
      if(id == 7 && this.editType === 'edit'){
        this.discounts = {
          discounts0: MathDiv(this.editInfo.rule.split('|')[0].split(',')[0], 1),
          discounts1: MathDiv(this.editInfo.rule.split('|')[0].split(',')[1], 1),
          discounts2: MathDiv(this.editInfo.rule.split('|')[0].split(',')[2], 1),
          discounts3: MathDiv(this.editInfo.rule.split('|')[1].split(',')[0], 1),
          discounts4: MathDiv(this.editInfo.rule.split('|')[1].split(',')[1], 1),
          discounts5: MathDiv(this.editInfo.rule.split('|')[1].split(',')[2], 1),
          discounts6: MathDiv(this.editInfo.rule.split('|')[2].split(',')[0], 1),
          discounts7: MathDiv(this.editInfo.rule.split('|')[2].split(',')[1], 1),
          discounts8: MathDiv(this.editInfo.rule.split('|')[2].split(',')[2], 1),
          discounts9: ''
        }
        this.minMoney = this.editInfo.rule.split('|')[3] ? MathDiv(this.editInfo.rule.split('|')[3], 100) : 0
      }
      if(id==8 || id==9){
        this.activeWater()
        const rule = this.editInfo.rule ? JSON.parse(this.editInfo.rule) : ''
        if(rule[0]){
          this.currentGameId = rule[0].game_menu_id
          this.moneyType = rule[0].type
          this.childMoneyType = rule[0].data.status
          this.moneyRange = []
          rule[0].data.value.forEach( item => {
            let obj = {
              range: [item.split(';')[0].split(',')[0], item.split(';')[0].split(',')[1]],
              reabte: item.split(';')[1],
              daMa: item.split(';')[2]
            }
            this.moneyRange.push(obj)
          })
        }
        if(rule.length){
          const objList = {}, arrarList = []
          this.backwaterList = []
          for(var i = 0; i<rule.length; i++){
            if(!objList[rule[i].game_menu_id]){
              arrarList.push(rule[i]);
              objList[rule[i].game_menu_id] = true;
            }
          }
          arrarList.forEach((item, index) => {
            const obj = {
              game_menu_id: '',
              type: '',
              data: {
                status: '',
                value: []
              }
            }
            obj.game_menu_id = item.game_menu_id
            obj.type = item.type
            obj.data.status = item.data.status
            item.data.value.forEach(items => {
              obj.data.value.push({
                range: [items.split(';')[0].split(',')[0], items.split(';')[0].split(',')[1]],
                reabte: items.split(';')[1],
                daMa: items.split(';')[2]
              })
            })
            this.backwaterList.push(obj)
          })
        }
        this.timeValue = this.editInfo.issue_time
        if(id==9 && this.editType === 'add'){
          this.editInfo.issue_day=28
          this.timeValue=`12:00:00`
        }
      }
      if(id==10){
        this.getGameMenu()
        this.condition.startTime = this.editInfo.give_date ? this.editInfo.give_date.split(',')[0] : ''
        this.condition.endTime = this.editInfo.give_date ? this.editInfo.give_date.split(',')[1] : ''
        // if(this.editType === 'add'){
        //   this.getGamelist()
        // }
        if(this.editType === 'edit'){
          this.game_menu_name = this.editInfo.rule.game_menu_name ? this.editInfo.rule.game_menu_name.split(',') : ''
          this.game_id = this.editInfo.rule.game_id ? this.editInfo.rule.game_id.split(',') : ''
          this.freeContent = []
          this.editInfo.rule.rule.split(';').forEach((item, index) => {
            let arrarList = item.split(',')
            if(this.editInfo.luckydraw_condition.condi == 3){
              this.freeContent.push({
                min: MathDiv(arrarList[0], 1),
                max: '',
                number: arrarList[2],
                dml: arrarList[3] ? arrarList[3] : ''
              })
            }else{
              this.freeContent.push({
                min: MathDiv(arrarList[0], 1),
                max: MathDiv(arrarList[1], 1),
                number: arrarList[2],
                dml: arrarList[3] ? arrarList[3] : ''
              })
            }
          })
        }
      }
      if(id==11){
        this.condition.startTime = this.editInfo.give_date ? this.editInfo.give_date.split(',')[0] : ''
        this.condition.endTime = this.editInfo.give_date ? this.editInfo.give_date.split(',')[1] : ''
        this.timeValue = this.editInfo.issue_time
        if(this.editType === 'add'){
          this.editInfo.moneyList = [['', '', '']]
          this.editInfo.ruleList = [['', '', '']]
        }
      }
      if(id==13){
        this.getGameMenu()
        this.condition.startTime = this.editInfo.give_date ? this.editInfo.give_date.split(',')[0] : ''
        this.condition.endTime = this.editInfo.give_date ? this.editInfo.give_date.split(',')[1] : ''
        if(this.editType === 'edit'){
          this.game_menu_name = this.editInfo.rule.game_menu_name ? this.editInfo.rule.game_menu_name.split(',') : ''
          this.recharge_13 = {
            // min: +this.editInfo.rule.rule.recharge.split(',')[0] / 100,
            min: +this.editInfo.rule.rule.recharge.split(',')[0],
            // max: +this.editInfo.rule.rule.recharge.split(',')[1] / 100
            max: +this.editInfo.rule.rule.recharge.split(',')[1]
          }
          this.bet_amount_13 = {
            // min: +this.editInfo.rule.rule.bet_amount.split(',')[0] / 100,
            min: +this.editInfo.rule.rule.bet_amount.split(',')[0],
            // max: +this.editInfo.rule.rule.bet_amount.split(',')[1] / 100
            max: +this.editInfo.rule.rule.bet_amount.split(',')[1]
          }
          // this.send_prize_13 = this.editInfo.rule.send_prize / 100
          this.send_prize_13 = this.editInfo.rule.send_prize
          // this.send_bet_13 = this.editInfo.rule.send_bet / 100
          this.send_bet_13 = this.editInfo.rule.send_bet
        }
      }
    },
    // 添加优惠
    addOption() {
      let arr = this.editInfo.send_type === '2' ? this.editInfo.ruleList : this.editInfo.moneyList
      if (arr.length) {
        if (this.editInfo.send_type === '2') {
          if (!this.checkRuleList(arr)) return
        } else {
          if (!this.checkMoneyList(arr)) return
        }
        arr.push(['', '', '', ''])
        if (arr.length > 1) {
          arr[arr.length - 1][0] = arr[arr.length - 2][1] + ''
        }
      } else {
        arr = [['', '', '', '']]
      }
    },
    // 删除优惠
    del(index) {
      const arr = this.editInfo.send_type === '2' ? this.editInfo.ruleList : this.editInfo.moneyList
      arr.splice(arr.findIndex((item, i) => i === index), 1)
    },
    // 获取活动模板
    async classTemplate() {
      const res = await this.$axios.request({
        url: '/active/template',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.activeType = res.data
        // this.activeList = res.data.filter(x => x.status == 'enabled')
        // this.activeType = res.data.filter(x => x.status == 'enabled')
      }
    },
    // 获取分类列表
    async classList() {
      const res = await this.$axios.request({
        url: '/active/type',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.activeList = res.data.filter(x => x.status == 'enabled')
        this.type_id = 12//res.data.filter(x => x.name == `${this.i18n_lang.activeList300}`)[0].id
        // this.activeType = res.data.filter(x => x.status == 'enabled')
      }
    },
    // 获取游戏渠道
    async getGameMenu() {
      const res = await this.$axios.request({
        url: '/game/menu',
        method: 'GET'
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        this.gameChannels = res.data
      }
    },
    // 获取游戏
    async getGamelist() {
      let game_menu_name = ''
      if(this.game_menu_name.length){
        this.game_menu_name.forEach((item, index) => {
          game_menu_name += index == 0 ? `${item}` : `,${item}`
        })
      }
      const res = await this.$axios.request({
        url: '/game/gamelist',
        method: 'GET',
        params: {
          game_id: game_menu_name,
        }
      })
      if (res.status !== 200) {
        this.$Message.error(res.message)
        return
      }
      if(res.data && res.data.length){
        if(this.game_id.length){
          let gameIdlist = []
          res.data.forEach((item, index) => {
            this.game_id.forEach((items, indexs) => {
              if(item.id == items){
                gameIdlist.push(items)
              }
            })
          })
          // console.log('game_id', gameIdlist)
          this.game_id = gameIdlist
        }
        this.specifyTheGame = res.data
      }
    },
    checkRuleList(arr) {
      console.log('rule', arr)
      if (!arr.length) return false
      let state = true
      arr.map(x => {
        if (x[0] === '' || x[1] === '' || x[2] === '') {
          console.log(x)
          this.$Message.warning(this.i18n_lang.activeList74)
          state = false
        }
        if (Number(x[0]) - Number(x[1]) > 1) {
          this.$Message.warning(this.i18n_lang.activeList75)
          state = false
        }
        if (Number(x[2]) > 3000) {
          this.$Message.warning(this.i18n_lang.activeList76)
          state = false
        }
        // if (Number(x[0]) * Number(x[2]) > Number(this.editInfo.send_max)) {
        //   this.$Message.warning('充值赠送金额不能大于赠送上限');
        //   state = false;
        // }
      })
      return state
    },
    checkMoneyList(arr) {
      // console.log(arr)
      if (!arr.length) return false
      let state = true
      arr.map(x => {
        if (x[0] === '' || x[1] === '' || x[2] === '') {
          console.log(x)
          this.$Message.warning(this.i18n_lang.activeList74)
          state = false
        }
        if (Number(x[0]) > Number(x[1])) {
          this.$Message.warning(this.i18n_lang.activeList75)
          state = false
        }
        // console.log(this.editInfo.send_type, x)
      })
      return state
    },
    // 格式化时间
    changeStartTime(date) {
      this.editInfo.begin_time = date
    },
    changeEndTime(date) {
      this.editInfo.end_time = date
    },
    changeConditionStartTime(data){
      this.condition.startTime = data
    },
    changeConditionEndTime(data){
      this.condition.endTime = data
    },
    changeDate(dateA) {
      let dateee = new Date(dateA).toJSON();
      let date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
      return date;
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
      if(this.editInfo.condition_user_level){
        this.user_level = []
        this.editInfo.condition_user_level.split(',').forEach((item, index) => {
          this.user_level.push( +item )
        })
      }
    },
    // 保存活动
    async saveActive() {
      if (this.editInfo.begin_time > this.editInfo.end_time) {
        this.$Message.warning(this.i18n_lang.activeList77)
        return
      }
      this.$refs['editInfo'].validate(async valid => {
        if (valid) {
          const obj = Object.assign({}, this.editInfo)
          obj.begin_time = this.changeDate(obj.begin_time)
          obj.end_time = this.changeDate(obj.end_time)
          obj.send_max = MathMul(this.editInfo.send_max, 100)
          obj.template_id = this.curTab

          obj.bind_info = this.editInfo.bind_info_list ? this.editInfo.bind_info_list.join(',') : ''
          delete obj.bind_info_list
          if (this.curTab === 2 || this.curTab === 3 || this.curTab === 11) {
            if (obj.send_type === '2') {
              if (this.checkRuleList(obj.ruleList)) {
                obj.rule = arrToString(obj.ruleList)
              } else {
                return
              }
            } else {
              if (this.checkMoneyList(obj.moneyList)) {
                obj.rule = arrToString(obj.moneyList)
              } else {
                return
              }
            }
          }
          if (this.curTab === 1 || this.curTab === 5 || this.curTab === 14) {
            obj.rule = MathMul(this.editInfo.rule, 100)
          }
          // console.log(MathMul(this.editInfo.rule, 100), ' MathMul(this.editInfo.rule, 100);');
          if(this.curTab === 4){
            obj.condition_recharge = obj.condition_recharge ? 1 : 2
            obj.condition_user_level = ''
            if(this.isLevel){
              this.user_level.forEach((item, index) => {
                obj.condition_user_level += index == 0 ? `${item}` : `,${item}`
              })
            }
          }
          if(this.curTab === 5){
            let game_menu_name = ""
            if(this.game_menu_name.length){
              this.game_menu_name.forEach((item, index) => {
                game_menu_name += index == 0 ? `${item}` : `,${item}`
              })
            }
            obj.game_type = game_menu_name
            // obj.limit_value = `${this.limit_value_5.expend * 100},${this.limit_value_5.recharge * 100}`
            obj.limit_value = `${this.limit_value_5.expend},${this.limit_value_5.recharge}`
          }
          if (this.curTab !== 4 && this.curTab != 7) {
            obj.withdraw_require_val = MathMul(this.editInfo.withdraw_require_val, 100)
          }
          if (this.curTab == 7) {
            let discounts0 = MathMul(this.discounts.discounts0, 100)
            let discounts1 = MathMul(this.discounts.discounts1, 100)
            let discounts2 = MathMul(this.discounts.discounts2, 100)
            let discounts3 = MathMul(this.discounts.discounts3, 100)
            let discounts4 = MathMul(this.discounts.discounts4, 100)
            let discounts5 = MathMul(this.discounts.discounts5, 100)
            let discounts6 = MathMul(this.discounts.discounts6, 100)
            let discounts7 = MathMul(this.discounts.discounts7, 100)
            let discounts8 = MathMul(this.discounts.discounts8, 100)
            let minMoney = MathMul(this.minMoney, 1)
            obj.rule = `${discounts0},${discounts1},${discounts2}|${discounts3},${discounts4},${discounts5}|${discounts6},${discounts7},${discounts8}|${minMoney}`
            obj.withdraw_require_val = 0
          }
          if(this.curTab == 8 || this.curTab == 9){
            const valueArrar = [], valueArrar2 = []
            if(this.backwaterList.length == 0){
              this.backwaterList.push({
                game_menu_id: this.currentGameId,
                type: this.moneyType,
                data: {
                  status: this.childMoneyType,
                  value: this.moneyRange
                }
              })
            }
            this.backwaterList.forEach((item, index) => {
              if(item.game_menu_id == this.currentGameId){
                item.game_menu_id = this.currentGameId
                item.type = this.moneyType
                item.data = {
                  status: this.childMoneyType,
                  value: this.moneyRange
                }
              }else{
                this.backwaterList.push({
                  game_menu_id: this.currentGameId,
                  type: this.moneyType,
                  data: {
                    status: this.childMoneyType,
                    value: this.moneyRange
                  }
                })
              }
            })
            // return console.log(this.backwaterList)
            const objList = {}, arrarList = []
            for(var i = 0; i<this.backwaterList.length; i++){
              if(!objList[this.backwaterList[i].game_menu_id]){
                arrarList.push(this.backwaterList[i]);
                objList[this.backwaterList[i].game_menu_id] = true;
              }
            }
            arrarList.forEach(item => {
              const obj = {}
              obj.game_menu_id = item.game_menu_id,
              obj.type = item.type,
              obj.data = {
                status: item.data.status,
                value: []
              }
              item.data.value.forEach((items) => {
                obj.data.value.push(`${items.range[0] ? items.range[0] : 0},${items.range[1] ? items.range[1] : 0};${items.reabte ? items.reabte : 0};${items.daMa ? items.daMa : 0}`)
              })
              valueArrar.push(obj)
            })
            obj.rule = JSON.stringify(valueArrar)
            obj.withdraw_require_val = 0
            obj.issue_cycle = this.curTab == 9 ? "day" : "week"
            obj.issue_time = this.timeValue
            obj.send_max = 0
            obj.bind_info = ''
          }
          if(this.curTab == 10){
            let ruleText = "", game_menu_name = "", game_id = ""
            this.freeContent.forEach((item, index) => {
              let min = MathMul(item.min, 100).toString().split('.')[1] ? MathMul(item.min, 100).toString().split('.')[0] : MathMul(item.min, 100)
              let max = MathMul(item.max, 100).toString().split('.')[1] ? MathMul(item.max, 100).toString().split('.')[0] : MathMul(item.max, 100)
              // let number = MathMul(item.number, 100).toString().split('.')[1] ? MathMul(item.number, 100).toString().split('.')[0] : MathMul(item.number, 100)
              if(this.editInfo.luckydraw_condition.condi == 3){
                ruleText += index == 0 ? `${min},${min},${item.number},${item.dml}` : `;${min},${min},${item.number},${item.dml}`
              }else{
                ruleText += index == 0 ? `${min},${max},${item.number},${item.dml}` : `;${min},${max},${item.number},${item.dml}`
              }
            })
            if(this.game_menu_name.length){
              this.game_menu_name.forEach((item, index) => {
                game_menu_name += index == 0 ? `${item}` : `,${item}`
              })
            }
            if(this.game_id.length){
              this.game_id.forEach((item, index) => {
                game_id += index == 0 ? `${item}` : `,${item}`
              })
            }
            obj.rule = {
              game_menu_name: game_menu_name,
              game_id: game_id,
              rule: ruleText
            }
            obj.luckydraw_condition = JSON.stringify(obj.luckydraw_condition)
            obj.rule = JSON.stringify(obj.rule)
            obj.give_date = this.condition.startTime ? this.$dateFormat(new Date(this.condition.startTime)) : ''
            obj.give_date += this.condition.endTime ? `,${this.$dateFormat(new Date(this.condition.endTime))}` : ''
            delete obj.moneyList
            delete obj.ruleList
          }else{
            delete obj.luckydraw_condition
          }
          if(this.curTab == 11){
            obj.issue_time = this.timeValue
            obj.give_date = this.condition.startTime ? this.$dateFormat(new Date(this.condition.startTime)) : ''
            obj.give_date += this.condition.endTime ? `,${this.$dateFormat(new Date(this.condition.endTime))}` : ''
          }
          if(this.curTab == 13){
            let game_menu_name = "", game_id = ""
            if(this.game_menu_name.length){
              this.game_menu_name.forEach((item, index) => {
                game_menu_name += index == 0 ? `${item}` : `,${item}`
              })
            }
            // if(this.game_id.length){
            //   this.game_id.forEach((item, index) => {
            //     game_id += index == 0 ? `${item}` : `,${item}`
            //   })
            // }
            obj.rule = {
              game_menu_name: game_menu_name,
              game_id: '',
              // send_prize: this.send_prize_13 * 100,
              send_prize: this.send_prize_13,
              // send_bet: this.send_bet_13 * 100,
              send_bet: this.send_bet_13,
              rule: {
                // recharge: `${this.recharge_13.min * 100},${this.recharge_13.max * 100}`,
                recharge: `${this.recharge_13.min * 100},${this.recharge_13.max}`,
                // bet_amount: `${this.bet_amount_13.min * 100},${this.bet_amount_13.max * 100}`
                bet_amount: `${this.bet_amount_13.min * 100},${this.bet_amount_13.max}`
              }
            }
            // obj.send_bet_max = obj.send_bet_max * 100
            obj.send_bet_max = obj.send_bet_max
            obj.rule = JSON.stringify(obj.rule)
            obj.give_date = this.condition.startTime ? this.$dateFormat(new Date(this.condition.startTime)) : ''
            obj.give_date += this.condition.endTime ? `,${this.$dateFormat(new Date(this.condition.endTime))}` : ''
            delete obj.moneyList
            delete obj.ruleList
          }
          // console.log(obj, 'obj-------');
          if(this.curTab != 4){
            delete obj.apply_times
          }
          this.loading.modalButton = true
          let typeObj = {}
          if (this.editType === 'add') {
            typeObj = {
              url: '/active',
              method: 'post',
              data: obj
            }
          } else {
            typeObj = {
              url: `/active/${this.editInfo.id}`,
              method: 'put',
              data: obj
            }
          }
          const res = await this.$axios.request(typeObj)
          this.loading.modalButton = false
          if (res.status !== 200 || res.state !== 0) {
            this.$Message.error(res.message)
          } else {
            this.$Message.success(res.message)
            this.$emit('onSuccess', true)
          }
          // this.$refs['editInfo'].resetFields();
        } else {
          this.loading.modalButton = false
          // this.$Message.error('Fail!');
        }
      })
    },
    onSuccess() {
      this.$emit('onSuccess', true)
    }
  }
}
</script>

<style  lang="less" scoped>
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
.mytabs_tb{
  box-sizing: border-box;
  // scrollbar-width: none; /* firefox */
  // -ms-overflow-style: none; /* IE 10+ */
  overflow: hidden;
  overflow-x: auto;
  // &::-webkit-scrollbar {
  //   display: none; /* Chrome Safari */
  // }
}
.mytabs {
  box-sizing: border-box;
  margin-bottom: 45px;
  position: relative;
  // display: flex;
  border-top: 1px solid #dcdcdc;
  border-left: 1px solid #dcdcdc;
  li {
    box-sizing: border-box;
    width: 160px;
    // flex: 1;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-right: 1px solid #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
    float: left;
    cursor: pointer;
    &.active {
      border-bottom: 1px solid #fff;
    }
  }
}
.title{
  font-size: 16px;
  margin: 20px 0;
  padding-left: 10px;
  border-left: 3px solid #3080fe;
  color: #666;
  .rule {
    color: red;
    font-weight: normal;
    font-size: 12px;
  }
}
.money-content {
  display: flex;
  margin-top: 20px;
  .common-item {
    flex: 0 0 220px;
    width: 220px;
    display: flex;
    span {
      flex: 0 0 30px;
      line-height: 32px;
      font-size: 12px;
      margin: 0px 3px;
      &.da-ma {
        flex: 0 0 65px;
      }
    }
    &.money-item {
      flex: 0 0 350px;
      display: flex;
      span {
        flex: 0 0 80px;
      }
    }
    &.money-item-two{
      flex: 0 0 260px;
      display: flex;
      span {
        flex: 0 0 80px;
      }
    }
  }
  .input-wrapper {
    flex: 0 0 120px;
    width: 120px;
    position: relative;
    em.error {
      position: absolute;
      left: 0;
      top: 30px;
      font-size: 12px;
      color: #ed3f14;
    }
    &.input-wrapper-two {
      flex: 0 0 50px;
    }
  }
}
</style>
