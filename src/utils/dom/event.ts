/* eslint-disable no-param-reassign */
import { debounce } from 'lodash-es';
import ResizeObserver from 'resize-observer-polyfill';

const resizeHandler = debounce((entries: any[]) => {
  entries.forEach((entry) => {
    const listeners = entry.target.__resizeListeners__ || [];

    listeners.forEach((fn: Callback) => fn?.());
  });
}, 300);

export function addResizeListener(element: any, fn: Callback) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }

  element.__resizeListeners__.push(fn);
}

export function removeResizeListener(element: any, fn: Callback) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
}
