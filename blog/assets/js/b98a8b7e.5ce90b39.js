"use strict";(self.webpackChunkmy_blog=self.webpackChunkmy_blog||[]).push([[1925],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),s=u(n),f=o,d=s["".concat(p,".").concat(f)]||s[f]||m[f]||a;return n?r.createElement(d,i(i({ref:t},c),{},{components:n})):r.createElement(d,i({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=s;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},2515:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return u},assets:function(){return c},toc:function(){return m},default:function(){return f}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={title:"LoopBack 4 2019 Q2 Overview",date:new Date("2019-07-17T00:00:00.000Z"),authors:"dhmlau",slug:"loopback-4-2019-q2-overview",tags:["Quarterly update"]},p=void 0,u={permalink:"/blog/loopback-4-2019-q2-overview",editUrl:"https://github.com/loopbackio/loopback-blog/blog/2019/2019-07-17-q2-overview.md",source:"@site/blog/2019/2019-07-17-q2-overview.md",title:"LoopBack 4 2019 Q2 Overview",description:"Originally published on strongloop.com",date:"2019-07-17T00:00:00.000Z",formattedDate:"July 17, 2019",tags:[{label:"Quarterly update",permalink:"/blog/tags/quarterly-update"}],readingTime:4.04,truncated:!0,authors:[{name:"Diana Lau",title:"LoopBack Maintainer",url:"https://github.com/dhmlau",imageURL:"https://avatars2.githubusercontent.com/u/25489897",key:"dhmlau"}],frontMatter:{title:"LoopBack 4 2019 Q2 Overview",date:"2019-07-17T00:00:00.000Z",authors:"dhmlau",slug:"loopback-4-2019-q2-overview",tags:["Quarterly update"]},prevItem:{title:"Building an Online Game With LoopBack 4 - Deploying our Application to Kubernetes on IBM Cloud (Part 5)",permalink:"/blog/building-an-online-game-with-loopback-4-pt5"},nextItem:{title:"LoopBack 4 June 2019 Milestone Update",permalink:"/blog/loopback-june-2019-milestone"}},c={authorsImageUrls:[void 0]},m=[],s={toc:m};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Originally published on ",(0,a.kt)("a",{parentName:"em",href:"https://strongloop.com"},"strongloop.com"))),(0,a.kt)("p",null,"For the past few months, we have been focusing on the following stories: "),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#authentication"},"Authentication"),": released a new ",(0,a.kt)("inlineCode",{parentName:"li"},"@loopback/authentication")," 2.0 version."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#authorization"},"Authorization"),": ability to add authorization through interceptors."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#inclusion_of_related_models"},"Inclusion of related models"),": set up foundation in ",(0,a.kt)("inlineCode",{parentName:"li"},"repository-json-schema")," package."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#architectural_improvements"},"Architectural improvements"),": introduction of lifecycle observers and interceptors."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#migration"},"Migration"),": allows you to migrate incrementally."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#internal_tooling_and_ci"},"Internal tooling and CI"),": Support Node.js 12, reduce build time, etc."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"#new_look_and_feel_on_loopBack_web_site"},"New Look and Feel on LoopBack Web Site"),": published a new look on the ",(0,a.kt)("a",{parentName:"li",href:"https://loopback.io"},"loopback.io")," web site.")),(0,a.kt)("p",null,"We have a monthly blog reviewing what we've done in each milestone. To stay tuned, don't forget to follow us on Twitter ",(0,a.kt)("a",{parentName:"p",href:"https://twitter.com/@StrongLoop"},"@StrongLoop"),"."))}f.isMDXComponent=!0}}]);