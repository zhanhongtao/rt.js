;(function() {
  var templateSetting = {
    // 任意字符
    evaluate: /<%([\s\S]+?)%>/g, 
    // = -> 属性值
    interpolate: /<%=([\s\S]+?)%>/g,
    // - -> 转义
    escape: /<%-([\s\S]+?)%>/g
  };
  var noMatch = /(.)^/;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27'
  };
  var escapeReg = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g')
  var r = {};
  r.escape = function( string ) {
    if ( string == null ) return '';
    return ( '' + string ).replace( escapeReg, function( match ) {
      return escapeMap[ match ];
    });
  }

  function defaults( obj ) {
    ([].slice.call(arguments, 1)).forEach(function( source ) {
      if ( source ) {
        for ( var prop in source ) {
          if ( obj[ prop ] === void 0 ) {
            obj[ prop ] = source[ prop ];
          }
        }
      }
    });
    return obj;
  }

  function template( text, data, setting ) {
    var render;
    setting = defaults( {}, setting, templateSetting );
    
    var matcher = new RegExp([
    (setting.escape || noMatch).source,
    (setting.interpolate || noMatch).source,
    (setting.evaluate || noMatch ).source
    ].join('|') + '|$', 'g' );
    
    var index = 0;
    // __p 在下面定义.
    var source = "__p+='";

    text.replace( matcher, function( match, escape, interpolate, evaluate, offset ) {
      
      source += text.slice( index, offset )
      .replace( escaper, function( match ) {
        return '\\' + escapes[match];
      });
      
      if ( escape ) {
        source += "' + \n((__t=(" + escape + "))==null?'':r.escape(__t))+\n'";
      }
      
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      
      index = offset + match.length;
      return match;
      
    });
    
    source += "';\n";
    
    if( !setting.variable ) {
      source = 'with(obj||{}){\n' + source + '}\n';
    }  
    
    source = "var __t, __p = '', __j=Array.prototype.join," +
    "print=function() { __p+=__j.call(arguments, '');};\n" +
    source + "return __p;\n";
    
    try {
      render = new Function( setting.variable || 'obj', 'r', source );
    }
    catch(e) {
      e.source = source;
      throw e;
    }
    
    if ( data ) return render( data );
    var template = function( data ) {
      return render.call( this, data, r );
    };
    
    template.source = 'function('+ (setting.variable || 'obj') +') {\n' + source + '}';
    return template;
  }

  this.template = template;
  
})();

/**
  var compiled = template("\r\nhello: <%= name %>");
  var result = compiled({name: 'moe'});
  console.log( result, compiled.source );

  var list = "<%people.forEach(function(name) {%> <li><%=name%></li> <% }); %>";
  result = template(list, {people: ['moe', 'curly', 'larry']});
  console.log( result );

  var template = template("<b><%- value %></b>");
  result = template({value: '<script>'});
  console.log( result, template.source );
*/