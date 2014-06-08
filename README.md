# rt.js

一款基于 JavaScript 语法的模板引擎.


## 快速上手.

1. 引入 rt.js 文件.
2. 使用 rt.render( template, data ); 生成 HTML 字符串.

```
var template = '<%= it %>'
var html = rt.render( template, 'I\' am rt.js!' );
```


## 特性:
* 支持注释
* 重定义 tag - [[, ]]
* 在模板中书写 JavaScript 代码.
* 内置转义文本字符, 防止 xss - 同时支持扩展转义字符.
* 支持子模板 - 支持自定义策略.
* 在模板中使用扩展方法. `rt.helper( 'name', method );`
* 支持调试 - chrome develop tool 自动支持.


## 语法说明
* 默认 tag: `<% %>`
* 切换 tag: `<%@ {{ }} @%>`
* 注释: `<%# %>`
* 代码: `<% for( var i = 0, n = array.length; i < n; i++ ) {} %>`
* 转义输出: `<%= it.property %>`
* 不转义输出: `<%& it.property %>`
* 子模板: `<%> tag %>` 默认支持浏览器端 dom#id, 返回 dom.innerHTML. 可使用 rt.helper 注册 'include' 方法重写它.


## 补充说明
* 连续的 JavaScript 脚本放在一个 `<%` 脚本 `%>` 中间. 

不推荐写 - 这种写法可能会出现异常 - 在 switch-case 语法中.
```
  <% for ( var i = 0, l = it.length; i < l; ++i ) { %>
    <% var item = it[i]; %>
    // .....
  <% } %>
```

推荐写成:
```
  <% for ( var i = 0, l = it.length; i < l; ++i ) {
    var item = it[i]; %>
    // .....
  <% } %>
```

* 在 & 或者 = 中, 使用 JavaScript 表达式(不加结束分号).
```
  <%= it.sex %>
  <%& it.style %>
```

* 推荐使用模板中注释语法 - HTML 注释也可使用, 但会被模板引擎渲染.
```
  <%# 推荐写法 %>
  <!-- 不推荐写法 -->
```


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
* compile 参考 Mustache 和 underscore.js 的 template 函数. 
* 扫描字符代码来自 Mustache.
* Mustach.js 的 compile -> [Esprima](http://esprima.org/)
