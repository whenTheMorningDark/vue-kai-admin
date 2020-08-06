<template>
  <div class="colorFont">
    <div class="wrapper" v-for="item in componentData" :key="item.keys">
      <template v-if="attrsKey">
        <baseItem :label="item.label" :width="width">
          <component
            :is="item.type"
            v-model="dataInfo[attrsKey][item.keys]"
            @change="changeFun(item.keys)"
            :disabled="disabled"
            size="mini"
            v-bind="item.props"
          >
            <template v-if="item.type==='el-select' && item.option && item.option.length>0">
              <el-option
                v-for="item in item.option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </template>
          </component>
        </baseItem>
      </template>
      <template v-else>
        <baseItem :label="item.label" :width="width">
          <component
            :is="item.type"
            v-model="dataInfo[item.keys]"
            @change="changeFun(item.keys)"
            :disabled="disabled"
            size="mini"
            v-bind="item.props"
          >
            <template v-if="item.type==='el-select' && item.option && item.option.length>0">
              <el-option
                v-for="item in item.option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </template>
          </component>
        </baseItem>
      </template>
    </div>
  </div>
</template>

<script>
import baseItem from "../baseItem";
export default {
  name: "baseInput",
  props: {
    componentData: {
      type: Array,
      default: () => {
        [];
      }
    },
    dataInfo: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: true
    },
    attrs: {
      type: String,
      default: ""
    },
    attrsKey: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 50
    }
  },
  components: {
    baseItem
  },
  methods: {
    changeFun (keys) {
      // this.$emit("changeColorFont", this.attrs, `${this.attrsKey}.${keys}`, this.dataInfo[this.attrsKey][keys]);
      if (this.attrsKey.length > 0) {
        this.$emit("changeColorFont", this.attrs, `${this.attrsKey}.${keys}`, this.dataInfo[this.attrsKey][keys]);
      } else {
        this.$emit("changeColorFont", this.attrs, `${keys}`, this.dataInfo[keys]);
      }
    }
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