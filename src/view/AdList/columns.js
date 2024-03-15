// import { formatUseIn } from './format'
import { Button, Tag, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('adList')
  return [
    {
      title: i18n.adList31,
      align: 'center',
      minWidth: 150,
     type:"index"
    },
    // {
    //   title: '使用于',
    //   align: 'center',
    //   minWidth: 80,
    //   render(h, { row }) {
    //     return <span>{formatUseIn(row.position)}</span>
    //   }
    // },
    {
      title: i18n.adList32,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <img src={row.picture} class='thumb' />
      }
    },
    {
      title: i18n.adList33,
      align: 'center',
      minWidth: 80,
      key: 'sort'
    },
    {
      title: i18n.adList34,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.link_type_text}</span>
      }
    },
    {
      title: i18n.adList37,
      align: 'center',
      minWidth: 150,
      render(h, { row }) {
        return <span>{row.link_type === 1 || row.link_type === 3 ? row.link : row.link_name}</span>
      }
    },
    {
      title: i18n.adList38,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status === 'disabled' ? 'default' : 'success'}>
            {row.status === 'disabled' ? i18n.adList39 : i18n.adList40}
          </Tag>
        )
      }
    },
    {
      title: i18n.adList41,
      minWidth: 100,
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
      title: i18n.adList42,
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.adList43}
            </Button>
            <Poptip
              confirm
              title={`${i18n.adList44}${row.status === 'enabled' ? i18n.adList39 : i18n.adList40} ${row.name} ?`}
              on-on-ok={_ => Vue.handleStop(row)}
            >
              <Button
                type={row.status === 'enabled' ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.status === 'enabled' ? i18n.adList39 : i18n.adList40}
              </Button>
            </Poptip>
            <Poptip confirm title={`${i18n.adList45} ${row.name} ?`} on-on-ok={_ => Vue.deleteAd(row)}>
              <Button type='error' size='small' style='margin-right:5px'>
                {i18n.adList46}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
