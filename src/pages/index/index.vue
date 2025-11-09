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
    <wd-notice-bar :text="NOTICE_TEXT"
      color="var(--success-color)" type="info">
      <template #prefix>
        <wd-tag color="var(--warning-color)" bg-color="var(--warning-color)" plain custom-style="margin-right:10rpx">
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
              <wd-radio v-for="days in DAYS_RANGE_OPTIONS" :key="days" :value="days">近{{ days }}天</wd-radio>
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
import type { VisitStatsVO } from './types';
import { 
  SWIPER_LIST, 
  NAV_LIST, 
  DEFAULT_VISIT_STATS,
  NOTICE_TEXT,
  DEFAULT_DAYS_RANGE,
  DAYS_RANGE_OPTIONS,
  CHART_OPTS,
  CHART_SERIES_NAMES
} from './data';

const current = ref<number>(0);

const visitStatsData = ref<VisitStatsVO>(DEFAULT_VISIT_STATS);

// 图表数据
const chartData = ref({});

// 图表配置
const chartOpts = ref(CHART_OPTS);

// 日期范围
const recentDaysRange = ref(DEFAULT_DAYS_RANGE);

// 轮播图列表
const swiperList = ref(SWIPER_LIST);

// 快捷导航列表
const navList = reactive(NAV_LIST);

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
    visitStatsData.value = { ...DEFAULT_VISIT_STATS };
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
          name: CHART_SERIES_NAMES.UV,
          data: data.ipList,
        },
        {
          name: CHART_SERIES_NAMES.PV,
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