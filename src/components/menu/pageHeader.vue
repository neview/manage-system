<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="8">
      <!-- <div class="grid-content ep-bg-purple">{{ title || "仪表盘" }}</div> -->
      <!-- <el-scrollbar> -->
      <div class="grid-content ep-bg-purple">
        <div class="page_view">
          <div
            class="page_tag"
            :class="isPage === item.path ? 'active' : ''"
            v-for="item in totalPage.pageTitle"
            :key="item.path"
            @click="selectPage(item)"
          >
            {{ item.title }}
          </div>
          <span class=""></span>
        </div>
      </div>
      <!-- </el-scrollbar> -->
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
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { totalPageTitle } from "@/stores/counter";

// const title = ref();
const isPage = ref("");
const route = useRouter();
const totalPage = totalPageTitle();
onBeforeRouteUpdate((to, from) => {
  // title.value = to.meta.title;
});
onMounted(() => {
  // title.value = route.currentRoute.value.meta.title;
  totalPage.storagePageTitle({
    title: String(route.currentRoute.value.meta.title),
    path: route.currentRoute.value.fullPath,
  });
  isPage.value = route.currentRoute.value.fullPath;
});
// 选择菜单标题
const selectPage = (val: object) => {
  console.log("val", val);
};
</script>
<style lang="scss" scoped>
*,
*:after,
*:before {
  box-sizing: border-box;
}
.row-bg {
  height: 70px;
  // background-color: #fff;
  .grid-content {
    width: calc(100vw - 450px);
    height: 70px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #eaeaea;
      border-radius: 5px;
      box-shadow: none;
      -webkit-box-shadow: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &:hover {
      &::-webkit-scrollbar-thumb:hover {
        background: #c8c9cc;
      }
    }
    .page_view {
      display: flex;
      align-items: center;
      .page_tag {
        height: 40px;
        padding: 0 15px;
        line-height: 40px;
        font-size: 14px;
        margin-right: 10px;
        border-radius: 6px;
        white-space: nowrap;
      }
    }
  }
  .user-text {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 60px;
    .mx-1 {
      margin-left: 10px;
    }
  }
}
.active {
  background-color: #fff;
  box-shadow: 0px 0.3px 10px rgba(0, 0, 0, 0.035),
    0px 2px 80px rgba(0, 0, 0, 0.07);
}
</style>
