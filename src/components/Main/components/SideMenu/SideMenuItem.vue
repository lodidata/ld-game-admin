<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <CommonIcon :type="parentItem.icon || ''" />
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <SideMenuItem v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
        <MenuItem v-else :key="`menu-${item.children[0].name}`" :name="getNameOrHref(item, true)">
          <CommonIcon :type="item.children[0].icon || ''" />
          <span>{{ showTitle(item.children[0]) }}</span>
        </MenuItem>
      </template>
      <template v-else>
        <SideMenuItem v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item" />
        <MenuItem v-else :key="`menu-${item.name}`" :name="getNameOrHref(item)">
          <CommonIcon :type="item.icon || ''" />
          <span>{{ showTitle(item) }}</span>
        </MenuItem>
      </template>
    </template>
  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [mixin, itemMixin]
}
</script>
