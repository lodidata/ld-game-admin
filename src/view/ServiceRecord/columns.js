import { Button } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('serviceRecord')
  function formMatetime(duration) {
    const time = Number(duration)
    const h = Math.floor(time / 60 / 60)
    const m = Math.floor((time - h * 60 * 60) / 60)
    const s = Math.floor(time % 60)
    if (h) {
      return `${h}${i18n.serviceRecord14}${m}${i18n.serviceRecord15}${s}${i18n.serviceRecord16}`
    }
    if (m) {
      return `${m}${i18n.serviceRecord15}${s}${i18n.serviceRecord16}`
    }
    return `${s}${i18n.serviceRecord16}`
  }
  return [
    {
      title: i18n.serviceRecord2,
      align: 'center',
      key: 'memberNickname',
      minWidth: 70
    },
    {
      title: i18n.serviceRecord3,
      align: 'center',
      key: 'serviceNickname'
    },
    {
      title: i18n.serviceRecord4,
      align: 'center',
      key: 'waitSecond',
      render(h, { row }) {
        return <span>{formMatetime(~row.waitSecond)}</span>
      }
    },
    {
      title: i18n.serviceRecord5,
      align: 'center',
      key: 'chatSecond',
      render(h, { row }) {
        return <span>{formMatetime(row.chatSecond)}</span>
      }
    },
    {
      title: i18n.serviceRecord6,
      align: 'center',
      key: 'sendChatTime'
    },
    {
      title: i18n.serviceRecord7,
      align: 'center',
      key: 'closeChatTime'
    },
    {
      title: i18n.serviceRecord8,
      align: 'center',
      key: 'problemType'
    },
    {
      title: i18n.serviceRecord9,
      align: 'center',
      key: 'closeType'
    },
    {
      title: i18n.serviceRecord10,
      align: 'center',
      key: 'satisfaction'
    },
    {
      title: i18n.serviceRecord11,
      align: 'center',
      key: 'remarks'
    },
    {
      title: i18n.serviceRecord12,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <Button type='primary' size='small' on-click={_ => Vue.openChat(row)}>
            {i18n.serviceRecord13}
          </Button>
        )
      }
    }
  ]
}
