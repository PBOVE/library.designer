import { message } from 'ant-design-vue';

export function useMessage(content = '', type = 'warn') {
  message.destroy();

  message[type](content);
}
