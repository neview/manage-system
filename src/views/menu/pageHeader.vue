<script setup lang="ts"></script>
<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="8"
      ><div class="grid-content ep-bg-purple">仪表盘</div>
    </el-col>
    <el-col :span="8">
      <div class="user-text">
        <el-avatar
          :size="30"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        />
        <el-text class="mx-1">芒果总后台</el-text>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.row-bg {
  height: 70px;
  background-color: #fff;
  .grid-content {
    height: 70px;
    padding-left: 60px;
    line-height: 70px;
  }
  .user-text {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 60px;
    .mx-1 {
      margin-left: 20px;
    }
  }
}
</style>
