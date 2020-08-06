<template>
  <div class="titleComponents">
    <mainTitle ref="mainTitle" @change="changeFun"></mainTitle>
    <subTitle ref="subTitle" @change="changeFun"></subTitle>
  </div>
</template>

<script>
import mainTitle from "./mainTitle";
import subTitle from "./subTitle";
export default {
  name: "titleComponents",
  components: {
    mainTitle,
    subTitle
  },
  methods: {
    setData (data) {
      this.$refs.mainTitle.setData(data);
      this.$refs.subTitle.setData(data);
    },
    changeFun ({ attr, type, value }) {
      this.$emit("change", { attr, type, value });
    },
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
