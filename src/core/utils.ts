import { IProps } from './models';

const hyphenateRE = /\B([A-Z])/g;

const hyphenate = (str) => str.replace(hyphenateRE, '-$1').toLowerCase();

const isEvent = (key: string): boolean => key.startsWith('on');

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