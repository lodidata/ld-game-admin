import { Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('thirdPayment')
  return [
    {
      title: `${i18n.thirdPayment66}`,
      align: 'center',
      key: 'name',
      minWidth: 70
    },
    // {
    //   title: `代付代码`,
    //   align: 'center',
    //   key: 'code',
    //   minWidth: 70
    // }
    {
      title: `${i18n.thirdPayment70}`,
      align: 'center',
      key: 'partner_id',
      minWidth: 100,
    },
    {
      title: `${i18n.thirdPayment71}`,
      align: 'center',
      key: 'balance',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.balance}</span>
      }
    },
    {
      title: `${i18n.thirdPayment46}`,
      align: 'center',
      key: 'sort',
      minWidth: 100,
      render(h, { row }) {
        return <span>{row.sort}</span>
      }
    },
    {
      title: `${i18n.thirdPayment47}`,
      align: 'center',
      render(h, { row }) {
        return (
          <span class={row.status === 0 ? 'red' : 'success'}>
            {row.status === 0 ? `${i18n.thirdPayment48}` : `${i18n.thirdPayment49}`}
          </span>
        )
      }
    },
    {
      title: `${i18n.thirdPayment50}`,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
      return (
        <div>
        <Button
          type='primary'
          size='small'
          on-click={_ => Vue.handleEdit(row)}
        >
          {`${i18n.thirdPayment54}`}
        </Button>
        </div>
      )
    }
    }
  ]
}
// export default function(Vue) {
//   const i18n = Vue.$t('thirdPayment')
//   return [
//     {
//       title: i18n.thirdPayment35,
//       align: 'center',
//       key: 'name',
//       minWidth: 70
//     },
//     {
//       title: i18n.thirdPayment36,
//       align: 'center',
//       key: 'partner_id'
//     },
//     {
//       title: i18n.thirdPayment37,
//       align: 'center',
//       key: 'type'
//     },
//     {
//       title: i18n.thirdPayment38,
//       align: 'center',
//       key: 'channel'
//     },
//     {
//       title: i18n.thirdPayment39,
//       align: 'center',
//       render(h, { row }) {
//         return <span>{row.min_money === 0 ? i18n.thirdPayment40 : row.min_money / 100}</span>
//       }
//     },
//     {
//       title: i18n.thirdPayment41,
//       align: 'center',
//       render(h, { row }) {
//         return <span>{row.max_money === 0 ? i18n.thirdPayment40 : row.max_money / 100}</span>
//       }
//     },
//     {
//       title: i18n.thirdPayment42,
//       align: 'center',
//       render(h, { row }) {
//         return <span>{row.money_stop === 0 ? i18n.thirdPayment40 : row.money_stop / 100}</span>
//       }
//     },
//     {
//       title: i18n.thirdPayment43,
//       align: 'center',
//       render(h, { row }) {
//         return <span>{row.money_day_stop === 0 ? i18n.thirdPayment40 : row.money_day_stop / 100}</span>
//       }
//     },
//     {
//       title: i18n.thirdPayment44,
//       align: 'center',
//       key: 'comment'
//     },
//     {
//       title: i18n.thirdPayment45,
//       align: 'center',
//       render(h, { row }) {
//         return (
//           <div>{row.created ? row.created.split(' ').map((x, i) => <p key={i}>{x}</p>) : '-'}</div>
//         )
//       }
//     },
//     {
//       title: i18n.thirdPayment46,
//       align: 'center',
//       key: 'sort'
//     },
//     {
//       title: i18n.thirdPayment47,
//       align: 'center',
//       render(h, { row }) {
//         return (
//           <span class={row.status === 'disabled' ? 'red' : 'success'}>
//             {row.status === 'disabled' ? i18n.thirdPayment48 : i18n.thirdPayment49}
//           </span>
//         )
//       }
//     },
//     {
//       title: i18n.thirdPayment50,
//       align: 'center',
//       minWidth: 80,
//       render(h, { row }) {
//         return (
//           <div>
//             <Poptip
//               confirm
//               title={`${i18n.thirdPayment51}${row.status === 'disabled' ? i18n.thirdPayment49 : i18n.thirdPayment48}${row.name}${i18n.thirdPayment52}`}
//               on-on-ok={_ => Vue.handleStatus(row)}
//             >
//               <Button type='primary' size='small'>
//                 {row.status === 'disabled' ? i18n.thirdPayment49 : i18n.thirdPayment48}
//               </Button>
//             </Poptip>

//             <Button
//               type='primary'
//               size='small'
//               style='margin-left:5px'
//               on-click={_ => Vue.handleGo(row)}
//             >
//               {i18n.thirdPayment53}
//             </Button>
//             <Button
//               type='primary'
//               size='small'
//               style='margin-left:5px'
//               on-click={_ => Vue.handleEdit(row)}
//             >
//               {i18n.thirdPayment54}
//             </Button>
//           </div>
//         )
//       }
//     }
//   ]
// }
// <Button
//               type='primary'
//               size='small'
//               style='margin-left:5px;margin-top:5px'
//               on-click={_ => Vue.handleEdit(row, 'payurl')}
//             >
//               {i18n.thirdPayment61}
//             </Button>
//             <Button
//               type='primary'
//               size='small'
//               style='margin-left:5px;margin-top:5px'
//               on-click={_ => Vue.handleEdit(row, 'ip')}
//             >
//               {i18n.thirdPayment62}
//             </Button>
