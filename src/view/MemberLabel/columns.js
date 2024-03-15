import { Button, Poptip } from 'iview'

// const dontEditLabel = ['测试', '公司直属', '试玩', '会员', '出款风控']

export default function(Vue) {
  const i18n = Vue.$t('memberLabel')
  const dontEditLabel = [i18n.memberLabel17, i18n.memberLabel18, i18n.memberLabel19, i18n.memberLabel20, i18n.memberLabel21]
  const isDontEdit = title => {
    return ~dontEditLabel.indexOf(title)
  }
  return [
    {
      title: i18n.memberLabel8,
      key: 'title',
      align: 'center'
    },
    {
      title: i18n.memberLabel9,
      align: 'center',
      key: 'content'
    },
    {
      title: i18n.memberLabel10,
      align: 'center',
      key: 'sum'
    },
    {
      title: i18n.memberLabel11,
      align: 'center',
      key: 'create_name'
    },
    {
      title: i18n.memberLabel12,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {row.inserted.split(' ').map((x, i) => (
              <p key={i}>{x}</p>
            ))}
          </div>
        )
      }
    },
    {
      title: i18n.memberLabel13,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            {isDontEdit(row.title) ? (
              '-'
            ) : (
              <div>
                <Button type='primary' size='small' on-click={_ => Vue.handleEdit(row)}>
                  {i18n.memberLabel14}
                </Button>
                <Poptip
                  confirm
                  title={`${i18n.memberLabel15} ${row.title} ?`}
                  on-on-ok={_ => Vue.handleDelete(row)}
                >
                  <Button type='error' size='small' style='margin-left:5px'>
                    {i18n.memberLabel16}
                  </Button>
                </Poptip>
              </div>
            )}
          </div>
        )
      }
    }
  ]
}
