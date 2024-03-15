export default function(Vue, group) {
  const i18n = Vue.$t('specialOddsSet')
  return [
    {
      title: i18n.specialOddsSet1,
      align: 'center',
      render(h, { row }) {
        return row.group_start ? (
          <span combinerow={group[row.hall_level].length}>
            {Vue.levelList.filter(x => x.level === row.hall_level)[0].name}
          </span>
        ) : (
          <span deletecombinerow />
        )
      }
    },
    {
      title: i18n.specialOddsSet2,
      align: 'center',
      key: 'type'
    },
    {
      title: i18n.specialOddsSet3,
      align: 'center',
      key: 'odds',
      myExt: {
        editTxt: true,
        label: 'odds'
      }
    },
    {
      title: i18n.specialOddsSet4,
      align: 'center',
      key: 'step1',
      myExt: {
        editTxt: true,
        label: 'step1'
      }
    },
    {
      title: i18n.specialOddsSet5,
      align: 'center',
      key: 'odds1',
      minWidth: 50,
      myExt: {
        editTxt: true,
        label: 'odds1'
      }
    },
    {
      title: i18n.specialOddsSet6,
      align: 'center',
      key: 'step2',
      myExt: {
        editTxt: true,
        label: 'step2'
      }
    },
    {
      title: i18n.specialOddsSet7,
      align: 'center',
      key: 'odds2',
      myExt: {
        editTxt: true,
        label: 'odds2'
      }
    },
    {
      title: i18n.specialOddsSet8,
      align: 'center',
      key: 'desc',
      myExt: {
        editTxt: true,
        label: 'desc',
        inputType: 'textarea'
      }
    }
  ]
}
