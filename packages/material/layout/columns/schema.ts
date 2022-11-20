import { Template } from '#/editor';
import { buildSchema } from '~/compile/utils/index';
import { template as cTemplate } from '~/material/layout/container/schema';
import { Props } from './interface';

export const template: Template<Props> = {
  label: '布局容器',

  icon: 'ant-design:layout-outlined',

  props: {
    // 列比例
    layout: '12:9:3'
  },

  children: []
};
