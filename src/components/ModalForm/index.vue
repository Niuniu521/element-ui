<template>
  <!-- 添加或修改岗位对话框 -->
  <el-dialog :title="title" :visible="visible" :width="width" append-to-body @close="cancel">
    <div v-loading="loading" style="width: 100%">
      <el-form
        v-if="items && items.length > 0"
        class="FORM_STYLE"
        ref="form"
        :model="form"
        :rules="rules"
        :label-width="labelWidth"
        :disabled="disabled">
        <el-row :gutter="24">
          <el-col :span="item.span || (24 / column)" v-for="(item, index) in items" :key="index">
            <FormItem
              :disabled="disabled"
              :rules="rules"
              :item="item"
              :form="form"
            />
          </el-col>
        </el-row>
      </el-form>
      <slot name="map"></slot>
      <div v-if="!disabled" slot="footer" class="dialog-footer" style="text-align: right; margin-top: 10px">
        <el-button type="primary" @click="submitForm">{{saveTitle}}</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import FormItem from "../FormItem"
export default {
  name: "ModalForm",
  components: {
    FormItem
  },
  props: {
    title: String,
    loading: Boolean,
    width: {
      type: String,
      default: '800px'
    },
    saveTitle: {
      type: String,
      default: '确 定'
    },
    column: {
      type: Number,
      default: 2
    },
    visible: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '140px'
    },
    form: Object,
    rules: [Object,Array],
    items: Array,
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {
    // 取消按钮
    cancel() {
      this.$emit('cancel')
    },
    /** 提交按钮 */
    submitForm: function() {
      if (this.items && this.items.length) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$emit('submitForm', valid)
          }
        })
      } else {
        this.$emit('submitForm')
      }
    }
  }
};
</script>
