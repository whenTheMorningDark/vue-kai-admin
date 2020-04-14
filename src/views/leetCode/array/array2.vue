<template>
  <div>array2</div>
</template>

<script>
export default {
  name: 'Array1',
  data () {
    return {
      nums: [2, 7, 11, 15],
      target: 9
    }
  },
  mounted () {
    console.log(this.twoSum(this.nums, this.target))
  },
  methods: {
    twoSum (nums, target) {
      const result = {}
      for (let i = 0; i < nums.length; i++) {
        const k = target - nums[i]
        if (result.hasOwnProperty(k)) {
          return [result[k], i]
        }
        result[nums[i]] = i
      }
      return []
    }
  }
}
</script>

<style>
</style>
