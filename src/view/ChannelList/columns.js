export default function(Vue) {
  const i18n = Vue.$t('channelList')
  return [
    {
      title: `${i18n.channelList20}`,//渠道号
      align: 'center',
      minWidth: 100,
      key: 'number'
    },
    {
      title: `${i18n.channelList21}`,//渠道名称
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    {
      title: `${i18n.channelList22}`,//渠道地址
      align: 'center',
      minWidth: 100,
      key: 'url',
      render: (h, { row }) => {
        return (
          <span style="color: #2d8cf0;cursor: pointer;" on-click={_ => Vue.handleShowUrl(row)}>
            {`${row.url.split(',')[0]}?channel_id=${row.number}`}
          </span>
        )
      }
    },
    {
      title: `${i18n.channelList23}`,//渠道创建时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.channelList24}`,//最后编辑时间
      align: 'center',
      minWidth: 100,
      key: 'updated'
    },
    {
      title: `${i18n.channelList25}`,//备注
      align: 'center',
      minWidth: 100,
      key: 'remark'
    },
    {
      title: `${i18n.channelList26}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        h(
          'Button',
          {
            attrs: { style: '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handle(row)
              }
            }
          },
          `${i18n.channelList27}`
        )
      ]
    }
  ]
}
