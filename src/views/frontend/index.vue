<template>
  <el-container>
    <el-aside width="200px">
      <sideNav></sideNav>
    </el-aside>
    <el-container>
      <el-header style="padding: 0">
        <pageHeader></pageHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <div class="footer_box">
          <span>芒果电影票</span>
          <span>Copyright 2020 芒果电影票</span>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import pageHeader from "@/components/menu/pageHeader.vue";
import sideNav from "@/components/menu/sideNav.vue";
</script>
<style lang="scss" scoped>
.footer_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>
