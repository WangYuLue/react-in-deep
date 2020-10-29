export interface IBaseFiber {
  props: IFiberProps;
  dom?: IElement;
  alternate?: IFiber;
  parent?: IFiber;
  child?: IFiber;
  sibling?: IFiber;
  effectTag?: EEffectTag;
}

export interface IHostFiber extends IBaseFiber {
  type?: string;
}

export interface IFnFiber extends IBaseFiber {
  type?: IFnType;
  hooks: IHook[];
}

export type IFiber = IHostFiber | IFnFiber;

interface IHook {
  state: any;
  queue: IDispatch<any>[];
}

export interface IFiberProps {
  children?: IFiber[],
  [props: string]: any
}

export type IElement = HTMLElement | Text;

export type IDispatch<T> = (action: (val: T) => T) => void;

export type IFnType = (props: IFiberProps) => IFiber

export enum EEffectTag {
  'PLACEMENT' = 'PLACEMENT',
  'UPDATE' = 'UPDATE',
  'DELETION' = 'DELETION'
}