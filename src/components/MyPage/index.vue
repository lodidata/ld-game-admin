<template>
  <div id="MyPage" style="margin-top:30px">
    <Page
      :current="current"
      :page-size="currentPageSize"
      :total="total"
      :page-size-opts="pageSizeOpts"
      :show-sizer="showSizer"
      :ikey="ikey"
      @on-change="onChange"
      @on-page-size-change="changePageSize"
    ></Page>
  </div>
</template>
<script>
export default {
  name: 'MyPage',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [20, 100, 1000, 2000]
      }
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    ikey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: 'myPage' + Date.now(),
      currentPageSize:
        Number(localStorage.getItem(`pageSize${this.$route.fullPath}${this.ikey}`)) || this.pageSize
    }
  },
  mounted() {
    if (!this.showSizer) {
      localStorage.removeItem(`pageSize${this.$route.fullPath}`)
    }
    this.changePageSize(this.currentPageSize)
  },
  methods: {
    changePageSize(page) {
      localStorage.setItem(`pageSize${this.$route.fullPath}${this.ikey}`, page)
      this.$emit('changePageSize', page)
    },
    onChange(page) {
      this.$emit('onChange', page)
    }
  }
}
</script>
