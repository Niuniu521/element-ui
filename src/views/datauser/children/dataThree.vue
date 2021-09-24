<template>
  <div class="dataThree" ref="dataThree"></div>
</template>
<script>
var echarts = require("echarts");
import { kfdata } from "@/api/networks";
export default {
  props: {
    pullTime: Array,
  },
  watch:{
    pullTime(){
      this.getfenbu();
    }
  },
  data() {
    return {
      kefu: [],
      num: [],
    };
  },
  mounted() {
    this.getfenbu();
  },
  methods: {
    getfenbu() {
      kfdata(this.pullTime).then((res) => {
        // console.log(res);
        this.kefu = res.data.kefu;
        this.num = res.data.num;
        this.initEcharts();
      });
    },
    initEcharts() {
      var myChart = echarts.init(this.$refs["dataThree"]);
      var options = {
        title: {
          text: "客服录入统计量",
          left: "center",
        },
        color: "pink",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.kefu,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: this.num,
          },
        ],
      };

      myChart.setOption(options);
    },
  },
};
</script>
<style lang="less" scoped>
.dataThree {
  width: 100%;
  height: 400px;
}
</style>