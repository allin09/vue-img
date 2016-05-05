(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('VueImg', ['exports'], factory) :
  (factory((global.VueImg = global.VueImg || {})));
}(this, function (exports) { 'use strict';

  var cdn = '//fuss10.elemecdn.com';

  var bases = ['test', 'alpha', 'beta'];

  bases.forEach(function (base) {
    if (window.document.domain.match(base + '.ele')) {
      cdn = '//fuss.' + base + '.elenet.me';
    }
  });

  var cdn$1 = cdn;

  exports.canWebp = false;

  var img = new Image();
  img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
  img.onload = function () {
    exports.canWebp = true;
  };

  var toPath = function toPath(hash) {
    return (hash + '').replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4');
  };

  // 获取图片尺寸
  var getSize = function getSize(str) {
    // 不传入尺寸，返回原图
    if (!str) return '';

    var index = str.indexOf('*');
    var size = 'thumbnail/';

    // 只指定宽度，等比缩放
    if (index === -1) {
      size += str + 'x/';

      // 指定宽高，cover 切图
    } else {
        var cover = str.slice(0, index) + 'x' + str.slice(index + 1);
        size += '!' + cover + 'r/gravity/Center/crop/' + cover + '/';
      }

    return size;
  };

  var getParam = function getParam(quality, format, size) {
    return '?imageMogr/quality/' + quality + '/format/' + format + '/' + getSize(size);
  };

  var directive = function directive(Vue, opt, type) {
    var prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn$1;
    var quality = opt.quality <= 100 ? opt.quality : 75;
    var setAttr = function setAttr(el, src) {
      if (type === 'img') {
        el['src'] = src;
      } else {
        el['style']['backgroundImage'] = 'url(' + src + ')';
      }
    };

    Vue.directive(type, {
      bind: function bind() {
        setAttr(this.el, opt.loading);
      },
      update: function update(hash) {
        var _this = this;

        if (!hash) return;

        var format = exports.canWebp ? 'webp' : 'jpg';
        var src = prefix + toPath(hash) + getParam(quality, format, this.arg);
        var img = new Image();

        img.src = src;

        img.onload = function () {
          setAttr(_this.el, src);
        };

        if (!opt.error) return;
        img.onerror = function () {
          setAttr(_this.el, opt.error);
        };
      }
    });
  };

  var install = function install(Vue, opt) {
    directive(Vue, opt, 'img');
    directive(Vue, opt, 'bgi');
  };

  exports.cdn = cdn$1;
  exports.toPath = toPath;
  exports.install = install;

}));