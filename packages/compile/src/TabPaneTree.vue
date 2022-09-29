<script lang="ts">
import type { Contenxt } from '#/editor';
import useContext from '@/hooks/useContext';

export default defineComponent({
  setup() {
    const { useInject } = useContext<Contenxt>('PageDesigner');

    const { onInstance } = useInject();

    const widgetTree = computed(() => onInstance.get('widgetTree'));

    return () => 33;
  }
});
</script>
