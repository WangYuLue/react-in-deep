import { IFiberProps } from './models';

const isEvent = (key: string): boolean => key.startsWith('on');

const isProperty = (key: string): boolean => key !== 'children' && !isEvent(key);

const isNew = (prev: IFiberProps, next: IFiberProps) => (key: string) => prev[key] !== next[key];

const isGone = (next: IFiberProps) => (key: string) => !(key in next);

export {
  isEvent,
  isProperty,
  isNew,
  isGone
};