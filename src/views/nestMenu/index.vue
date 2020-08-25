<template>
  <div class="nestMenu">
    <nest :menu="menu" :activeIds="ids" @change="activeIdsChange"></nest>
  </div>
</template>

<script>
import nest from "./components/nest";
export default {
  name: "nestMenu",
  components: {
    nest
  },
  data () {
    return {
      ids: [],
      activeId: 9,
      menu: [
        {
          id: 1,
          father_id: 0,
          status: 1,
          name: "生命科学竞赛",
          _child: [
            {
              id: 2,
              father_id: 1,
              status: 1,
              name: "野外实习类",
              _child: [{ id: 3, father_id: 2, status: 1, name: "植物学" }],
            },
            {
              id: 7,
              father_id: 1,
              status: 1,
              name: "科学研究类",
              _child: [
                { id: 8, father_id: 7, status: 1, name: "植物学与植物生理学" },
                { id: 9, father_id: 7, status: 1, name: "动物学与动物生理学" },
                { id: 10, father_id: 7, status: 1, name: "微生物学" },
                { id: 11, father_id: 7, status: 1, name: "生态学" },
              ],
            },
            { id: 71, father_id: 1, status: 1, name: "添加" },
          ],
        },
        {
          id: 56,
          father_id: 0,
          status: 1,
          name: "考研相关",
          _child: [
            { id: 57, father_id: 56, status: 1, name: "政治", _child: [{ id: 58, father_id: 57, name: "xxxx" }] },
            { id: 58, father_id: 56, status: 1, name: "外国语" },
          ],
        },
      ]
    };
  },
  methods: {
    findPath (menu) {
      let ids;

      const traverse = (subMenus, prev) => {
        if (ids) {
          return;
        }
        if (!subMenus) {
          return;
        }
        subMenus.forEach((subMenu) => {
          if (subMenu.id === this.activeId) {
            ids = [...prev, this.activeId];
            return;
          }
          traverse(subMenu._child, [...prev, subMenu.id]);
        });
      };

      traverse(this.menu, []);

      return ids;
    },
    activeIdsChange (newIds) {
      // ids.value = newIds;
      this.ids = newIds;
      console.log("当前选中的id路径", newIds);
    }
  },
  created () {
    // console.log(this.findPath());
    this.ids = this.findPath();
  }
};
</script>

<style>
</style>