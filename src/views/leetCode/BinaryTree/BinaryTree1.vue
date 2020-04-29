<template>
  <div>
    <h3>最小栈</h3>
    <p>设计一个支持push,pop,top操作，并能在常数时间内检索到最小元素的栈</p>
    <p>push(x) -- 将元素 x 推入栈中。</p>
    <p>pop() -- 删除栈顶的元素。</p>
    <p>top() -- 获取栈顶元素。</p>
    <p>getMin() -- 检索栈中的最小元素。</p>
    <p>1 MinStack minStack = new MinStack();</p>
    <p>2 minStack.push(-2);</p>
    <p>3 minStack.push(0); 4 minStack.push(-3);</p>
    <p>5 minStack.getMin(); --> 返回 -3.</p>
    <p>6 minStack.pop();</p>
    <p>7 minStack.top(); --> 返回 0.</p>
    <p>8 minStack.getMin(); --> 返回 -2.</p>
  </div>
</template>

<script>
/* eslint-disable require-jsdoc */
export default {
  methods: {

  },
  mounted () {
    function MinStack () {
      this.stack = [];
      this.minStack = [];
    }
    MinStack.prototype.push = function (x) {
      this.stack.push(x);
      if (this.minStack.length === 0) {
        this.minStack.push(x);
      } else {

        let min = Math.min(this.minStack[this.minStack.length - 1], x);
        this.minStack.push(min);
      }
    };
    MinStack.prototype.getMin = function () {
      return this.minStack[this.minStack.length - 1];
    };
    MinStack.prototype.pop = function () {
      this.minStack.pop();
      return this.stack.pop();
    };
    MinStack.prototype.top = function () {
      return this.stack[this.stack.length - 1];
    };
    let minStack = new MinStack();
    console.log(minStack);
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    console.log(minStack.getMin());
    minStack.pop();
    console.log(minStack.top());
    console.log(minStack.getMin());
  }
};
</script>

<style>
</style>