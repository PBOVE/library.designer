import AutoImport from 'unplugin-auto-import/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';

export default () => {
  return [
    DefineOptions(),

    AutoImport({
      dts: 'typings/auto-imports.d.ts',
      imports: ['vue']
    })
  ];
};
