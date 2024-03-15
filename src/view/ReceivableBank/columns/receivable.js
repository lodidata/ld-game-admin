import { Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('receivableBank')
  const formatBankType = v => {
    switch (v) {
      case 1:
        return i18n.receivableBank94
      case 2:
        return i18n.receivableBank95
      case 3:
        return i18n.receivableBank96
      case 4:
        return i18n.receivableBank97
      case 5:
        return i18n.receivableBank98
      default:
        return '-'
    }
  }
  return [
    {
      title: i18n.receivableBank65,
      align: 'center',
      minWidth: 100,
      key: 'bank_name',
      myExt: {
        label: 'bank_name'
      }
    },
    {
      title: i18n.receivableBank66,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'type'
      },
      render(h, { row }) {
        return <span>{formatBankType(row.type)}</span>
      }
    },
    {
      title: i18n.receivableBank67,
      minWidth: 140,
      myExt: {
        label: 'accountname'
      },
      render(h, { row }) {
        return (
          <div style='padding: 10px'>
            <p>
              {i18n.receivableBank68}
              {row.name}
            </p>
            <p>
              {i18n.receivableBank69}
              {row.card}
            </p>
            <p>
              {i18n.receivableBank70}
              {row.address}
            </p>
          </div>
        )
      }
    },
    {
      title: i18n.receivableBank71,
      align: 'center',
      minWidth: 80,
      myExt: {
        label: 'levels'
      },
      key: 'levels'
    },
    {
      title: i18n.receivableBank72,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'limit_once_min'
      },
      render(h, { row }) {
        return <span>{row.limit_once_min === 0 ? i18n.receivableBank73 : row.limit_once_min}</span>
      }
    },
    {
      title: i18n.receivableBank74,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'limit_once_max'
      },
      render(h, { row }) {
        return <span>{row.limit_once_max === 0 ? i18n.receivableBank73 : row.limit_once_max}</span>
      }
    },
    {
      title: i18n.receivableBank75,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'limit_day_max'
      },
      render(h, { row }) {
        return <span>{row.limit_day_max === 0 ? i18n.receivableBank73 : row.limit_day_max}</span>
      }
    },
    {
      title: i18n.receivableBank76,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'limit_max'
      },
      render(h, { row }) {
        return <span>{row.limit_max === 0 ? i18n.receivableBank73 : row.limit_max}</span>
      }
    },
    {
      title: i18n.receivableBank77,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'comment'
      },
      key: 'comment'
    },
    {
      title: i18n.receivableBank78,
      align: 'center',
      minWidth: 100,
      myExt: {
        label: 'created_uname'
      },
      key: 'created_uname'
    },
    {
      title: i18n.receivableBank79,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return (
          <div>
            {row.created.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.receivableBank80,
      align: 'center',
      minWidth: 100,
      render(h, { row }) {
        return row.qrcode ? <img src={row.qrcode} alt='' class='img' /> : <div>{i18n.receivableBank81}</div>
      },
      myExt: {
        label: 'qrcode'
      }
    },
    {
      title: i18n.receivableBank82,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return <span>{row.state === 'enabled' ? i18n.receivableBank83 : i18n.receivableBank84}</span>
      },
      myExt: {
        label: 'state'
      }
    },
    {
      title: i18n.receivableBank85,
      key: 'sort',
      align: 'center',
      minWidth: 50,
      myExt: {
        label: 'sort'
      }
    },
    {
      title: i18n.receivableBank86,
      align: 'center',
      minWidth: 140,
      myExt: {
        label: 'handle'
      },
      render(h, { row }) {
        return (
          <div>
            <Button type='primary' size='small' on-click={_ => Vue.handleOpenModal(row)}>
              {i18n.receivableBank87}
            </Button>
            <Poptip
              confirm
              title={`${i18n.receivableBank88}${row.state === 'enabled' ? i18n.receivableBank84 : i18n.receivableBank83}${i18n.receivableBank89}`}
              on-on-ok={_ => Vue.handleState(row)}
            >
              <Button
                type={row.state === 'enabled' ? 'error' : 'success'}
                size='small'
                style='margin-left:5px'
              >
                {row.state === 'enabled' ? i18n.receivableBank84 : i18n.receivableBank83}
              </Button>
            </Poptip>

            <Poptip
              confirm
              title={`${i18n.receivableBank90}`}
              placement='top-end'
              on-on-ok={_ => Vue.handleDelete(row)}
            >
              <Button type='error' size='small' style='margin-left:5px'>
                {i18n.receivableBank91}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
