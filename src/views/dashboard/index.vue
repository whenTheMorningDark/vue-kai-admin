<template>
  <div>dashboardasdasdadsa</div>
</template>
<script>
export default {
  data () {
    return {
      str1: "flow",
      str2: "flower",
      arr: ["flower", "flow", "flight"]
    };
  },
  methods: {
    compare (arr) {
      if (arr.length <= 1) {
        return "";
      }
      // if (str1.length === 0 || str2.length === 0) {
      //   return "";
      // }
      // let l = str1.length > str2.length ? str2.length : str1.length;
      // let i = 0;
      // while (i < l) {
      //   if (str1[i] !== str2[i]) {
      //     break;
      //   }
      //   i++;
      // }
      // return str1.substr(0, i);
    }
  },
  mounted () {
    console.log(this.compare(this.arr));
  }
};
</script>
