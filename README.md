# vue-img@next

eleme 图片加载插件，包含以下功能：

- 读取 CDN 地址
- 检测 webP 支持
- 转换图片 hash 为 url
- 设置图片与背景地址

> next 版本支持 Vue 2，但由于 Vue 2 的限制，必须将 v-img / v-bgi 指令写在第一个。

## 使用方法

### 安装插件

```HTML
<script src="//github.elemecdn.com/banricho/vue-img/next/dist/vue-img.1464081891000.js"></script>
```

### 配置插件

```JS
Vue.use(VueImg, {
  loading: '',      // [String] 原始图片（可选）
  error: '',        // [String] 错误图片（可选）
  prefix: '',       // [String] 自定义前缀（可选）
  quality: 75       // [Number] 图片质量（可选）
});
```

### 使用指令

```bash
# 设置图片 src
v-img = hash            # 使用原始尺寸
v-img:40 = hash         # 指定宽度，等比缩放
v-img:50*40 = hash      # 指定宽高，cover 展示

# 设置容器 background-image
v-bgi = hash
v-bgi:40 = hash
v-bgi:50*40 = hash
```

### 可读属性

```bash
cdn          # [String]   当前的 CDN 前缀
canWebp      # [Boolean]  当前设备是否支持 webP
toPath       # [Function] 将 hash 转为 path
```

## 注意事项

- 本项目遵循 UMD 规范，暴露的全局变量为 `VueImg`
- 指令 `v-bgi` 仅会设置 `background-image` 属性，你可能还需要自行设置 `background-size` `background-repeat`

## 贡献代码

```bash
fork + clone
npm install
npm run build
```

欢迎提交 issue 和 pr

## 开源协议

MIT
