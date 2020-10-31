export interface IProps {
  children?: IPropsFiber[],
  [props: string]: any
}

export interface IPropsFiber {
  type: string;
  props: IProps;
}
export interface IBaseFiber {
  props: IProps;
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

export type IElement = HTMLElement | Text;

export type IDispatch<T> = (action: (val: T) => void | T) => void;

export type IFnType = (props: IProps) => IFiber

export enum EEffectTag {
  'PLACEMENT' = 'PLACEMENT',
  'UPDATE' = 'UPDATE',
  'DELETION' = 'DELETION'
}