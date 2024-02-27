import { getScrollTop, getScrollLeft, isBody } from "../utils"

class Page {

    constructor(options) {

        this._pageIndex = options.pageIndex;//当前页码
        this._direction = options.direction;//滚动方向
        this._dom = options.dom;//页面dom
        this._scrollDom = options.scrollDom;//滚动条的dom

        this._isVirtual = options.isVirtual;//否是虚拟page
        this._widthOrHeight = options.widthOrHeight;//页面宽度或高度（虚拟page使用）
        this._scrollValue = options.scrollValue;//滚动值（滚动到当前页所需的滚动值）（虚拟page使用）

        this._init();
    }

    _init() {
        this._isVirtual? this._initVirtualPage(): this._initRealDomPage();
    }

    //初始化虚拟页
    _initVirtualPage() {
        this._top = this._direction? this._scrollValue: 0;
        this._left = this._direction? 0 : this._scrollValue;
    }

    //初始化实体页
    _initRealDomPage(){
        const pTop = getScrollTop(this._scrollDom);
        const pLeft = getScrollLeft(this._scrollDom);
        const pRect = isBody(this._scrollDom)? {top: 0, left: 0}: this._scrollDom.getBoundingClientRect();
        const rect = this._dom.getBoundingClientRect();
        this._top = pTop + rect.top - pRect.top;
        this._left = pLeft + rect.left - pRect.left;
    }

    //获取滚动到本页所需的滚动值
    getScrollValue() {
        return this._direction? this._top: this._left;
    }

    //获取本页页码
    getPageIndex() {
        return this._pageIndex;
    }

    //是否在视口
    isInViewport() {
        if(this._isVirtual) {
            const pTop = getScrollTop(this._scrollDom);
            const pLeft = getScrollLeft(this._scrollDom);
            return this._direction?
                (this._top <= pTop && pTop < this._top + this._widthOrHeight) :
                (this._left <= pLeft && pLeft < this._left + this._widthOrHeight);
        } else {
            const parent = this._scrollDom;
            const child = this._dom;
            const parentRect = isBody(parent)? {
                top: 0, left: 0,
                bottom: (window.innerHeight || document.documentElement.clientHeight),
                right: (window.innerWidth || document.documentElement.clientWidth)
            } : parent.getBoundingClientRect();
            const childRect = child.getBoundingClientRect();
            return (
                    (childRect.top >= parentRect.top && childRect.top <= parentRect.bottom) ||
                    (childRect.bottom >= parentRect.top && childRect.bottom <= parentRect.bottom) ||
                    (childRect.top <= parentRect.top && childRect.bottom >= parentRect.bottom)
                ) && (
                    (childRect.left >= parentRect.left && childRect.left <= parentRect.right) ||
                    (childRect.right >= parentRect.left && childRect.right <= parentRect.right) ||
                    (childRect.left <= parentRect.left && childRect.right >= parentRect.right)
            );
        }
    }

}

export default Page;

