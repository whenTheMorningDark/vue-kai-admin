<template>
  <g2Template v-bind="$props" ref="g2Template" type="line"></g2Template>
</template>

<script>
import g2Template from "../g2Template";
import { g2LineData, baseOptions } from "../data/g2Line";
export default {
  components: {
    g2Template
  },
  props: {
    data: {
      type: Array,
      default: () => g2LineData
    },
    baseOptions: {
      type: Object,
      default: () => baseOptions
    }
  }
  // methods: {
  //   changeData (data) {
  //     this.$refs.g2Template.changeData(data);
  //   }
  // }
};
</script>

<style>
.box {
  position: relative;
}
.vdr {
  padding: 10px;
}
</style>