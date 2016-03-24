void function() {
  // 定义 vueImg 对象
  const vueImg = {};

  // hash 解析
  const readHash = hash => (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');

  // 读取 cdn 地址
  void function() {
    const rootHost = document.domain.replace(/^(.+?\.)??(?=(test\.|alpha\.|beta\.)?[^.]+\.\w+$)/, '');
    const bases = [
      '//fuss10.elemecdn.com',
      '//fuss2.' + rootHost
    ];
    let index = 0;

    void function callee() {
      const src = bases[index++];
      if (!src) return;
      const img = new Image();
      img.onerror = () => callee();
      img.src = vueImg.cdn = src;
    }();
  }();

  // 检测 webP 支持
  void function() {
    const img = new Image();
    img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
    img.onload = () => {
      vueImg.canWebp = true;
    };
    img.onerror = () => {
      vueImg.canWebp = false;
    };
  }();

  // vue 插件
  vueImg.install = (Vue, opt) => {
    const prefix = opt.prefix || vueImg.cdn;

    Vue.directive('img', {
      acceptStatement: true,

      bind() {
        this.el.src = opt.loading;
      },

      update(hash) {
        if (!hash) return;

        const size = this.arg;
        const path = prefix + readHash(hash);
        const src = vueImg.canWebp ? `${path}?imageMogr/thumbnail/${size}x${size}/format/webp/quality/75` : `${path}?w=${size}&h=${size}`;
        const img = new Image();

        img.src = src;
        img.onload = () => {
          this.el.src = src;
        };
        img.error = () => {
          if (opt.error) {
            this.el.src = opt.error;
          }
        };
      }

    });
  };

  // CMD 模块支持
  if (typeof exports === "object") {
    module.exports = vueImg;
  } else if (typeof define === "function" && define.amd) {
    define([], () => vueImg);
  } else if (window.Vue) {
    window.VueImg = vueImg;
  }
}();
