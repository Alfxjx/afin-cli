# @afin/cli

和金融前端脚手架(Vue 全家桶+element-ui+echarts@5)

## 用法

安装方法 `npm i -g afin-cli`，在一个新的目录下，运行`afin create <项目名称>`。

```bash
# -t 表示使用模板，可选参数，目前默认是vue
afin create test -t vue

# 直接输入 afin 显示具体操作
```
安装的模板文件目前在[这里](https://github.com/Alfxjx/cli-template)

## 开发计划

v0.6.0: 可选的模板地址功能。
v0.6.3: 默认可选 -d --default
v0.6.5: 脚手架自己升级 `afin u` 
v0.6.7: 自行安装依赖，设置选择的pm,优先级（yarn npm etc..）

// TODO lint
  src\api\config.js
  src\components\afin\AfinScrolltop.vue
  src\directives\clickout.js 

// TODO main.js clickout.js typo