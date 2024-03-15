import { Tag, Button, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('noticeManage')
  return [
    {
      title: i18n.noticeManage51,
      key: 'title',
      minWidth: 150,
      align: 'center',
      myExt: {
        label: 'title',
        require: true
      }
    },
    {
      title: i18n.noticeManage52,
      minWidth: 250,
      align: 'center',
      render(h, { row }) {
        const content = {
          domProps: {
            innerHTML: row.content
          }
        }
        return <div {...content} />
      },
      myExt: {
        label: 'content'
      }
    },
    {
      title: i18n.noticeManage53,
      key: 'popup_type',
      minWidth: 80,
      align: 'center',
      // render(h, { row }) {
      //   return (
      //     <span>
      //       {row.popup_type == 1 ? `${i18n.noticeManage19}` : ''}
      //       {row.popup_type == 2 ? `${i18n.noticeManage20}` : ''}
      //       {row.popup_type == 3 ? `${i18n.noticeManage21}` : ''}
      //       {row.popup_type == 4 ? `${i18n.noticeManage75}` : ''}
      //     </span>
      //   )
      // },
      myExt: {
        label: 'popup_type'
      }
    },
    {
      title: i18n.noticeManage54,
      key: 'recipient',
      minWidth: 200,
      align: 'center',
      myExt: {
        label: 'recipient'
      }
    },
    {
      title: i18n.noticeManage55,
      key: 'admin_name',
      minWidth: 80,
      align: 'center',
      myExt: {
        label: 'admin_name'
      }
    },
    {
      title: i18n.noticeManage56,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status === 0 ? 'default' : 'success'}>
            {row.status === 0 ? i18n.noticeManage57 : i18n.noticeManage58}
          </Tag>
        )
      },
      myExt: {
        label: 'Tag'
      }
    },
    {
      title: i18n.noticeManage59,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.start_time.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'start_time'
      }
    },
    {
      title: i18n.noticeManage60,
      minWidth: 110,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.end_time.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      },
      myExt: {
        label: 'end_time'
      }
    },
    {
      title: `${i18n.noticeManage82}`,//排序
      key: 'sort',
      minWidth: 80,
      align: 'center',
      myExt: {
        label: 'sort'
      }
    },
    {
      title: `${i18n.noticeManage83}`,//修订时间
      key: 'updated',
      minWidth: 80,
      align: 'center',
      myExt: {
        label: 'updated'
      }
    },
    {
      title: i18n.noticeManage61,
      minWidth: 220,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleShowDetail(row)}
            >
              {i18n.noticeManage62}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.noticeManage63}
            </Button>
            <Poptip
              confirm
              title={`${i18n.noticeManage64} ${row.status === 0 ? i18n.noticeManage58 : i18n.noticeManage57} ?`}
              on-on-ok={_ => Vue.handlePublish(row)}
            >
              <Button
                type={row.status === 1 ? 'error' : 'success'}
                size='small'
                style='margin-right:5px'
              >
                {row.status === 0 ? i18n.noticeManage58 : i18n.noticeManage57}
              </Button>
            </Poptip>
            <Poptip confirm title={`${i18n.noticeManage65}`} on-on-ok={_ => Vue.handleDelete(row)}>
              <Button style='margin-right:5px' type='error' size='small'>
                {i18n.noticeManage66}
              </Button>
            </Poptip>
          </div>
        )
      },
      myExt: {
        label: 'handle',
        require: true
      }
    }
  ]
}
