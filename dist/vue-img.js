'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

void function() {
  // 定义 vueImg 对象
  var vueImg = {};

  // 设置 cdn 地址
  vueImg.cdn = '//fuss10.elemecdn.com';
  void function() {
    var domain = document.domain;
    var bases = ['test', 'alpha', 'beta'];
    var rootHost = bases.forEach(function(base) {
      var url = base + '.elenet.me';
      if (domain.match(url)) {
        vueImg.cdn = '//fuss.' + url;
      }
    });
  }();

  // 检测 webP 支持
  vueImg.canWebp = false;
  void function() {
    var img = new Image();
    img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
    img.onload = function() {
      vueImg.canWebp = true;
    };
  }();

  // hash 解析
  var readHash = function readHash(hash) {
    return (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');
  };

  // 获取图片尺寸
  var getSize = function getSize(str) {
    var index = str.indexOf('*');
    var width = void 0,
      height = void 0;

    if (index === -1) {
      width = height = str;
    } else {
      width = str.slice(0, index);
      height = str.slice(index + 1);
    }

    return {
      width: width,
      height: height
    };
  };

  // vue 插件
  vueImg.install = function(Vue, opt) {
    var prefix = typeof opt.prefix === 'string' ? opt.prefix : vueImg.cdn;

    Vue.directive('img', {
      acceptStatement: true,

      bind: function bind() {
        this.el.src = opt.loading;
      },
      update: function update(hash) {
        var _this = this;

        if (!hash) return;

        var size = getSize(this.arg);
        var path = prefix + readHash(hash);
        var src = vueImg.canWebp ? path + '?imageMogr/thumbnail/' + size.width + 'x' + size.height + '/format/webp/quality/75' : path + '?w=' + size.width + '&h=' + size.height;
        var img = new Image();

        img.src = src;
        img.onload = function() {
          _this.el.src = src;
        };
        if (opt.error) {
          img.onerror = function() {
            _this.el.src = opt.error;
          };
        }
      }
    });
  };

  // UMD 模块支持
  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = vueImg;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return vueImg;
    });
  } else if (window.Vue) {
    window.VueImg = vueImg;
  }
}();