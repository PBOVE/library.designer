export const cssNamespace = 'b';

const statePrefix = 'is-';

/**
 * 生成 bem
 * @param {} namespace 命名空间
 * @param {*} block 块
 * @param {*} blockSuffix 块多个单词
 * @param {*} element 元素
 * @param {*} modifier 修饰符
 * @returns
 */
const _bem = (namespace: string, block: string, blockSuffix: string, element: string, modifier: string): string => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};

export const useNamespace = (block: string) => {
  const namespace = cssNamespace;

  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '');

  const e = (element: string) => (element ? _bem(namespace, block, '', element, '') : '');

  const m = (modifier: string) => (modifier ? _bem(namespace, block, '', '', modifier) : '');

  const is = (name: string, state = true) => {
    return name && state ? `${statePrefix}${name}` : '';
  };

  return { b, e, m, is };
};
