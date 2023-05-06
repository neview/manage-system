<template>
  <page-view>
    <el-form
      :inline="true"
      :model="ruleForm"
      class="demo-form-inline"
      size="default"
      ref="ruleFormRef"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单编号" prop="user">
            <el-input v-model="ruleForm.user" placeholder="请输入订单编号" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请输入订单状态">
              <el-option label="已支付" value="1" />
              <el-option label="未支付" value="-1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </page-view>
</template>
<script setup lang="ts">
import pageView from "@/components/pageView.vue";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
// 搜索框
interface form {
  user: string;
  region: string;
}
const ruleFormRef = ref();
const ruleForm: form = reactive({
  user: "",
  region: "",
});
const onSubmit = () => {};
const reset = () => {
  ruleFormRef.value.resetFields();
};
</script>
<style lang="scss" scoped></style>
