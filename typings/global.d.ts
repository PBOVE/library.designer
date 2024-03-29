

declare type Indexable<T = unknown> = {
  [key: string]: T;
};

declare type Recordable<T = any> = Record<string, T>;

declare type HTMLNULL = HTMLElement | null;

declare type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

declare type PickRequired<T, K extends keyof T> = Exclude<T, K> & Required<Pick<T, K>>

declare type PickPartial<T, K extends keyof T> = Exclude<T, K> & Partial<Pick<T, K>>

declare type AutoComponent = {
  default: Component
}

declare type Callback = () => void;
