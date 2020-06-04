<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{path:tag.path,query:tag.query,fullPath:tag.fullPath}"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{tag.title}}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </ScrollPane>
    <ul v-show="visible" class="contextmenu" :style="{left:left+'px',top:top+'px'}">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)" v-if="!isAffix(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">全部关闭</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
export default {
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews;
    },
    routes () {
      return this.$store.state.permission.routes;
    }
  },
  components: {
    ScrollPane
  },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {} // 当前选择标签
    };
  },
  watch: {
    $route () {
      // console.log("routeChan");
      console.log("routeChan");
      this.addTags();
    },
    visible (value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  methods: {
    // 关闭所有的标签
    closeAllTags (view) {
      this.$store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        console.log(visitedViews);
        this.toLastView(visitedViews, view);
      });
    },

    // 关闭其他页面
    closeOthersTags () {
      // console.log(this.selectedTag);
      this.$router.push(this.selectedTag);
      this.$store.dispatch("tagsView/delOthersViews", this.selectedTag).then(() => {
        console.log("xxxx");
      });
    },
    // 刷新当前页面
    refreshSelectedTag (view) {
      this.$store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath
          });
        });
      });
    },
    closeMenu () {
      this.visible = false;
    },
    // 打开菜单
    openMenu (tag, e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left;
      const offsetWidth = this.$el.offsetWidth;
      const maxLeft = offsetWidth - menuMinWidth;
      const left = e.clientX - offsetLeft + 15;
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    isActive (route) {
      return route.path === this.$route.path;
    },
    isAffix (tag) {
      return tag.meta && tag.meta.affix;
    },
    // 增加tag
    addTags () {
      const { name } = this.$route;
      console.log(name);
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    // 删除tag
    closeSelectedTag (view) {
      this.$store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      });
    },
    // 跳转到某个路由
    toLastView (visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        if (view.name === "Dashboard") {
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    }
  },
  mounted () {
    this.addTags();
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>