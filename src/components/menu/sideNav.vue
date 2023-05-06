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
    :default-openeds="defaultOpeneds"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @select="handleSelect"
    :unique-opened="true"
  >
    <div v-for="(item, index) in routerList[0].children" :key="index">
      <el-menu-item
        :index="index"
        v-if="!item.children"
        @click="jumpPath(item.path)"
      >
        <el-icon><component :is="item.meta ? item.meta.icon : ''" /></el-icon>
        <span>{{ item.meta ? item.meta.title : "" }}</span>
      </el-menu-item>
      <el-sub-menu :index="index + 1" v-if="item.children">
        <template #title>
          <el-icon><component :is="item.meta ? item.meta.icon : ''" /></el-icon>
          <span>{{ item.meta ? item.meta.title : "" }}</span>
        </template>
        <el-menu-item-group v-if="item.children && item.children.length > 0">
          <el-menu-item
            :index="index + '-' + index2"
            v-for="(item2, index2) in item.children"
            @click="jumpPath(item2.path)"
            >{{ item2.meta ? item2.meta.title : "" }}</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </div>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router/index";
const defaultActive = ref(2);
const defaultOpeneds = ref();
const handleOpen = (index: any) => {
  defaultActive.value = index;
};
const handleSelect = (index: any) => {
  defaultOpeneds.value = [index];
};
const routerList = router.options.routes;
const jumpPath = (path: string) => {
  router.push(path);
};
onMounted(() => {
  console.log("defaultOpeneds", defaultOpeneds.value);
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
