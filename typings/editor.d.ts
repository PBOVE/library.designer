import type { CSSProperties } from 'vue';

type Props = Indexable;

// HTTP 类型
type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

// 变量类型
type VariableType = 'string' | 'number' | 'boolean';

//  参数
export interface Params {
  key: string;

  value: string;

  type: VariableType | undefined;

  id: string;
}

// 组件数据
export interface Schema<T = Props> {
  // 组件名称
  label: string;

  // 组件类型
  name: string;

  // 组件唯一值
  id: string;

  // 配置信息
  props: T;

  // 不同状态样式
  __style__: { ':root'?: CSSProperties };

  // 子数据
  children?: Schema[];
}

// 模版名称
export interface Template<T = Props> {
  // 名称
  label: string;

  // 组件类型
  name?: string;

  // 图标
  icon: string;

  // 配置信息
  props?: T;

  // 子数据
  children?: Schema<T>[];
}

// 模版树
export interface TemplateTree {
  label: string;

  level: string;

  children: PickRequired<Template, 'name'>[];
}

// 页面数据
export interface Page {
  widgetTree: Schema[];
}

export interface DataSource {
  // 唯一值
  id: string;
  // 名称
  name: string;
  // 描述
  description: string;
  // 类型
  protocal: 'url' | 'remote' | 'value';
  // 类型为 远程 api
  options?: {
    // 请求方式
    method: Method;
    // 请求地址
    url: string;
    // 请求参数
    params: Params[];
    // 响应映射
    response: {
      // 状态码
      status: string;
      // 数据源
      data: string;
      // 接口处理信息
      message: string;
    };
    // 验证数据是否有效
    validate: {
      // 状态码
      status: {
        value: string;

        type: VariableType;
      };
      // 成功提示
      success: string;
      // 错误提示
      error: string;
    };
  };
  // 类型为 变量
  initialData: {
    type: VariableType;

    key: string;

    value: string;
  };
}

export interface Contenxt {
  // 模版树
  templateTree: TemplateTree[];
  // 页面配置数据
  onInstance: {
    get: (key: keyof Page) => Page[keyof Page];
    set: (key: keyof Page, value: Page[keyof Page]) => void;
  };
  // 选中的模型
  selectSchema: {
    set: (record: Schema | null) => void;

    get: () => Schema | null;

    update: (key: string, value: Schema[keyof Schema]) => void;
  };
  // 浮动元素
  hoverSchema: {
    set: (record: Record | null) => void;

    get: () => Schema | null;
  };
}

export interface Module {
  // 模版树
  template: Template;
}

export interface Setter {
  [key: string]: {
    [key: string]: unknown;
  };
}
