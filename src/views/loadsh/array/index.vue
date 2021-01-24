<template>
  <div>
    <p class="link-lodash">
      <el-link href="https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/views/loadsh/array/chunk.md">chunk README.MD</el-link>
    </p>
    <p class="link-lodash">
      <el-link href="https://github.com/whenTheMorningDark/vue-kai-admin/blob/master/src/views/loadsh/array/compactAndConct.md">compactAndConct README.MD</el-link>
    </p>
  </div>
</template>

<script>

export default {
  mounted() {
    let arr = [1, 2, 3, [[5]]];
    console.log(flattern(arr));
    // eslint-disable-next-line require-jsdoc
    function flattern(arr) {
      return arr.reduce((cur, next) => cur.concat(Array.isArray(next) ? flattern(next) : next), []);
    }
    console.log(concat(arr, [5], 9, 6));
    // ++i就是先加后用，i++就是先用后加。
    // let index = -1;
    // while (index++ < arr.length) {
    //   console.log(arr[index]);
    // }
    // eslint-disable-next-line require-jsdoc
    function concat() {
      let length = arguments.length; // 获取参数的个数
      if (!length) {
        return [];
      }
      let args = Array(length - 1); // 取除了第一个参数以外的参数的长度
      let array = arguments[0]; // 取出数组的第一项
      let index = length;
      while (index--) {
        args[index - 1] = arguments[index];
      }
      // return arrayPush(array, baseFlatten(args, 1));
      return arrayPush(Array.isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }
    // eslint-disable-next-line require-jsdoc
    function arrayPush(array, values) {
      let index = -1;
      let length = values.length;
      let offset = array.length;
      while (++index < length) {
        array[index + offset] = values[index];
      }
      return array;
    }
    // eslint-disable-next-line require-jsdoc
    function copyArray(source, array) {
      let index = -1;
      let length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    // eslint-disable-next-line require-jsdoc
    function isFlattenable(value) {
      return Array.isArray(value);
    }
    // eslint-disable-next-line require-jsdoc
    function baseFlatten(array, depth, predicate, isStrict, result) {
      let index = -1;
      let length = array.length;
      predicate || (predicate = isFlattenable); // isFlattenable 判断是否是数组
      result || (result = []);
      while (++index < length) {
        let value = array[index];
        console.log(value);
        if (depth > 0 && predicate(value)) { // 如果层级大于0并且该项是数组的话
          if (depth > 1) { // 如果需要递归的层级大于1的情况则继续递归下去解套
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else { // 如果需要递归的层级为1的情况,则把所有的项添加目标数组
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
  }
};
</script>

<style>
.link-lodash{
  padding: 10px;
  cursor: pointer;
}
</style>