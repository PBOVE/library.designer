

declare type Indexable<T = unknown> = {
  [key: string]: T;
};

declare type Recordable<T = any> = Record<string, T>;

declare type HTMLNULL = HTMLElement | null;

declare type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
