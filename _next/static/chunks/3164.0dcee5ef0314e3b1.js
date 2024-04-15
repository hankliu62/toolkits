"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3164],{33164:function(e,t,r){r.r(t),r.d(t,{conf:function(){return l},language:function(){return d}});var o=r(80419),n=Object.defineProperty,i=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,m=Object.prototype.hasOwnProperty,c={};((e,t,r,o)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let c of a(t))m.call(e,c)||c===r||n(e,c,{get:()=>t[c],enumerable:!(o=i(t,c))||o.enumerable})})(c,o,"default");var s=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],l={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,comments:{blockComment:["<!--","-->"]},brackets:[["<!--","-->"],["<",">"],["{","}"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:'"',close:'"'},{open:"'",close:"'"},{open:"<",close:">"}],onEnterRules:[{beforeText:RegExp(`<(?!(?:${s.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,"i"),afterText:/^<\/(\w[\w\d]*)\s*>$/i,action:{indentAction:c.languages.IndentAction.IndentOutdent}},{beforeText:RegExp(`<(?!(?:${s.join("|")}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,"i"),action:{indentAction:c.languages.IndentAction.Indent}}]},d={defaultToken:"",tokenPostfix:"",tokenizer:{root:[[/@@@@/],[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.root"}],[/<!DOCTYPE/,"metatag.html","@doctype"],[/<!--/,"comment.html","@comment"],[/(<)([\w\-]+)(\/>)/,["delimiter.html","tag.html","delimiter.html"]],[/(<)(script)/,["delimiter.html",{token:"tag.html",next:"@script"}]],[/(<)(style)/,["delimiter.html",{token:"tag.html",next:"@style"}]],[/(<)([:\w\-]+)/,["delimiter.html",{token:"tag.html",next:"@otherTag"}]],[/(<\/)([\w\-]+)/,["delimiter.html",{token:"tag.html",next:"@otherTag"}]],[/</,"delimiter.html"],[/[ \t\r\n]+/],[/[^<@]+/]],doctype:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.comment"}],[/[^>]+/,"metatag.content.html"],[/>/,"metatag.html","@pop"]],comment:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.comment"}],[/-->/,"comment.html","@pop"],[/[^-]+/,"comment.content.html"],[/./,"comment.content.html"]],otherTag:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.otherTag"}],[/\/?>/,"delimiter.html","@pop"],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/[ \t\r\n]+/]],script:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.script"}],[/type/,"attribute.name","@scriptAfterType"],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.text/javascript",nextEmbedded:"text/javascript"}],[/[ \t\r\n]+/],[/(<\/)(script\s*)(>)/,["delimiter.html","tag.html",{token:"delimiter.html",next:"@pop"}]]],scriptAfterType:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.scriptAfterType"}],[/=/,"delimiter","@scriptAfterTypeEquals"],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.text/javascript",nextEmbedded:"text/javascript"}],[/[ \t\r\n]+/],[/<\/script\s*>/,{token:"@rematch",next:"@pop"}]],scriptAfterTypeEquals:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.scriptAfterTypeEquals"}],[/"([^"]*)"/,{token:"attribute.value",switchTo:"@scriptWithCustomType.$1"}],[/'([^']*)'/,{token:"attribute.value",switchTo:"@scriptWithCustomType.$1"}],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.text/javascript",nextEmbedded:"text/javascript"}],[/[ \t\r\n]+/],[/<\/script\s*>/,{token:"@rematch",next:"@pop"}]],scriptWithCustomType:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.scriptWithCustomType.$S2"}],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.$S2",nextEmbedded:"$S2"}],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/[ \t\r\n]+/],[/<\/script\s*>/,{token:"@rematch",next:"@pop"}]],scriptEmbedded:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInEmbeddedState.scriptEmbedded.$S2",nextEmbedded:"@pop"}],[/<\/script/,{token:"@rematch",next:"@pop",nextEmbedded:"@pop"}]],style:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.style"}],[/type/,"attribute.name","@styleAfterType"],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/>/,{token:"delimiter.html",next:"@styleEmbedded.text/css",nextEmbedded:"text/css"}],[/[ \t\r\n]+/],[/(<\/)(style\s*)(>)/,["delimiter.html","tag.html",{token:"delimiter.html",next:"@pop"}]]],styleAfterType:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.styleAfterType"}],[/=/,"delimiter","@styleAfterTypeEquals"],[/>/,{token:"delimiter.html",next:"@styleEmbedded.text/css",nextEmbedded:"text/css"}],[/[ \t\r\n]+/],[/<\/style\s*>/,{token:"@rematch",next:"@pop"}]],styleAfterTypeEquals:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.styleAfterTypeEquals"}],[/"([^"]*)"/,{token:"attribute.value",switchTo:"@styleWithCustomType.$1"}],[/'([^']*)'/,{token:"attribute.value",switchTo:"@styleWithCustomType.$1"}],[/>/,{token:"delimiter.html",next:"@styleEmbedded.text/css",nextEmbedded:"text/css"}],[/[ \t\r\n]+/],[/<\/style\s*>/,{token:"@rematch",next:"@pop"}]],styleWithCustomType:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInSimpleState.styleWithCustomType.$S2"}],[/>/,{token:"delimiter.html",next:"@styleEmbedded.$S2",nextEmbedded:"$S2"}],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/[ \t\r\n]+/],[/<\/style\s*>/,{token:"@rematch",next:"@pop"}]],styleEmbedded:[[/@[^@]/,{token:"@rematch",switchTo:"@razorInEmbeddedState.styleEmbedded.$S2",nextEmbedded:"@pop"}],[/<\/style/,{token:"@rematch",next:"@pop",nextEmbedded:"@pop"}]],razorInSimpleState:[[/@\*/,"comment.cs","@razorBlockCommentTopLevel"],[/@[{(]/,"metatag.cs","@razorRootTopLevel"],[/(@)(\s*[\w]+)/,["metatag.cs",{token:"identifier.cs",switchTo:"@$S2.$S3"}]],[/[})]/,{token:"metatag.cs",switchTo:"@$S2.$S3"}],[/\*@/,{token:"comment.cs",switchTo:"@$S2.$S3"}]],razorInEmbeddedState:[[/@\*/,"comment.cs","@razorBlockCommentTopLevel"],[/@[{(]/,"metatag.cs","@razorRootTopLevel"],[/(@)(\s*[\w]+)/,["metatag.cs",{token:"identifier.cs",switchTo:"@$S2.$S3",nextEmbedded:"$S3"}]],[/[})]/,{token:"metatag.cs",switchTo:"@$S2.$S3",nextEmbedded:"$S3"}],[/\*@/,{token:"comment.cs",switchTo:"@$S2.$S3",nextEmbedded:"$S3"}]],razorBlockCommentTopLevel:[[/\*@/,"@rematch","@pop"],[/[^*]+/,"comment.cs"],[/./,"comment.cs"]],razorBlockComment:[[/\*@/,"comment.cs","@pop"],[/[^*]+/,"comment.cs"],[/./,"comment.cs"]],razorRootTopLevel:[[/\{/,"delimiter.bracket.cs","@razorRoot"],[/\(/,"delimiter.parenthesis.cs","@razorRoot"],[/[})]/,"@rematch","@pop"],{include:"razorCommon"}],razorRoot:[[/\{/,"delimiter.bracket.cs","@razorRoot"],[/\(/,"delimiter.parenthesis.cs","@razorRoot"],[/\}/,"delimiter.bracket.cs","@pop"],[/\)/,"delimiter.parenthesis.cs","@pop"],{include:"razorCommon"}],razorCommon:[[/[a-zA-Z_]\w*/,{cases:{"@razorKeywords":{token:"keyword.cs"},"@default":"identifier.cs"}}],[/[\[\]]/,"delimiter.array.cs"],[/[ \t\r\n]+/],[/\/\/.*$/,"comment.cs"],[/@\*/,"comment.cs","@razorBlockComment"],[/"([^"]*)"/,"string.cs"],[/'([^']*)'/,"string.cs"],[/(<)([\w\-]+)(\/>)/,["delimiter.html","tag.html","delimiter.html"]],[/(<)([\w\-]+)(>)/,["delimiter.html","tag.html","delimiter.html"]],[/(<\/)([\w\-]+)(>)/,["delimiter.html","tag.html","delimiter.html"]],[/[\+\-\*\%\&\|\^\~\!\=\<\>\/\?\;\:\.\,]/,"delimiter.cs"],[/\d*\d+[eE]([\-+]?\d+)?/,"number.float.cs"],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float.cs"],[/0[xX][0-9a-fA-F']*[0-9a-fA-F]/,"number.hex.cs"],[/0[0-7']*[0-7]/,"number.octal.cs"],[/0[bB][0-1']*[0-1]/,"number.binary.cs"],[/\d[\d']*/,"number.cs"],[/\d/,"number.cs"]]},razorKeywords:["abstract","as","async","await","base","bool","break","by","byte","case","catch","char","checked","class","const","continue","decimal","default","delegate","do","double","descending","explicit","event","extern","else","enum","false","finally","fixed","float","for","foreach","from","goto","group","if","implicit","in","int","interface","internal","into","is","lock","long","nameof","new","null","namespace","object","operator","out","override","orderby","params","private","protected","public","readonly","ref","return","switch","struct","sbyte","sealed","short","sizeof","stackalloc","static","string","select","this","throw","true","try","typeof","uint","ulong","unchecked","unsafe","ushort","using","var","virtual","volatile","void","when","while","where","yield","model","inject"],escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/}}}]);