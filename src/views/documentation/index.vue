<template>
  <div>
    document
    <A text="44" />
  </div>
</template>
<script>
import A from './a'
import { getIntersection } from '@/utils/index'
export default {
  components: {
    A
  },
  data () {
    return {
      arr1: [
        { id: 1, text: 1 },
        { id: 2, text2: 2 },
        { id: 3, text: 3 }
      ],
      arr2: [
        { id: 3, text: 3 },
        { id: 1, text: 1 },
        { id: 4, text: 4 },
        { id: 2, text2: 2 }
      ]
    }
  },
  mounted () {
    console.log(getIntersection(this.arr1, this.arr2))
  }
}
</script>
