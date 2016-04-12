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

  // 获取 cdn 参数
  const getParam = (str) => {
    let param = '?imageMogr/quality/75/';
    const format = vueImg.canWebp ? 'format/webp/' : 'format/jpg/';

    // 不传入尺寸，返回原图
    if (typeof str !== 'string') {
      param += format;
      return param;
    }

    const index = str.indexOf('*');

    // 只指定宽度，等比缩放
    if (index === -1) {
      param += `${format}thumbnail/${str}x/`;

    // 指定宽高，cover 切图
    } else {
      let size = str.slice(0, index) + 'x' + str.slice(index + 1);
      param += `${format}thumbnail/!${size}r/gravity/Center/crop/${size}/`;
    }

    return param;
  };

  // vue 插件配置
  vueImg.install = (Vue, opt) => {
    const prefix = typeof opt.prefix === 'string' ? opt.prefix : vueImg.cdn;

    Vue.directive('img', {
      acceptStatement: true,

      bind() {
        this.el.src = opt.loading;
      },

      update(hash) {
        if (!hash) return;

        const src = prefix + readHash(hash) + getParam(this.arg);
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
