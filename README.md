# RT

Compile 参考 Mustache 和 underscore.js 的 template 函数. 
扫描字符代码来自 Mustache.


## 特点:
* 支持注释
* 重定义 tag - [[, ]]
* 支持调试 - chrome develop tool 自动支持.
* 支持在模板中书写 JavaScript 代码.
* 内置转义文本字符, 防止 xss; 同时可扩展转义字符.
* 支持子模板.


## 语法说明
* 默认 tag: `<% %>`
* 注释: `<%# %>`
* 代码: `<% for( var i = 0, n = array.length; i < n; i++ ) {} %>`
* 转义输出: `<%= context.property %>`
* 不转义输出: `<%& context.property %>`
* 原样输出: `<%% text %>`
* 切换 tag: `<%@ {{ }} @%>`
* 子模板: `<%> tag %>` -> 用户可自定义 rTemplate.supportInclude 函数.( @tag, @return string )
* 支持扩展函数: 把方法扩展到 `rTemplate.utils` 对象上, 内置 `include`, `escape` 方法. 然后在模板中可直接使用 `utils.methodName( argument );`


## 补充说明
0. 在 & 或者 = 中, 使用 JavaScript 语句时, 不能添加 ; 号.
1. 只在 <% %> 中写语句. 而在 & 和 = 中写变量, 属性或表达式, object.property, Math.random()[不加分号], <%= index + 1 %> 等表达式.
2. 在 template 中只写符合模板的注释 - 不写 html/css/javascript 注释.


### 其它
Mustach.js 的 compile -> [Esprima](http://esprima.org/)

