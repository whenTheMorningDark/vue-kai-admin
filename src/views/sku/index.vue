<template>
  <div class="sku">
    <div class="list" v-for="(item,index) in commoditySpecs" :key="index">
      <div class="title">{{item.title}}</div>
      <div class="shopList">
        <span
          v-for="(shopItem,sIndex) in item.list"
          :key="sIndex"
          class="shopList-item"
          :class="{disable:shopItem.disable,active:shopItem.active}"
          @click="handClickFun(shopItem,sIndex,item.title,item.key)"
        >{{shopItem.name}}</span>
      </div>
    </div>
    <div class="tips">
      <p>选择的颜色是:{{colorName}}</p>
      <p>选择的套餐是:{{statusName}}</p>
      <p>选择的内存是:{{sizeName}}</p>
      <p>总数为:{{cTotal}}件</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "sku",
  data () {
    return {
      data: [ // 库存
        { id: "1", specs: ["紫色", "套餐一", "64G"], total: 50 },
        { id: "2", specs: ["紫色", "套餐一", "128G"], total: 60 },
        { id: "3", specs: ["紫色", "套餐二", "128G"], total: 160 },
        { id: "4", specs: ["黑色", "套餐三", "256G"], total: 40 },
        { id: "5", specs: ["白色", "套餐三", "64G"], total: 480 },
        { id: "6", specs: ["红色", "套餐一", "64G"], total: 120 }
      ],
      commoditySpecs: [ // 商品类型 ["红色", "紫色", "白色", "黑色"] ["套餐一", "套餐二", "套餐三", "套餐四"] ["64G", "128G", "256G"]
        { key: "color", title: "颜色", list: [{ id: "red", name: "红色", disable: false, active: false }, { id: "zise", name: "紫色" }, { id: "white", name: "白色" }, { id: "black", name: "黑色" }] },
        { key: "status", title: "套餐", list: [{ id: "one", name: "套餐一", disable: false }, { id: "two", name: "套餐二" }, { id: "three", name: "套餐三" }, { id: "four", name: "套餐四" }, { id: "five", name: "套餐五" }] },
        { key: "size", title: "内存", list: [{ id: "small", name: "64G" }, { id: "mini", name: "128G" }, { id: "big", name: "256G" }] }
      ],
      item: {},
      obj: {}
      // colorName: "", // 颜色名称
      // statusName: "", // 套餐名称
      // sizeName: "" // 内存名称
    };
  },
  computed: {
    cTotal () { // 计算总数
      let color = this.colorName;
      let status = this.statusName;
      let sizeName = this.sizeName;
      let str = color + "" + status + "" + sizeName;
      let obj = this.data.find(v => v.specs.join("") === str);
      if (obj) {
        return obj.total;
      }
      return 0;
    },
    colorName () {
      let data = this.commoditySpecs[0].list.find(v => v.active);
      if (data) {
        return data.name;

      }
      return "";
    },
    statusName () {
      let data = this.commoditySpecs[1].list.find(v => v.active);
      if (data) {
        return data.name;

      }
      return "";
    },
    sizeName () {
      let data = this.commoditySpecs[2].list.find(v => v.active);
      if (data) {
        return data.name;
      }
      return "";
    }
  },
  methods: {
    // 设置相关元素的状态
    dfs (data, relation) {
      if (!data || data.length === 0) {
        return;
      }
      let stack = [];
      data.forEach(v => {
        stack.push(v);
      });
      while (stack.length) {
        const result = stack.shift();
        if (relation.includes(result.name)) {
          this.$set(result, "disable", false);

        } else {
          this.$set(result, "disable", true);
          if (result.disable && result.active) {
            this.$set(result, "active", false);
          }
        }
        if (result.list && result.list.length > 0) {
          stack = [...stack, ...result.list];
        }
      }
      return data;
    },
    // 找出选中的元素
    tdfs (data) {
      if (!data || data.length === 0) {
        return;
      }
      let stack = [];
      let arr = [];
      data.forEach(v => {
        stack.push(v);
      });
      while (stack.length) {
        const result = stack.shift();
        if (result.active) {
          // this.$set(result, "disable", false);
          arr.push(result);
        }
        if (result.list && result.list.length > 0) {
          stack = [...stack, ...result.list];
        }
      }
      return arr;
    },
    init () {
      this.commoditySpecs.forEach(v => {
        let list = v.list;
        list.forEach(s => {
          this.$set(s, "disable", false);
          this.$set(s, "active", false);
        });
      });
    },
    initData () {
      this.data.forEach(v => {
        let specs = v.specs;
        specs.forEach(s => {
          if (!this.obj[s]) {
            this.obj[s] = specs;
          } else {
            this.obj[s] = this.obj[s].concat(specs);
          }
        });
      });
      console.log(this.obj);
    },
    getVertex (name) {
      if (!this.obj[name]) {
        return [];
      }
      return Array.from(new Set(this.obj[name].filter(v => v !== name)));
    },
    handClickFun (item, sIndex, title, key) {
      this.item = item;
      if (item.disable) {
        return;
      }
      if (!item.active) { // 没有选择的情况
        // let map = {
        //   color: "colorName",
        //   status: "statusName",
        //   size: "sizeName"
        // };
        // this[map[key]] = item.name;
        // 当前列取消选择
        let currentData = this.commoditySpecs.filter(v => v.title === title);
        currentData.forEach(v => {
          let list = v.list;
          list.forEach(s => {
            this.$set(s, "active", false);
          });
        });

        let relation = this.getVertex(item.name);
        if (relation.length === 0) { // 没有库存了
          let restData = this.commoditySpecs.filter(v => v.title !== title);
          restData.forEach(v => {
            let list = v.list;
            list.forEach(s => {
              this.$set(s, "disable", true);
            });
          });
        } else { // 有库存
          let restData = this.commoditySpecs.filter(v => v.title !== title);
          this.dfs(restData, relation);
        }

        this.$set(item, "active", true);
      } else { // 取消选择的情况
        // let map = {
        //   color: "colorName",
        //   status: "statusName",
        //   size: "sizeName"
        // };
        // this[map[key]] = "";
        let restData = this.commoditySpecs.filter(v => v.title !== title);
        let choseData = this.tdfs(restData);
        if (choseData.length === 0) { // 当前没有选中的元素
          let arr = [];
          this.commoditySpecs.forEach(v => {
            let list = v.list;
            list.forEach(s => {
              arr.push(s.name);
            });
          });
          this.dfs(this.commoditySpecs, arr);
        } else { // 当前存在选中的元素
          let choseDataName = choseData.map(v => v.name);
          let arr = [];
          choseData.forEach(v => {
            let currentData = this.getVertex(v.name);
            arr = arr.concat(currentData);
          });
          arr = arr.concat(choseDataName);
          this.dfs(this.commoditySpecs, arr);
        }

        this.$set(item, "active", false);
      }
    }
  },
  mounted () {
    this.init();
    this.initData();
    console.log(this.getVertex("红色"));
  }
};
</script>

<style lang="scss" scoped>
.shopList {
  display: flex;
  text-indent: 10px;
  .shopList-item {
    margin-right: 8px;
    background: #ffffff;
    cursor: pointer;
    &.active {
      background: red;
    }
    &.disable {
      background: #dddddd;
    }
  }
}
</style>
