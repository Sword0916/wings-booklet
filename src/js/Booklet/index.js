import Page from "../Page"
import { bindEvent, throttle, scrollTo, isNumeric} from "../utils"
import {Tween} from "../utils/Tween";

class Booklet{

    constructor(options) {
        options = {
            ...{
                direction: "vertical",
                easingFun: Tween.Linear,
                flipDuration: 500,
                offset: 0,
                turnPage: () => {},
                beforeFlipPage: () => {},
                afterFlipPage: () => {},
            },
            ...options
        }

        this._splitValues = options.splitValues;//分割值数组
        this._splitProportions = options.splitProportions;//分割比例数组
        this._splitNumber = options.splitNumber;//等分数
        this._className = options.className;
        this._scrollDom = options.scrollDom; //出现滚动条的节点
        this._direction = options.direction == "vertical"? true : false;//滚动方向(true：竖向，false:横向)
        this._turnPage = options.turnPage;//滚动翻页回调
        this._beforeFlipPage = options.beforeFlipPage;//跳转前回调
        this._afterFlipPage = options.afterFlipPage;//跳转后回调
        this._easingFun = options.easingFun;//缓动函数
        this._flipDuration = isNumeric(options.flipDuration) && options.flipDuration  >= 100 ? options.flipDuration : 100;//最少100毫秒
        this._pages = [];
        this._currentIndex = 0; //当前页码
        this._pastIndex = 0; //翻页前页码
        this._pageCount;//总页数
        this._offset = isNumeric(options.offset)? options.offset : 0;//偏移量
        this._isFlipping = false;//正在跳转（flipTo）

        this._init();
        bindEvent(this, this._scrollDom, "scroll", throttle(this._scrollFun));
    }

    _init(){
        if(this._className) { //多dom模式
            this._createMultipleDomPages();
        } else { //长dom模式
            this._createSingleDomPages();
        }
        this._calculateCurrentPage();
        this._pastIndex = this._currentIndex;
        this._pageCount = this._pages.length;
    }

    //创建单节点模式页面
    _createSingleDomPages() {
        if(!this._scrollDom) {
            throw new Error("未找到对应节点！");
        }

        if(!this._splitValues || !this._splitValues.length) {
            this._splitValues = [];
            const totalLong = this._direction? this._scrollDom.scrollHeight : this._scrollDom.scrollWidth; //总长
            if(this._splitProportions && this._splitProportions.length) {
                this._splitProportions.forEach(part => {
                    this._splitValues.push(part * totalLong);
                })
            } else {
                this._splitNumber = this._splitNumber || 5;
                const part = 1 / this._splitNumber;
                for(let i = 0; i < this._splitNumber; i++) {
                    this._splitValues.push(part * totalLong);
                }
            }
        }

        this._pages= [];
        let sumLong = 0;//累计长度
        this._splitValues.forEach((v, index) => {
            const page = new Page({
                pageIndex: index,
                direction: this._direction,
                scrollValue: sumLong,
                scrollDom: this._scrollDom,
                widthOrHeight: v,
                isVirtual: true
            });
            this._pages.push(page);
            sumLong += v;
        })
    }

    //创建多节点模式页面
    _createMultipleDomPages() {
        let domArr = document.getElementsByClassName(this._className);
        if(!domArr) {
            throw new Error("未找到对应节点！");
        }
        domArr = Array.prototype.slice.call(domArr);

        this._pages= [];
        domArr.forEach((dom, index) => {
            const page = new Page({
                pageIndex: index,
                dom: dom,
                direction: this._direction,
                scrollDom: this._scrollDom,
                isVirtual: false
            });
            this._pages.push(page);
        })
    }

    //滚动方法
    _scrollFun(e) {
        if(!this._isFlipping) {
            this._calculateCurrentPage();
            if(this._currentIndex !== this._pastIndex) {
                const pastIndex = this._pastIndex;
                this._pastIndex = this._currentIndex;
                //滚动翻页回调
                this._turnPage(pastIndex, this._currentIndex);
            }
        }
    }

    //计算当前页码
    _calculateCurrentPage() {
        for(let i = 0; i < this._pages.length; i++) {
            const page = this._pages[i];
            if(page.isInViewport()) {
                this._currentIndex = page.getPageIndex();
                break;
            }
        }
    }

    //刷新
    refresh() {
        this._init();
        return this;
    }

    //设置缓动函数
    setEasing(easingFun) {
        (typeof easingFun === 'function') && (this._easingFun = easingFun);
        return this;
    }

    //设置跳转时长
    setFlipDuration(duration) {
        if(isNumeric(duration) && duration >= 100) {
            this._flipDuration = duration;
        }
        return this;
    }

    //设置跳转偏移量
    setOffset(offset) {
        if(isNumeric(offset)) {
            this._offset = offset;
        }
        return this;
    }

    //跳转方法
    flipTo(pageIndex) {
        let page = this._pages[pageIndex];
        if(!page) {
            throw new Error("未找到该页");
        }
        this._isFlipping = true;

        //跳转前回调
        this._beforeFlipPage(this._currentIndex);
        const to = page.getScrollValue() + this._offset;
        scrollTo(this._direction, this._easingFun, this._scrollDom, to, this._flipDuration, () => {
            this._isFlipping = false;
            //更新当前页码
            this._currentIndex = pageIndex;
            //跳转后回调
            this._afterFlipPage(this._currentIndex);
        });
    }

    //获取当前页码
    getCurrentIndex() {
        return this._currentIndex;
    }

    //获取总页数
    getPageCount() {
        return this._pageCount;
    }

}

export default Booklet;
