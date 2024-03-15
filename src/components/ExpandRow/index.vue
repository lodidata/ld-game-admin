<template>
    <div v-if="row && row.length">
      <ul class="lists">
          <li v-for="(item,i) in row" :key="i">
              <span>{{ item.game_name }}</span>
              {{ item.quota }}
          </li>
      </ul>
    </div>
</template>
<script>
export default {
  props: {
    row: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less" scoped>
.lists {
    & > li {
        width: 25%;
        display: inline-block;
        vertical-align: top;
        line-height: 35px;
        & > span{
            min-width: 100px;
            display: inline-block;
        }
    }
}
</style>
