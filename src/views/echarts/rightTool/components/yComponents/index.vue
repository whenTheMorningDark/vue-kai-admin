<template>
  <div class="xComponents">
    <xyComponent
      @change="changeColorFontFun"
      :dataInfo="dataInfo"
      :cShowDisabled="cShowDisabled"
      :cDisabled="cDisabled"
      attrsKey="yAxis"
    ></xyComponent>
  </div>
</template>

<script>
import componentsMixins from "../mixins/component";
import { yData } from "../commonData/yData";
import xyComponent from "../xyComponent";
import { clearValues } from "../../../utils/utils";
export default {
  name: "xComponents",
  mixins: [componentsMixins],
  components: {
    xyComponent
  },
  data () {
    return {
      dataInfo: clearValues(yData),
      // nameLocationOptions
    };
  },
  methods: {
    changeColorFontFun (attrs, props, value) {
      this.changeFun(attrs, props, value);
    },
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
}
</style>