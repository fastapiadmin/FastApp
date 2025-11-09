/**
 * FAQ 页面类型定义
 */

/**
 * FAQ 项
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * 功能特性项
 */
export interface FeatureItem {
  name: string;
  desc: string;
  icon: string;
  color: string;
}

/**
 * 引导步骤项
 */
export interface GuideStep {
  title: string;
  desc: string;
  icon?: string;
}

