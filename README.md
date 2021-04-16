# @afin/cli

和金融前端脚手架(Vue 全家桶+element-ui+echarts@5)

## 用法

安装方法 `npm i -g afin-cli`，在一个新的目录下，运行`afin create <项目名称>`。

```bash
# npm i -g @afin/cli

# 新建项目
afin create <name>
# -t 表示使用模板，可选参数，目前默认是vue
afin create test -t vue

# 显示帮助
afin -h / afin --help

# 升级
afin -u / afin --upgrade

# 直接输入 afin 显示具体操作
```

安装的模板文件目前在[这里](https://github.com/Alfxjx/cli-template)

1. vue 最小化的vue模板
2. pro 带一个element-ui示例的页面
3. admin 拉取[vue-element-admin](https://panjiachen.github.io/vue-element-admin/#/dashboard)模板

## 开发计划

- v0.5.6: 默认可选 -d --default
- v0.5.6: 脚手架自己升级 `afin u`
- v0.5.8: 可选的模板地址功能
- v0.6.0: 修改使用admin模板的配置bug
- v0.6.1: 设置选择功能，优化界面
- v0.6.5: 自行安装依赖，设置选择的 pm,优先级（yarn npm etc..）

## 存在的bug

1. ~~使用pro模板的时候 必选echarts,实际上echarts可以被不选择。fixed in v0.6.0~~
