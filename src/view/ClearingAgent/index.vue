<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="`日结算`" name="daily">
        <DailySettlement v-if="curTab === 'daily'"></DailySettlement>
      </TabPane>
      <TabPane :label="`月结算`" name="monthly">
        <MonthlyStatement v-if="curTab === 'monthly'"></MonthlyStatement>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import DailySettlement from './DailySettlement'
  import MonthlyStatement from './MonthlyStatement'
  export default {
    components: {
      DailySettlement,
      MonthlyStatement
    },
    data() {return {
        loading: {
          page: false
        },
        curTab: 'daily'
      }
    }
  }
</script>

<style lang="less" scoped></style>
