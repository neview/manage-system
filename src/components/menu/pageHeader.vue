<template>
  <el-row class="row-bg" justify="space-between">
    <el-col :span="8">
      <!-- <div class="grid-content ep-bg-purple">{{ title || "仪表盘" }}</div> -->
      <!-- <el-scrollbar> -->
      <div class="grid-content ep-bg-purple">
        <div class="page_view" ref="tabScrollbarRef">
          <div
            class="page_tag"
            v-for="(item, index) in totalPage.pageTitle"
            :key="item.path"
            @click="selectPage(item, index)"
            :ref="tabsRefs.set"
          >
            {{ item.title }}
            <transition
              name="el-fade-in"
              @after-leave="selectNavTab(tabsRefs.value[index])"
            >
              <el-icon
                v-show="totalPage.pageTitle.length > 1"
                @click.stop="closeTab(item)"
                size="15"
                class="icon-close"
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

const isPage = ref("");
const router = useRouter();
const totalPage = totalPageTitle();
const tabsRefs = useTemplateRefsList();
const tabScrollbarRef = ref();
const slider = ref();
// // 监听 totalPage 变化
// watch(
//   () => totalPage,
//   (newVal, oldVal) => {
//     // 处理数据变化的逻辑
//     tabsRefs.value = [];
//   }
// );

onBeforeRouteUpdate((to, from) => {
  isPage.value = to.fullPath;
  // tabsRefs 去重
  nextTick(() => {
    let result = Object.values(
      tabsRefs.value.reduce((acc, cur) => {
        acc[cur.__vnode.key] = acc[cur.__vnode.key] || cur;
        return acc;
      }, {})
    );
    // console.log("tabsRefs.value", tabsRefs.value);
    // let result = tabsRefs.value.splice("-" + totalPage.pageTitle.length);
    // console.log("result", result);
    totalPage.pageTitle.forEach((item, index) => {
      if (to.fullPath === item.path) {
        selectNavTab(result[index]);
      }
    });
  });
});
onMounted(() => {
  totalPage.storagePageTitle({
    title: String(router.currentRoute.value.meta.title),
    path: router.currentRoute.value.fullPath,
  });
  isPage.value = router.currentRoute.value.fullPath;
  nextTick(() => {
    selectNavTab(tabsRefs.value[0]);
  });
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
  console.log("dom.offsetLeft", dom.offsetLeft);
  if (totalPage.pageTitle.length <= 1) {
    setTimeout(() => {
      slider.value.style.width = dom.clientWidth + "px";
    }, 500);
  }
  slider.value.style.width = dom.clientWidth + "px";
  slider.value.style.transform = `translateX(${dom.offsetLeft - 20}px)`;
  let scrollLeft =
    dom.offsetLeft + dom.clientWidth - tabScrollbarRef.value.clientWidth;
  if (dom.offsetLeft < tabScrollbarRef.value.scrollLeft) {
    tabScrollbarRef.value.scrollTo(dom.offsetLeft, 0);
  } else if (scrollLeft > tabScrollbarRef.value.scrollLeft) {
    tabScrollbarRef.value.scrollTo(scrollLeft, 0);
  }
};

const closeTab = (val: any) => {
  totalPage.delectPageTitle(val.path);
  let path = totalPage.pageTitle[totalPage.pageTitle.length - 1].path;
  router.push(path);
  if (val.path !== router.currentRoute.value.fullPath) {
    nextTick(() => {
      selectNavTab(tabsRefs.value[tabsRefs.value.length - 1]);
    });
  }
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
        z-index: 999;
        .icon-close {
          margin-left: 5px;
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
