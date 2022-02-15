
/**
    校验是否手机设备
    @param
    @return 是否手机设备
 */
const checkMobile = () => {
    const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    for (let i = 0; i < agents.length; i++) {
        if (navigator.userAgent.indexOf(agents[i]) > 0) {
            return true
        }
    }
    return false
}

/**
    阻止默认行为
    @param
    @return
 */
const preventDefault = () => {
    let e = window.event 
    if (e.preventDefault) {
        e.preventDefault()
    } else {
        e.returnValue = false
    }
}

/**
    px转换成rem
    @param px px尺寸
    @return rem尺寸
 */
const convertRem = (px) => {
    return px / (document.documentElement.clientWidth / 375 * 10)
}

/**
    rem转换成px
    @param rem rem尺寸
    @return px尺寸
 */
const convertPx = (rem) => {
    return rem * document.documentElement.clientWidth / 375 * 10
}

/**
	节流
	@param fn 回调函数
	@return
*/
const limit = function(fn) {
    let isLimit = false
    return function() {
        if (!isLimit) {
            isLimit = true
            fn.call(this, function() {
                isLimit = false
            }, ...arguments)
        }
    }
}

/**
	防抖
	@param fn 回调函数
	@return
*/
const debounce = function(fn, wait) {
    let timeout = null
    return function (...args) {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.call(this, args)
        }, wait)
    }
}

/**
    获取app环境类型
    @param
    @return app环境类型
 */
const getAppType = ()=> {
    const u = window.navigator.userAgent
    if (u.indexOf('Android') > -1) {
        return 'android'
    }
    if (u.indexOf('Linux') > -1 || u.indexOf('Windows') > -1) {
        return 'pc'
    }
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return 'ios'
    }
    return 'pc'
}

export {
    checkMobile,
    preventDefault,
    convertRem,
    convertPx,
    limit,
    debounce,
    getAppType
}
