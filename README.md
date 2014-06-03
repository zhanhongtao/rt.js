# rt.js

一款基于 JavaScript 语法的模板引擎.


## 快速上手.

1. 引入 rt.js 文件.
2. 使用 rt.render( template, data ); 生成 HTML 字符串.

```
var template = '<%= it %>'
var html = rt.render( template, 'template data' );
```

## 特性:
* 支持注释
* 重定义 tag - [[, ]]
* 支持调试 - chrome develop tool 自动支持.
* 在模板中书写 JavaScript 代码.
* 内置转义文本字符, 防止 xss; 同时可扩展转义字符.
* 支持子模板.

## 语法说明
* 默认 tag: `<% %>`
* 注释: `<%# %>`
* 代码: `<% for( var i = 0, n = array.length; i < n; i++ ) {} %>`
* 转义输出: `<%= it.property %>`
* 不转义输出: `<%& it.property %>`
* 原样输出: `<%% text %>`
* 切换 tag: `<%@ {{ }} @%>`
* 子模板: `<%> tag %>` -> 用户可自定义 rt.supportInclude 函数.( @tag, @return string )

## 补充说明
0. 在 & 或者 = 中, 使用 JavaScript 语句时, 不能添加 ; 号.
1. 只在 <% %> 中写语句. 而在 & 和 = 中写变量, 属性或表达式, object.property, Math.random()[不加分号], <%= index + 1 %> 等表达式.
2. 在 template 中只写符合模板的注释 - 不写 html/css/javascript 注释.


## 实例

### 使用 rt.render 生成 html 字符串.

```
var template = '<%= it %>'
var html = rt.render( template, 'template data' );
```

### 使用 rt.compile 生成模板函数.
```
// html:
<script type="text" id="tmpl">
  <ul>
  <% for( var i = 0, l = it.length; i < l; ++i ) { %>
    <li><%= it[i] %></li>
  <%}%>
  <ul>
</script>

// JavaScript:
var template = document.getElementById( 'tmpl' );
var render = rt.compile( template, 'tmpl'/* 可选 id, 建议添加 */ );
var html = render( [ 'github', 'yahoo', 'google'] );
```

[更多(more)](http://zhanhongtao.github.io/blog/rt)


### 其它
compile 参考 Mustache 和 underscore.js 的 template 函数. 
扫描字符代码来自 Mustache.
Mustach.js 的 compile -> [Esprima](http://esprima.org/)


