<template>
  <div class="tabs">
    <div
      v-for="item in tabsData"
      :key="item.text"
      :class="tabCls(item)"
      @click="handClickItem(item)"
    >
      {{ item.text }}
    </div>
    <!-- <div class="tabs-item">
      tabs-item
    </div>
    <div class="tabs-item">
      tabs-item
    </div> -->
  </div>
</template>
<script>
/* eslint-disable space-before-function-paren */

export default {
  name: 'Tabs',
  props: {
    tabsData: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentName: this.defaultValue
    }
  },
  watch: {
    defaultValue (nVal, oldVal) {
      this.updateName(nVal)
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-item',
        {
          'active': item.text === this.currentName
        }
      ]
    },
    updateName (name) {
      this.currentName = name
    },
    handClickItem (item) {
      this.updateName(item.text)
      this.$emit('tab-click', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 35px;
  display: flex;
  /* background: #001528; */
  .tabs-item {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.active {
      background: #001528;
    }
  }
}
</style>
