<script setup lang="ts">
import pageHeader from "./views/menu/pageHeader.vue";
import sideNav from "./views/menu/sideNav.vue";
</script>

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
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss"></style>
