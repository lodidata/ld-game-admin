export default function(Vue) {
  const i18n = Vue.$t('backWaterReport')
  const columns = [
    {
      title: i18n.backWaterReport8,
      align: 'center',
      key: 'plat_subclass_name',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport13,
      align: 'center',
      minWidth: 100,
      key: 'plat_pattern'
    },
    {
      title: i18n.backWaterReport9,
      align: 'center',
      key: 'lottery_lose_earn_money',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport10,
      align: 'center',
      key: 'lottery_bet_money',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport11,
      align: 'center',
      key: 'return_money',
      minWidth: 100
    }
  ]
  return columns
}
