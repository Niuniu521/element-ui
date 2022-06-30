<template>
  <div class="app-container">
    <MySearch :form="searchForm" :items="searchItems" @submitForm="getList"/>
    <MyTable
      :loading="loading"
      :columns="columns"
      :tableData="tableData"
      :addShow="true"
      :showCheck="true"
      :deleteShow="true"
      :deletesShow="true"
      @handleAdd="handleAdd"
      @handleDelete="handleDelete"
      @handleQuery="handleQuery"
      @handleUpdate="handleUpdate"
      idField="id"
    />
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.num"
      @pagination="getList"
    />
    <!-- 添加或修改网格对话框 -->
    <ModalForm
      v-if="open"
      :title="title"
      :visible="open"
      :items="modalItems"
      :form="form"
      :rules="rules"
      @cancel="cancel"
      @submitForm="submitForm"
      :loading="modalLoading">
    </ModalForm>
  </div>
</template>

<script>
// import {listData, delData, addData, updateData, exportData} from "@/api/dataManage/Qdata";
import { listData,delUser,upDAta,addUser,getKefuInfo} from "@/api/networks"
// import { getPcity} from "@/api/basicinfo/area";
// import GeometryDraw from "@/components/Map/GeometryDraw";
import { dataRules } from "@/assets/js/validata.js";
import { myDate } from "@/assets/js/common.js"
import ModalForm from "@/components/ModalForm";
import MySearch from "@/components/MySearch";
import PublicService from "@/services/PublicService";
import MyTable from "@/components/MyTable";

export default {
  components: {
    MyTable,
    ModalForm,
    MySearch,
  },
  name: "News",
  data() {
    return {
      Status:[],
      searchForm: {},
      searchItems: [
          {type: 'input', label: '项目名称', paramName: 'keyword'},
           {type: 'input', label: '申报年份', paramName: 'keyword'},
      ],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 总条数
      total: 0,
      // 表格列
      columns: [
        {title: '姓名', dataIndex: 'nickname'},
        {title: '日期', dataIndex: 'posttime',dateType: "date", formatter: (row)=>{
          
          return (myDate(row.posttime));
        }},
         {title: '电话', dataIndex: 'contact'},
        {title: '微信', dataIndex:'weixin'},
        {title: 'QQ', dataIndex: 'qq'},
        {title:'专业方向',dataIndex:'zhuanye'},
        {title:'信息来源',dataIndex:'laiyuan'},
        {title: '地区', dataIndex:'dizhi'},
        {title:'客服',dataIndex:'kefu'},
      ],
      // 表格数据
      tableData: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      modalLoading: false,
       // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        page: 1,
        num: 20,
      },
      // 表单参数
      form: {},
      modalItems: [
        {type: 'input', label: '姓名', paramName: 'nickname'},
        {type: 'input', label: '日期', paramName: 'posttime',dateType: "date", format: 'yyyy-MM-dd'},
        {type: 'input', label: '电话', paramName: 'contact'},
        {type: 'input', label: '微信', paramName: 'weixin'},
        {type: 'input', label: 'QQ', paramName: 'qq'},
        {type: 'input', label: '专业方向', paramName: 'zhuanye'},
        {type: 'input', label: '信息来源', paramName: 'laiyuan'},
        {type: 'input', label: '地区', paramName: 'dizhi'},
        {type: 'select', label: '客服', paramName: 'kefu',options: this.Status},
      ],

      // 表单校验
      rules:{},
      xiurules: {
         nickname: [
          {required: true, message: "姓名不能为空", trigger: "change"}
        ],
       
         laiyuan: [
          {required: true, message: "信息来源不能为空", trigger: "change"},
        ],
         kefu: [
          {required: true, message: "客服不能为空", trigger: "change"}
        ]
      },

      addRule: {
         nickname: [
          {required: true, message: "姓名不能为空", trigger: "change"}
        ],
       
         laiyuan: [
          {required: true, message: "信息来源不能为空", trigger: "change"},
        ],
         kefu: [
          {required: true, message: "客服不能为空", trigger: "change"}
        ],
        qq: [{ validator: dataRules, trigger: "blur" }],
        contact: [{ validator: dataRules, trigger: "blur" }],
        weixin: [{ validator: dataRules, trigger: "blur" }],
      },
    };
  },
  created() {
      this.getKfInfo();
      this.getList();

  },
  methods: {
    getKfInfo() {
      getKefuInfo().then((res) => {
        console.log(res.data.kefu);
        res.data.kefu.forEach((item,index) => {
          let str={
          value:item.classname,
          label:item.classname
          }
          this.Status.push(str)
        });
        console.log(this.Status);
        this.setData({t: this, name: 'modalItems', paramName: 'kefu'}, this.Status);
      // (this.Status = res.data.kefu), 
      // (this.infoList = res.data.infoclass);
      });
    },
    /** 查询网格列表 */
    getList() {
      this.loading = true;
      let params = {...this.queryParams, ...this.searchForm};
      listData(params).then(res => {
        let tableData = [];
        console.log(res);
           if (res.results) {
          tableData = res.results
          console.log(tableData);
        }
        let {num, page} = params;
        this.tableData = PublicService.transformArrayData(tableData, true, true, num, page);
        this.total = res.num;
        console.log(this.total);
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {};
      this.map = null;
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加数据";

      this.rules=this.addRule;
      console.log(this.rules);
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.rules=this.xiurules
      this.reset();
      this.form = {...row};
      this.open = true;
      this.title = "修改数据";
    },
    /** 提交按钮 */
    submitForm() {
      let val = {...this.form};
      let {kefu} = val;
      val.kefu=kefu.split("");
      if (val.id) {
        upDAta(val).then(response=> {
          this.msgSuccess("修改成功");
          this.open = false;
          this.getList();
        });
      }  else {
        addUser(val).then(response=> {
          console.log(val);
          this.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(ids) {
      delUser(ids).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      });
    },
    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.exportLoading = true;
    //   exportData(queryParams).then(response => {
    //     this.download(response.msg);
    //     this.exportLoading = false;
    //   })
    // }
  }
};
</script>
