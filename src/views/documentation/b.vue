<template>
  <div class="b">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // const object = {
    //   a: 1,
    //   b: 2,
    //   c: 3
    // }
    // const { a, ...resetObj } = object // 去取对象的某个属性
    // console.log(a)
    // console.log(resetObj)
    // let a = new Foo() //a.id -> 1
    // let b = new Foo() //b.id -> 2

    function Foo () {
      let id = 1
      return function () {
        return {
          id: id++
        }
      }
    }
    // console.log(new Foo())
    const a = new Foo()()
    console.log(a)
  }
}
</script>

<style>
</style>
