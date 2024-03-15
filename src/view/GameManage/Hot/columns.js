import { Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('gameManage')
  return [
    {
      title: i18n.gameManage22,
      align: 'center',
      minWidth: 80,
      render: (h, { row, index }) => <span>{index + 1}</span>
    },
    {
      title: i18n.gameManage23,
      align: 'center',
      minWidth: 80,
      key: 'name'
    },
    {
      title: 'LOGO',
      align: 'center',
      minWidth: 80,
      // key: 'img'
      render: (h, { row }) => {
        return <img src={ row.img } alt="" />
      }
    },
    {
      title: i18n.gameManage26,
      minWidth: 140,
      align: 'center',
      key: 'name',
      render(h, { row, index }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={ _ => Vue.subMenu(row) }
            >
              {`${i18n.gameManage53}`}
            </Button>
            <Button
              type='success'
              size='small'
              style='margin-right:5px'
              on-click={ _ => Vue.handleEditIcon(row) }
            >
              {i18n.gameManage30}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={ _ => Vue.handleEditName(row) }
            >
              {`${i18n.gameManage54}`}
            </Button>
            <Poptip
              confirm
              title={`${i18n.gameManage36}${row.status === 'enabled' ? `${i18n.gameManage57}` : `${i18n.gameManage58}`}${i18n.gameManage33}?`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button
                type={row.status === 'enabled' ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.status === 'enabled' ? `${i18n.gameManage57}` : `${i18n.gameManage58}`}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
