'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

void function() {
  var vueImg = {};

  vueImg.install = function(Vue, opt) {
    Vue.directive('img', {
      acceptStatement: true,

      bind: function bind() {
        this.el.src = opt.loading;
      },
      update: function update(hash) {
        var _this = this;

        if (!hash) return;

        var path = opt.prefix + hashToPath(hash);
        var size = this.arg;
        var src = path + '?imageMogr/thumbnail/' + size + 'x' + size + '/format/webp/quality/75';
        var img = new Image();

        img.src = src;

        img.onload = function() {
          _this.el.src = src;
        };

        img.error = function() {
          if (opt.error) {
            _this.el.src = opt.error;
          }
        };
      }
    });
  };

  function hashToPath(hash) {
    return (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');
  }

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == "object") {
    module.exports = vueImg;
  } else if (typeof define == "function" && define.amd) {
    define([], function() {
      return vueImg;
    });
  } else if (window.Vue) {
    window.VueImg = vueImg;
  }
}();