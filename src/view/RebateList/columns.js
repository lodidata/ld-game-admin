export default function(Vue) {
  const i18n = Vue.$t('rebateList')
  return [
    {
      title: `${i18n.rebateList3}`,
      align: 'center',
      minWidth: 100,
      key: 'agent_name'
    },
    {
      title: `${i18n.rebateList4}`,
      align: 'center',
      minWidth: 100,
      key: 'date'
    },
    {
      title: `${i18n.rebateList5}`,
      align: 'center',
      minWidth: 130,
      key: 'bkge_time'
    },
    {
      title: `${i18n.rebateList6}`,
      align: 'center',
      minWidth: 100,
      key: 'winloss'
    },
    {
      title: `${i18n.rebateList7}%`,
      align: 'center',
      minWidth: 100,
      key: 'winloss_fee_ratio'
    },
    {
      title: `${i18n.rebateList8}`,
      align: 'center',
      minWidth: 100,
      key: 'active_amount'
    },
    {
      title: `${i18n.rebateList9}`,
      align: 'center',
      minWidth: 100,
      key: 'deposit_amount'
    },
    {
      title: `${i18n.rebateList10}`,
      align: 'center',
      minWidth: 100,
      key: 'withdraw_amount'
    },
    {
      title: `${i18n.rebateList11}%`,
      align: 'center',
      minWidth: 100,
      key: 'deposit_withdraw_fee_ratio'
    },
    {
      title: `${i18n.rebateList12}`,
      align: 'center',
      minWidth: 100,
      key: 'valid_user_num'
    },
    {
      title: `${i18n.rebateList13}%`,
      align: 'center',
      minWidth: 100,
      key: 'bkge_ratio'
    },
    {
      title: `${i18n.rebateList14}`,
      align: 'center',
      minWidth: 100,
      key: 'bkge'
    }
  ]
}
