<template>
  <div class="welcome">
    <el-card shadow="hover">
      <div slot="header" class="hdTile">
        <i class="el-icon-message-solid"></i>
        <span>欢迎使用牛牛后台管理系统</span>
      </div>
      <div class="main">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-card shadow="never">
              <el-calendar> </el-calendar>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="tianqi" shadow="never">
              <div slot="header" class="tqTitle">
                <i class="el-icon-sunny"></i>
                <span>最近三天天气</span>
              </div>
              <div class="main">
                <el-card
                  shadow="hover"
                  class="item"
                  v-for="(item, idx) in tqList"
                  :key="idx"
                >
                  <div class="itemInner">
                    <div class="left">
                      <div class="icon">
                        <img :src="getTqIcon(item.conditionIdDay)" alt="" />
                      </div>
                      <div class="num">
                        {{ item.tempNight + "~" + item.tempDay }}
                      </div>
                      <div class="text">
                        {{ item.conditionDay }}/{{ item.windDirDay }}
                      </div>
                    </div>

                    <div class="right">
                      <div class="day">{{ getDay(idx) }}</div>
                      <div class="time">{{ item.predictDate }}</div>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import { tqData } from "@/api/networks";
export default {
  data() {
    return {
      tqList: [],
    };
  },
  methods: {
    //获取天数方法
    getDay(idx) {
      if (idx == 0) {
        return "今天";
      } else if (idx == 1) {
        return "明天";
      } else if (idx == 2) {
        return "后天";
      } else {
        return;
      }
    },
    //获取天气图标
    getTqIcon(num = 0) {
      return require("@/assets/tqIcon/W" + num + ".png");
    },
    //
    getTianQi() {
      tqData().then((res) => {
        //console.log(res);
        this.tqList = res.data.data.forecast;
        var ajData = { sessList: this.tqList, time: Date.now() };
        ajData = JSON.stringify(ajData);
        window.sessionStorage.setItem("ajData", ajData);
      });
    },
  },
  mounted() {
    var myData = window.sessionStorage.getItem("ajData");
    myData = JSON.parse(myData);
    //console.log(myData);
    if (myData) {
      var oldData = myData.time;
      var nData = Date.now();
      if (nData - oldData > 1000 * 60 * 60) {
        this.getTianQi();
      } else {
        this.tqList = myData.sessList;
      }
    } else {
      this.getTianQi();
    }
  },
};
</script>
<style lang="less" scoped>
.welcome {
  .hdTile {
    font-size: 30px;
    color: #409eff;
    font-weight: 600;
    span {
      padding-left: 20px;
    }
  }
  .tqTitle {
    font-size: 20px;
    color: #67c23a;
    i {
      font-size: 22px;
      padding-right: 10px;
    }
  }
  .main {
    .item {
      margin-bottom: 15px;
      .itemInner {
        display: flex;
        justify-content: space-between;
        text-align: center;
        .left {
          display: flex;
          align-items: center;
          .icon {
            img {
              width: 48px;
              height: 48px;
            }
          }
          .num {
            font-size: 36px;
            font-weight: 600;
            padding: 0 20px;
            color: #333;
            position: relative;
            &::after {
              content: "";
              display: block;
              width: 10px;
              height: 10px;
              border: 2px solid #333;
              position: absolute;
              right: 5px;
              top: 0;
              border-radius: 50%;
              box-sizing: border-box;
            }
          }
          .text {
            font-size: 16px;
            color: #409eff;
            transform: translateY(10px);
          }
        }
        .right {
          text-align: right;
          .day {
            font-size: 28px;
            font-weight: 600;
            color: #67c23a;
            padding-bottom: 10px;
          }
          .time {
            font-size: 14px;
            color: #aaa;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>