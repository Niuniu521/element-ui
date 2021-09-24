<template>
  <div>
    <div class="dataone" ref="dataOne" style="width: 100%; height: 400px"></div>
  </div>
</template>
<script>
import { paiMing } from "../../../api/networks";
var echarts = require("echarts");
export default {
  props: {
    pullTime: Array,
  },
  watch: {
    pullTime() {
      this.getpaiMing();
    },
  },
  data() {
    return {
      kefuArr: [],
      dataM: [],
      zong: [],
    };
  },
  mounted() {
    this.getpaiMing();
  },
  methods: {
    getpaiMing() {
      paiMing(this.pullTime).then((res) => {
        // console.log(res);
        this.kefuArr = res.data.kefu;
        this.dataM = res.data.dateM;
        this.zong = res.data.zong;
        this.initEcharts();
      });
    },
    initEcharts() {
      var myChart = echarts.init(this.$refs["dataOne"]);
      var options = {
        title: {
          text: "最近排名趋势",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.kefuArr,
          left: "center",
          bottom: 0,
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "16%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dataM,
        },
        yAxis: {
          type: "value",
        },
        series: this.zong,
      };
      myChart.setOption(options);
    },
  },
};
</script>
<style lang="less"  scoped>
</style>