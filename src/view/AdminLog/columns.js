export default function(Vue) {
  const i18n = Vue.$t('adminLog')
  return [
    {
      title: i18n.adminLog10,
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
      title: i18n.adminLog11,
      align: 'center',
      key: 'ip'
    },
    {
      title: i18n.adminLog12,
      align: 'center',
      render(h, { row }) {
        return row.uname ? <span>{row.uname}</span> : <span>-</span>
      }
    },
    {
      title: i18n.adminLog13,
      align: 'center',
      render(h, { row }) {
        return row.uname2 ? <span>{row.uname2}</span> : <span>-</span>
      }
    },
    {
      title: i18n.adminLog14,
      align: 'center',
      key: 'module'
    },
    {
      title: i18n.adminLog15,
      align: 'center',
      key: 'module_child'
    },
    {
      title: i18n.adminLog16,
      align: 'center',
      key: 'fun_name'
    },
    {
      title: i18n.adminLog17,
      align: 'center',
      key: 'type'
    },

    {
      title: i18n.adminLog18,
      align: 'center',
      render(h, { row }) {
        return <span>{row.status === 1 ? i18n.adminLog19 : i18n.adminLog20}</span>
      }
    },
    {
      title: i18n.adminLog21,
      align: 'center',
      key: 'remark'
    }
  ]
}
