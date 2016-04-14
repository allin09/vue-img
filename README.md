# vue-img

eleme 外卖平台团队常用组件，包含以下功能：

1. 读取 CDN 地址
2. 检测 webP 支持
3. 计算图片 hash，转换为 url

## 使用方法

### 自定义指令

```bash
v-img = hash            # 使用原始尺寸
v-img:40 = hash         # 指定宽度，等比缩放
v-img:50*40 = hash      # 指定宽高，cover 展示
```

### 初始化插件

```JS
Vue.use(VueImg, {
  loading: '',      // [String] 原始图片（必填）
  error: '',        // [String] 错误图片（可选）
  prefix: '',       // [String] 自定义 CDN（可选）
  quality: 75       // [Number] 图片质量（可选）
});
```

## 可用属性

`vueImg` 对象包含的外部可调用属性：

```bash
cdn          # [String]   当前可用的 CDN 前缀
canWebp      # [Boolean]  当前设备是否支持 webP
toPath       # [Function] 将 hash 转为 path
```

**注意：** 如果使用的是非模块化方案，`vueImg` 暴露的全局对象为 `VueImg`。

## 开源协议

MIT