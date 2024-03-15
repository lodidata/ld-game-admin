<template>
  <div>
    <Tabs v-model="curTab">
      <TabPane :label="`${i18n_lang.profitStatement52}`" name="daily">
        <DailySettlement v-if="curTab === 'daily'"></DailySettlement>
      </TabPane>
      <TabPane :label="`${i18n_lang.profitStatement53}`" name="week">
        <WeekSettlement v-if="curTab === 'week'"></WeekSettlement>
      </TabPane>
      <TabPane :label="`${i18n_lang.profitStatement54}`" name="monthly">
        <MonthlyStatement v-if="curTab === 'monthly'"></MonthlyStatement>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import DailySettlement from './DailySettlement'
  import WeekSettlement from './WeekSettlement'
  import MonthlyStatement from './MonthlyStatement'
  export default {
    components: {
      DailySettlement,
      WeekSettlement,
      MonthlyStatement
    },
    data() {
      const i18n_lang = this.$t('profitStatement');
      return {
        i18n_lang: i18n_lang,
        loading: {
          page: false
        },
        curTab: 'daily'
      }
    }
  }
</script>

<style lang="less" scoped></style>
