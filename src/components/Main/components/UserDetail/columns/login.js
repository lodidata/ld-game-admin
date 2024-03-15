export const loginList = function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: i18n.components203,
      align: 'center',
      key: 'created'
    },
    {
      title: i18n.components204,
      align: 'center',
      key: 'platform',
      render(h, { row }) {
        const platform = ['PC', 'H5', 'iOS', 'Android'][Number(row.platform) - 1]
        return <span>{platform}</span>
      }
    },
    {
      title: i18n.components205,
      align: 'center',
      key: 'log_ip',
      render(h, { row }) {
        return <span>{`${row.log_ip}${row.times ? '/' + row.times + '次' : ''}`}</span>
      }
    },
    {
      title: `${i18n.components287}`,//同IP会员登录人数
      align: 'center',
      minWidth: 100,
      key: 'user_num',
      render(h, { row }) {
        return <span on-click={_ => Vue.handleDetail(row)} style="color: #2d8cf0;cursor: pointer;">{row.user_num}</span>
      }
    }
  ]
}

export const detailsList = function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: `${i18n.components280}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'username'
    },
    {
      title: `${i18n.components281}`,//上级代理
      align: 'center',
      minWidth: 100,
      key: 'agent'
    },
    {
      title: `${i18n.components282}`,//会员等级
      align: 'center',
      minWidth: 100,
      key: 'level'
    },
    {
      title: `${i18n.components283}`,//会员余额
      align: 'center',
      minWidth: 100,
      key: 'balance',
      render(h, { row }) {
        return <span>{Number(row.balance)}</span>
      }
    },
    {
      title: `${i18n.components284}`,//账号状态
      align: 'center',
      minWidth: 100,
      key: 'state',
      render(h, { row }) {
        return <span>{row.state == 1 ? `${i18n.components285}` : `${i18n.components286}`}</span>
      }
    }
  ]
}
