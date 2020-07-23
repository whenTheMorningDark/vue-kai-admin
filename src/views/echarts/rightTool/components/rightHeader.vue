<template>
  <div class="rightHeader">
    <div
      class="header-item"
      v-for="item in tabData"
      :key="item.name"
      @click="tabClick(item)"
      :class="tabCls(item)"
    >{{item.label}}</div>
  </div>
</template>

<script>
export default {
  name: "rightHeader",
  props: {
    tabData: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String
    }
  },
  data () {
    return {
      currentValue: this.activeName
    };
  },
  methods: {
    tabClick (item) {
      this.currentValue = item.name;
      this.$emit("click", item);
    },
    tabCls (item) {
      return [
        {
          ["active"]: item.name === this.currentValue
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.rightHeader {
  width: 100%;
  height: 43px;
  display: flex;
  border: 1px solid #dddddd;

  .header-item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #dddddd;
    cursor: pointer;
    font-size: 14px;
    &.active {
      background: royalblue;
      color: #ffffff;
    }
    &:last-child {
      border: none;
    }
  }
}
</style>

