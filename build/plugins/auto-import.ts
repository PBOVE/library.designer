import AutoImport from 'unplugin-auto-import/vite';

export function configAutoImportPlugin() {
  return AutoImport({
    dts: 'typings/auto-imports.d.ts',
    imports: ['vue', 'vue-router']
  });
}
