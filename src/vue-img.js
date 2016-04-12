void function() {
  // 定义 vueImg 对象
  const vueImg = {};

  // 设置 cdn 地址
  vueImg.cdn = '//fuss10.elemecdn.com'
  void function() {
    const domain = document.domain;
    const bases = ['test', 'alpha', 'beta'];
    const rootHost = bases.forEach(base => {
      const url = base + '.elenet.me';
      if (domain.match(url)) {
        vueImg.cdn = '//fuss.' + url;
      }
    });
  }();

  // 检测 webP 支持
  vueImg.canWebp = false;
  void function() {
    const img = new Image();
    img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
    img.onload = () => {
      vueImg.canWebp = true;
    };
  }();

  // hash 解析
  const readHash = hash => (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');

  // 获取图片尺寸
  const getSize = (str) => {
    const index = str.indexOf('*');
    let width,
      height;

    if (index === -1) {
      width = height = str;
    } else {
      width = str.slice(0, index);
      height = str.slice(index + 1);
    }

    return {
      width,
      height
    };
  };

  // vue 插件
  vueImg.install = (Vue, opt) => {
    const prefix = typeof opt.prefix === 'string' ? opt.prefix : vueImg.cdn;

    Vue.directive('img', {
      acceptStatement: true,

      bind() {
        this.el.src = opt.loading;
      },

      update(hash) {
        if (!hash) return;

        const size = getSize(this.arg);
        const path = prefix + readHash(hash);
        const src = vueImg.canWebp ? `${path}?imageMogr/thumbnail/${size.width}x${size.height}/format/webp/quality/75` : `${path}?w=${size.width}&h=${size.height}`;
        const img = new Image();

        img.src = src;
        img.onload = () => {
          this.el.src = src;
        };
        if (opt.error) {
          img.onerror = () => {
            this.el.src = opt.error;
          };
        }
      }
    });
  };

  // UMD 模块支持
  if (typeof exports === 'object') {
    module.exports = vueImg;
  } else if (typeof define === 'function' && define.amd) {
    define([], () => vueImg);
  } else if (window.Vue) {
    window.VueImg = vueImg;
  }
}();
