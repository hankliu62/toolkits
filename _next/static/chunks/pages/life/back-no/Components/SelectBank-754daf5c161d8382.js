(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6214],{24471:function(e,l,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/life/back-no/Components/SelectBank",function(){return n(47244)}])},47244:function(e,l,n){"use strict";n.r(l),n.d(l,{default:function(){return s}});var t=n(11527),a=n(57839),u=n(50959),i=n(90266);function s(e){let{className:l,value:n,disabled:s,onChange:r,...c}=e,o=(0,u.useMemo)(()=>{let e={};return i.Hb.reduce((e,l)=>(e[l.bankCode]=l,e),e),e},[]),d=(0,u.useMemo)(()=>(i.Hb||[]).map(e=>{let{bankName:l,bankCode:n}=e;return{label:l,value:n,description:n||"",filterLabel:l+"|"+(n||"")}}),[]),f=(0,u.useCallback)(e=>{e?r(e,o[e]):r(e,void 0)},[o,r]);return(0,t.jsx)("div",{className:l,children:(0,t.jsx)(a.Z,{...c,className:"w-full",value:n||null,onChange:f,placeholder:"选择银行",disabled:null!=s&&s,showSearch:!0,children:d.map(e=>(0,t.jsx)(a.Z.Option,{value:e.value,label:e.filterLabel,children:(0,t.jsxs)("div",{className:"inline-flex w-full items-center truncate",children:[e.label,(0,t.jsx)("span",{className:"description text-lighter ml-2 flex-1 truncate text-xs",children:e.description})]})},e.value))})})}}},function(e){e.O(0,[7318,8079,9208,8624,6396,9244,266,2888,9774,179],function(){return e(e.s=24471)}),_N_E=e.O()}]);