/*
 * @Description: 泛型：数组
 * @Author: Moobye
 * @Date: 2021-01-12 18:49:54
 * @LastEditTime: 2021-01-12 18:50:07
 * @LastEditors: Moobye
 */
interface Array<T> {
  length: number,
  toString(): string,
  pop(): T | undefined,
  // 注意此处的含义
  push(...items: T[]): number,
  concat(...items: T[]): T[],
  join(separator?: string): string,
  reverse(): T[],
  shift(): T | undefined;
  slice(start?: number, end?: number): T[],
  sort(compareFn?: (a: T, b: T) => number): this,
  splice(start: number, deleteCount?: number): T[],
  // 注意此处的重载写法
  splice(start: number, deleteCount: number, ...items: T[]): T[],
  unshift(...items: T[]): number,
  indexOf(searchElement: T, fromIndex?: number): number,
  lastIndexOf(searchElement: T, fromIndex?: number): number,
  every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean,
  some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean,
  forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void,
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[],
  filter<S extends T>(callbackfn: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[],
  filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): T[],
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T,
  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T,
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U,
  // reduceRight 略
  // 索引调用
  [n: number]: T,
}