<template>
  <el-form-item
    v-if="item.paramName"
    :label="item.label"
    :prop="item.paramName"
  >

    <!-- 文本输入 -->
    <el-input
      v-if="item.type === 'input'"
      style="width: 100%"
      :disabled="item.disabled || disabled"
      v-model="form[item.paramName]"
      :maxlength="item.maxlength"
      :minlength="item.minlength"
      show-word-limit
      :placeholder="getLabel(item)"
    />

    <!-- 多行文本输入 -->
    <el-input
      v-else-if="item.type === 'textArea'"
      :disabled="item.disabled || disabled"
      type="textarea"
      v-model="form[item.paramName]"
      :autosize="{ minRows: 3, maxRows: 4}"
      :minlength="item.minlength"
      :maxlength="item.maxlength || 200"
      show-word-limit
      :placeholder="getLabel(item)"
    />

    <!-- 数值输入 -->
    <el-input-number
      v-else-if="item.type === 'number'"
      :placeholder="getLabel(item)"
      :disabled="item.disabled || disabled"
      v-model="form[item.paramName]"
      controls-position="right"
      :min="item.min || 0"
      :max="item.max"
    />

    <!-- 下拉选择 -->
    <el-select
      v-else-if="item.type === 'select'"
      :disabled="item.disabled || disabled"
      style="width: 100%"
      :multiple="item.multiple"
      v-model="form[item.paramName]"
      :placeholder="getLabel(item)"
      @focus="val => item.onFocus && item.onFocus(val, propsIndex)"
      @change="val => {item.onChange && item.onChange(val, propsIndex)}"
      @remove-tag="val => {item.removeTag && item.removeTag(val)}"
      :remote-method="item.remoteMethod"
      :remote="item.remote"
      filterable
      clearable>
      <el-option
        v-for="dict in item.options"
        :key="dict.value"
        :label="dict.label"
        :value="dict.value"
      />
    </el-select>

    <!-- 级联选择 -->
    <el-cascader
      v-else-if="item.type === 'treeSelect'"
      :disabled="item.disabled || disabled"
      :options="item.options"
      style="width: 100%"
      v-model="form[item.paramName]"
      :props="{ checkStrictly: true, value: 'id', label: 'name', children: 'childs', ...item.props }"
      :show-all-levels="item.showAllLevels"
      :placeholder="getLabel(item)"
      clearable
      @change="val => {item.onChange && item.onChange(val)}"
    />
<el-cascader
      v-else-if="item.type === 'tree'"
      :disabled="item.disabled || disabled"
      :options="item.options"
      style="width: 100%"
      v-model="form[item.paramName]"
      :props="{ checkStrictly: true, value: 'code', label: 'name', children: 'childs', ...item.props }"
      :show-all-levels="item.showAllLevels"
      :placeholder="getLabel(item)"
      clearable
      @change="val => {item.onChange && item.onChange(val)}"
    />

    <!-- 日期选择 -->
    <el-date-picker
      style="width: 100%"
      v-else-if="item.type === 'datePicker'"
      :disabled="item.disabled || disabled"
      clearable
      :type="item.dateType || 'date'"
      :placeholder="getLabel(item)"
      v-model="form[item.paramName]"
      :value-format="item.format || 'yyyy-MM-dd'"
      :start-placeholder="getLabel(item)"
      :end-placeholder="getLabel(item)"
    />

    <!-- 单选 -->
    <el-radio-group v-else-if="item.type === 'radio'" v-model="form[item.paramName]">
      <el-radio
        v-for="dict in item.options"
        :key="dict.value"
        :label="dict.label"
        :value="dict.value"
      >{{ dict.dictLabel }}
      </el-radio>
    </el-radio-group>
    <!-- 开关 -->
    <el-switch v-if="item.type==='Switch'" v-model="form[item.paramName]" ></el-switch>
  </el-form-item>
</template>
<script>

export default {
  name: "ModalForm",
  props: {
    form: Object,
    item: Object,
    rules: Object,
    propsIndex: Number,
    disabled: Boolean
  },
  data() {
    return {};
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
