<script lang="tsx">
import type { PropType } from 'vue';
import { number } from 'vue-types';

// interface Props {
//   title?: string;

//   labelAlign?: 'left' | 'top' | 'inner';

//   labelSpan?: number;
// }

// const span = 100 / 24;

// const props = withDefaults(defineProps<Props>(), { title: '', labelAlign: 'top', labelSpan: undefined });

// const titleStyle = computed(() => {
//   const { labelSpan } = props;

//   return { flex: `0 0 ${labelSpan ? `${span * labelSpan}%` : 'auto'}` };
// });

// const mainStyle = computed(() => {
//   const { labelSpan } = props;

//   return { flex: `${labelSpan ? 0 : 1} 0 ${labelSpan ? `${span * (1 - labelSpan)}%` : 'auto'}` };
// });

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    labelAlign: {
      type: String as PropType<'left' | 'top' | 'inner'>,
      default: 'top'
    },
    labelSpan: {
      type: number,
      default: undefined
    }
  },
  setup(props, { slots }) {
    function renderTemplate() {
      return (
        <div>
          <div class="h-40 lh-40 text-fill-300">{props.title}</div>
          <div>{slots.default?.()}</div>
        </div>
      );
    }

    const renderTemplateMap = {
      left: () => renderTemplate(),
      top: () => renderTemplate(),
      inner: () => renderTemplate()
    };

    return renderTemplateMap[props.labelAlign];
  }
});
</script>

<style lang="less" module>
.title {
  height: 40px;
  padding-right: 16px;
  line-height: 40px;
  color: #666;
}
</style>
