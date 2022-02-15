import {keAlert} from './ke-alert'
import {keConfirm} from './ke-confirm'
import {keCustom} from './ke-custom'
import {keDatetime} from './ke-datetime'
import {kePopup} from './ke-popup'
import {keSwiper} from './ke-swiper'
import {keToast} from './ke-toast'
import {keVideo} from './ke-video'

//定义install方法，接收Vue作为参数。如果使用use注册插件，则所有的组件都将被注册
const install = function(Vue) {
    //判断是否安装
    if (install.installed) {
        return
    }
    //遍历注册全局组件
    const components = [
        keAlert,
        keConfirm,
        keCustom,
        keDatetime,
        kePopup,
        keSwiper,
        keToast,
        keVideo
    ]
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}
//判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

//自适应布局：动态设置rem与px比例
let pxW = 375
const resizeFontSize = () => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / pxW * 10 + 'px'
}
resizeFontSize()
window.addEventListener('resize', resizeFontSize, false)

export default {
    install, //供Vue.use()方法安装
    keAlert,
    keConfirm,
    keCustom,
    keDatetime,
    kePopup,
    keSwiper,
    keToast,
    keVideo,
    resetPxWidth: (w=375) => { //重置基准像素宽度（默认375px下，1rem=10px）
        pxW = w
        resizeFontSize()
    }
}