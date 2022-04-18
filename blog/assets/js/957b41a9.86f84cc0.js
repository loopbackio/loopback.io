"use strict";(self.webpackChunkmy_blog=self.webpackChunkmy_blog||[]).push([[3170],{3905:function(e,t,o){o.d(t,{Zo:function(){return u},kt:function(){return g}});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function p(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)o=a[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var l=n.createContext({}),c=function(e){var t=n.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},u=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=c(o),g=r,d=m["".concat(l,".").concat(g)]||m[g]||s[g]||a;return o?n.createElement(d,i(i({ref:t},u),{},{components:o})):n.createElement(d,i({ref:t},u))}));function g(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=o.length,i=new Array(a);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var c=2;c<a;c++)i[c]=o[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}m.displayName="MDXCreateElement"},8843:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return p},contentTitle:function(){return l},metadata:function(){return c},assets:function(){return u},toc:function(){return s},default:function(){return g}});var n=o(7462),r=o(3366),a=(o(7294),o(3905)),i=["components"],p={title:"Migrating from LoopBack 3 to LoopBack 4",date:new Date("2019-06-12T00:00:00.000Z"),authors:"nabdelgadir",slug:"migrate-from-loopback-3-to-loopback-4",tags:["migration","LoopBack 3"]},l=void 0,c={permalink:"/blog/migrate-from-loopback-3-to-loopback-4",editUrl:"https://github.com/loopbackio/loopback-blog/blog/2019/2019-06-12-migrate-from-loopback-3-to-loopback-4.md",source:"@site/blog/2019/2019-06-12-migrate-from-loopback-3-to-loopback-4.md",title:"Migrating from LoopBack 3 to LoopBack 4",description:"Originally published on strongloop.com",date:"2019-06-12T00:00:00.000Z",formattedDate:"June 12, 2019",tags:[{label:"migration",permalink:"/blog/tags/migration"},{label:"LoopBack 3",permalink:"/blog/tags/loop-back-3"}],readingTime:1.25,truncated:!0,authors:[{name:"Nora Abdelgadir",title:"LoopBack Maintainer",url:"https://github.com/nabdelgadir",imageURL:"https://avatars0.githubusercontent.com/u/42985749",key:"nabdelgadir"}],frontMatter:{title:"Migrating from LoopBack 3 to LoopBack 4",date:"2019-06-12T00:00:00.000Z",authors:"nabdelgadir",slug:"migrate-from-loopback-3-to-loopback-4",tags:["migration","LoopBack 3"]},prevItem:{title:"Building an Online Game With LoopBack 4 - User Authentication and Role-Based Access Control (Part 4)",permalink:"/blog/building-an-online-game-with-loopback-4-pt4"},nextItem:{title:"LoopBack 4 May 2019 Milestone Update",permalink:"/blog/may-2019-milestone"}},u={authorsImageUrls:[void 0]},s=[{value:"Call to Action",id:"call-to-action",children:[],level:2}],m={toc:s};function g(e){var t=e.components,o=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Originally published on ",(0,a.kt)("a",{parentName:"em",href:"https://strongloop.com"},"strongloop.com"))),(0,a.kt)("p",null,"Following the announcement of LoopBack 4 GA in October, LoopBack 3 entered Active Long Term Support (LTS). In March, we  announced that ",(0,a.kt)("a",{parentName:"p",href:"https://strongloop.com/strongblog/lb3-extended-lts/"},"LoopBack 3 will receive extended LTS")," until December 2019. We made this choice to provide LoopBack 3 users more time to move to LoopBack 4 and for us to improve the migration experience. In order to incrementally migrate from LoopBack 3 to LoopBack 4, we have since introduced a way to mount your LoopBack 3 applications in a LoopBack 4 project."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://strongloop.com/authors/Miroslav_Bajto%C5%A1/"},"Miroslav")," investigated different approaches for migration which you can see in the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/strongloop/loopback-next/issues/1849"},"Migration epic"),". He settled on mounting the LoopBack 3 application in a LoopBack 4 project as part of incremental migration (see the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/strongloop/loopback-next/pull/2318"},"PoC")," here). In this approach, the entire LoopBack 3 application is mounted, including its runtime dependencies. The LoopBack 3 Swagger spec is also converted to LoopBack 4 OpenAPI v3 and a unified spec is created."),(0,a.kt)("p",null,"If you are a current LoopBack 3 user who wants to migrate to LoopBack 4, learn all the steps needed to mount your application in this ",(0,a.kt)("a",{parentName:"p",href:"https://loopback.io/doc/en/lb4/Migrating-from-LoopBack-3.html"},"Migrating from LoopBack 3")," doc."),(0,a.kt)("h2",{id:"call-to-action"},"Call to Action"),(0,a.kt)("p",null,"LoopBack's future success depends on you. We appreciate your continuous support and engagement to make LoopBack even better and meaningful for your API creation experience. Please join us and help the project by:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/strongloop/loopback-next/issues"},"Reporting issues"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/strongloop/loopback-next/blob/master/docs/CONTRIBUTING.md"},"Contributing"),"\ncode and documentation."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/strongloop/loopback-next/labels/good%20first%20issue"},'Opening a pull request on one of our "good first issues"'),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/strongloop/loopback-next/issues/110"},"Joining")," our user group.")))}g.isMDXComponent=!0}}]);