import type { Template } from '#/editor';
import { cloneDeep } from 'lodash-es';
import { buildSchemId } from '@/utils/uuid';

export type TemplateData = Omit<PickRequired<Template, 'name'>, 'icon'>;

// 构建数据
export const buildSchema = (data: TemplateData) => {
  return cloneDeep({ __style__: {}, props: {}, ...data, id: buildSchemId(data.name) });
};
