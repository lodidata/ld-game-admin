export const loginList = function(Vue) {
  const i18n = Vue.$t('ipRankingList')
  return [
    {
      title: `${i18n.ipRankingList17}`,//登录IP
      align: 'center',
      minWidth: 100,
      key: 'login_ip'
    },
    {
      title: `${i18n.ipRankingList18}`,//同IP登录人数
      align: 'center',
      minWidth: 100,
      key: 'num',
      sortable: 'custom',
      render(h, { row }) {
        return <span on-click={_ => Vue.handleDetail(row)} style="color: #2d8cf0;cursor: pointer;">{row.num}</span>
      }
    }
  ]
}

export const detailsList = function(Vue) {
  const i18n = Vue.$t('ipRankingList')
  return [
    {
      title: `${i18n.ipRankingList10}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'username',
      render(h, { row }) {
        return <span on-click={_ => Vue.handleUserDetail(row)} style="color: #2d8cf0;cursor: pointer;">{row.username}</span>
      }
    },
    {
      title: `${i18n.ipRankingList11}`,//上级代理
      align: 'center',
      minWidth: 100,
      key: 'agent'
    },
    {
      title: `${i18n.ipRankingList12}`,//会员等级
      align: 'center',
      minWidth: 100,
      key: 'level'
    },
    {
      title: `${i18n.ipRankingList13}`,//会员余额
      align: 'center',
      minWidth: 100,
      key: 'balance',
      render(h, { row }) {
        return <span>{Number(row.balance)}</span>
      }
    },
    {
      title: `${i18n.ipRankingList14}`,//账号状态
      align: 'center',
      minWidth: 100,
      key: 'state',
      render(h, { row }) {
        return <span>{row.state == 1 ? `${i18n.ipRankingList15}` : `${i18n.ipRankingList16}`}</span>
      }
    }
  ]
}
