import { IProps } from './models';

const hyphenateRE = /\B([A-Z])/g;

/**
 * 驼峰 转 中滑线
 * 例如： fontSize -> font-size 
 */
const hyphenate = (str: string): string => str.replace(hyphenateRE, '-$1').toLowerCase();

/**
 * 判断当前是否是方法名，以 on 开头则认为是方法名
 */
const isEvent = (key: string): boolean => key.startsWith('on');

/**
 * 判断当前是否是属性，过滤掉 children 和 方法
 */
const isProperty = (key: string): boolean => key !== 'children' && !isEvent(key);

const isNew = (prev: IProps, next: IProps) => (key: string) => prev[key] !== next[key];

const isGone = (next: IProps) => (key: string) => !(key in next);

const isFunction = (key: any): boolean => key instanceof Function;

export {
  isEvent,
  isProperty,
  isNew,
  isGone,
  isFunction,
  hyphenate
};