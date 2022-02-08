## 这是一个挺早发生的事

> 公司项目分离里一部分给甲方公司，但是甲方公司在测试环境（Jenkins 自动部署）上总是跑不起来，找到我帮忙解决（耗时一天！沟通成本，进度反响不及时）

当天下午看到 chrome 的 source 下的依赖和我们不一样，终于在第二天拿到了甲方 Jenkins 配置的指令：npm install/ npm build, 我们的 Jenkins 使用的 yarn / yarn build 由此确定问题所在。

package.json 中部分依赖指定的是版本范围：

```
"dependencies": {
    "packageA": "^2.0.0"
},

```

用 npm 安装（npm5.0.0 以前）这会导致时间不同，不同项目的所装的依赖不同，比如项目 A 是 2.3.3，项目 B 是 2.6.7。
虽然：

> npm 作为开源世界的一部分，也遵循一个发布原则：相同大版本号下的新版本应该兼容旧版本。

但是：

> 很多开源库的开发者并没有严格遵守这个发布原则

npm 5.0.0 以后引入了 package-lock.json 创建版本快照，限定了依赖（我们项目没用过 npm）

特别说明：

```
// package.json
"dependencies": {
    "vue": "^2.2.0"
  }

// package-lock.json
"dependencies": {
    "vue": {
      "version": "2.1.0",
      "resolved": "https://registry.npm.taobao.org/vue/download/vue-2.1.0.tgz",
      "integrity": "sha1-KTuj76rKhGqmvL+sRc+FJMxZfj0="
    }
  }
```

这种情况下 package-lock.json 指定的 2.1.0 不在^2.2.0 指定的范围内，npm install 会按照^2.2.0 的规则去安装最新的 2.6.10 版本，并且将 package-lock.json 的版本更新为 2.6.10。
