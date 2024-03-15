import { Button, Poptip, Tag } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('serviceSet')
  return [
    {
      title: i18n.serviceSet56,
      align: 'center',
      key: 'sort',
      minWidth: 70
    },
    {
      title: i18n.serviceSet57,
      align: 'center',
      key: 'title'
    },
    {
      title: i18n.serviceSet58,
      align: 'center',
      key: 'createTime'
    },
    {
      title: i18n.serviceSet59,
      align: 'center',
      key: 'channel',
      render(h, { row }) {
        return (
          <Tag color={row.isOpen === 1 ? 'success' : 'default'} type="dot">
            {row.isOpen === 1 ? i18n.serviceSet60 : i18n.serviceSet61}
          </Tag>
        )
      }
    },
    {
      title: i18n.serviceSet62,
      align: 'center',
      minWidth: 80,
      render(h, { row }) {
        return (
          <div>
            <Poptip
              confirm
              title={`${i18n.serviceSet63}${row.isOpen === 1 ? i18n.serviceSet61 : i18n.serviceSet60}${row.title}${i18n.serviceSet64}`}
              on-on-ok={_ => Vue.handleStatus(row)}
            >
              <Button type={row.isOpen === 1 ? 'error' : 'success'} size="small">
                {row.isOpen === 1 ? i18n.serviceSet61 : i18n.serviceSet60}
              </Button>
            </Poptip>

            <Button
              type="primary"
              size="small"
              style="margin-left:5px"
              on-click={_ => Vue.handleEdit(row)}
            >
              {i18n.serviceSet65}
            </Button>
            <Poptip
              style="margin-left:5px"
              confirm
              title={`${i18n.serviceSet66}${row.question_content}${i18n.serviceSet64}`}
              on-on-ok={_ => Vue.handleDel(row)}
            >
              {/* <Button type="primary" size="small">
                删除
              </Button> */}
            </Poptip>
          </div>
        )
      }
    }
  ]
}
