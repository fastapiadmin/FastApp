import presetWeapp from "unocss-preset-weapp";
import { extractorAttributify, transformerClass } from "unocss-preset-weapp/transformer";

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify(),
  ],
  shortcuts: [
    {
      "flex-center": "flex justify-center items-center",

      "flex-start": "flex justify-start items-center",
      "flex-end": "flex justify-end items-center",
      "flex-between": "flex justify-between items-center",
      "flex-around": "flex justify-around items-center",
      "flex-evenly": "flex justify-evenly items-center",
      "flex-stretch": "flex justify-stretch items-center",
      "flex-baseline": "flex justify-baseline items-center",
      "flex-column": "flex flex-col",
      "flex-row": "flex flex-row",

      // 垂直布局并居中对齐
      "flex-col-center": "flex flex-col items-center",
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
};
