import { Button } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('loginSecurity')
  return [
    {
      title: i18n.loginSecurity32,
      align: 'center',
      render: (h, { row, index }) => <span>{index + 1}</span>
    },
    {
      key: 'username',
      title: i18n.loginSecurity33,
      align: 'center'
    },
    {
      key: 'truename',
      title: i18n.loginSecurity34,
      align: 'center'
    },
    {
      key: 'authorize_time',
      title: i18n.loginSecurity35,
      align: 'center'
    },
    {
      key: 'logintime',
      title: i18n.loginSecurity36,
      align: 'center'
    },
    {
      key: 'loginip',
      title: i18n.loginSecurity37,
      align: 'center'
    },
    {
      key: 'login_rate',
      title: i18n.loginSecurity38,
      align: 'center'
    },
    {
      key: 'admin',
      title: i18n.loginSecurity39,
      align: 'center',
      render: (h, { row, index }) => (
        <div>
          <Button
            size='small'
            type='primary'
            style='margin-right: 5px'
            on-click={_ => Vue.adOpt(row, index)}
          >
            {row.authorize_state === 1 ? i18n.loginSecurity40 : i18n.loginSecurity41}
          </Button>
        </div>
      )
    }
  ]
}
