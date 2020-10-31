import { IProps } from './models';

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
  isFunction
};