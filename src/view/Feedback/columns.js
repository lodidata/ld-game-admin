export default function(Vue) {
  const i18n = Vue.$t('feedback')
  return [
    {
      title: `${i18n.feedback1}`,//会员账号
      align: 'center',
      minWidth: 100,
      key: 'user_name'
    },
    {
      title: `${i18n.feedback2}`,//手机号
      align: 'center',
      minWidth: 100,
      key: 'mobile'
    },
    {
      title: `${i18n.feedback3}`,//反馈类型
      align: 'center',
      minWidth: 100,
      key: 'type',
      render: (h, { row }) => {
        return <span>
        { row.type == '1' ? `${i18n.feedback15}` : ''}
        { row.type == '2' ? `${i18n.feedback16}` : ''}
        { row.type == '3' ? `${i18n.feedback17}` : ''}
        { row.type == '4' ? `${i18n.feedback18}` : ''}</span>
      }
    },
    {
      title: `${i18n.feedback12}`,//问题描述
      align: 'center',
      minWidth: 100,
      key: 'question'
    },
    {
      title: `${i18n.feedback22}`,//上传截图
      align: 'center',
      minWidth: 100,
      key: 'img',
      render: (h, { row }) => {
        return row.img ? <span style="color: #2d8cf0;cursor: pointer;" on-click={_ => Vue.handleView(row)}>{i18n.feedback32}</span> : ''
      }
    },
    {
      title: `${i18n.feedback23}`,//反馈时间
      align: 'center',
      minWidth: 100,
      key: 'created'
    },
    {
      title: `${i18n.feedback24}`,//反馈端
      align: 'center',
      minWidth: 100,
      key: 'origin'
    },
    {
      title: `${i18n.feedback5}`,//处理状态
      align: 'center',
      minWidth: 100,
      key: 'status',
      render: (h, { row }) => {
        return <span>{ row.status == '1' ? `${i18n.feedback20}` : `${i18n.feedback19}`}</span>
      }
    },
    {
      title: `${i18n.feedback13}`,//回复内容
      align: 'center',
      minWidth: 100,
      key: 'reply'
    },
    {
      title: `${i18n.feedback25}`,//回复时间
      align: 'center',
      minWidth: 100,
      key: 'reply_time'
    },
    {
      title: `${i18n.feedback26}`,//操作者
      align: 'center',
      minWidth: 100,
      key: 'admin_user'
    },
    {
      title: `${i18n.feedback27}`,//操作
      align: 'center',
      minWidth: 200,
      render: (h, { row }) => [
        // h(
        //   'Button',
        //   {
        //     attrs: { style: '' },
        //     props: {
        //       type: 'success',
        //       size: 'small'
        //     },
        //     on: {
        //       click: () => {
        //         Vue.handle(row)
        //       }
        //     }
        //   },
        //   `${i18n.feedback28}`
        // ),
         h(
          'Button',
          {
            attrs: { style: 'margin-left: 5px' },
            props: {
              type: row.status == '1' ? `primary` : `success`,
              size: 'small'
            },
            on: {
              click: () => {
                Vue.handleBtn(row)
              }
            }
          },
          row.status == '1' ? `${i18n.feedback28}` : `${i18n.feedback29}`
        ),
        // h(
        //   'Poptip',
        //   {
        //     props: {
        //       confirm: '',
        //       title: `${i18n.feedback30}？`
        //     },
        //     on: {
        //       'on-ok': () => {
        //         Vue.handleDelete(row)
        //       }
        //     }
        //   },
        //   [
        //     h(
        //       'Button',
        //       {
        //         attrs: { style: 'margin-left:5px' },
        //         props: {
        //           type: 'error',
        //           size: 'small'
        //         }
        //       },
        //       `${i18n.feedback31}`
        //     )
        //   ]
        // )
      ]
    }
  ]
}
