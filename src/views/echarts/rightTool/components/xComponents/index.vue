<template>
  <div class="xComponents">
    <div class="wrapper">
      <baseItem label="显示">
        <el-checkbox
          v-model="dataInfo.show"
          @change="changeFun('xAxis','show',dataInfo.show)"
          :disabled="cShowDisabled"
        ></el-checkbox>
      </baseItem>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
import { xData } from "../commonData/xData";
import componentsMixins from "../mixins/component";
import { clearValues } from "../../../utils/utils";
export default {
  name: "xComponents",
  mixins: [componentsMixins],
  components: {
    baseItem
  },
  data () {
    return {
      dataInfo: clearValues(xData),
    };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>