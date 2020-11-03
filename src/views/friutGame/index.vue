<template>
  <div class="friutGame z-h-100">
    <div class="friutGame-wrapper">
      <div class="friut-list" v-for="item in itemData"  :key="item.direction" :class="['direction'+item.direction]">
      <friutItem v-for="sitem in item.children" :item="sitem" :key="sitem.name"></friutItem>
    </div>
    </div>

    <!-- <div class="toolbar">
      <el-button size="mini" type="primary">编辑</el-button>
      <el-button size="mini">其它功能</el-button>
    </div>
    <div class="previewDos">
      <iframe
      src="https://view.officeapps.live.com/op/view.aspx?src=http://hedaotest.gdpr.com/taskManager/a/comm/attachment/download/5357"
      width="100%"
      height="100%"
    ></iframe>
    </div> -->
  </div>
</template>

<script>
import friutItem from "./components/friutItem";
export default {
  name: "friutGame",
  components: {
    friutItem
  },
  data() {
    return {
      itemData: [
        { direction: "top", children: [
          {name: "bigApple", src: require("./images/bigApple.png")},
          {name: "smallApple", src: require("./images/smallApple.png")},
          {name: "bigBanana", src: require("./images/bigBanana.png")},
          {name: "smallBanana", src: require("./images/smallBanana.png")}
        ]}
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.friutGame-wrapper{
  width: 350px;
  height: 350px;
  margin:0 auto;
}
.friut-list{
  display:flex;
  /* flex-direction:column; */
  .friutItem{
    flex: 1;
    height:87.5px;
    padding:10px;
  }
}

.toolbar{
  width: 100%;
  height:40px;
  display:flex;
  align-items:center;
  padding:0 10px;
}
.previewDos{
  height: calc(100% - 40px);
}
</style>