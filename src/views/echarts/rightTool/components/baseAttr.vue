<template>
  <!-- 基本属性 -->
  <div class="baseAttr">
    <div class="wrapper-row">
      <BaseItem label="id">
        <el-input size="mini" v-model="id" disabled></el-input>
      </BaseItem>
    </div>
    <div class="wrapper-row" v-for="item in attrsData" :key="item.id">
      <BaseItem :label="sItem.label" v-for="sItem in item.children" :key="sItem.type">
        <el-input-number
          v-model="sItem.value"
          :min="1"
          size="mini"
          @change="changeFun(sItem)"
          :disabled="cShowDisabled"
        ></el-input-number>
      </BaseItem>
    </div>
  </div>
</template>

<script>
import BaseItem from "./baseItem";
import componentsMixins from "../components/mixins/component";
export default {
  name: "baseAttr",
  mixins: [componentsMixins],
  components: {
    BaseItem
  },
  data () {
    return {
      attrsData: [
        { id: "firstRow", children: [{ label: "宽度", value: 1, type: "width" }, { label: "高度", value: 1, type: "height" }] },
        { id: "secondRow", children: [{ label: "x", value: 1, type: "x" }, { label: "y", value: 1, type: "y" }] }
      ],
      id: ""
    };
  },
  methods: {
    changeFun (item) {
      console.log(item);
      this.$emit("change", item);
    },
    setData (data) {
      let targetArr = ["width", "height", "x", "y"];
      let concatArr = this.attrsData.reduce((cur, pre) => cur.concat(pre.children), []);
      targetArr.forEach(v => {
        let targetObj = concatArr.find(s => s.type === v);
        this.$set(targetObj, "value", data[v]);
      });
      this.id = data.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.baseAttr {
  width: 100%;
  height: 100%;

  .wrapper-row {
    display: flex;
    margin-bottom: 8px;
    .wrapper {
      flex: 1;
    }
    /deep/ .el-input-number {
      width: 100%;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

