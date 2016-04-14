void function() {
  // 定义 vueImg 对象
  const vueImg = {};

  // 设置 CDN 地址
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
  vueImg.toPath = hash => (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');

  // Vue 插件配置
  vueImg.install = (Vue, opt) => {
    // 获取 CDN 前缀
    const prefix = typeof opt.prefix === 'string' ? opt.prefix : vueImg.cdn;

    // 获取图片质量
    const quality = opt.quality <= 100 ? opt.quality : 75;

    // 获取图片尺寸
    const getSize = (str) => {
      // 不传入尺寸，返回原图
      if (!str) return '';

      const index = str.indexOf('*');
      let size = 'thumbnail/';

      // 只指定宽度，等比缩放
      if (index === -1) {
        size += `${str}x/`;

      // 指定宽高，cover 切图
      } else {
        const cover = str.slice(0, index) + 'x' + str.slice(index + 1);
        size += `!${cover}r/gravity/Center/crop/${cover}/`;
      }

      return size;
    };

    // Vue 自定义指令
    Vue.directive('img', {
      bind() {
        this.el.src = opt.loading;
      },

      update(hash) {
        if (!hash) return;

        const format = vueImg.canWebp ? 'webp' : 'jpg';
        const param = `?imageMogr/quality/${quality}/format/${format}/` + getSize(this.arg);

        const src = prefix + vueImg.toPath(hash) + param;
        const img = new Image();

        img.src = src;

        img.onload = () => {
          this.el.src = src;
        };

        if (!opt.error) return;
        img.onerror = () => {
          this.el.src = opt.error;
        };
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
