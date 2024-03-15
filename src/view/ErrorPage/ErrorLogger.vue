<template>
  <div>
    <Button type="primary" style="margin: 0 10px 10px 0;" @click="exportData">{{i18n_lang.errorPage12}}</Button>
    <b>
    {{i18n_lang.errorPage5}}
    </b>
    <Table ref="table" :columns="columns" :data="errorList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ErrorLoggerPage',
  data() {
    const i18n_lang = this.$t('errorPage');
    return {
      i18n_lang: i18n_lang,
      columns: [
        {
          type: 'index',
          title: i18n_lang.errorPage6,
          width: 100
        },
        {
          key: 'type',
          title: i18n_lang.errorPage7,
          width: 100,
          render: (h, { row }) => {
            return (
              <div>
                <icon size={16} type={row.type === 'ajax' ? 'md-link' : 'md-code-working'} />
              </div>
            )
          }
        },
        {
          key: 'code',
          title: i18n_lang.errorPage8,
          render: (h, { row }) => {
            return <span>{row.code === 0 ? '-' : row.code}</span>
          }
        },
        {
          key: 'mes',
          title: i18n_lang.errorPage9
        },
        {
          key: 'url',
          title: 'URL'
        },
        {
          key: 'time',
          title: i18n_lang.errorPage9,
          render: (h, { row }) => {
            return <span>{row.time}</span>
          },
          sortable: true,
          sortType: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['errorList'])
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({
        filename: `${i18n_lang.errorPage11}.csv`
      })
    }
  }
}
</script>

<style></style>
