<template>
  <div>
    <render title="asdasda" v-on="$listeners"></render>
  </div>
</template>
<script>
/* eslint-disable require-jsdoc */
import render from "./render";
export default {
  name: "dash",
  components: {
    render
  },
  data () {
    return {
      str: "hello   world"
    };
  },
  methods: {
    aFun () {
      console.log("a");
    },
    reverserStr (s) {
      let left = 0;
      let right = s.length - 1;
      let queue = [];
      let word = "";
      queue.unshift(word);
      while (s.charAt(left) === " ") {
        left++;
      }
      while (s.charAt(right) === " ") {
        right--;
      }
      while (left <= right) {
        let char = s.charAt(left);
        if (char === " " && word) {
          queue.unshift(word);
          word = "";
          console.log(queue);
        } else if (char !== " ") {
          word += char;
        }
        left++;
      }
      queue.unshift(word);
      return queue.join(" ");

    }
  },
  mounted () {
    console.log(this.reverserStr(this.str));
  }
};
</script>
