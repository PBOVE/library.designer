/* eslint-disable no-promise-executor-return */

/**
 * 睡眠
 * @param ms 毫秒
 * @returns
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 数组移动
 * @param arr 待排序数组
 * @param from
 * @param to
 * @returns
 */
export const move = (arr: unknown[], from: number, to: number) => arr.splice(to, 0, arr.splice(from, 1)[0]);
