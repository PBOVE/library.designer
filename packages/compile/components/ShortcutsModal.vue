<template>
  <a-modal v-model:visible="visible" title="快捷键" :footer="null">
    <div>
      <div class="bc-shortcuts-title">常规操作</div>

      <div v-for="item in conventions" :key="item.label" class="bc-shortcuts-li">
        <div>{{ item.label }}</div>
        <div>
          <span v-for="btn in item.buttons" :key="btn" class="bc-shortcuts-li-btn">
            {{ btn }}
          </span>
        </div>
      </div>
    </div>

    <div>
      <div class="bc-shortcuts-title">组件选择和移动</div>

      <div v-for="item in components" :key="item.label" class="bc-shortcuts-li">
        <div>{{ item.label }}</div>
        <div>
          <span v-for="btn in item.buttons" :key="btn" class="bc-shortcuts-li-btn">
            {{ btn }}
          </span>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
interface Props {
  value: boolean;
}

const props = withDefaults(defineProps<Props>(), { value: false });

const emits = defineEmits(['update:value']);

const visible = computed({ set: (value) => emits('update:value', value), get: () => props.value });

const conventions = [
  { label: '保存', buttons: ['⌘', 'S'] },
  { label: '预览', buttons: ['⌘', 'P'] },
  { label: '撤销', buttons: ['⌘', 'Shift', 'Z'] },
  { label: '搜索', buttons: ['⌘', 'Shift', 'F'] }
];

const components = [
  { label: '选择父组件', buttons: ['↑'] },
  { label: '选择子节点', buttons: ['↓'] },
  { label: '向右选择兄弟节点', buttons: ['→'] },
  { label: '向左选择兄弟节点', buttons: ['←'] }
];
</script>

<style lang="less">
.bc-shortcuts-title {
  height: 32px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;

  .flex-y-center();
}

.bc-shortcuts-li {
  height: 34px;
  color: rgba(0, 0, 0, 0.6);

  .flex-y-center();
  .justify-between();

  &-btn {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 7px;
    border: 1px solid rgba(31, 56, 88, 0.3);
    border-radius: 3px;
    color: rgba(31, 56, 88, 0.6);

    &:not(:first-of-type) {
      margin-left: 7px;
    }
  }
}
</style>
