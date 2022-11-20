export interface Props {
  // 标题
  title?: string;
  // 默认值
  value?: string;
  // 标题位置
  labelAlign?: 'left' | 'top' | 'inner';
  // 占位提示
  placeholder?: string;
  // 描述信息
  tips?: string;
  // 状态
  state?: string;
  // 类型
  type?: 'text' | 'password';
  // 标题布局
  labelSpan?: number;
  // 标题偏移
  labelOffset?: number;
  // 内容偏移
  wrapperSpan?: number;
}
