import { Button } from 'iview'

const style = {
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'center'
}

export default function(Vue) {
  const i18n = Vue.$t('loginSecurity')
  return [
    {
      key: 'ip',
      title: i18n.loginSecurity42,
      align: 'center'
    },
    {
      key: 'created',
      title: i18n.loginSecurity43,
      align: 'center'
    },
    {
      key: 'admin_user',
      title: i18n.loginSecurity44,
      align: 'center'
    },
    {
      key: 'mark',
      title: i18n.loginSecurity45,
      align: 'center',
      render: (h, { row, index }) => (
        <span style={{ ...style }} title={row.mark}>
          {row.mark}
        </span>
      )
    },
    {
      key: 'admin',
      title: i18n.loginSecurity46,
      align: 'center',
      render: (h, { row, index }) => (
        <div>
          <Button
            size='small'
            type='primary'
            style='margin-right: 5px'
            on-click={_ => Vue.edit(row, index)}
          >
            {i18n.loginSecurity47}
          </Button>
          <Button
            size='small'
            type='error'
            style='margin-right: 5px'
            on-click={_ => Vue.remove(row, index)}
          >
            {i18n.loginSecurity48}
          </Button>
        </div>
      )
    }
  ]
}
