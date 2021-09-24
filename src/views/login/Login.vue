<template>
  <div class="login">
    <div class="out">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <div class="inner">
        <el-form
          label-width="100px"
          :model="loginForm"
          :rules="loginRules"
          status-icon
          ref="myform"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认登陆</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {loginAxios} from "@/api/networks"
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "用户名需要3-9位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 9, message: "密码需要6-12位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //提交表单
    onSubmit() {
      this.$refs["myform"].validate((valid) => {
        if (!valid) {
          this.$message.error("用户名和密码是必须填写的");
          return;
        }
        loginAxios(this.loginForm).then((res)=>{
          console.log(res)
            if(res.data.code=="401"){
            this.$message.error(res.data.txt)
          }else if(res.data.code=="200"){
            this.$message.success("登录成功");
            window.sessionStorage.setItem("token",res.data.token)
            this.$router.push("/home");
          }
        })

        // axios({
        //   url:"/login.php",
        //   params:this.loginForm
        // }).then((res)=>{
        //   console.log(res);
        //   if(res.data.code=="401"){
        //     this.$message.error(res.data.txt)
        //   }else if(res.data.code=="200"){
        //     this.$message.success("登录成功");
        //     this.$router.push("/home");
        //   }
        // })
         
      });
    },
    //重置表单
    onReset() {
      this.$refs["myform"].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  background: #0d3f67;
  height: 100%;
  position: relative;
  .out {
    height: 340px;
    width: 460px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .logo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      left: calc(50% - 60px);
      top: -60px;
      box-shadow: 0 0 20px rgba(255, 254, 254, 0.3);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .inner {
      min-height: 200px;
      padding-top: 100px;
      padding-right: 50px;
    }
  }
}
</style>