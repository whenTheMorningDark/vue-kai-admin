<template>
  <div>
    document
    <A text="44" :keya="key" title="asdasda" :test="test" @testFun="testFun" />
  </div>
</template>
<script>
import A from "./a";
// import { getIntersection } from "@/utils/index";
export default {
  components: {
    A
  },
  data () {
    return {
      targetArr: [5, 13, 19, 21, 37, 56, 64, 75, 80, 21, 88, 92],
      key: 21,
      test: 77778
    };
  },
  methods: {
    testFun () {
      console.log("B组件的事件触发");
    },
    // 二分法
    // 循坏
    binary_search (arr, key) {
      var low = 0; var high = arr.length - 1;
      while (low <= high) {
        var mid = low + ((high - low) >> 1);
        if (arr[mid] > key) {
          high = mid - 1;
        } else if (arr[mid] < key) {
          low = mid + 1;
        } else {
          if ((mid === arr.length - 1) || (arr[mid + 1] !== key)) {
            return mid;
          } else {
            low = mid + 1;
          }
        }
      }
      return -1;
    }
    // 递归
    // binary_search (targetArr, key, low = 0, high = targetArr.length - 1) {
    //   // let low = 0;
    //   // let high = targetArr.length - 1;
    //   let mid = parseInt(low + (high - low) / 2, 10);
    //   if (low > high) {
    //     return -1;
    //   }
    //   if (targetArr[mid] === key) {
    //     return mid;
    //   } else if (targetArr[mid] > key) {
    //     high = mid - 1;
    //     return this.binary_search(targetArr, key, low, high);
    //   } else if (targetArr[mid] < key) {
    //     low = mid + 1;
    //     return this.binary_search(targetArr, key, low, high);
    //   }
    // }
  },
  mounted () {
    console.log(this.binary_search(this.targetArr, this.key));
  }
};
</script>
