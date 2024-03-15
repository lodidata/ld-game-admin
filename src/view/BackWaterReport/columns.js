import { Button } from 'iview'

export default function(Vue) {
  const i18n = Vue.$t('backWaterReport')
  return [
    {
      title: i18n.backWaterReport8,
      align: 'center',
      key: 'game_name',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport9,
      align: 'center',
      key: 'win_money',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport10,
      align: 'center',
      key: 'bet_money',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport11,
      align: 'center',
      key: 'rebet_money',
      minWidth: 100
    },
    {
      title: i18n.backWaterReport12,
      minWidth: 140,
      align: 'center',
      render(h, { row }) {
        return row.game_id === 0 ? (
          <div>
            <Button
              type='primary'
              size='small'
              style='margin-right:5px'
              on-click={_ => Vue.handleOpenModal(row)}
            >
              {i18n.backWaterReport12}
            </Button>
          </div>
        ) : (
          <div>--</div>
        )
      }
    }
  ]
}
