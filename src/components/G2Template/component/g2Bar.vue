<template>
  <g2Template v-bind="$props" ref="g2Template" type="interval"></g2Template>
</template>

<script>
import g2Template from "../g2Template";
import { g2BarData, baseOptions } from "../data/g2Bar";
export default {
  components: {
    g2Template
  },
  props: {
    data: {
      type: Array,
      default: () => g2BarData
    },
    baseOptions: {
      type: Object,
      default: () => baseOptions
    }
  },
  methods: {
    changeData (data) {
      console.log(this.$refs.g2Template);
      this.$refs.g2Template.changeData(data);
    }
  }
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