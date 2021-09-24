<template>
  <div class="datatwo" ref="dataTwo"></div>
</template>
<script>
var echarts = require("echarts");
import { zydata } from "@/api/networks";
export default {
  props:{
    pullTime:Array
  },
  watch:{
    pullTime(){
      this.getfenbu();
    }
  },
  data() {
    return {
      infoclass: [],
      list: [],
    };
  },
  mounted() {
    this.getfenbu();
  },
  methods: {
    getfenbu() {
      zydata(this.pullTime).then((res) => {
        this.infoclass = res.data.infoclass;
        this.list = res.data.list;
        this.initEcharts()
      });
    },
    initEcharts() {
      var myChart = echarts.init(this.$refs["dataTwo"]);
      var options = {
        title: {
          text: "咨询专业分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 0,
          left: "center",
          data: this.infoclass,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data:this.list,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(options);
    },
  },
};
</script>
<style lang="less" scoped>
.datatwo {
  width: 100%;
  height: 400px;
}
</style>