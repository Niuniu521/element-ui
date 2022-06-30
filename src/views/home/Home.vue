<template>
  <div class="homeview">
    <el-container>
      <el-header>
        <div class="logo" @click="gowelcome">
          <img src="@/assets/logo2.png" alt="" />
          <div class="text">数据分析·管理系统</div>
        </div>
        <div class="uplogin">
          <el-popconfirm title="确定要退出登录吗？" @confirm="outLogin">
            <el-button type="danger" slot="reference">退出登录</el-button>
          </el-popconfirm>
        </div>
      </el-header>
      <el-container class="homeContent">
        <el-aside :width="isCollapse? '64px': '150px'">
          <el-tooltip effect="dark" content="展开与折叠" placement="right">
          <div class="fold" @click="clickFold">
            <i class="el-icon-d-arrow-left" v-show="!isCollapse"></i>
            <i class="el-icon-d-arrow-right" v-show="isCollapse"></i>
          </div>
          </el-tooltip>

          <el-menu
            background-color="#304156"
            text-color="rgba(255,255,255,0.5)"
            active-text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="collFase"
            :default-active="$route.path"
            router>
            <el-menu-item index="/all">
              <i class="el-icon-coin"></i>
              <span slot="title">意向客户</span>
            </el-menu-item>

            <el-menu-item index="/add">
              <i class="el-icon-user"></i>
              <span slot="title">添加客户</span>
            </el-menu-item>

            <el-menu-item index="/data">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">数据分析</span>
            </el-menu-item>

            <el-menu-item index="/news">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">新方法</span>
            </el-menu-item>

            <!-- <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>后台管理</span>
              </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu> -->
          </el-menu>
        </el-aside>
        <el-main>

          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

export default {
  data(){
    return{
      isCollapse:false,
      collFase:false
    }
  },
  methods: {
    gowelcome(){
      this.$router.push("/welcome")
    },
    //退出登录
    outLogin() {
      window.sessionStorage.removeItem("token");
      this.$message.success("退出成功");
      this.$router.push("/login");
    },
    //展开与折叠
    clickFold(){
      this.isCollapse=!this.isCollapse
    }
  },
};
</script>
<style  lang="less" scoped>
.homeview {
  height: 100%;
}
.el-header {
  background: #17253f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    display: flex;
    align-items: center;
    img {
      display: block;
      height: 40px;
    }
    .text {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.6);
      padding-left: 20px;
    }
  }
}
.el-aside {
  background: #304156;
  position: relative;
  .fold{
    background: #17253f;
    position:absolute;
    right:0;
    color: #ccc;
    width: 30px;
    line-height: 60px;
    font-size: 26px;
    top:calc(50% - 30px)
  }
  .el-menu {
    border-right: none;
  }
}
.el-container {
  background: #f8f8f8;
  height: 100%;
}
.homeContent{
  height: calc(100% - 60px);
}
</style>