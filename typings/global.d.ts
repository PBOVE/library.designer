

declare type Indexable<T = unknown> = {
  [key: string]: T;
};

declare type Recordable<T = any> = Record<string, T>;

declare type HTMLNULL = HTMLElement | null;

