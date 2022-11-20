import { Template } from '#/editor';
import { Props } from './interface';

export const template: Template<Props> = {
  label: '输入框',

  icon: 'bi:input-cursor',

  props: {
    title: '输入框',

    placeholder: '请输入'
  }
};
