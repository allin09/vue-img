# vue-img

将 hash 值转换成图片地址，包含默认图片功能。（内部专用，需要配合 CDN）  

## 使用方法

1. 引入 vue-img
2. 使用自定义指令 `v-img:40="hashxxxxx"`，其中的 `40` 代表图片大小
3. 初始化插件

```
Vue.use(VueImg, {
  prefix: '',  // CDN 前缀
  loading: '', // 默认加载图片
  error: ''    // 错误时加载
});
```