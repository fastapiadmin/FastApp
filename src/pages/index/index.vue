<template>
  <view class="app-container">
    <wd-swiper v-model:current="current" :list="swiperList" autoplay height="300rpx" />

    <!-- 快捷导航 -->
    <wd-grid clickable :column="4" class="mt-2">
      <wd-grid-item v-for="(item, index) in navList" :key="index" use-slot link-type="navigateTo" :url="item.url">
        <view class="p-2">
          <image class="w-72rpx h-72rpx rounded-8rpx" :src="item.icon" />
        </view>
        <view class="text theme-text-primary">{{ item.title }}</view>
      </wd-grid-item>
    </wd-grid>

    <!-- 通知公告 -->
    <wd-notice-bar text="fastapp 是一个基于 Vue3 + UniApp 的前端模板项目，提供了一套完整的前端解决方案，包括登录、权限、字典、接口请求、状态管理、页面布局、组件封装等功能。"
      color="#34D19D" type="info">
      <template #prefix>
        <wd-tag color="#FAA21E" bg-color="#FAA21E" plain custom-style="margin-right:10rpx">
          通知公告
        </wd-tag>
      </template>
    </wd-notice-bar>

    <!-- 数据统计 -->
    <wd-grid :column="2" :gutter="2">
      <wd-grid-item use-slot custom-class="custom-item">
        <view class="flex justify-start pl-5">
          <view class="flex-center">
            <image class="w-80rpx h-80rpx rounded-8rpx" src="/static/icons/visitor.png" />
            <view class="ml-5 text-left">
              <view class="font-bold theme-text-primary">访客数</view>
              <view class="mt-2 theme-text-primary">{{ visitStatsData.todayUvCount }}</view>
            </view>
          </view>
        </view>
      </wd-grid-item>
      <wd-grid-item use-slot custom-class="custom-item">
        <view class="flex justify-start pl-5">
          <view class="flex-center">
            <image class="w-80rpx h-80rpx rounded-8rpx" src="/static/icons/browser.png" />
            <view class="ml-5 text-left">
              <view class="font-bold theme-text-primary">浏览量</view>
              <view class="mt-2 theme-text-primary">{{ visitStatsData.todayPvCount }}</view>
            </view>
          </view>
        </view>
      </wd-grid-item>
    </wd-grid>

    <wd-card type="rectangle">
      <template #title>
        <view class="flex-between">
          <view class="theme-text-primary">访问趋势</view>
          <view>
            <wd-radio-group :value="recentDaysRange" shape="button" inline @change="handleDataRangeChange">
              <wd-radio :value="7">近7天</wd-radio>
              <wd-radio :value="15">近15天</wd-radio>
            </wd-radio-group>
          </view>
        </view>
      </template>

      <view class="h-240px mb-2rpx">
        <qiun-data-charts type="area" :chartData="chartData" :opts="chartOpts" />
      </view>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
import { dayjs } from "wot-design-uni";

// 定义访问统计数据类型
interface VisitStatsVO {
  todayUvCount: number;
  uvGrowthRate: number;
  totalUvCount: number;
  todayPvCount: number;
  pvGrowthRate: number;
  totalPvCount: number;
}

const current = ref<number>(0);

const visitStatsData = ref<VisitStatsVO>({
  todayUvCount: 1234,
  uvGrowthRate: 15.6,
  totalUvCount: 45678,
  todayPvCount: 5678,
  pvGrowthRate: 23.4,
  totalPvCount: 123456,
});

// 图表数据
const chartData = ref({});

const chartOpts = ref({
  padding: [20, 0, 20, 0],
  xAxis: {
    fontSize: 10,
    rotateLabel: true,
    rotateAngle: 30,
  },
  yAxis: {
    disabled: true,
  },
  extra: {
    area: {
      type: "curve",
      opacity: 0.2,
      addLine: true,
      width: 2,
      gradient: true,
      activeType: "hollow",
    },
  },
});

// 日期范围
const recentDaysRange = ref(7);

const swiperList = ref(["/static/images/banner01.jpg", "/static/images/banner02.jpg"]);

// 快捷导航列表
const navList = reactive([
  {
    icon: "/static/icons/user.png",
    title: "用户管理",
    url: "/pages/work/user/index",
    prem: "sys:user:query",
  },
  {
    icon: "/static/icons/role.png",
    title: "角色管理",
    url: "/pages/work/role/index",
    prem: "sys:role:query",
  },
  {
    icon: "/static/icons/notice.png",
    title: "通知公告",
    url: "/pages/work/notice/index",
    prem: "sys:notice:query",
  },
  {
    icon: "/static/icons/setting.png",
    title: "系统配置",
    url: "/pages/work/config/index",
    prem: "sys:config:query",
  },
]);

// 生成静态的访问趋势数据
const generateStaticTrendData = (days: number) => {
  const dates = [];
  const ipList = [];
  const pvList = [];

  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(dayjs(date).format("MM-DD"));

    // 生成模拟数据
    ipList.push(Math.floor(Math.random() * 500) + 200);
    pvList.push(Math.floor(Math.random() * 1000) + 500);
  }

  return {
    dates,
    ipList,
    pvList,
  };
};

// 加载访问统计数据（使用静态数据）
const loadVisitStatsData = async () => {
  // 模拟异步加载
  setTimeout(() => {
    visitStatsData.value = {
      todayUvCount: 1234,
      uvGrowthRate: 15.6,
      totalUvCount: 45678,
      todayPvCount: 5678,
      pvGrowthRate: 23.4,
      totalPvCount: 123456,
    };
  }, 100);
};

// 加载访问趋势数据（使用静态数据）
const loadVisitTrendData = () => {
  // 模拟异步加载
  setTimeout(() => {
    const data = generateStaticTrendData(recentDaysRange.value);

    const res = {
      categories: data.dates,
      series: [
        {
          name: "访客数(UV)",
          data: data.ipList,
        },
        {
          name: "浏览量(PV)",
          data: data.pvList,
        },
      ],
    };
    chartData.value = JSON.parse(JSON.stringify(res));
  }, 100);
};

//  数据范围变化
const handleDataRangeChange = ({ value }: { value: number }) => {
  recentDaysRange.value = value;
  loadVisitTrendData();
};

onReady(() => {
  loadVisitStatsData();
  loadVisitTrendData();
});

onShow(() => {
  // 确保 tabbar 状态正确
  const pages = getCurrentPages();
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1];
    if (currentPage.route === "pages/index/index") {
      // 通过事件通知 tabbar 布局更新状态
      uni.$emit("updateTabbar", "index");
    }
  }
});
</script>

<route lang="json">{
  "name": "index",
  "style": {
    "navigationStyle": "custom"
  },
  "layout": "tabbar"
}</route>

<style lang="scss" scoped></style>