import { Tag, Button, Poptip } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('VideoManagement')
  return [
    {
      title: `${i18n.VideoManagement13}`,
      key: 'title',
      minWidth: 120,
      align: 'center',
    },
    {
      title: `${i18n.VideoManagement14}`,
      key: 'location',
      minWidth: 120,
      align: 'center',
    },
    {
      title: `${i18n.VideoManagement15}`,
      key: 'link',
      minWidth: 120,
      align: 'center',
    },
    {
      title: `${i18n.VideoManagement16}`,
      key: 'status',
      minWidth: 120,
      align: 'center',
      render(h, { row }) {
        return (
          <Tag type='dot' color={row.status === 1 ? 'success' : 'default'}>
            {row.status === 1 ? `${i18n.VideoManagement17}` : `${i18n.VideoManagement18}`}
          </Tag>
        )
      }
    },
    {
      title: i18n.CommunityBBS16,
      minWidth: 150,
      align: 'center',
      render(h, { row }) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.previewVideo(row)}
            >
              {`${i18n.VideoManagement19}`}
            </Button>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.operationVideo(row)}
            >
              {`${i18n.VideoManagement20}`}
            </Button>
            <Poptip
              confirm
              title={`${i18n.VideoManagement21}`}
              on-on-ok={_ => Vue.deleteVideo(row)}
            >
              <Button
              type="error"
              size='small'
              >
                {`${i18n.VideoManagement22}`}
              </Button>
            </Poptip>
          </div>
        )
      }
    }
  ]
}
