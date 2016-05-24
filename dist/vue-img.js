(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('VueImg', ['exports'], factory) :
  (factory((global.VueImg = global.VueImg || {})));
}(this, function (exports) { 'use strict';

  // CDN's prefix in the production environment
  var cdn = '//fuss10.elemecdn.com';

  // in the test environment
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

  // get image size
  var getSize = function getSize(str) {
    // no size limit
    if (!str) return '';

    var index = str.indexOf('*');
    var size = 'thumbnail/';

    if (index === -1) {
      // only width
      size += str + 'x/';
    } else {
      // both width and height
      var cover = str.slice(0, index) + 'x' + str.slice(index + 1);
      size += '!' + cover + 'r/gravity/Center/crop/' + cover + '/';
    }

    return size;
  };

  var getParam = function getParam(quality, format, size) {
    return '?imageMogr/quality/' + quality + '/' + format + getSize(size);
  };

  var directive = function directive(Vue, opt, type) {
    // CDN's prefix
    var prefix = typeof opt.prefix === 'string' ? opt.prefix : cdn$1;

    // image quality
    var quality = opt.quality <= 100 ? opt.quality : 75;

    // set img.src or element.style.backgroundImage
    var setAttr = function setAttr(el, src) {
      if (!el || !src) return;

      if (type === 'img') {
        el['src'] = src;
      } else {
        el['style']['backgroundImage'] = 'url(' + src + ')';
      }
    };

    Vue.directive(type, {
      bind: function bind(el) {
        setAttr(el, opt.loading);
      },
      update: function update(el, value, modifiers, vnode) {
        if (!value) return;

        var format = exports.canWebp ? 'format/webp/' : '';
        var src = prefix + toPath(value) + getParam(quality, format, vnode.data.directives[0].arg);
        var img = new Image();

        img.src = src;

        img.onload = function () {
          setAttr(el, src);
        };

        if (!opt.error) return;
        img.onerror = function () {
          setAttr(el, opt.error);
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