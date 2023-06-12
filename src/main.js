import count from "./js/count";
import sum from "./js/sum";
import { ride } from "./js/plus";

// 注意:要想让webpack打包资源，必须引入该资源
import "./css/iconfont.css";
import "./css/index.css";
import "./less/index.less";
import "./scss/index.scss";
import "./scss/index.sass";
import "./stylus/index.styl";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
console.log(ride(3, 3));
