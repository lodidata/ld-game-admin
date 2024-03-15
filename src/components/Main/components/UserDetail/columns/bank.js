import { Tag } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('components')
  return [
    {
      title: i18n.components178,
      align: 'center',
      key: 'card',
      minWidth: 80
    },
    {
      title: i18n.components179,
      align: 'center',
      key: 'shortname'
    },
    {
      title: i18n.components180,
      align: 'center',
      key: 'address'
    },
    {
      title: i18n.components181,
      align: 'center',
      key: 'accountname'
    },
    {
      title: i18n.components182,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.state === 'disabled' ? 'error' : 'success'}>
            {row.state === 'disabled' ? i18n.components183 : i18n.components184}
          </Tag>
        )
      }
    },
    {
      title: i18n.components185,
      align: 'center',
      key: 'created_time',
      width: 160
    },
    {
      title: i18n.components186,
      align: 'center',
      key: 'updated_time',
      width: 160
    },
    {
      title: i18n.components187,
      align: 'center',
      width: 200,
      render: (h, { row }) => [
        h(
          'Button',
          {
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleOpenModal(row)
              }
            }
          },
          i18n.components188,
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${row.state === 'enabled' ? i18n.components183 : i18n.components184} ${i18n.components189} ${row.card} ?`
            },
            on: {
              'on-ok': () => {
                Vue.changeState(row)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: row.state === 'enabled' ? 'error' : 'success',
                  size: 'small'
                }
              },
              row.state === 'enabled' ? i18n.components183 : i18n.components184
            )
          ]
        ),
        h(
          'Poptip',
          {
            props: {
              confirm: '',
              width: 200,
              title: `${i18n.components190} ${row.card} ${i18n.components191}`,
              wordWrap: true,
              placement: 'top-end'
            },
            on: {
              'on-ok': () => {
                Vue.delBankById(row.id)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: 'margin-left:5px' },
                props: {
                  type: 'error',
                  size: 'small'
                }
              },
              i18n.components192
            )
          ]
        )
      ]
    }
  ]
}
