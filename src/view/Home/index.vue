<template>
  <div id="HomeManage" :class="{'home_bg': showHome}">
    <div v-if="!showHome">Home</div>
    <div v-if="showHome">
      <Spin v-if="loading.page" size="large" fix></Spin>
      <Card dis-hover class="query_box">
        <p class="title">
          {{i18n_lang.home0}}
          <span @click.self="visible.state = true">{{i18n_lang.home114}}</span>
        </p>
        <div class="card-box">
          <Card class="card">
            <p class="card_title">{{i18n_lang.home1}}</p>
            <p class="card_number">{{indexTopData.register_total}}</p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home2}}</p>
            <p class="card_number">{{indexTopData.online_total}}</p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home3}}</p>
            <p class="card_number">{{indexTopData.register_today_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.register_yesterday_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.register_yesterday_parent}%`}}
                <Icon :type="Number(indexTopData.register_yesterday_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home5}}</p>
            <p class="card_number">{{`${indexTopData.day30_login_parent}%`}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.day30_yesterday_login_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.day30_yesterday_login_parent}%`}}
                <Icon :type="Number(indexTopData.day30_yesterday_login_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home6}}</p>
            <p class="card_number">{{`${indexTopData.day15_login_parent}%`}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.day15_yesterday_login_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.day15_yesterday_login_parent}%`}}
                <Icon :type="Number(indexTopData.day15_yesterday_login_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
        </div>
        <div class="card-box">
          <Card class="card">
            <p class="card_title">{{i18n_lang.home7}}</p>
            <p class="card_number">{{indexTopData.revenue_today_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.revenue_yesterday_total_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.revenue_yesterday_total_parent}%`}}
                <Icon :type="Number(indexTopData.revenue_yesterday_total_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home8}}</p>
            <p class="card_number">{{indexTopData.withdraw_today_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.withdraw_yesterday_total_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.withdraw_yesterday_total_parent}%`}}
                <Icon :type="Number(indexTopData.withdraw_yesterday_total_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home9}}</p>
            <p class="card_number">{{indexTopData.recharge_today_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.recharge_yesterday_total_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.recharge_yesterday_total_parent}%`}}
                <Icon :type="Number(indexTopData.recharge_yesterday_total_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home10}}</p>
            <p class="card_number">{{indexTopData.new_recharge_today_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.recharge_yesterday_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.recharge_yesterday_parent}%`}}
                <Icon :type="Number(indexTopData.recharge_yesterday_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home11}}</p>
            <p class="card_number">{{indexTopData.day3_recharge_parent}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.day3_yesterday_recharge_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.day3_yesterday_recharge_parent}%`}}
                <Icon :type="Number(indexTopData.day3_yesterday_recharge_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home12}}</p>
            <p class="card_number">{{indexTopData.day15_recharge_parent}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.day15_yesterday_recharge_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.day15_yesterday_recharge_parent}%`}}
                <Icon :type="Number(indexTopData.day15_yesterday_recharge_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
        </div>
        <div class="card-box">
          <Card class="card">
            <p class="card_title">{{i18n_lang.home59}}</p>
            <p class="card_number">{{indexTopData.bet_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.yesterday_bet_total_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.yesterday_bet_total_parent}%`}}
                <Icon :type="Number(indexTopData.yesterday_bet_total_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home60}}</p>
            <p class="card_number">{{indexTopData.revenue_today_kill_rate ? `${indexTopData.revenue_today_kill_rate}%` : '0%'}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.revenue_yesterday_kill_rate_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.revenue_yesterday_kill_rate_parent}%`}}
                <Icon :type="Number(indexTopData.revenue_yesterday_kill_rate_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">ARPPU</p>
            <p class="card_number">{{indexTopData.arppu_today}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.arppu_yesterday_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.arppu_yesterday_parent}%`}}
                <Icon :type="Number(indexTopData.arppu_yesterday_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home61}}</p>
            <p class="card_number">{{indexTopData.active_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.active_yesterday_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.active_yesterday_parent}%`}}
                <Icon :type="Number(indexTopData.active_yesterday_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home62}}</p>
            <p class="card_number">{{indexTopData.rebet_total}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.rebet_yesterday_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.rebet_yesterday_parent}%`}}
                <Icon :type="Number(indexTopData.rebet_yesterday_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
        </div>
        <div class="card-box">
          <Card class="card">
            <p class="card_title">{{i18n_lang.home63}}</p>
            <p class="card_number">{{indexTopData.bet_today_kill_rate ? `${indexTopData.bet_today_kill_rate}%` : '0%'}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.bet_yesterday_kill_rate_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.bet_yesterday_kill_rate_parent}%`}}
                <Icon :type="Number(indexTopData.bet_yesterday_kill_rate_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
          <Card class="card">
            <p class="card_title">{{i18n_lang.home64}}</p>
            <p class="card_number">{{indexTopData.bkge_amount_today}}</p>
            <p class="card_proportion">
              <span>{{i18n_lang.home4}}</span>
              <span :class="Number(indexTopData.bkge_amount_yesterday_parent) >= 0 ? 'red_text' : 'green_text'">
                {{`${indexTopData.bkge_amount_yesterday_parent}%`}}
                <Icon :type="Number(indexTopData.bkge_amount_yesterday_parent) >= 0 ? 'md-arrow-round-up' : 'md-arrow-round-down'" size="12"></Icon>
              </span>
            </p>
          </Card>
        </div>
      </Card>
      <Card dis-hover class="query_box">
        <p class="title">{{i18n_lang.home17}}</p>
        <div class="echarts-btn">
          <ul class="echarts-btn-left">
            <li @click="echartsLineField('online')" :class="{'active': indexSecondActive.field == 'online'}">{{i18n_lang.home18}}</li>
            <li @click="echartsLineField('game')" :class="{'active': indexSecondActive.field == 'game'}">{{i18n_lang.home19}}</li>
            <li @click="echartsLineField('recharge')" :class="{'active': indexSecondActive.field == 'recharge'}">{{i18n_lang.home20}}</li>
            <li @click="echartsLineField('withdraw')" :class="{'active': indexSecondActive.field == 'withdraw'}">{{i18n_lang.home21}}</li>
            <li @click="echartsLineField('newRechargePeople')" :class="{'active': indexSecondActive.field == 'newRechargePeople'}">{{i18n_lang.home115}}</li>
            <li @click="echartsLineField('oldRechargePeople')" :class="{'active': indexSecondActive.field == 'oldRechargePeople'}">{{i18n_lang.home116}}</li>
          </ul>
          <ul class="echarts-btn-right">
            <li @click="echartsLineType('minute')" :class="{'active': indexSecondActive.type == 'minute'}">{{i18n_lang.home22}}</li>
            <li @click="echartsLineType('hour')" :class="{'active': indexSecondActive.type == 'hour'}">{{i18n_lang.home23}}</li>
            <li @click="echartsLineType('day')" :class="{'active': indexSecondActive.type == 'day'}">{{i18n_lang.home24}}</li>
          </ul>
        </div>
        <!-- <div class="echarts-data-number" v-if="indexSecondActive.field == 'online'">
          <div v-if="indexSecondActive.type != 'day'">{{i18n_lang.home25}}{{indexSecondData.yesterday.total ? indexSecondData.yesterday.total : 0}}</div>
          <div>{{indexSecondActive.type == 'day' ? i18n_lang.home56 : i18n_lang.home26}}{{indexSecondData.today.total ? indexSecondData.today.total : 0}}</div>
        </div> -->
        <echartsLine :data="indexSecondData" :lineNmuber="indexSecondActive" style="height: 300px;margin-top: 20px;"></echartsLine>
        <div class="line_style" v-if="indexSecondActive.type != 'day'">
          <div>
            <span class="blue_bg"></span>
            <span>{{i18n_lang.home27}}</span>
            <span class="yellow_bg"></span>
            <span>{{i18n_lang.home28}}</span>
            <span class="green_bg"></span>
            <span>{{i18n_lang.home117_v1_2_4_9}}</span>
          </div>
        </div>
      </Card>
      <Card dis-hover class="query_box">
        <p class="title">{{i18n_lang.home29}}</p>
        <div class="table_vessel_parent">
          <div class="table_vessel">
            <DatePicker
              ref="table_date_picker_one"
              class="table_date_picker"
              v-model="third.timeArr"
              type="daterange"
              :options="dateOpt"
              :editable="false"
              placement="bottom-end"
              placeholder
              style="width: 200px"
              clearable
              @on-change="selectThirdTime"
            ></DatePicker>
            <!-- <Table border :columns="operateData" :data="operateList" @on-sort-change="sortThirdTable"></Table> -->
            <div class="table_one_th">
              <div @click.stop="sortThirdTable()">
                {{i18n_lang.home30}}
                <Icon type="md-arrow-dropdown" size="16" style="margin-left: 2px;"></Icon>
              </div><!-- 日期 -->
              <div>{{i18n_lang.home31}}</div><!-- 新注册 -->
              <div>{{i18n_lang.home32}}</div><!-- 活跃用户 -->
              <div>{{i18n_lang.home33}}</div><!-- 总充值 -->
              <div>{{i18n_lang.home65}}</div><!-- 总充值人数 -->
              <div>{{i18n_lang.home66}}</div><!-- 流水杀率 -->
              <div>{{i18n_lang.home67}}</div><!-- 营收杀率 -->
              <div>{{i18n_lang.home68}}</div><!-- 老充人数 -->
              <div>{{i18n_lang.home69}}</div><!-- 老充金额 -->
              <div>{{i18n_lang.home70}}</div><!-- 老用户平均付费 -->
              <div>{{i18n_lang.home58}}</div><!-- 总兑换 -->
              <div>{{i18n_lang.home34}}</div><!-- 总兑差 -->
              <div>{{i18n_lang.home35}}</div><!-- 总打码量 -->
              <div>{{i18n_lang.home36}}</div><!-- 转化率 -->
              <div>ARPPU</div>
              <div>{{i18n_lang.home37}}</div><!-- 次日留存 -->
            </div>
            <div>
              <div class="table_one_tb" v-for="(item, index) in operateList" :key="index">
                <div>{{item.day}}</div>
                <div>{{item.register_new}}</div>
                <div>{{item.game_user_count}}</div>
                <div>{{item.recharge_total}}</div>
                <div>{{item.deposit_user_num}}</div>
                <div>{{item.bet_today_kill_rate ? `${item.bet_today_kill_rate}%` : ''}}</div>
                <div>{{item.revenue_today_kill_rate ? `${item.revenue_today_kill_rate}%` : ''}}</div>
                <div>{{item.old_user_deposit_num}}</div>
                <div>{{item.old_user_deposit_amount}}</div>
                <div>{{item.old_user_deposit_avg}}</div>
                <div>{{item.withdraw_total}}</div>
                <div>{{item.recharge_witchdraw}}</div>
                <div>{{item.dml_total}}</div>
                <div>{{item.inversion_rate ? `${item.inversion_rate}%` : ''}}</div>
                <div>{{item.arppu ? `${item.arppu}` : ''}}</div>
                <div>{{item.next_day_extant ? `${item.next_day_extant}%` : ''}}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card dis-hover class="query_box">
        <p class="title">{{i18n_lang.home38}}</p>
        <div class="table_vessel_parent">
          <div class="table_vessel active">
            <DatePicker
              ref="table_date_picker_two"
              class="table_date_picker"
              v-model="four.timeArr"
              type="daterange"
              :options="dateOpt"
              :editable="false"
              placement="bottom-end"
              placeholder
              style="width: 200px"
              clearable
              @on-change="selectFourTime"
            ></DatePicker>
            <!-- <Table border :columns="theNewData" :data="theNewList" @on-sort-change="sortFourTable"></Table> -->
            <div class="table_one_th table_two_th">
              <div @click="sortFourTable()">
                {{i18n_lang.home30}}
                <Icon type="md-arrow-dropdown" size="16" style="margin-left: 2px;"></Icon>
              </div><!-- 日期 -->
              <div>{{i18n_lang.home39}}</div><!-- 新增注册 -->
              <div>{{i18n_lang.home40}}</div><!-- 首充用户 -->
              <div>{{i18n_lang.home71}}</div><!-- 主渠道新增注册 -->
              <div>{{i18n_lang.home72}}</div><!-- 新充转化率 -->
              <div>{{i18n_lang.home73}}</div><!-- 新充打码量 -->
              <div>{{i18n_lang.home74}}</div><!-- 次日付费留存 -->
              <div>{{i18n_lang.home75}}</div><!-- 次日活跃留存 -->
              <div>{{i18n_lang.home41}}</div>
              <div>{{i18n_lang.home42}}</div>
              <div>{{i18n_lang.home43}}</div>
              <div>{{i18n_lang.home44}}</div>
              <div>{{i18n_lang.home58}}</div>
            </div>
            <div>
              <div class="table_one_tb table_two_tb" v-for="(item, index) in theNewList" :key="index">
                <div>{{item.day}}</div>
                <div>{{item.register_new}}</div>
                <div>{{item.recharge_first_count}}</div>
                <div>{{item.no_agent_user_num}}</div>
                <div>{{item.inversion_rate ? `${item.inversion_rate}%` : ''}}</div>
                <div>{{item.new_deposit_user_dml}}</div>
                <div>{{item.new_deposit_retention ? `${item.new_deposit_retention}%` : ''}}</div>
                <div>{{item.new_deposit_bet_retention ? `${item.new_deposit_bet_retention}%` : ''}}</div>
                <div>{{item.user_agent}}</div>
                <div>{{item.agent_new_user_count}}</div>
                <div>{{item.recharge_first_money}}</div>
                <div>{{item.recharge_first_avg}}</div>
                <div>{{item.new_register_withdraw_amount}}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card dis-hover class="query_box">
        <p class="title">{{i18n_lang.home45}}</p>
        <div class="dynamic_content">
          <div>
            <p class="dynamic_content_title">{{i18n_lang.home52}}</p>
            <p class="dynamic_content_number margin_top">
              <span>{{i18n_lang.home46}}{{left_total.register_total}}</span>
              <span>{{i18n_lang.home47}}{{left_total.yesterday_login_total}}</span>
              <span>{{i18n_lang.home48}}{{left_total.register_yesterday_total}}</span>
            </p>
            <p class="dynamic_content_number">
              <span>{{i18n_lang.home49}}{{ios_channel}}</span>
              <span>{{i18n_lang.home50}}{{android_channel}}</span>
              <span>{{i18n_lang.home51}}{{h5_channel}}</span>
            </p>
            <div class="circle_echart">
              <div>
                <chart-pie style="height: 300px;" :value="pieData" text=""></chart-pie>
              </div>
              <div>
                <ul class="circle_echart_tb">
                  <li @click="fiveTypeFn(1, 'today')" :class="{'active': fiveType.left == 'today'}">{{i18n_lang.home27}}</li>
                  <li @click="fiveTypeFn(1, 'yesterday')" :class="{'active': fiveType.left == 'yesterday'}">{{i18n_lang.home28}}</li>
                </ul>
                <div class="circle_echart_proportion margin_top">
                  <span>
                    <em class="yellow_bg"></em>
                    {{i18n_lang.home49}}{{ios_channel}}<!-- {{`${ios_proportion}%`}} -->
                  </span>
                </div>
                <div class="circle_echart_proportion">
                  <span>
                    <em class="blue_bg"></em>
                    {{i18n_lang.home50}}{{android_channel}}<!-- {{`${android_proportion}%`}} -->
                  </span>
                </div>
                <div class="circle_echart_proportion">
                  <span>
                    <em class="pink_bg"></em>
                    {{i18n_lang.home51}}{{h5_channel}}<!-- {{`${h5_proportion}%`}} -->
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="dynamic_content_title">{{i18n_lang.home53}}</p>
            <p class="dynamic_content_number margin_top"></p>
            <p class="dynamic_content_number"></p>
            <div class="circle_echart">
              <div>
                <chart-bar style="height: 300px;" :value="barData" text=""/><!--  -->
              </div>
              <div>
                <ul class="circle_echart_tb">
                  <li @click="fiveTypeFn(2, 'today')" :class="{'active': fiveType.right == 'today'}">{{i18n_lang.home27}}</li>
                  <li @click="fiveTypeFn(2, 'yesterday')" :class="{'active': fiveType.right == 'yesterday'}">{{i18n_lang.home28}}</li>
                </ul>
                <div class="circle_echart_proportion margin_top">
                  <span>
                    <em class="yellow_bg"></em>
                    {{i18n_lang.home54}}{{`${offline_proportion}`}}
                  </span>
                </div>
                <div class="circle_echart_proportion">
                  <span>
                    <em class="blue_bg"></em>
                    {{i18n_lang.home55}}{{`${online_proportion}`}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <!-- <Modal v-model="visible.state" :title="`首页统计说明`">
        <div slot="footer"></div>
      </Modal> -->
      <div class="state_pop" @click.self="visible.state = false" v-show="visible.state">
        <div class="state_pop_bg">
          <img src="@/assets/images/home_pop_bg.png" alt="">
          <div>
            <div class="state_pop_title">
              {{i18n_lang.home76}}
              <div class="close_icon" @click="visible.state = false">
                <img src="@/assets/images/close_icon.png" alt="">
              </div>
            </div>
            <div class="state_pop_text">
              <div>
                <div>{{i18n_lang.home77}}</div>
                <div>{{i18n_lang.home78}}</div>
                <div>{{i18n_lang.home79}}</div>
                <div>{{i18n_lang.home80}}</div>
                <div>{{i18n_lang.home81}}</div>
                <div>{{i18n_lang.home82}}</div>
                <div>{{i18n_lang.home83}}</div>
                <div>{{i18n_lang.home84}}</div>
                <div>{{i18n_lang.home85}}</div>
                <div>{{i18n_lang.home86}}</div>
                <div>{{i18n_lang.home87}}</div>
                <div>{{i18n_lang.home88}}</div>
              </div>
              <div>
                <div>{{i18n_lang.home89}}</div>
                <div>{{i18n_lang.home90}}</div>
                <div>{{i18n_lang.home91}}</div>
                <div>{{i18n_lang.home92}}</div>
                <div>{{i18n_lang.home93}}</div>
                <div>{{i18n_lang.home94}}</div>
                <div>{{i18n_lang.home95}}</div>
                <div>{{i18n_lang.home96}}</div>
                <div>{{i18n_lang.home97}}</div>
                <div>{{i18n_lang.home98}}</div>
                <div>{{i18n_lang.home99}}</div>
              </div>
              <div>
                <div>{{i18n_lang.home100}}</div>
                <div>{{i18n_lang.home101}}</div>
                <div>{{i18n_lang.home102}}</div>
                <div>{{i18n_lang.home103}}</div>
                <div>{{i18n_lang.home104}}</div>
                <div>{{i18n_lang.home105}}</div>
                <div>{{i18n_lang.home106}}</div>
                <div>{{i18n_lang.home107}}</div>
                <div>{{i18n_lang.home108}}</div>
              </div>
              <div>
                <div>{{i18n_lang.home109}}</div>
                <div>{{i18n_lang.home110}}</div>
                <div>{{i18n_lang.home111}}</div>
                <div>{{i18n_lang.home112}}</div>
                <div>{{i18n_lang.home113}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import echartsLine from './line.vue'
import { ChartPie, ChartBar } from '_c/charts'
import { computeDay } from '@/libs/handleDate'
import { operateData, theNewData } from './columns'
import lotteryDateOption from '@/libs/lotteryDateOption'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      allRoutes: state => state.user.allRoutes
    })
  },
  data() {
    const i18n_lang = this.$t('home');
    return {
      i18n_lang: i18n_lang,
      showHome: true,
      loading: {
        page: false
      },
      visible: {
        state: false
      },
      indexTopData: {},
      indexSecondActive: {
        field: 'online',
        type: 'minute'
      },
      indexSecondData: {
        yesterday: {},
        today: {}
      },
      third: {
        start_date: '',
        end_date: '',
        timeArr: [computeDay(), computeDay()]
      },
      dateOpt: lotteryDateOption,
      operateData: operateData(this),
      operateList: [],
      four: {
        start_date: '',
        end_date: '',
        timeArr: [computeDay(), computeDay()]
      },
      theNewData: theNewData(this),
      theNewList: [],
      fiveType: {
        left: 'today',//'yesterday'
        right: 'today'
      },
      indexFiveData: {},
      left_total: {},
      h5_channel: 0,
      ios_channel: 0,
      android_channel: 0,
      h5_proportion: 0,
      ios_proportion: 0,
      android_proportion: 0,
      online_proportion: 0,
      offline_proportion: 0,
      pieData: [],
      barData: []
    }
  },
  mounted() {
    this.showHome = this.allRoutes.indexOf('370') > -1 ? true : false
    if(this.showHome){
      this.getIndexTop()
      this.getIndexSecond()
      this.getIndexThird()
      this.getIndexfour()
      this.getIndexFive()
    }
  },
  components: {
    echartsLine,
    ChartPie,
    ChartBar
  },
  methods: {
    sortThirdTable(key) {
      this.$refs['table_date_picker_one'].handleFocus()
    },
    sortFourTable(key) {
      this.$refs['table_date_picker_two'].handleFocus()
    },
    // 选择时间
    selectThirdTime(val) {
      [this.third.start_date, this.third.end_date] = val
      this.getIndexThird()
    },
    selectFourTime(val) {
      [this.four.start_date, this.four.end_date] = val
      this.getIndexfour()
    },
    echartsLineField(text){
      this.indexSecondActive.field = text
      this.getIndexSecond()
    },
    echartsLineType(text){
      this.indexSecondActive.type = text
      this.getIndexSecond()
    },
    fiveTypeFn(type, text){
      if(type == 1 && this.fiveType.left == text) return
      if(type == 2 && this.fiveType.right == text) return
      if(type == 1){
        this.fiveType.left = text
      }
      if(type == 2){
        this.fiveType.right = text
      }
      this.getIndexFive()
    },
    async getIndexTop() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/index/top',
        method: 'GET',
        params: {}
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.indexTopData = res.data ? res.data : {}
    },
    async getIndexSecond() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/index/second',
        method: 'GET',
        params: {
          ...this.indexSecondActive
        }
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.indexSecondData = {
        yesterday: {
          list: [],
          total: 0
        },
        today: {
          list: [],
          total: 0
        },
        lastweek: {
          list: [],
          total: 0
        }
      }
      if(this.indexSecondActive.type == 'day'){
        this.indexSecondData = {
          yesterday: {
            list: [],
            total: 0
          },
          today: res.data,
          lastweek: {
            list: [],
            total: 0
          }
        }
      }else{
        this.indexSecondData = res.data
      }
    },
    async getIndexThird() {
      this.loading.page = true
      const req = {
        ...this.third
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: '/index/third',
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      const obj = {
        day: this.i18n_lang.home57,
        register_new: 0,
        game_user_count: 0,
        recharge_total: 0,
        deposit_user_num: 0,
        bet_today_kill_rate: "",
        revenue_today_kill_rate: "",
        old_user_deposit_num: 0,
        old_user_deposit_amount: 0,
        old_user_deposit_avg: '',
        withdraw_total: 0,
        recharge_witchdraw: 0,
        dml_total: 0,
        inversion_rate: '',
        arppu: '',
        next_day_extant: ''
      }
      res.data.forEach((item, index) => {
        obj.register_new += Number(item.register_new)
        obj.game_user_count += Number(item.game_user_count)
        obj.recharge_total += Number(item.recharge_total)
        obj.deposit_user_num += Number(item.deposit_user_num)
        obj.old_user_deposit_num += Number(item.old_user_deposit_num)
        obj.old_user_deposit_amount += Number(item.old_user_deposit_amount)
        // obj.old_user_deposit_avg += Number(item.old_user_deposit_avg)
        obj.withdraw_total += Number(item.withdraw_total)
        obj.recharge_witchdraw += Number(item.recharge_witchdraw)
        obj.dml_total += Number(item.dml_total)
      })
      obj.register_new = obj.register_new
      obj.game_user_count = obj.game_user_count
      obj.recharge_total = obj.recharge_total.toString().split('.')[1] ? obj.recharge_total.toString().split('.')[0] + '.' + obj.recharge_total.toString().split('.')[1].substr(0,2) : obj.recharge_total + '.00'
      obj.deposit_user_num = obj.deposit_user_num
      obj.old_user_deposit_num = obj.old_user_deposit_num
      obj.old_user_deposit_amount = obj.old_user_deposit_amount.toString().split('.')[1] ? obj.old_user_deposit_amount.toString().split('.')[0] + '.' + obj.old_user_deposit_amount.toString().split('.')[1].substr(0,2) : obj.old_user_deposit_amount + '.00'
      // obj.old_user_deposit_avg = obj.old_user_deposit_avg.toString().split('.')[1] ? obj.old_user_deposit_avg.toString().split('.')[0] + '.' + obj.old_user_deposit_avg.toString().split('.')[1].substr(0,2) : obj.old_user_deposit_avg + '.00'
      obj.withdraw_total = obj.withdraw_total.toString().split('.')[1] ? obj.withdraw_total.toString().split('.')[0] + '.' + obj.withdraw_total.toString().split('.')[1].substr(0,2) : obj.withdraw_total + '.00'
      obj.recharge_witchdraw = obj.recharge_witchdraw.toString().split('.')[1] ? obj.recharge_witchdraw.toString().split('.')[0] + '.' + obj.recharge_witchdraw.toString().split('.')[1].substr(0,2) : obj.recharge_witchdraw + '.00'
      obj.dml_total = obj.dml_total.toString().split('.')[1] ? obj.dml_total.toString().split('.')[0] + '.' + obj.dml_total.toString().split('.')[1].substr(0,2) : obj.dml_total + '.00'
      this.operateList = res.data
      this.operateList.push(obj)
    },
    async getIndexfour() {
      this.loading.page = true
      const req = {
        ...this.four
      }
      delete req.timeArr
      const res = await this.$axios.request({
        url: '/index/four',
        method: 'GET',
        params: req
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      const obj = {
        day: this.i18n_lang.home57,
        register_new: 0,
        recharge_first_count: 0,
        no_agent_user_num: 0,
        inversion_rate: "",
        new_deposit_user_dml: 0,
        new_deposit_retention: "",
        new_deposit_bet_retention: "",
        user_agent: 0,
        agent_new_user_count: 0,
        recharge_first_money: 0,
        recharge_first_avg: '',
        new_register_withdraw_amount: 0
      }
      res.data.forEach((item, index) => {
        obj.register_new += Number(item.register_new)
        obj.recharge_first_count += Number(item.recharge_first_count)
        obj.no_agent_user_num += Number(item.no_agent_user_num)
        obj.new_deposit_user_dml += Number(item.new_deposit_user_dml)
        obj.user_agent += Number(item.user_agent)
        obj.agent_new_user_count += Number(item.agent_new_user_count)
        obj.recharge_first_money += Number(item.recharge_first_money)
        // obj.recharge_first_avg += Number(item.recharge_first_avg)
        obj.new_register_withdraw_amount += Number(item.new_register_withdraw_amount)
      })
      obj.register_new = obj.register_new
      obj.recharge_first_count = obj.recharge_first_count.toString().split('.')[1] ? obj.recharge_first_count.toString().split('.')[0] + '.' + obj.recharge_first_count.toString().split('.')[1].substr(0,2) : obj.recharge_first_count + ''
      obj.no_agent_user_num = obj.no_agent_user_num
      obj.new_deposit_user_dml = obj.new_deposit_user_dml.toString().split('.')[1] ? obj.new_deposit_user_dml.toString().split('.')[0] + '.' + obj.new_deposit_user_dml.toString().split('.')[1].substr(0,2) : obj.new_deposit_user_dml + ''
      obj.user_agent = obj.user_agent.toString().split('.')[1] ? obj.user_agent.toString().split('.')[0] + '.' + obj.user_agent.toString().split('.')[1].substr(0,2) : obj.user_agent + ''
      obj.agent_new_user_count = obj.agent_new_user_count.toString().split('.')[1] ? obj.agent_new_user_count.toString().split('.')[0] + '.' + obj.agent_new_user_count.toString().split('.')[1].substr(0,2) : obj.agent_new_user_count + ''
      obj.recharge_first_money = obj.recharge_first_money.toString().split('.')[1] ? obj.recharge_first_money.toString().split('.')[0] + '.' + obj.recharge_first_money.toString().split('.')[1].substr(0,2) : obj.recharge_first_money + '.00'
      // obj.recharge_first_avg = obj.recharge_first_avg.toString().split('.')[1] ? obj.recharge_first_avg.toString().split('.')[0] + '.' + obj.recharge_first_avg.toString().split('.')[1].substr(0,2) : obj.recharge_first_avg + '.00'
      obj.new_register_withdraw_amount = obj.new_register_withdraw_amount.toString().split('.')[1] ? obj.new_register_withdraw_amount.toString().split('.')[0] + '.' + obj.new_register_withdraw_amount.toString().split('.')[1].substr(0,2) : obj.new_register_withdraw_amount + '.00'
      this.theNewList = res.data
      this.theNewList.push(obj)
    },
    async getIndexFive() {
      this.loading.page = true
      const res = await this.$axios.request({
        url: '/index/five',
        method: 'GET',
        params: {}
      })
      this.loading.page = false
      if (res.status !== 200 || res.state === 11050 || res.state === 11051) {
        this.$msg({
          type: 'error',
          message: res.message
        })
        return false
      }
      this.pieData = []
      this.barData = []
      this.left_total = res.data ? res.data.left.total : {},
      this.h5_channel = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 2)[0].num : res.data.left.list.today.filter((i) => +i.platform === 2)[0].num
      this.ios_channel = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 3)[0].num : res.data.left.list.today.filter((i) => +i.platform === 3)[0].num
      this.android_channel = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 4)[0].num : res.data.left.list.today.filter((i) => +i.platform === 4)[0].num
      this.h5_proportion = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 2)[0].parent : res.data.left.list.today.filter((i) => +i.platform === 2)[0].parent
      this.ios_proportion = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 3)[0].parent : res.data.left.list.today.filter((i) => +i.platform === 3)[0].parent
      this.android_proportion = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 4)[0].parent : res.data.left.list.today.filter((i) => +i.platform === 4)[0].parent
      this.online_proportion = this.fiveType.right == 'yesterday' ? res.data.right.list.yesterday.online.money : res.data.right.list.today.online.money
      this.offline_proportion = this.fiveType.right == 'yesterday' ? res.data.right.list.yesterday.offline.money : res.data.right.list.today.offline.money
      let h5_number = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 2)[0].num : res.data.left.list.today.filter((i) => +i.platform === 2)[0].num
      let ios_number = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 3)[0].num : res.data.left.list.today.filter((i) => +i.platform === 3)[0].num
      let android_number = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 4)[0].num : res.data.left.list.today.filter((i) => +i.platform === 4)[0].num
      let h5_parent = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 2)[0].parent : res.data.left.list.today.filter((i) => +i.platform === 2)[0].parent
      let ios_parent = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 3)[0].parent : res.data.left.list.today.filter((i) => +i.platform === 3)[0].parent
      let android_parent = this.fiveType.left == 'yesterday' ? res.data.left.list.yesterday.filter((i) => +i.platform === 4)[0].parent : res.data.left.list.today.filter((i) => +i.platform === 4)[0].parent
      this.pieData.push({
        value: h5_number,
        name: (!h5_parent && !ios_parent && !android_parent) || h5_parent ? h5_parent + '%' : 0,//h5
        itemStyle: {
          color: '#FF0099'
        }
      })
      this.pieData.push({
        value: ios_number,
        name: (!h5_parent && !ios_parent && !android_parent) || ios_parent ? ios_parent + '%' : 0,//ios
        itemStyle: {
          color: '#FF9900'
        }
      })
      this.pieData.push({
        value: android_number,
        name: (!h5_parent && !ios_parent && !android_parent) || android_parent ? android_parent + '%' : 0,//android
        itemStyle: {
          color: '#0066FF'
        }
      })
      let online_money = this.fiveType.right == 'yesterday' ? res.data.right.list.yesterday.online.parent + '%' : res.data.right.list.today.online.parent + '%'
      let offline_money = this.fiveType.right == 'yesterday' ? res.data.right.list.yesterday.offline.parent + '%' : res.data.right.list.today.offline.parent + '%'
      this.barData.push({
        value: this.fiveType.right == 'yesterday' ? res.data.right.list.yesterday.online.money : res.data.right.list.today.online.money,
        name: online_money,//线上充值总额
        itemStyle: {
          color: '#0066FF'
        }
      })
      this.barData.push({
        value: this.fiveType.right == 'yesterday' ? res.data.right.list.yesterday.offline.money : res.data.right.list.today.offline.money,
        name: offline_money,//线下充值总额
        itemStyle: {
          color: '#FF9900'
        }
      })
    }
  }
}
</script>

<style lang="less">
  #HomeManage{
    &.home_bg{
      background-color: #212227;
    }
    .query_box{
      background-color: #212227;
      border: none;
    }
    .title{
      font-size: 18px;
      margin: 20px 0;
      padding-left: 10px;
      // border-left: 3px solid #3080fe;
      color: #FBFBFB;
      &>span{
        display: inline-block;
        padding: 5px 10px;
        background: #FFFFFF;
        color: #262830;
        border-radius: 2px;
        font-size: 16px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .card-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      text-align: center;
      .card {
        margin-right: 20px;
        margin-bottom: 20px;
        padding: 0;
        min-width: 15%;
        background-color: #2C2F38;
        border: none;
        color: #FBFBFB;
        .card_title{
          font-size: 14px;
        }
        .card_number{
          font-size: 22px;
          &:last-child{
            border: none;
          }
        }
        .card_proportion{
          font-size: 12px;
          .red_text{
            color: red;
          }
          .green_text{
            color: green;
          }
        }
      }
    }
    .echarts-btn{
      overflow: hidden;
    }
    .echarts-btn-left{
      display: inline-block;
      overflow: hidden;
      float: left;
      &>li{
        display: inline-block;
        padding: 5px 10px;
        background: #FFFFFF;
        border-radius: 2px;
        font-size: 16px;
        margin-left: 10px;
        float: left;
        cursor: pointer;
        &.active{
          color: #FBFBFB;
          background: #3080fe;
        }
        &:first-child{
          margin-left: 0;
        }
      }
    }
    .echarts-btn-right{
      display: inline-block;
      border-radius: 2px;
      border: 1px solid #3080fe;
      overflow: hidden;
      float: right;
      &>li{
        display: inline-block;
        min-width: 60px;
        padding: 5px 10px;
        font-size: 14px;
        color: #FBFBFB;
        text-align: center;
        float: left;
        cursor: pointer;
        &.active{
          background: #3080fe;
        }
        &:nth-child(2){
          border-left: 1px solid #3080fe;
          border-right: 1px solid #3080fe;
        }
      }
    }
    .echarts-data-number{
      color: #FBFBFB;
      margin-top: 10px;
      overflow: hidden;
      &>div{
        font-size: 16px;
        float: left;
        &:nth-child(2){
          margin-left: 40px;
        }
      }
    }

    .dynamic_content{
      width: 100%;
      overflow: hidden;
      &>div{
        width: 47%;
        background: #2C2F37;
        padding: 20px 30px;
        float: left;
        &:last-child{
          margin-left: 6%;
        }
      }
    }
    .dynamic_content_title{
      color: #FBFBFB;
      font-size: 20px;
      text-align: center;
    }
    .dynamic_content_number{
      color: #FBFBFB;
      min-height: 24px;
      &>span{
        font-size: 16px;
        margin-left: 20px;
        &:first-child{
          margin-left: 0;
        }
      }
      &.margin_top{
        margin-top: 15px;
      }
    }
    .circle_echart{
      overflow: hidden;
      &>div{
        float: left;
        &:first-child{
          width: 60%;
        }
        &:nth-child(2){
          width: 40%;
          text-align: center;
        }
      }
    }
    .circle_echart_tb{
      display: inline-block;
      border: 1px solid #0066FF;
      border-radius: 2px;
      margin-top: 90px;
      overflow: hidden;
      &>li{
        width: 60px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #FBFBFB;
        float: left;
        cursor: pointer;
        &.active{
          background: #0066FF;
        }
      }
    }
    .circle_echart_proportion{
      color: #FBFBFB;
      &>span{
        display: inline-block;
        overflow: hidden;
        &>em{
          width: 10px;
          height: 10px;
          border-radius: 50%;
          float: left;
          margin-top: 4px;
          margin-right: 10px;
          &.pink_bg{
            background: #FF0099;
          }
          &.yellow_bg{
            background: #FF9900;
          }
          &.blue_bg{
            background: #0066FF;
          }
        }
      }
      &.margin_top{
        margin-top: 20px;
      }
    }
    .line_style{
      color: #FBFBFB;
      text-align: center;
      margin-top: 10px;
      &>div{
        display: inline-block;
        overflow: hidden;
        &>span{
          display: inline-block;
          float: left;
          &:nth-child(odd){
            width: 20px;
            height: 10px;
            margin-top: 4px;
            margin-right: 5px;
            &.yellow_bg{
              background: #FF9900;
            }
            &.blue_bg{
              background: #0066FF;
            }
            &.green_bg{
              background: #339966;
            }
          }
          &:nth-child(3), &:nth-child(5){
            margin-left: 20px;
          }
        }
      }
    }
    .table_vessel_parent{
      overflow-x: auto;
    }
    .table_vessel{
      min-width: 2240px;
      position: relative;
      .table_date_picker{
        position: absolute;
        top: 35px;
        left: 320px;
      }
      &.active{
        min-width: 1820px;
      }
    }
    .table_one_th{
      background: #25313C;
      overflow: hidden;
      &>div{
        width: calc(100% / 16);
        min-width: 140px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        color: #FBFBFB;
        border-right: 1px solid #212227;
        float: left;
        &:first-child{
          cursor: pointer;
        }
      }
    }
    .table_one_tb{
      background: #25313C;
      overflow: hidden;
      &>div{
        width: calc(100% / 16);
        min-width: 140px;
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        color: #FBFBFB;
        border-right: 2px solid #25313C;
        border-bottom: 2px solid #25313C;
        float: left;
        &:nth-child(1){
          border: 1px solid #393942;
        }
        &:nth-child(2){
          background: #026DD5;
        }
        &:nth-child(3){
          background: #00B7CA;
        }
        &:nth-child(4){
          background: #E5017A;
        }
        // &:nth-child(5){
        //   background: #008F90;
        // }
        // &:nth-child(6){
        //   background: #F46C00;
        // }
        // &:nth-child(7){
        //   background: #FCA500;
        // }
        // &:nth-child(8){
        //   background: #7AB33F;
        // }
        // &:nth-child(9){
        //   background: #5D36AC;
        // }
        // &:last-child{
        //   background: #0793D5;
        //   border-right: none;
        // }
        &:nth-child(5){
          background: #1AB7C9;
        }
        &:nth-child(6){
          background: #7BB345;
        }
        &:nth-child(7){
          background: #108C8D;
        }
        &:nth-child(8){
          background: #F26A1B;
        }
        &:nth-child(9){
          background: #FAA423;
        }
        &:nth-child(10){
          background: #5D37AA;
        }
        &:nth-child(11){
          background: #008F90;
        }
        &:nth-child(12){
          background: #F46C00;
        }
        &:nth-child(13){
          background: #FCA500;
        }
        &:nth-child(14){
          background: #7AB33F;
        }
        &:nth-child(15){
          background: #5D36AC;
        }
        &:nth-child(16){
          background: #0793D5;
        }
        &:last-child{
          border-right: none;
        }
      }
      &:last-child{
        &>div{
          background: transparent;
          border-right: 1px solid #393942;
        }
      }
    }
    .table_two_th, .table_two_tb{
      &>div{
        width: calc(100% / 13);
        min-width: 140px;
        // &:last-child{
        //   background: #008F90;
        // }
      }
    }
    .table_two_th>div:last-child,.table_two_tb:last-child>div{
      background: #25313C;
    }
    .state_pop{
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // justify-content: center;
      width: 100vw;
      min-height: 100vh;
      background: rgba(0, 0, 0, .8);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 900;
    }
    .state_pop_bg{
      width: 890px;
      min-height: 800px;
      margin: 34px auto 0;
      position: relative;
      // background: #2F1367;
      // background: url(`static/home_pop_bg.png`);
      &>img{
        width: 100%;
        height: auto;
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }
      &>div{
        width: 100%;
        position: relative;
        z-index: 2;
      }
    }
    .state_pop_title{
      font-family: STHeitiSC-Medium;
      font-size: 26px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 700;
      padding: 30px 0 38px;
      position: relative;
    }
    .close_icon{
      padding: 20px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      &>img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
    }
    .state_pop_text{
      width: 740px;
      height: 670px;
      background: #FFFFFF;
      border-radius: 10px;
      font-family: STHeitiSC-Medium;
      font-size: 16px;
      color: #262830;
      line-height: 22px;
      font-weight: 700;
      margin: auto;
      padding: 20px 54px;
      overflow: hidden;
      overflow-y: auto;
      &>div{
        margin-top: 20px;
        &:first-child{
          margin-top: 0;
        }
      }
    }
  }
</style>
