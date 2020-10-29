<template>
  <div class="leftSetting">
    <div v-for="item in listData" :key="item.name">
      <div class="leftSetting-title">
        {{item.name}}
      </div>
      <div class="leftSetting-buttons">
        <a v-for="sItem in item.children" :key="sItem.name" :title="sItem.name"  @dragstart="drag($event,sItem)" draggable="true">
          <SvgIcon :iconClass="sItem.icon"></SvgIcon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon";
export default {
  name: "leftSetting",
  components: {
    SvgIcon
  },
  data() {
    return {
      listData: [
        {name: "基本图形", children: [
          {name: "矩形", icon: "rectangle", styleOptions: {shape: "rectangle"}},
          {name: "圆形", icon: "circle", styleOptions: {shape: "ellipse"}},
          {name: "三角形", icon: "triangel", styleOptions: {shape: "triangle"}},
          {name: "菱形", icon: "daimond", styleOptions: {shape: "rhombus"}},
          {name: "五边形", icon: "pentagon", styleOptions: {shape: "hexagon", perimeter: "hexagonPerimeter2", whiteSpace: "wrap", html: 1, fixedSize: 1, rounded: 1}},
          {name: "圆柱", icon: "yuanzhu", styleOptions: {shape: "cylinder", whiteSpace: "wrap", html: 1, boundedLbl: 1, backgroundOutline: 1, size: 15, rounded: 1}},
          {name: "平行四边形", icon: "parallelogram", styleOptions: {shape: "parallelogram", perimeter: "parallelogramPerimeter", whiteSpace: "wrap", html: 1, fixedSize: 1, rounded: 1}},
          {name: "聚合", icon: "juhe", styleOptions: {shape: "orEllipse"}}
        ]}
      ]
    };
  },
  methods: {
    drag (e, element) {
      console.log(element);
      e.dataTransfer.setData("data", JSON.stringify(element));
    }
  }
};
</script>

<style lang="scss" scoped>
.leftSetting{
  width: 160px;
  height: 100%;
  .leftSetting-title{
    color: #0d1a26;
    font-weight: 600;
    font-size: 12px;
    line-height: 1;
    padding: 5px 10px;
    margin-top: 8px;
    border-bottom: 1px solid #ddd;
  }
  .leftSetting-buttons{
    padding: 10px 0;
    a{
      display: inline-block;
      color: #314659;
      line-height: 1;
      width: 40px;
      height: 40px;
      text-align: center;
      text-decoration: none !important;
      cursor: pointer;
    }
    .svg-icon{
      font-size: 20px;
    }
  }
}
</style>

