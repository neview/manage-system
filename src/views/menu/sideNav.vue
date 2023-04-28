<template>
  <div class="logo-mark">
    <el-avatar
      shape="square"
      :size="50"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    />
    <el-text class="mx-1">管理后台</el-text>
  </div>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    unique-opened="true"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><House /></el-icon>
        <span>仪表盘</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">仪表盘 one</el-menu-item>
        <el-menu-item index="1-2">仪表盘 two</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>用户信息</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <span>供应商信息</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>订单列表</span>
    </el-menu-item>
  </el-menu>
</template>
<script setup lang="ts">
const handleOpen = () => {};
const handleClose = () => {};
</script>

<style lang="scss" scoped>
.logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 1px 1px 0 0 #e8e8e8;
  background-color: #fff;
}
.el-menu-vertical-demo {
  height: calc(100vh - 71px);
  border-right: none !important;
}
.mx-1 {
  font-size: 16px;
  margin-left: 15px;
}
</style>
