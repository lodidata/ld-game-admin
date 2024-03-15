export default function(Vue) {
  const i18n = Vue.$t('memberManage')
  return [
    {
      title: i18n.memberManage62,
      align: 'center',
      minWidth: 100,
      key: 'user_name',
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.memberManage63 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.user_name}
          </span>
        )
      }
    },
    {
      title: i18n.memberManage83,
      align: 'center',
      minWidth: 100,
      key: 'old_agent'
    },
    {
      title: i18n.memberManage84,
      align: 'center',
      minWidth: 100,
      key: 'new_agent'
    },
    {
      title: i18n.memberManage85,
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: i18n.memberManage86,
      align: 'center',
      minWidth: 100,
      key: 'admin_user'
    }
  ]
}
