/**
 * 颜色处理工具函数
 */

/**
 * 将十六进制颜色转换为 RGB
 * @param hex 十六进制颜色值（支持 # 前缀）
 * @returns RGB 对象或 null
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * 将 RGB 转换为十六进制颜色
 * @param r 红色值 (0-255)
 * @param g 绿色值 (0-255)
 * @param b 蓝色值 (0-255)
 * @returns 十六进制颜色值（带 # 前缀）
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((x) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }).join('')}`;
}

/**
 * 调整颜色亮度
 * @param hex 十六进制颜色值
 * @param factor 亮度因子，>1 变亮，<1 变暗
 * @returns 调整后的十六进制颜色值
 */
export function adjustColorBrightness(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.min(255, Math.max(0, rgb.r * factor));
  const g = Math.min(255, Math.max(0, rgb.g * factor));
  const b = Math.min(255, Math.max(0, rgb.b * factor));
  
  return rgbToHex(r, g, b);
}

