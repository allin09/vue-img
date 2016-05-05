# vue-img

饿了么图片加载插件，包含以下功能：

1. 读取 CDN 地址
2. 检测 webP 支持
3. 计算图片 hash，转换为 url
4. 设置图片与背景地址

## 使用方法

### 自定义指令

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

### 配置插件

```JS
Vue.use(VueImg, {
  loading: '',      // [String] 原始图片（必填）
  error: '',        // [String] 错误图片（可选）
  prefix: '',       // [String] 自定义前缀（可选）
  quality: 75       // [Number] 图片质量（可选）
});
```

### 可用属性

```bash
cdn          # [String]   当前可用的 CDN 前缀
canWebp      # [Boolean]  当前设备是否支持 webP
toPath       # [Function] 将 hash 转为 path
```

## 注意事项

1. vue-img 遵循 UMD 规范打包，暴露的全局变量为 `VueImg`
2. 指令 `v-bgi` 仅会设置 `background-image` 属性，你可能还需要自己设置 `background-size` `background-repeat`
3. 由于 `v-bgi` 这个指令比较丑，可能会在以后的某个大版本中修改。

## 贡献代码

```bash
fork + clone
npm install
npm run dev
npm run build
```

欢迎提交 issue 和 pr

## 开源协议

MIT
