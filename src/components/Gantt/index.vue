<template>
  <div ref="gantt"></div>
</template>

<script>
/* eslint-disable indent */

import { gantt } from "dhtmlx-gantt";
// import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js";
export default {
  name: "gantt",
  props: {
    tasks: {
      type: Object,
      default () {
        return { data: [], links: [] };
      }
    }
  },

  mounted: function () {
    gantt.config.xml_date = "%Y-%m-%d";
    gantt.plugins({
      tooltip: true,
      marker: true
    });
    gantt.i18n.setLocale({
      date: {
        month_full: ["1月", "2月", "3月", "4月", "5月", "6月",
          "7月", "8月", "9月", "10月", "11月", "12月"],
        month_short: ["1月", "2月", "3月", "4月", "5月", "6月", "7月",
          "8月", "9月", "10月", "11月", "12月"],
        day_full: ["星期日", "星期一", "星期二", "星期三", "想起四",
          "星期五", "星期六"],
        day_short: ["日", "一", "二", "三", "四", "五", "六"]
      },
      labels: {
        new_task: "New task",
        icon_save: "确定",
        icon_cancel: "取消",
        icon_details: "Details",
        icon_edit: "Edit",
        icon_delete: "删除",
        gantt_save_btn: "New Label",
        gantt_cancel_btn: "New Label",
        gantt_delete_btn: "New Label",
        confirm_closing: "", // Your changes will be lost, are you sure?
        confirm_deleting: "Task will be deleted permanently, are you sure?",
        section_description: "Description",
        section_time: "Time period",
        section_type: "Type",

        /* grid columns */
        column_wbs: "WBS",
        column_text: "Task name",
        column_start_date: "Start time",
        column_duration: "Duration",
        column_add: "",

        /* link confirmation */
        link: "Link",
        confirm_link_deleting: "will be deleted",
        link_start: " (start)",
        link_end: " (end)",

        type_task: "Task",
        type_project: "Project",
        type_milestone: "Milestone",

        minutes: "分钟",
        hours: "小时",
        days: "天",
        weeks: "周",
        months: "月",
        years: "年",

        /* message popup */
        message_ok: "OK",
        message_cancel: "Cancel",

        /* constraints */
        section_constraint: "Constraint",
        constraint_type: "Constraint type",
        constraint_date: "Constraint date",
        asap: "As Soon As Possible",
        alap: "As Late As Possible",
        snet: "Start No Earlier Than",
        snlt: "Start No Later Than",
        fnet: "Finish No Earlier Than",
        fnlt: "Finish No Later Than",
        mso: "Must Start On",
        mfo: "Must Finish On",

        /* resource control */
        resources_filter_placeholder: "type to filter",
        resources_filter_label: "hide empty"
      }
    });
    gantt.config.scale_unit = "day"; // "minute", "hour", "day", "week", "quarter", "month", "year"
    gantt.config.scale_height = 50;
    gantt.config.min_column_width = 80;
    gantt.attachEvent("onTemplatesReady", function () {
      // 依照年月日周显示日期
      gantt.templates.date_scale = function (date) {
        let y = gantt.date.date_to_str("%Y/%n/%j");
        y = y(date);
        let d = gantt.date.date_to_str("周%D");
        let md = d(date);
        let cy =
          '<div style="font-size:1.2em; height:20px; line-height:20px;">' +
          y +
          "</div>";
        let cd =
          '<div style="font-size:1.1em; height:15px; line-height:15px;">' +
          md +
          "</div>";
        return '<div style="padding:10px 0px;">' + cy + cd + "</div>";
      };
      // gantt_task_progress
      gantt.templates.task_text = function (start, end, task) {
        return "<b style='text-align:left;'>计划名称:</b> " + task.text + "    <span style='text-align:left;'>完成计划：" + Math.round(task.progress * 100) + "% </span>";
      };
      gantt.templates.tooltip_text = function (start, end, task) {
        return "<b>Task:</b> " + task.text + "<br/><b>Start date:</b> " +
          gantt.templates.tooltip_date_format(start) +
          "<br/><b>End date:</b> " + gantt.templates.tooltip_date_format(end);
      };
      gantt.templates.task_class = function (start, end, task) {
        console.log(task);
        return `milestone-${task.state}`;
      }
        ;
      // var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var markerId = gantt.addMarker({
        start_date: new Date(), // a Date object that sets the marker's date
        css: "today", // a CSS class applied to the marker
        text: "今天" // the marker title
        // title: dateToStr(new Date()) // the marker's tooltip
      });
      gantt.addMarker({
        start_date: new Date("2020-06-1"), // a Date object that sets the marker's date
        css: "today", // a CSS class applied to the marker
        text: "项目开始" // the marker title
        // title: dateToStr(new Date()) // the marker's tooltip
      });
      gantt.addMarker({
        start_date: new Date("2020-06-11"), // a Date object that sets the marker's date
        css: "today", // a CSS class applied to the marker
        text: "项目结束" // the marker title
        // title: dateToStr(new Date()) // the marker's tooltip
      });
      console.log(markerId);
    });
    console.log(gantt.templates);
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$props.tasks);
  },
  methods: {
    getJson () {
      return gantt.json.serialize();
    }
  }
};
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
.milestone-default {
  border: none;
  background: rgba(0, 0, 0, 0.45);
}
.milestone-unfinished {
  border: none;
  background: #5692f0;
}
.milestone-finished,
.milestone-finished .gantt_task_content {
  border: none;
  background: #84bd54;
}
.milestone-canceled {
  border: none;
  background: #da645d;
}
</style>