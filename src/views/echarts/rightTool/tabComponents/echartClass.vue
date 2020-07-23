<template>
  <div class="echartClass">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="基本属性" name="1">
        <baseAttr ref="baseAttr"></baseAttr>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import baseAttr from "../components/baseAttr";
import { mapGetters } from "vuex";
export default {
  name: "echartClass",
  data () {
    return {
      activeNames: ["1"],
      timer: null
    };
  },
  computed: {
    ...mapGetters(["currentTarget"])
  },
  components: {
    baseAttr
  },
  watch: {
    currentTarget: {
      deep: true,
      handler (nVal) {
        this.setData(nVal);
        // clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        //   this.setData(nVal);
        // }, 200);
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val);
    },
    setData (data) {
      this.$refs.baseAttr.setData(data);
    }
  }
};
</script>

<style>
</style>