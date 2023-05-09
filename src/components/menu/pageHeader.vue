<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="8">
      <!-- <div class="grid-content ep-bg-purple">{{ title || "仪表盘" }}</div> -->
      <!-- <el-scrollbar> -->
      <div class="grid-content ep-bg-purple">
        <div class="page_view" ref="tabScrollbarRef">
          <div
            class="page_tag"
            :class="isPage == item.path ? 'active' : ''"
            v-for="(item, index) in totalPage.pageTitle"
            :key="item.path"
            @click="selectPage(item, index)"
            :ref="tabsRefs.set"
          >
            {{ item.title }}
            <transition name="el-fade-in">
              <el-icon
                v-show="totalPage.pageTitle.length > 1"
                @click.stop="closeTab(item)"
                size="15"
                name="el-icon-Close"
                ><Close
              /></el-icon>
            </transition>
          </div>
          <div class="slider" ref="slider"></div>
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
import { ref, onMounted, reactive, watch, nextTick } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { totalPageTitle } from "@/stores/counter";
import { useTemplateRefsList } from "@vueuse/core";

// const title = ref();
const isPage = ref("");
const router = useRouter();
const totalPage = totalPageTitle();
const tabsRefs = useTemplateRefsList();
const tabScrollbarRef = ref();
const slider = ref();
const movePlace = reactive({
  width: "",
  transform: "",
});
// 监听 msg 变化
watch(
  () => totalPage,
  (newVal, oldVal) => {
    // 处理数据变化的逻辑
    tabsRefs.value = [];
  }
);

onBeforeRouteUpdate((to, from) => {
  // title.value = to.meta.title;
  isPage.value = to.fullPath;
  // tabsRefs.value = [];
  totalPage.pageTitle.forEach((item, index) => {
    if (to.fullPath === item.path) {
      nextTick(() => {
        console.log("tabsRefs.value", tabsRefs.value);
      });
      selectNavTab(tabsRefs.value[index]);
    }
  });
});
onMounted(() => {
  // title.value = route.currentRoute.value.meta.title;
  totalPage.storagePageTitle({
    title: String(router.currentRoute.value.meta.title),
    path: router.currentRoute.value.fullPath,
  });
  isPage.value = router.currentRoute.value.fullPath;
  setTimeout(() => {
    selectNavTab(tabsRefs.value[0]);
  }, 100);
});
// 选择菜单标题
const selectPage = (val: any, index: any) => {
  router.push(val.path);
  isPage.value = val.path;
};

// 激活tab
const selectNavTab = (dom: HTMLDivElement) => {
  if (!dom) {
    return false;
  }
  movePlace.width = dom.clientWidth + "px";
  movePlace.transform = `translateX(${dom.offsetLeft - 20}px)`;
  let scrollLeft =
    dom.offsetLeft + dom.clientWidth - tabScrollbarRef.value.clientWidth;
  slider.value.style.width = movePlace.width;
  slider.value.style.transform = movePlace.transform;
  // slider.value.scrollLeft = scrollLeft;
};

const closeTab = (val: any) => {
  console.log("关闭router", val);
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
    position: relative;
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
        cursor: pointer;
        display: flex;
        align-items: center;
        z-index: 9999;
        .el-icon-Close {
          margin-left: 10px !important;
        }
      }
      .slider {
        height: 40px;
        background-color: #fff;
        box-shadow: 0px 0.3px 10px rgba(0, 0, 0, 0.035),
          0px 2px 80px rgba(0, 0, 0, 0.07);
        position: absolute;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
        border-radius: 6px;
        z-index: 99;
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
}
</style>
