<template>
  <div>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5" v-if="addShow">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5" v-if="editShow">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5" v-if="deletesShow">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="!ids.length"
          @click="handleDeletes"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5" v-if="downLoad">
        <el-button
          type="info"
          plain
          icon="el-icon-download"
          size="mini"
         @click="importTemplate"
          >下载模板</el-button
        >
      </el-col>
      <el-col :span="1.5" v-if="importShow">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          >导入</el-button
        >
      </el-col>
      <el-col :span="1.5" v-if="exportShow">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
          >导出</el-button
        >
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"  
    >
      <!-- 复选框 -->
      <el-table-column
        type="selection"
        :fixed="tableFixed"
        width="50px"
        label="全部"
        align="center"
        v-if="showCheck"
      />

      <el-table-column
        width="60px"
        :fixed="tableFixed"
        align="center"
        type="index"
        label="序号"
        v-if="showIndex"
      />

      <!-- 表格数据 -->
      <template v-for="(column, index) in columns">
        <el-table-column
          :key="index"
          :fixed="column.fixed"
          :prop="column.dataIndex"
          :label="column.title"
          :align="column.align || 'center'"
          :width="column.width"
          :formatter="column.formatter"
          :sortable="column.sortable"
          show-overflow-tooltip
          ref="tab"
        >
        </el-table-column>
      </template>

      <el-table-column
        :fixed="tableFixed && 'right'"
        v-if="!hideOperate"
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        :width="operateWidth"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in operateButtons"
            :key="index"
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-show="scope.row.taskStatusName!='已完成'"
            @click="operateButton(item, scope.row)"
            >{{ item.label }}</el-button
          >
          <el-button
            v-if="viewShow"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleView(scope.row)"
            >查看</el-button
          >
          <el-button
            v-if="editBtnShow"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            v-if="deleteShow"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 导入对话框 -->
    <el-dialog
      :title="upload.title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
    >
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的数据
          <!-- <el-link type="info" style="font-size: 12px" @click="importTemplate"
            >下载模板</el-link
          > -->
        </div>
        <div class="el-upload__tip" style="color: red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from "@/utils/auth";
export default {
  name: "MyTable",
  props: {
    tableFixed: String,
    operateWidth: [Number,String],
    idField: {
      type: String,
      default: "id",
    },
    addShow: {
      type: Boolean,
      default: false,
    },
    editShow: {
      type: Boolean,
      default: false,
    },
    viewShow: {
      type: Boolean,
      default: false,
    },
    editBtnShow: {
      type: Boolean,
      default: true,
    },
    deletesShow: {
      type: Boolean,
      default: false,
    },
    deleteShow: {
      type: Boolean,
      default: false,
    },
    importShow: {
      type: Boolean,
      default: false,
    },
    downLoad:{
      type: Boolean,
      default: false,
    },
    exportShow: {
      type: Boolean,
      default: false,
    },
    showCheck: {
      type: Boolean,
      default: false,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    exportLoading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default:()=>{
        return []
      },
    },
    tableData: {
      type: Array,
      default: ()=>{
        return []
      },
    },
    operateButtons: Array,
    hideOperate: Boolean,
  },
  data() {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,

      //用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        // isUploading: false,
        // // 是否更新已经存在的用户数据
        // updateSupport: 0,
        // // 设置上传的请求头部
        // headers: { Authorization: "Bearer " + getToken() },
        // // 上传的地址
        // url: process.env.VUE_APP_BASE_API + "/detection-data-record/importData",
      },
    };
  },
  mounted() {
    console.log(this.$refs.tab);
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item[this.idField]);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.$emit("handleAdd");
    },
    // 操作按钮
    operateButton(item, row) {
      console.log(row);
      let { functionName } = item;
      if (functionName) {
        this.$emit(functionName, row);
      }
    },
    /** 查看按钮操作 */
    handleView(row) {
      this.$emit("handleView", row);
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.$emit("handleUpdate", row);
    },
    handleDeletes() {
      this.$confirm("是否确认删除所选数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("handleDeletes", this.ids);
        })
        .catch(() => {});
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      console.log(row);
      const num = row.num;
      this.$confirm('是否确认删除此数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("handleDelete", row[this.idField]);
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.$confirm("是否确认导出所有数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("handleExport");
        })
        .catch(() => {});
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.$emit("importTemplate");
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.$emit("importSuccess");
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style lang="less" scoped>
/* .el-table .cell {
  padding-left: 0px;
} */
.caseMemo{
  width: 75px;
  height: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    color:  #24c1ff;
    overflow: visible;
    text-overflow: inherit;
    cursor: pointer;
  }
}
</style>