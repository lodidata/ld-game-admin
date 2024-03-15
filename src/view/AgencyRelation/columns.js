import { Button, Poptip } from 'iview'
export const DownloadList = (Vue)=> {
  const i18n = Vue.$t('agencyRelation')
  return [
    {
      title: `${i18n.agencyRelation13}`,//渠道号
      align: 'center',
      minWidth: 80,
      key: 'channel_id',
      render(h, { row }) {
        return <span>{row.channel_id}</span>
      }
    },
    {
      title: `${i18n.agencyRelation14}`,//母包名称
      align: 'center',
      minWidth: 80,
      key: 'name',
      render(h, { row }) {
        return <span>{row.name}</span>
      }
    },
    {
      title: `${i18n.agencyRelation15}`,//分包下载地址
      align: 'center',
      minWidth: 80,
      key: 'download_url',
      render(h, { row }) {
        return <span>{row.download_url}</span>
      }
    },
    {
      title: `${i18n.agencyRelation16}`,
      align: 'center',
      render(h, { row, index }) {
        return (
          <div>
            {row.status === 0 || row.status == 2 ?  <Button
                size='small'
                type='primary'
                style='margin-right:5px'
                loading={ row.loading || row.status == 2 }
                on-click={ _ => Vue.handleProduce(row, index) }
              >
                {`${i18n.agencyRelation17}`}
              </Button> : ''
            }
            <Poptip confirm title={`${i18n.agencyRelation18}？`} on-on-ok={_ => Vue.handleDetele(row)}>
              <Button size='small' type='error'>
                {`${i18n.agencyRelation19}`}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}

export const ChannelList = (Vue)=> {
  const i18n = Vue.$t('agencyRelation')
  return [
    {
      type: 'selection',
      width: 50,
      title: '',
      fixed: 'left',
      align: 'center'
    },
    {
      title: `${i18n.agencyRelation13}`,//渠道号
      align: 'center',
      minWidth: 80,
      key: 'channel_id',
      render(h, { row }) {
        return <span>{row.channel_id}</span>
      }
    },
    {
      title: `${i18n.agencyRelation20}`,//渠道名称
      align: 'center',
      minWidth: 80,
      key: 'name',
      render(h, { row }) {
        return <span>{row.name}</span>
      }
    },
  ]
}
