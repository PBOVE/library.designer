
import type { CSSProperties } from 'vue'


type Props = Indexable

 // 组件数据
export interface Schema {
  // 组件名称
  label: string

  // 组件类型
  name: string

  // 组件唯一值
  id: string

  // 配置信息
  props: Props

  // 不同状态样式
  __style__: Recordable<CSSProperties>

  // 子数据
  children?: Schema[]
}

 // 模版名称
export interface Template {
  // 名称
  label: string

  // 组件类型
  name?: string

  // 图标
  icon: string
}

// 模版树
export interface TemplateTree {
  label: string

  level: string

  children: Required<Template>[]
}


// 页面数据
export interface Page {
  widgetTree: Schema[]
}


export interface Contenxt {
  // 模版树
  templateTree: TemplateTree[];
  // 页面配置数据
  onInstance: {
    get: (key: keyof Page) => Page[keyof Page]
    set: (key: keyof Page, value: Page[keyof Page]) => void
  };
  // 选中的模型
  selectSchema: {
    set: (record: Schema | null) => void

    get: () => Schema | null

    update: (key: string, value: Schema[keyof Schema]) => void
  };
}





