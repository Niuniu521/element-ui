<template>
  <el-form class="FORM_STYLE" v-loading="loading" ref="form" :model="form" :rules="rules" label-width="110px"  :disabled="disabled">
    <el-row :gutter="24">
      <el-col :span="item.span || 12" v-for="(item, index) in items" :key="index">
        <div v-if="item.type === 'icon'">
          <i :class="item.icon" :style="item.style" @click="onIconClick(item)">{{item.label}}</i>
        </div>
        <FormItem
          :propsIndex="propsIndex"
          v-else
          :rules="rules"
          :disabled="disabled"
          :item="item"
          :form="form"
        />
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import FormItem from "../FormItem";
export default {
  name: "ModalForm",
  components: {
    FormItem
  },
  props: {
    loading: Boolean,
    propsIndex: Number,
    form: Object,
    rules: Object/Array,
    items: Array,
    disabled: Boolean
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {
    getLabel(item) {
      let {type, disabled: itemDisabled, placeholder, label} = item;
      if (this.disabled || itemDisabled) {
        return ""
      }

      if (placeholder) {
        return placeholder
      }

      let text = ['input', 'textArea', 'number'].includes(type) ? "请输入" : "请选择";
      return `${text}${label}`
    },
    onIconClick({functionName}) {
      if (functionName) {
        this.$emit(functionName)
      }
    },
    validate(callback) {
      this.$refs["form"].validate(valid => {
        callback && callback(valid);
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.validate(valid => {
        this.$emit('submitForm', valid)
      })
    },
  }
};
</script>
<style lang="less">
.FORM_STYLE {
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner {
    background: #e3e3e3;
    color: #606266;
  }
}

</style>
