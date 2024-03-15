import { Button, Tag, Poptip } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('noticeManage')
  return [
    {
      title: i18n.noticeManage51,
      key: 'title',
      minWidth: 150,
      align: 'center',
      myExt: {
        label: 'title'
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
      title: i18n.noticeManage67,
      minWidth: 100,
      align: 'center',
      render(h, { row }) {
        return <span>{Vue.lotteryList.filter(x => x.id === row.lottery_id)[0].name}</span>
      },
      key: 'lottery_id',
      myExt: {
        label: 'lottery_id'
      }
    },
    {
      title: i18n.noticeManage68,
      minWidth: 100,
      key: 'hall_name',
      align: 'center',
      myExt: {
        label: 'hall_name'
      }
    },
    {
      title: i18n.noticeManage69,
      minWidth: 60,
      align: 'center',
      key: 'sleep_time',
      myExt: {
        label: 'sleep_time'
      }
    },
    {
      title: i18n.noticeManage70,
      minWidth: 80,
      align: 'center',
      key: 'username',
      myExt: {
        label: 'username'
      }
    },
    {
      title: i18n.noticeManage71,
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
      },
      myExt: {
        label: 'created'
      }
    },
    {
      title: i18n.noticeManage72,
      minWidth: 100,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status !== 'enable' ? 'default' : 'success'}>
            {row.status === 'enable' ? i18n.noticeManage58 : i18n.noticeManage57}
          </Tag>
        )
      },
      myExt: {
        label: 'status'
      }
    },
    {
      title: i18n.noticeManage61,
      minWidth: 140,
      align: 'center',
      myExt: {
        label: 'handle'
      },
      render(h, { row }) {
        return (
          <div>
            <Button type='primary' size='small' on-click={_ => Vue.handleOpenModal(row)}>
              {i18n.noticeManage63}
            </Button>
            <Poptip
              confirm
              title={`${i18n.noticeManage64} ${row.status === 'enable' ? i18n.noticeManage57 : i18n.noticeManage58} ?`}
              on-on-ok={_ => Vue.handleStop(row, 'stop')}
            >
              <Button
                type={row.status === 'enable' ? 'error' : 'success'}
                size='small'
                style='margin-left:5px'
              >
                {row.status === 'enable' ? i18n.noticeManage57 : i18n.noticeManage58}
              </Button>
            </Poptip>

            <Poptip confirm title='`${i18n.noticeManage65}`' on-on-ok={_ => Vue.handleStop(row, 'delete')}>
              <Button type='error' size='small' style='margin-left:5px'>
                {i18n.noticeManage66}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
