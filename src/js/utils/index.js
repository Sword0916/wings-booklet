
const requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
})();

//滚动方法
function move(direction, parentNode, amount) {
    direction? setScrollTop(parentNode, amount) : setScrollLeft(parentNode, amount);
}

function position(direction, parentNode) {
    return direction? getScrollTop(parentNode): getScrollLeft(parentNode);
}

/**
 * @param {boolean} direction
 * @param {function} easingFun
 * @param {node} parentNode
 * @param {number} to
 * @param {number} duration
 * @param {function} callback
 */
export function scrollTo(direction, easingFun, parentNode, to, duration, callback) {
    const start = position(direction, parentNode);
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    duration = (typeof (duration) === 'undefined') ? 500 : duration;
    const animateScroll = function() {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        const val = easingFun(currentTime, start, change, duration);
        // move the document.body
        move(direction, parentNode, val);
        // do the animation unless its over
        if (currentTime < duration) {
            requestAnimFrame(animateScroll);
        } else {
            if (callback && typeof (callback) === 'function') {
                // the animation is done so lets callback
                callback();
            }
        }
    }
    animateScroll();
}

//节流函数
export function throttle(func, delay = 300) {
    let lastExecTime = 0;

    return function() {
        const context = this;
        const args = arguments;
        const now = Date.now();

        if (now - lastExecTime >= delay) {
            func.apply(context, args);
            lastExecTime = now;
        }
    };
}

//保存事件的this
function bindAsEventListener(func, object, ...params) {
    return function (event) {
        return func.call(object, event || window.event, ...params);
    };
}

//绑定事件
export function bindEvent(owner, dom, type, listener, ...params) {
    listener = bindAsEventListener(listener, owner, ...params);
    (isBody(dom)? window: dom).addEventListener(type, listener, false);
}

//是否是body节点
export function isBody(dom) {
    return dom.tagName == "BODY";
}

//是否是数字
export function isNumeric(value) {
    return (
        (typeof value === 'number' || value instanceof Number) && !isNaN(value)
    );
}


export function getScrollTop(dom) {
    return isBody(dom)? dom.parentNode.scrollTop || dom.scrollTop : dom.scrollTop;
}

export function getScrollLeft(dom) {
    return isBody(dom)? dom.parentNode.scrollLeft || dom.scrollLeft : dom.scrollLeft;
}

export function setScrollTop(dom, scrollValue) {
    if(isBody(dom)) {
        dom.parentNode.scrollTop = scrollValue;
        dom.scrollTop = scrollValue;
    } else {
        dom.scrollTop = scrollValue;
    }
}

export function setScrollLeft(dom, scrollValue) {
    if(isBody(dom)) {
        dom.parentNode.scrollLeft = scrollValue;
        dom.scrollLeft = scrollValue;
    } else {
        dom.scrollLeft = scrollValue;
    }
}