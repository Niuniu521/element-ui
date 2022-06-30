<template>
  <div class="alluser">
    <el-card shadow="never" class="top">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input
            @change="ckSearch"
            v-model="myUser.keyword"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            plain
            icon="el-icon-search"
            style="width：100%"
            @click="ckSearch"
            >搜索</el-button
          >
        </el-col>
      </el-row>
    </el-card>

    <div class="allusermain">
      <el-table :data="userdata" border stripe style="width: 100%">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="nickname" label="姓名" width="100">
        </el-table-column>
        <el-table-column label="日期" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time" style="font-size: 12px"></i>
            <span style="margin-left: 5px; font-size: 12px">{{
              myDate(scope.row.posttime)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="电话" width="130">
        </el-table-column>
        <el-table-column prop="weixin" label="微信" width="130">
        </el-table-column>
        <el-table-column prop="qq" label="QQ" width="130"> </el-table-column>
        <el-table-column label="专业方向">
          <template slot-scope="scope">
            <div class="classname">{{ scope.row.infoclass }}</div>
            {{ scope.row.zhuanye }}
          </template>
        </el-table-column>
        <el-table-column prop="laiyuan" label="信息来源"> </el-table-column>
        <el-table-column prop="dizhi" label="地区"> </el-table-column>
        <el-table-column prop="kefu" label="客服" width="100">
        </el-table-column>

        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="small"
                @click="clickUpdata(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="clickDel(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-card shadow="never" class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <update ref="upDate" />
  </div>
</template>
<script>
import { userAllFun, delUser } from "@/api/networks"
import { myDate } from "@/assets/js/common.js"
import update from  "./update/Update.vue"
export default {
  components:{
    update
  },
  data() {
    return {
      userdata: [],
      total: 0,
      myUser: {
        num: 20,
        page: 1,
        keyword: "",
      },
    };
  },
  mounted() {
    this.getAlldata();
  },
  methods: {
    // abc(){
    //   this.getAlldata();
    // },
    //修改
    clickUpdata(value){
      this.$refs.upDate.rowid=value
      this.$refs.upDate.showDate=true;
      this.$refs.upDate.getUserFun()
      
    },
    //点击删除
    clickDel(val) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        this.getAlldata();
        delUser(val).then(() => {
          this.getAlldata();
        });
      });
      // return;
    },
    //点击搜索
    ckSearch() {
      this.getAlldata();
    },
    //每页条数改变
    handleSizeChange(e) {
      console.log(e);
      this.myUser.num = e;
      this.getAlldata();
    },
    //页码切换
    handleCurrentChange(e) {
      console.log(e,111111111);
      (this.myUser.page = e),
       this.getAlldata();
    },
    //时间戳转化
    myDate(time) {
      return myDate(time);
    },

    getAlldata() {
      userAllFun(this.myUser).then((res) => {
        //console.log(res);
        this.userdata = res.data.results;
        this.total = res.data.num;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.allusermain {
  margin-top: 30px;
}
.classname {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  transform: scale(0.9);
  color: #409eff;
}
.pages {
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
}
</style>