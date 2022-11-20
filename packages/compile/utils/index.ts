import type { Template } from '#/editor';
import { cloneDeep, omit } from 'lodash-es';
import { buildSchemId } from '@/utils/uuid';

export type TemplateData = Omit<PickRequired<Template, 'name'>, 'icon'>;

// 构建数据
export const buildSchema = (data: TemplateData) => {
  const options = omit(data, 'icon');

  return cloneDeep({ __style__: {}, props: {}, ...options, id: buildSchemId(data.name) });
};
