使用 antd 的表单 Form 很有可能会使用到自定义验证 validator，使用中都会注意调用 callback。
但是需要注意的时，callback 里面不能写条件语句，否则依然可能出现问题。

```
callback(condition ? value1 : '' ); // Error
condition ? callback(value1) : callback(); // Right
```
