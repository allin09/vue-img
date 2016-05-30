import cdn from './cdn.js';
import { canWebp } from './webp.js';
import toPath from './path.js';
import getParam from './param.js';

const directive = (Vue, opt, type) => {
  // CDN's prefix
  const prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn;

  // image quality
  const quality = opt.quality <= 100 ? opt.quality : 75;

  // set img.src or element.style.backgroundImage
  const setAttr = (el, src) => {
    if (!el || !src) return;

    if (type === 'img') {
      el['src'] = src;
    } else {
      el['style']['backgroundImage'] = `url(${src})`;
    }
  };

  Vue.directive(type, {
    bind(el, binding) {
      if (binding.modifiers && binding.modifiers.now) return;
      setAttr(el, opt.loading);
    },

    update(el, binding) {
      if (!binding.value) return;

      const format = canWebp ? 'format/webp/' : '';
      const src = prefix + toPath(binding.value) + getParam(quality, format, binding.arg);
      const img = new Image();

      img.src = src;

      img.onload = () => {
        setAttr(el, src);
      };

      if (!opt.error) return;
      img.onerror = () => {
        setAttr(el, opt.error);
      };
    }
  });
};

export default directive;
