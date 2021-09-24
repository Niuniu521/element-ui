<template>
  <div class="updata" >
  <el-dialog width="50%" title="修改客户数据" :visible="showDate" @close="clickClose" :close-on-click-modal="false">
    <el-form
            :model="adduserForm"
            :rules="adduserRules"
            ref="adduserForm"
            label-width="200px"
            status-icon>
            <el-form-item label="客户名称" prop="nickname">
              <el-input v-model.trim="adduserForm.nickname"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" prop="contact" >
              <el-input v-model.trim="adduserForm.contact"></el-input>
            </el-form-item>

            <el-form-item label="QQ" prop="qq">
              <el-input v-model.trim="adduserForm.qq"></el-input>
            </el-form-item>

            <el-form-item label="微信" prop="weixin">
              <el-input v-model.trim="adduserForm.weixin"></el-input>
            </el-form-item>

            <el-form-item label="咨询专业" prop="zhuanye">
              <el-input
                placeholder="请输入内容"
                v-model.trim="adduserForm.zhuanye"
              >
                <el-select
                  v-model="adduserForm.infoclass"
                  slot="prepend"
                  placeholder="请选择"
                  class="zyselect"
                >
                  <el-option
                    :value="item.classname"
                    v-for="item in infoList"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item label="信息来源" prop="laiyuan">
              <el-input v-model="adduserForm.laiyuan"></el-input>
            </el-form-item>

            <el-form-item label="地区" prop="dizhi">
              <el-input v-model="adduserForm.dizhi"></el-input>
            </el-form-item>

            <el-form-item label="选择客服" prop="kefu">
              <el-select
                v-model="adduserForm.kefu"
                placeholder="请选择"
                multiple
              >
                <el-option
                  :value="item.classname"
                  v-for="item in kefuList"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-button
                    type="primary"
                    style="width: 100%"
                    @click="onUpdate"
                    >确认提交</el-button
                  >
                </el-col>
                <el-col :span="2">
                  <el-button @click="delForm">重置</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { dataRules } from "@/assets/js/validata.js";
import { getKefuInfo,getUser,upDAta} from "@/api/networks";
export default {
data(){
  return {
    kefuList: [],
    infoList: [],
    showDate:false,
    rowid:0,
    adduserForm: {
        nickname: "",
        contact: "",
        qq: "",
        weixin: "",
        laiyuan: "",
        dizhi: "",
        kefu: [],
        zhuanye: "",
        infoclass: "",
    },
    adduserRules: {
        nickname: [
          { required: true, message: "请输入客户名字", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        qq: [{ validator: dataRules, trigger: "blur" }],
        contact: [{ validator: dataRules, trigger: "blur" }],
        weixin: [{ validator: dataRules, trigger: "blur" }],
        laiyuan: [
          { required: true, message: "信息来源必须填写", trigger: "blur" },
        ],
        zhuanye: [
          { required: true, message: "专业描述必须填写", trigger: "blur" },
        ],
        kefu: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个客服",
            trigger: "change",
          },
        ],
    },
  }
},
mounted(){
  this.getKfInfo();
  var userRes =window.sessionStorage.getItem("userRes");
  if(userRes){
    window.sessionStorage.removeItem("userRes")
  }

 
},
methods:{
  //获取用户数据
  getUserFun(){

    getUser(this.rowid).then(res=>{
      console.log(res.data.results);
      this.$refs["adduserForm"].resetFields();
      res.data.results.kefu=res.data.results.kefu.split("-")
      this.adduserForm=res.data.results
      var userRes=res.data.results
      userRes=JSON.stringify(userRes)
      window.sessionStorage.setItem("userRes",userRes)
    })
  },
  
  //重置表单
  delForm(){
    this.getUserFun()

  },
  //提交修改
  onUpdate(){
     this.$refs["adduserForm"].validate(valid=>{
       if(valid){
         upDAta(this.adduserForm).then(()=>{
            this.$message.success("更新成功"),
            this.showDate=false,
            this.$parent.getAlldata()
          // this.$emit("abc",{})
          // console.log(res);
    })

       }
     })

  },
  //关闭对话框
  clickClose(){
    window.sessionStorage.removeItem("userRes")
    this.showDate=false
  },
  getKfInfo() {
    getKefuInfo().then((res) => {
      (this.kefuList = res.data.kefu), (this.infoList = res.data.infoclass);
      });
    },
}
}
</script>
<style lang="less" scoped>
.zyselect {
  width: 120px;
}
</style>