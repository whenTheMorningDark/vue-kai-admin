<template>
  <div>
    给你一个数组 orders，表示客户在餐厅中完成的订单，确切地说， orders[i]=[customerNamei,tableNumberi,foodItemi] ，其中 customerNamei 是客户的姓名，tableNumberi 是客户所在餐桌的桌号，而 foodItemi 是客户点的餐品名称。
    请你返回该餐厅的 点菜展示表 。在这张表中，表中第一行为标题，其第一列为餐桌桌号 “Table” ，后面每一列都是按字母顺序排列的餐品名称。接下来每一行中的项则表示每张餐桌订购的相应餐品数量，第一列应当填对应的桌号，后面依次填写下单的餐品数量。
    注意：客户姓名不是点菜展示表的一部分。此外，表中的数据行应该按餐桌桌号升序排列。
    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/display-table-of-food-orders-in-a-restaurant
  </div>
</template>

<script>
export default {
  name: "Array1",
  data () {
    return {
      orders: [
        ["David", "3", "Ceviche"],
        ["Corina", "10", "Beef Burrito"],
        ["David", "3", "Fried Chicken"],
        ["Carla", "5", "Water"],
        ["Carla", "5", "Ceviche"],
        ["Rous", "3", "Ceviche"]
      ]
    };
  },
  mounted () {
    console.log(this.displayTable(this.orders));
  },
  methods: {
    displayTable (orders) {
      let table = new Map();
      let foods = new Set(); // 食物不需要重复
      let res = [];
      // eslint-disable-next-line no-unused-vars
      for (let [a, b, c] of orders) {
        foods.add(c);
        if (table.has(b)) {
          let map = table.get(b);
          table.set(b, map.set(c, map.has(c) ? map.get(c) + 1 : 1));
        } else {
          let map = new Map();
          table.set(b, map.set(c, 1));
        }
      }
      let menu = [...foods].sort();
      res.push(["Table", ...menu]);
      console.log(table);
      console.log(menu);
      for (let [t, o] of table) { // t:tableId o: all ordered food in tableId
        let temp = [];
        for (let n of menu) {
          temp.push(o.has(n) ? "" + o.get(n) : "0");
        }
        res.push([t, ...temp]);
      }
      return res.sort((a, b) => a[0] - b[0]);
    }
  }
};
</script>

<style>
</style>
