export default function(Vue) {
  const i18n = Vue.$t('serviceLog')
  return [
    {
      title: i18n.serviceLog4,
      align: 'center',
      key: 'nick_name',
      minWidth: 70
    },
    {
      title: i18n.serviceLog5,
      align: 'center',
      key: 'account',
      minWidth: 70
    },
    {
      title: i18n.serviceLog6,
      align: 'center',
      key: 'talks_num',
      minWidth: 70
    },
    {
      title: i18n.serviceLog7,
      align: 'center',
      key: 'talks_total_times_str',
      minWidth: 70
    },
    {
      title: i18n.serviceLog8,
      align: 'center',
      key: 'login_times_str',
      minWidth: 70
    },
    {
      title: i18n.serviceLog9,
      align: 'center',
      key: 'comment_good',
      minWidth: 70
    },
    {
      title: i18n.serviceLog10,
      align: 'center',
      key: 'comment_ordinary',
      minWidth: 70
    },
    {
      title: i18n.serviceLog11,
      align: 'center',
      key: 'comment_no_good',
      minWidth: 70
    },
    {
      title: i18n.serviceLog12,
      align: 'center',
      key: 'comment_no',
      minWidth: 70
    }
  ]
}
