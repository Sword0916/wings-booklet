!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.WingsBooklet=e():t.WingsBooklet=e()}(self,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{default:()=>c});const i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,n,o,u,l){const h=function(t,e){return t?r(e):a(e)}(t,n),c=o-h;let _=0;u=void 0===u?500:u;const p=function(){_+=20;const o=e(_,h,c,u);(function(t,e,i){var n,o;t?(o=i,s(n=e)?(n.parentNode.scrollTop=o,n.scrollTop=o):n.scrollTop=o):function(t,e){s(t)?(t.parentNode.scrollLeft=e,t.scrollLeft=e):t.scrollLeft=e}(e,i)})(t,n,o),_<u?i(p):l&&"function"==typeof l&&l()};p()}function s(t){return"BODY"==t.tagName}function o(t){return("number"==typeof t||t instanceof Number)&&!isNaN(t)}function r(t){return s(t)&&t.parentNode.scrollTop||t.scrollTop}function a(t){return s(t)&&t.parentNode.scrollLeft||t.scrollLeft}const u=class{constructor(t){this._pageIndex=t.pageIndex,this._direction=t.direction,this._dom=t.dom,this._scrollDom=t.scrollDom,this._isVirtual=t.isVirtual,this._widthOrHeight=t.widthOrHeight,this._scrollValue=t.scrollValue,this._init()}_init(){this._isVirtual?this._initVirtualPage():this._initRealDomPage()}_initVirtualPage(){this._top=this._direction?this._scrollValue:0,this._left=this._direction?0:this._scrollValue}_initRealDomPage(){const t=r(this._scrollDom),e=a(this._scrollDom),i=s(this._scrollDom)?{top:0,left:0}:this._scrollDom.getBoundingClientRect(),n=this._dom.getBoundingClientRect();this._top=t+n.top-i.top,this._left=e+n.left-i.left}getScrollValue(){return this._direction?this._top:this._left}getPageIndex(){return this._pageIndex}isInViewport(){if(this._isVirtual){const t=r(this._scrollDom),e=a(this._scrollDom);return this._direction?this._top<=t&&t<this._top+this._widthOrHeight:this._left<=e&&e<this._left+this._widthOrHeight}{const t=this._scrollDom,e=this._dom,i=s(t)?{top:0,left:0,bottom:window.innerHeight||document.documentElement.clientHeight,right:window.innerWidth||document.documentElement.clientWidth}:t.getBoundingClientRect(),n=e.getBoundingClientRect();return(n.top>=i.top&&n.top<=i.bottom||n.bottom>=i.top&&n.bottom<=i.bottom||n.top<=i.top&&n.bottom>=i.bottom)&&(n.left>=i.left&&n.left<=i.right||n.right>=i.left&&n.right<=i.right||n.left<=i.left&&n.right>=i.right)}}},l={Linear:function(t,e,i,n){return i*t/n+e},Quad:{easeIn:function(t,e,i,n){return i*(t/=n)*t+e},easeOut:function(t,e,i,n){return-i*(t/=n)*(t-2)+e},easeInOut:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e}},Cubic:{easeIn:function(t,e,i,n){return i*(t/=n)*t*t+e},easeOut:function(t,e,i,n){return i*((t=t/n-1)*t*t+1)+e},easeInOut:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e}},Quart:{easeIn:function(t,e,i,n){return i*(t/=n)*t*t*t+e},easeOut:function(t,e,i,n){return-i*((t=t/n-1)*t*t*t-1)+e},easeInOut:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e}},Quint:{easeIn:function(t,e,i,n){return i*(t/=n)*t*t*t*t+e},easeOut:function(t,e,i,n){return i*((t=t/n-1)*t*t*t*t+1)+e},easeInOut:function(t,e,i,n){return(t/=n/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e}},Sine:{easeIn:function(t,e,i,n){return-i*Math.cos(t/n*(Math.PI/2))+i+e},easeOut:function(t,e,i,n){return i*Math.sin(t/n*(Math.PI/2))+e},easeInOut:function(t,e,i,n){return-i/2*(Math.cos(Math.PI*t/n)-1)+e}},Expo:{easeIn:function(t,e,i,n){return 0==t?e:i*Math.pow(2,10*(t/n-1))+e},easeOut:function(t,e,i,n){return t==n?e+i:i*(1-Math.pow(2,-10*t/n))+e},easeInOut:function(t,e,i,n){return 0==t?e:t==n?e+i:(t/=n/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(2-Math.pow(2,-10*--t))+e}},Circ:{easeIn:function(t,e,i,n){return-i*(Math.sqrt(1-(t/=n)*t)-1)+e},easeOut:function(t,e,i,n){return i*Math.sqrt(1-(t=t/n-1)*t)+e},easeInOut:function(t,e,i,n){return(t/=n/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e}},Elastic:{easeIn:function(t,e,i,n,s,o){var r;return 0==t?e:1==(t/=n)?e+i:(void 0===o&&(o=.3*n),!s||s<Math.abs(i)?(r=o/4,s=i):r=o/(2*Math.PI)*Math.asin(i/s),-s*Math.pow(2,10*(t-=1))*Math.sin((t*n-r)*(2*Math.PI)/o)+e)},easeOut:function(t,e,i,n,s,o){var r;return 0==t?e:1==(t/=n)?e+i:(void 0===o&&(o=.3*n),!s||s<Math.abs(i)?(s=i,r=o/4):r=o/(2*Math.PI)*Math.asin(i/s),s*Math.pow(2,-10*t)*Math.sin((t*n-r)*(2*Math.PI)/o)+i+e)},easeInOut:function(t,e,i,n,s,o){var r;return 0==t?e:2==(t/=n/2)?e+i:(void 0===o&&(o=n*(.3*1.5)),!s||s<Math.abs(i)?(s=i,r=o/4):r=o/(2*Math.PI)*Math.asin(i/s),t<1?s*Math.pow(2,10*(t-=1))*Math.sin((t*n-r)*(2*Math.PI)/o)*-.5+e:s*Math.pow(2,-10*(t-=1))*Math.sin((t*n-r)*(2*Math.PI)/o)*.5+i+e)}},Back:{easeIn:function(t,e,i,n,s){return void 0===s&&(s=1.70158),i*(t/=n)*t*((s+1)*t-s)+e},easeOut:function(t,e,i,n,s){return void 0===s&&(s=1.70158),i*((t=t/n-1)*t*((s+1)*t+s)+1)+e},easeInOut:function(t,e,i,n,s){return void 0===s&&(s=1.70158),(t/=n/2)<1?i/2*(t*t*((1+(s*=1.525))*t-s))+e:i/2*((t-=2)*t*((1+(s*=1.525))*t+s)+2)+e}},Bounce:{easeIn:function(t,e,i,n){return i-l.Bounce.easeOut(n-t,0,i,n)+e},easeOut:function(t,e,i,n){return(t/=n)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOut:function(t,e,i,n){return t<n/2?.5*l.Bounce.easeIn(2*t,0,i,n)+e:.5*l.Bounce.easeOut(2*t-n,0,i,n)+.5*i+e}}},h=class{constructor(t){t={direction:"vertical",easingFun:l.Linear,flipDuration:500,offset:0,turnPage:()=>{},beforeFlipPage:()=>{},afterFlipPage:()=>{},...t},this._splitValues=t.splitValues,this._splitProportions=t.splitProportions,this._splitNumber=t.splitNumber,this._className=t.className,this._scrollDom=t.scrollDom,this._direction="vertical"==t.direction,this._turnPage=t.turnPage,this._beforeFlipPage=t.beforeFlipPage,this._afterFlipPage=t.afterFlipPage,this._easingFun=t.easingFun,this._flipDuration=o(t.flipDuration)&&t.flipDuration>=100?t.flipDuration:100,this._pages=[],this._currentIndex=0,this._pastIndex=0,this._pageCount,this._offset=o(t.offset)?t.offset:0,this._isFlipping=!1,this._init(),function(t,e,i,n,...o){n=function(t,e,...i){return function(n){return t.call(e,n||window.event,...i)}}(n,t,...o),(s(e)?window:e).addEventListener(i,n,!1)}(this,this._scrollDom,"scroll",function(t,e=300){let i=0;return function(){const n=arguments,s=Date.now();s-i>=e&&(t.apply(this,n),i=s)}}(this._scrollFun))}_init(){this._className?this._createMultipleDomPages():this._createSingleDomPages(),this._calculateCurrentPage(),this._pastIndex=this._currentIndex,this._pageCount=this._pages.length}_createSingleDomPages(){if(!this._scrollDom)throw new Error("未找到对应节点！");if(!this._splitValues||!this._splitValues.length){this._splitValues=[];const t=this._direction?this._scrollDom.scrollHeight:this._scrollDom.scrollWidth;if(this._splitProportions&&this._splitProportions.length)this._splitProportions.forEach((e=>{this._splitValues.push(e*t)}));else{this._splitNumber=this._splitNumber||5;const e=1/this._splitNumber;for(let i=0;i<this._splitNumber;i++)this._splitValues.push(e*t)}}this._pages=[];let t=0;this._splitValues.forEach(((e,i)=>{const n=new u({pageIndex:i,direction:this._direction,scrollValue:t,scrollDom:this._scrollDom,widthOrHeight:e,isVirtual:!0});this._pages.push(n),t+=e}))}_createMultipleDomPages(){let t=document.getElementsByClassName(this._className);if(!t)throw new Error("未找到对应节点！");t=Array.prototype.slice.call(t),this._pages=[],t.forEach(((t,e)=>{const i=new u({pageIndex:e,dom:t,direction:this._direction,scrollDom:this._scrollDom,isVirtual:!1});this._pages.push(i)}))}_scrollFun(t){if(!this._isFlipping&&(this._calculateCurrentPage(),this._currentIndex!==this._pastIndex)){const t=this._pastIndex;this._pastIndex=this._currentIndex,this._turnPage(t,this._currentIndex)}}_calculateCurrentPage(){for(let t=0;t<this._pages.length;t++){const e=this._pages[t];if(e.isInViewport()){this._currentIndex=e.getPageIndex();break}}}refresh(){return this._init(),this}setEasing(t){return"function"==typeof t&&(this._easingFun=t),this}setFlipDuration(t){return o(t)&&t>=100&&(this._flipDuration=t),this}setOffset(t){return o(t)&&(this._offset=t),this}flipTo(t){let e=this._pages[t];if(!e)throw new Error("未找到该页");this._isFlipping=!0,this._beforeFlipPage(this._currentIndex);const i=e.getScrollValue()+this._offset;n(this._direction,this._easingFun,this._scrollDom,i,this._flipDuration,(()=>{this._isFlipping=!1,this._currentIndex=t,this._afterFlipPage(this._currentIndex)}))}getCurrentIndex(){return this._currentIndex}getPageCount(){return this._pageCount}};Object.getPrototypeOf(h).Easing=l;const c=h;return e.default})()));