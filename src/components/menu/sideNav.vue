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
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    :unique-opened="true"
  >
    <div v-for="(item, index) in routerList[0].children" :key="index">
      <el-menu-item
        :index="item.path"
        v-if="!item.children"
        @click="jumpPath(item.meta.title, item.path)"
      >
        <el-icon><component :is="item.meta ? item.meta.icon : ''" /></el-icon>
        <span>{{ item.meta ? item.meta.title : "" }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.path" v-if="item.children">
        <template #title>
          <el-icon><component :is="item.meta ? item.meta.icon : ''" /></el-icon>
          <span>{{ item.meta ? item.meta.title : "" }}</span>
        </template>
        <el-menu-item-group v-if="item.children && item.children.length > 0">
          <el-menu-item
            :index="item2.path"
            v-for="item2 in item.children"
            @click="jumpPath(item2.meta.title, item2.path)"
            >{{ item2.meta ? item2.meta.title : "" }}</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </div>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import router from "@/router/index";
import localCache from "../../utils/localStorage.js";
import { totalPageTitle } from "@/stores/counter";
import { onBeforeRouteUpdate } from "vue-router";
const totalPage = totalPageTitle();
// 默认展开的子菜单
const defaultActive = ref("1");
// 子菜单展开回调函数
const handleSelect = (index: any) => {
  localCache.set("menuIndex", index);
  defaultActive.value = index;
};
// 路由信息
const routerList = router.options.routes;
// 点击子菜单的回调函数
const jumpPath = (title: any, path: any) => {
  router.push(path);
  let repeatVal = totalPage.pageTitle.some((item) => {
    return item.path === path;
  });
  // 标题重复
  if (repeatVal) return;
  console.log("totalPage.pageTitle", totalPage.pageTitle);
  totalPage.storagePageTitle({
    title: title,
    path: path,
  });
};
// 组件渲染后执行
onMounted(() => {
  defaultActive.value = String(localCache.get("menuIndex")) || "1";
});
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.fullPath;
});
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
