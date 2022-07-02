import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';

const setUnit = (v: number) => `${v}px`;

function createSpacing() {
  const result = { 1: '1px' };
  for (let i = 2; i < 500; i += 1) {
    result[i] = setUnit(i); // 也可以替换成其他的尺寸和单位
  }
  return result;
}

export default defineConfig({
  theme: {
    // 自定义设置
    spacing: createSpacing(),
    cursor: {
      auto: 'auto',
      default: 'default',
      grab: 'grab',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      crosshair: 'crosshair',
      'zoom-in': 'zoom-in'
    },
    extend: {
      colors: {
        light: {
          0: '#ffffff',
          50: '#fdfdfd',
          350: '#f5f6fa',
          650: '#f0f0f0',
          750: '#e5e6e8'
        }
      }
    }
  },
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-between': 'flex justify-between',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center'
  },
  extract: {
    // A common use case is scanning files from the root directory
    include: ['**/*.{vue,html,jsx,tsx}'],
    // if you are excluding files, make sure you always include node_modules and .git
    exclude: ['node_modules', '.git', 'dist']
  },
  plugins: [
    plugin(({ addDynamic }) => {
      addDynamic('fs', ({ Utility, Style }) => {
        const prop = Utility.handler.handleNumber(1, undefined, 'float', setUnit).value;

        return Style.generate(Utility.class, { 'font-size': prop });
      });

      addDynamic('lh', ({ Utility, Style }) => {
        const prop = Utility.handler.handleNumber(1, undefined, 'float', setUnit).value;

        return Style.generate(Utility.class, { 'line-height': prop });
      });
    })
  ]
});
