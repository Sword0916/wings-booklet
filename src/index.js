import Booklet from "./js/Booklet";
import {Tween} from "./js/utils/Tween";
const __proto__ = Object.getPrototypeOf(Booklet);
__proto__.Easing = Tween; //挂载缓动函数

export default Booklet