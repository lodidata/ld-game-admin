export default function(Vue) {
  const i18n = Vue.$t('dataVerification')
  return [
    {
      title: `${i18n.dataVerification36}`,//申请时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.dataVerification37}`,//发起人
      align: 'center',
      minWidth: 100,
      key: 'created_id'
    },
    {
      title: `${i18n.dataVerification57}`,//用户名
      align: 'center',
      minWidth: 100,
      key: 'account'
    },
    {
      title: `${i18n.dataVerification38}`,//发起内容
      align: 'center',
      minWidth: 100,
      key: 'update_content'
    },
    {
      title: `${i18n.dataVerification39}`,//发起备注
      align: 'center',
      minWidth: 100,
      key: 'remarks'
    },
    {
      title: `${i18n.dataVerification73}`,//上传截图
      align: 'center',
      minWidth: 100,
      key: 'image',
      render: (h, { row }) => {
        return row.image.length ? <span style="color: #2d8cf0;cursor: pointer;" on-click={_ => Vue.handleView(row)}>{`${i18n.dataVerification74}`}</span> : ''
      }
    },
    {
      title: `${i18n.dataVerification40}`,//审核状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render: (h, { row }) => {
        return (
          <span>{row.status == 0 ? `${i18n.dataVerification41}` : ``}{row.status == 1 ? `${i18n.dataVerification42}` : ``}{row.status == 2 ? `${i18n.dataVerification43}` : ``}</span>
        )
      }
    },
    {
      title: `${i18n.dataVerification59}`,//被修改的会员账号
      align: 'center',
      minWidth: 100,
      key: 'account'
    },
    {
      title: `${i18n.dataVerification44}`,//操作者备注
      align: 'center',
      minWidth: 100,
      key: 'rejection_reason'
    },
    {
      title: `${i18n.dataVerification45}`,//操作时间
      align: 'center',
      minWidth: 100,
      key: 'updated'
    },
    {
      title: `${i18n.dataVerification46}`,//操作者
      align: 'center',
      minWidth: 100,
      key: 'operator_id'
    },
    {
      title: `${i18n.dataVerification47}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        row.status == 0 ? h(
          'Poptip',
          {
            props: {
              confirm: '',
              title: `${i18n.dataVerification48}`
            },
            on: {
              'on-ok': () => {
                Vue.handlePass(row)
              }
            }
          },
          [
            h(
              'Button',
              {
                attrs: { style: '' },
                props: {
                  type: 'success',
                  size: 'small'
                }
              },
              `${i18n.dataVerification49}`
            )
          ]
        ) : '',
        h(
          'Button',
          {
            attrs: { style: row.status == 0 ? 'margin-left:5px' : '' },
            props: {
              type: 'primary',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleDetails(row)
              }
            }
          },
          `${i18n.dataVerification50}`
        ),
        row.status == 0 ? h(
          'Button',
          {
            attrs: { style: 'margin-left:5px' },
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleRefuse(row)
              }
            }
          },
          `${i18n.dataVerification51}`
        ) : ''
      ]
    }
  ]
}
