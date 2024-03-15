import { Button } from 'iview'
export default function(Vue) {
  const i18n = Vue.$t('tripartiteLogo')
  return [
    {
      title: `${i18n.tripartiteLogo7}`,//三方名称
      align: 'center',
      minWidth: 100,
      key: 'name'
    },
    {
      title: `${i18n.tripartiteLogo8}`,//图标
      align: 'center',
      minWidth: 80,
      key: 'logo',
      render: (h, { row }) => {
        return row.logo ? <img src={ row.logo } alt="" style="width: 50px; height: auto;"/> : <span>--</span>
      }
    },
    {
      title: `${i18n.tripartiteLogo9}`,//操作
      minWidth: 140,
      align: 'center',
      key: 'name',
      render(h, { row, index }) {
        const showUp = index > 0
        const showDown = index < Vue.dataSource.length - 1
        return(
        <div>
          <Button
            type='primary'
            size='small'
            style='margin-right:5px'
            on-click={_ => Vue.handleBtn(row)}
          >
            {`${i18n.tripartiteLogo10}`}
          </Button>
          <Button
            type='error'
            size='small'
            style='margin-right:5px'
            on-click={_ => Vue.deleteBtn(row)}
          >
            {`${i18n.tripartiteLogo11}`}
          </Button>
          {
            showUp && <Button
              type='success'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.swapItems(index, index - 1)}
            >
              {`${i18n.tripartiteLogo12}`}
            </Button>
          }
          {
            showDown && <Button
              type='success'
              size='small'
              on-click={_ => Vue.swapItems(index, index + 1)}
            >
              {`${i18n.tripartiteLogo13}`}
            </Button>
          }
        </div>
        )
      }
    }
  ]
}
