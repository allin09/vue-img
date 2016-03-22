void function() {
  const vueImg = {};

  vueImg.install = (Vue, opt) => {
    Vue.directive('img', {
      acceptStatement: true,

      bind() {
        this.el.src = opt.loading;
      },

      update(hash) {
        if (!hash) return;

        const path = opt.prefix + hashToPath(hash);
        const size = this.arg;
        const src = `${path}?imageMogr/thumbnail/${size}x${size}/format/webp/quality/75`;
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
  }

  function hashToPath(hash) {
    return (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');
  }

  if (typeof exports == "object") {
    module.exports = vueImg;
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return vueImg;
    });
  } else if (window.Vue) {
    window.VueImg = vueImg;
  }
}();
