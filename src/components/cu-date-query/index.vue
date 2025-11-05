<template>
  <wd-calendar v-model="dateRange" :label="label" type="daterange" :placeholder="placeholder" @confirm="handleConfirm" />
</template>

<script lang="ts" setup>
import { dayjs } from "wot-design-uni";

const props = defineProps({
  modelValue: {
    type: [Array, String] as PropType<[string, string] | string | undefined>,
    default: () => undefined,
  },
  placeholder: {
    type: String,
    default: "请选择时间范围",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const dateRange = ref<number[] | number | null>(null);

watch(
  () => props.modelValue,
  (val) => {
    if (Array.isArray(val) && val.length === 2 && val[0] && val[1]) {
      dateRange.value = val.map((item) => new Date(item).getTime());
    } else if (typeof val === "string" && val.includes(",")) {
      const [startDate, endDate] = val.split(",");

      if (startDate && endDate && !isNaN(new Date(startDate).getTime()) && !isNaN(new Date(endDate).getTime())) {
        dateRange.value = [new Date(startDate).getTime(), new Date(endDate).getTime()];
      } else {
        dateRange.value = null;
      }
    } else {
      dateRange.value = null;
    }
  },
  {
    immediate: true,
  }
);

// 确认选择时间
const handleConfirm = () => {
  if (Array.isArray(dateRange.value) && dateRange.value.length === 2) {
    const startDate = dayjs(dateRange.value[0]).format("YYYY-MM-DD");
    const endDate = dayjs(dateRange.value[1]).format("YYYY-MM-DD");

    let newVal: any = [startDate, endDate];

    // #ifdef MP-WEIXIN
    newVal = `${startDate},${endDate}`;
    // #endif

    console.log("newVal", newVal);
    emit("update:modelValue", newVal);
  }
};
</script>

<style scoped>
.time-filter {
  padding: 16rpx;
}
</style>
