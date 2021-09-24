<template>
  <div class="datauser">
    <dataTop @timerFrame="timerFrame"/>

    <div class="dataMain">
      <el-card shadow="never" >
        <el-row :gutter="20"> 
          <el-col :span="8">
            <dataOne :pullTime="pullTime"/>
          </el-col>
          <el-col :span="8">
            <dataTwo :pullTime="pullTime" />
          </el-col>
          <el-col :span="8">
            <dataThree  :pullTime="pullTime"/>
          </el-col>
          <el-col>
            <br>
          </el-col>
          <el-col :span="24">
            <dataFour />
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import dataTop from "./children/dataTop.vue"
import dataOne from "./children/dataOne.vue"
import dataTwo from "./children/dataTwo.vue"
import dataThree from "./children/dataThree.vue"
import dataFour from "./children/dataFour.vue"
export default {
  data(){
    return{
      pullTime:[]
    }
  },
  methods:{
    timerFrame(val){
      this.pullTime=val
    }
  },
  components:{
    dataTop,
    dataOne,
    dataTwo,
    dataThree,
    dataFour
  }
};
</script>
<style lang="less"  scoped>
.dataMain{
  margin-top:30px
}
</style>