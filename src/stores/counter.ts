import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// 存储左侧菜单的选中状态
// export const defaultMenuExpand = defineStore('menuArr', () => {
//   let menuArr: Array<any> = reactive([])
//   function storageMenuIndex(obj: string) {
//     menuArr.push(obj)
//     // menuArr.shift()
//     console.log('obj', obj)
//     console.log('menuArr', menuArr)
//   }

//   return { menuArr, storageMenuIndex }
// })

// 存储点击过的页面标题
interface Page {
  title: string;
  path: string;
}
export const totalPageTitle = defineStore('pageTitle', () => {
  let pageTitle: Array<Page> = reactive([])
  function storagePageTitle(page: Page) {
    pageTitle.push(page)
  }
  function delectPageTitle(path: string) {
    pageTitle.forEach((item, index) => {
      if (item.path === path) {
        pageTitle.splice(index, 1)
      }
    })
  }
  return { pageTitle, storagePageTitle, delectPageTitle }
})