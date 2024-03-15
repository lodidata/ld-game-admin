export default function(Vue) {
  const i18n = Vue.$t('memberLog')
  return [
    {
      title: i18n.memberLog24,
      align: 'center',
      key: 'id'
    },
    {
      title: i18n.memberLog25,
      align: 'center',
      render: (h, { row }) => {
        return (
          <span class={row.tags === 4 || row.tags === 7 || row.tags === i18n.memberLog26 ? 'red' : 'user_link'} on-click={_ => Vue.handleUserDetail(row)}>
            {row.name}
          </span>
        )
      }
    },
    {
      title: 'ip',
      align: 'center',
      key: 'log_ip'
    },
    {
      title: i18n.memberLog27,
      align: 'center',
      key: 'domain'
    },
    {
      title: i18n.memberLog28,
      align: 'center',
      key: 'log_type_text'
    },
    {
      title: i18n.memberLog29,
      align: 'center',
      render(h, { row }) {
        return <span>{row.status === 1 ? i18n.memberLog30 : i18n.memberLog31 }</span>
      }
    },
    {
      title: i18n.memberLog32,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.memberLog33,
      align: 'center',
      key: 'log_value'
    },
    {
      title: i18n.memberLog36,
      align: 'center',
      key: 'platform',
      render(h, { row }) {
        return <span>{row.platform == 1 ? 'PC' : ''}{row.platform == 2 ? 'H5' : ''}{row.platform == 3 ? 'ios' : ''}{row.platform == 4 ? 'android' : ''}</span>
      }
    }
  ]
}
