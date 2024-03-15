<template>
  <div class="retentionRate">
    <div class="retentionRateDate">
      <div class="retentionRateList">
        <div>近3天充值留存</div>
        <div></div>
        <div>近5天充值留存</div>
        <div></div>
        <div>近7天充值留存</div>
        <div></div>
        <div>近15天充值留存</div>
        <div></div>
        <div>近30天充值留存</div>
        <div></div>
        <div>
          <a href="javaScript:;" @click="goPage(`RechargeRetentionRate`)">查看详情</a>
        </div>
      </div>
      <div class="retentionRateList">
        <div>近3天活跃留存</div>
        <div></div>
        <div>近5天活跃留存</div>
        <div></div>
        <div>近7天活跃留存</div>
        <div></div>
        <div>近15天活跃留存</div>
        <div></div>
        <div>近30天活跃留存</div>
        <div></div>
        <div>
          <a href="javaScript:;" @click="goPage(`YauldRetentionRate`)">查看详情</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {},
    methods: {
      goPage(page) {
        this.$router.push({
          path: `${page}`,
          query: {

          }
        })
      }
    }

  }
</script>

<style lang="less" scope>
  .retentionRate {
    .retentionRateDate {
      min-width: 1377px;
      border: 1px solid #e8eaec;
    }

    .retentionRateList {
      height: 55px;
      border-bottom: 1px solid #e8eaec;
      overflow: hidden;

      &>div {
        box-sizing: border-box;
        display: inline-block;
        width: calc(100% / 11);
        min-width: 125px;
        height: 55px;
        border-right: 1px solid #e8eaec;
        line-height: 55px;
        font-size: 15px;
        text-align: center;
        float: left;

        &:last-child {
          border: none;
        }
      }

      &:last-child {
        border: none;
      }
    }
  }
</style>
