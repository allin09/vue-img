# vue-img

eleme 外卖平台团队常用组件，包含以下功能：

1. 读取 CDN 地址
2. 检测 webP 支持
3. 计算图片 hash，转换为 url

## 使用方法

### 自定义指令

```bash
v-img:40 = hash         # 宽 40，高 40 
v-img:50*40 = hash      # 宽 50，高 40
```

### 初始化插件

```JS
Vue.use(VueImg, {
  prefix: '',  // 自定义 CDN 前缀（可选）
  loading: '', // 默认原始图片（必填）
  error: ''    // 报错替代图片（可选）
});
```

## 可用属性

`vueImg` 对象包含两个可调用的属性：

```bash
cdn          # [String]  当前可用的 CDN 前缀
canWebp      # [Boolean] 当前设备是否支持 webP
```

**注意：** 如果使用的是非模块化方案，`vueImg` 暴露的全局对象为 `VueImg`。
