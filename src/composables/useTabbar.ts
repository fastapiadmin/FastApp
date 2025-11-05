import { ref, computed } from "vue";
import { isLoggedIn } from "@/utils/auth";

interface TabbarItem {
  name: string;
  title: string;
  icon: string;
}

const tabbarItems = ref<TabbarItem[]>([
  { name: "index", title: "首页", icon: "home" },
  { name: "work", title: "工作台", icon: "app" },
  { name: "mine", title: "我的", icon: "user" },
]);

const activeTabbar = ref<string>("index");

export function useTabbar() {
  // 根据登录状态动态显示tabbar项
  const tabbarList = computed(() => {
    // 检查用户登录状态
    const loggedIn = isLoggedIn();
    
    // 未登录时过滤掉工作台项
    if (!loggedIn) {
      return tabbarItems.value.filter(item => item.name !== "work");
    }
    
    // 登录状态下显示所有tabbar项
    return tabbarItems.value;
  });

  const setTabbarItemActive = (name: string) => {
    activeTabbar.value = name;
  };

  return {
    tabbarList,
    activeTabbar,
    setTabbarItemActive,
  };
}