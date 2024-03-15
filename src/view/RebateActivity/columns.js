import { Button, Poptip, Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('rebateActivity')
  return [
    {
      title: i18n.rebateActivity34,
      align: 'center',
      minWidth: 150,
      key: 'name'
    },
    {
      title: i18n.rebateActivity35,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.created}</span>
      }
    },
    // {
    //   title: i18n.rebateActivity36,
    //   align: 'center',
    //   minWidth: 250,
    //   render(h, { row }) {
    //     return (
    //       <span>
    //         {row.stime}-{row.etime}
    //       </span>
    //     )
    //   }
    // },
    // {
    //   title: i18n.rebateActivity37,
    //   align: 'center',
    //   minWidth: 100,
    //   key: 'games'
    // },
    {
      title: i18n.rebateActivity38,
      align: 'center',
      minWidth: 110,
      render(h, { row }) {
        return (
          <Tag color={row.status === 'disabled' ? 'default' : 'success'} type='dot'>
            {row.status === 'disabled' ? i18n.rebateActivity39 : i18n.rebateActivity40}
          </Tag>
        )
      }
    },
    {
      title: i18n.rebateActivity41,
      minWidth: 180,
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
              {i18n.rebateActivity42}
            </Button>
          </div>
        )
      }
    }
  ]
}
// <Button
//               type={row.status === 'enabled' ? 'error' : 'success'}
//               size='small'
//               style='margin-right:5px'
//               on-click={_ => Vue.handleStatus(row)}
//             >
//               {row.status === 'enabled' ? i18n.rebateActivity39 : i18n.rebateActivity40}
//             </Button>
// <Poptip confirm title={`${i18n.rebateActivity43}`} on-on-ok={_ => Vue.del(row)}>
//               <Button type='error' size='small' style='margin-right:5px'>
//                 {i18n.rebateActivity44}
//               </Button>
//             </Poptip>
