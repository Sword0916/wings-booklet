# wings-booklet

npm地址:[https://www.npmjs.com/package/@sword0916/wings-booklet](https://www.npmjs.com/package/@sword0916/wings-booklet)

github地址:[https://github.com/Sword0916/wings-booklet](https://github.com/Sword0916/wings-booklet)

简书地址:[https://www.jianshu.com/p/d48c5a1823fc](https://www.jianshu.com/p/d48c5a1823fc)


## 一、项目安装和引用
### 1、安装
```
npm i @sword0916/wings-booklet
```

### 2、引用
```
import WingsBooklet from "@sword0916/wings-booklet"
```

## 二、创建小册子
### 1、初始化一个WingsBooklet
```javascript
//多节点模式（多个dom，每个dom是一页）
let booklet = new WingsBooklet({
    className: "page",
    scrollDom: document.body
});

//单节点模式（一个dom,按比例或像素长度分割为多页）
booklet = new WingsBooklet({
    scrollDom: document.getElementById("long-dom"),
    splitProportions: [0.1, 0.2, 0.1, 0.2, 0.1, 0.2, 0.1],
})
```
多节点垂直示例

![01多节点垂直分页.gif](https://upload-images.jianshu.io/upload_images/29665657-6bf4ff9897c490b8.gif?imageMogr2/auto-orient/strip)

单节点水平示例

![04单节点水平等分分页.gif](https://upload-images.jianshu.io/upload_images/29665657-55fcb1d88c796fc9.gif?imageMogr2/auto-orient/strip)
### 2、参数列表

|序号|参数名|类型|默认值|说明|
|----|----|----|----|----|
|1|scrollDom|dom| |出现滚动条的节点|
|2|className|string|page|页的共有class|
|3|splitValues|array| |分割像素数组（单节点模式,取值范围是各页对应的长度，单位是px）|
|4|splitProportions|array| |分割比例数组（单节点模式,取值范围是（0，1）且总和必须是1）|
|5|splitNumber|number| |等比例分割份数（单节点模式，取值范围是正整数）|
|6|direction|string|vertical|滚动方向（vertical、horizontal）|
|7|easingFun|function|WingsBooklet.Easing.Linear|缓动函数(默认线性，其他参照examples/00缓动函数示意.html)|
|8|flipDuration|number|500|跳转时长（单位毫秒,最小100）|
|9|offset|number|0|跳转的偏移量|
|10|turnPage|function| |滚动翻页回调（回调参数：翻页前页索引，翻页后页索引）|
|11|beforeFlipPage|function| |跳转前回调（回调参数：当前页索引）|
|12|afterFlipPage|function| |跳转后回调（回调参数：当前页索引）|

## 三、获取当前页码
```javascript
booklet.getCurrentIndex();
```

## 四、获取总页数
```javascript
booklet.getPageCount();
```

## 五、跳转方法
```javascript
booklet.flipTo(2);//参数是索引，此例是跳转到第3页。
```

## 六、参数设置
### 1、设置缓动函数
内置了常用的缓动函数，并挂载到WingsFill的Easing属性了。

按照它们表示的方程类型进行分组：线性、二次、三次、四次、五次、正弦、指数、圆形、弹性、后退和反弹，然后按缓动类型：In、Out 和 InOut。

也可以设置一个遵循约定自定义缓动函数。
参数必须依次为：t初始时间,b起始位置,c移动的距离,d缓动执行多长时间
```javascript
booklet.setEasing(WingsBooklet.Easing.Elastic.easeInOut);
```
### 2、设置跳转时长
```javascript
booklet.setFlipDuration(2000);
```
设置缓动函数和跳转时长示例

![09设置缓动和时长.gif](https://upload-images.jianshu.io/upload_images/29665657-ddabeed12575b13d.gif?imageMogr2/auto-orient/strip)

### 3、设置跳转偏移量
```javascript
booklet.setOffset(-50);
```
设置偏移量示例

![10设置偏移量.gif](https://upload-images.jianshu.io/upload_images/29665657-cbcc069317903301.gif?imageMogr2/auto-orient/strip)


### 4、链式调用
```javascript
booklet.setOffset(200).setEasing(WingsBooklet.Easing.Bounce.easeInOut).setFlipDuration(5000).flipTo(2);
```
## 七、小册子刷新
### 页面内容改变时（删除某一页或者改变页面的宽高），flipTo不能跳转到改变后的新位置。刷新小册子后，flipTo才能跳转到新的位置。
```javascript
booklet.refresh();
```
刷新小册子示例

![11刷新小册子.gif](https://upload-images.jianshu.io/upload_images/29665657-000ef9416223477c.gif?imageMogr2/auto-orient/strip)