<!--查询条件组件-->
<template>
  <el-form ref="queryForm" :model="form" :rules="rules" :inline="true" :label-width="labelWidth">
    <div style="display: flex; flex-wrap: wrap">
      <div v-for="(item, index) in items" :key="index">
        <FormItem :item="item" :form="form" :rules="rules" :disabled="disabled"/>
      </div>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import FormItem from "../FormItem";
  export default {
    name: "FormSearch",
    components: {
      FormItem
    },
    props: {
      form: {
        type: Object,
        default:()=>{
          return {}
        }
      },
      rules: Object,
      labelWidth: { type: String, default: '120px' },
      disabled: Boolean,
      items: {
        type: Array,
        default: ()=>{
          return []
        }
      }
    },
    data() {
      return {
      };
    },
    methods: {
      handleQuery() {
        this.$emit("submitForm")
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
    }
  };
</script>

<style lang="less" scoped>
  .form-search {
    overflow: hidden;
    background: #FFF;
    border-radius: 6px;
    margin: 6px 0;
    padding-top: 10px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }

  .form-search-wrap {
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
