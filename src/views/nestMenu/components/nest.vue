<template>
  <div class="nest">
    <div class="wrapper" :class="['wrapper-'+depth]">
      <span
        class="current-item"
        v-for="item in menu"
        :key="item.id"
        :class="getActiveClass(item.id)"
        @click="itemClick(item)"
      >{{item.name}}</span>
    </div>
    <nest
      :menu="subMenu"
      v-if="subMenu && subMenu.length>0"
      :depth="depth +1"
      :activeIds="activeIds"
      @change="onSubActiveIdChange"
      :key="activeId.id"
    ></nest>
  </div>
</template>

<script>
export default {
  name: "nest",
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    depth: {
      type: Number,
      default: 0
    },
    activeIds: {
      type: [String, Number, Array],
    }
  },
  watch: {
    activeIds: {
      handler (nVal) {
        console.log(nVal);
        if (nVal) {
          const newActiveId = nVal[this.depth];
          console.log(newActiveId);
          if (newActiveId) {
            this.activeId.value = newActiveId;
            this.setSubMenu();
          }
        }
      },
      immediate: true
    },
    menu: {
      handler (nVal) {
        if (!this.activeId.value) {
          if (nVal && nVal.length > 0) {
            this.activeId.value = nVal[0].id;
          }
        }
        if (!nVal.find(v => v.id === this.activeId.value)) {
          this.activeId.value = nVal[0].id;
        }
      },
      immediate: true
    }
  },
  computed: {

  },
  data () {
    return {
      activeId: {},
      subMenu: []
    };
  },
  created () {
    console.log(this.activeIds);
  },
  methods: {
    getActiveClass (id) {
      console.log(id);
      console.log(this.activeId.value);
      if (id === this.activeId.value) {
        return "active";
      }
      return "";
    },
    setSubMenu () {
      console.log(this.activeId.value);
      if (this.menu && this.menu.length > 0) {
        let cur = this.menu.find(v => v.id === this.activeId.value);
        console.log(cur);
        if (cur) {
          // return cur._child;
          this.subMenu = cur._child;
        }
      }
    },
    itemClick (item) {
      const newActiveId = item.id;
      if (newActiveId !== this.activeId.value) {
        this.activeId.value = newActiveId;
        const child = this.getActiveSubMenu();
        console.log(child);
        const subIds = this.getSubIds(child);
        console.log(subIds);
        this.$emit("change", [newActiveId, ...subIds]);
      }
    },
    getActiveSubMenu () {
      return this.menu && this.menu.find((v) => v.id === this.activeId.value)._child;
    },
    onSubActiveIdChange (ids) {
      this.$emit("change", [this.activeId.value].concat(ids));
    },
    getSubIds (child) {
      const subIds = [];
      const traverse = (data) => {
        if (data && data.length) {
          const first = data[0];
          subIds.push(first.id);
          traverse(first._child);
        }
      };
      traverse(child);
      return subIds;
    },
    getData (id) {
      let stack = JSON.parse(JSON.stringify(this.menu));
      let result = null;
      while (stack.length) {
        let cur = stack.shift();
        if (cur.id === id) {
          result = cur;
        }
        if (cur._child && cur._child.length > 0) {
          stack = [...stack, ...cur._child];
        }
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
.nest {
  .wrapper {
    .current-item {
      margin-right: 10px;
      cursor: pointer;
      &.active {
        background: red;
        color: #fff;
      }
    }
  }
}
</style>