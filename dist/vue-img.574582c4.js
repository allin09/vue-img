!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define("VueImg",["exports"],n):n(e.VueImg=e.VueImg||{})}(this,function(e){"use strict";var n="//fuss10.elemecdn.com",t=["alpha","beta"];t.forEach(function(e){window.document.domain.match(e+".ele")&&(n="//fuss."+e+".elenet.me")});var i=n;e.canWebp=!1;var r=new Image;r.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==",r.onload=function(){e.canWebp=!0};var o=function(e){return(e+"").replace(/^(\w)(\w\w)(\w{29}(\w*))$/,"/$1/$2/$3.$4")},A=function(e){if(!e)return"";var n=e.indexOf("*"),t="thumbnail/";if(-1===n)t+=e+"x/";else{var i=e.slice(0,n)+"x"+e.slice(n+1);t+="!"+i+"r/gravity/Center/crop/"+i+"/"}return t},a=function(e,n,t){return"?imageMogr/quality/"+e+"/"+n+A(t)},c=function(n,t,r){var A="string"==typeof t.prefix?t.prefix:i,c=t.quality<=100?t.quality:75,u=function(e,n){e&&n&&("img"===r?e.src=n:e.style.backgroundImage="url("+n+")")};n.directive(r,{bind:function(e){u(e,t.loading)},update:function(n,i){if(i.value){var r=e.canWebp?"format/webp/":"",f=A+o(i.value)+a(c,r,i.arg),l=new Image;l.src=f,l.onload=function(){u(n,f)},t.error&&(l.onerror=function(){u(n,t.error)})}}})},u=function(e,n){c(e,n,"img"),c(e,n,"bgi")};e.cdn=i,e.toPath=o,e.install=u});