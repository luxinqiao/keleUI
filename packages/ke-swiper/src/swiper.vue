<template>
    <div class='swiper' @touchstart.prevent='touchstart($event)' @touchmove.prevent='touchmove($event)' @touchend.prevent='touchend($event)'>
        <img class='swiper-item' v-for='(item, i) in datas' :key='i' :src='item' :class='getImgClass(i)' :ref='"img"+i'>
        <div class='swiper-index' :style='{width: 3*datas.length+"rem"}'>
            <span v-for='(item, i) in datas' :key='i' @touchstart='transIndex(i)'>
                <span :class='i==currIndex?"active":""'></span>
            </span>
        </div>
        <div class='swiper-tip' v-if='datas.length < 3'>请至少添加3张轮播图</div>
    </div>
</template>

<script>
    export default {
        name: 'keSwiper',
        props: {
            datas: { //数据源（必填）
                type: Array,
                default: ()=>{
                    return []
                }
            },
            interval: { //轮播间隔（单位：ms）
                type: Number,
                default: ()=>{
                    return 4000
                }
            },
            animationInterval: { //轮播执行动画间隔（单位：ms）
                type: Number,
                default: ()=>{
                    return 400
                }
            },
            moveDistance: { //需触发轮播的手指滑动x轴最小距离（单位：px）
                type: Number,
                default: ()=>{
                    return 50
                }
            }
        },
        data() {
            return {
                prevIndex: -1,
                currIndex: 0,
                nextIndex: 1,
                touchStartX: 0,
                transing: false
            }
        },
        mounted() {
            this.prevIndex = this.datas.length - 1
            this.refreshInterval()
        },
        methods: {
            /**
                刷新定时器
                @param
                @return
             */
            refreshInterval() {
                clearInterval(this.intervalFun)
                this.intervalFun = setInterval(()=>{
                    if (this.$refs[`img${this.currIndex}`].length > 0) {
                        this.transNext()
                    }
                }, this.interval)
            },
            /**
                触摸开始事件
                @param {Dom} e 轮播元素
                @return
             */
            touchstart(e) {
                if (this.transing) {
                    return
                }
                this.touchStartX = e.targetTouches[0].pageX
            },
            /**
                触摸移动事件
                @param {Dom} e 轮播元素
                @return
             */
            touchmove(e) {
                if (this.transing) {
                    return
                }
                const moveX = e.targetTouches[0].pageX - this.touchStartX
                const currImg = this.$refs[`img${this.currIndex}`][0]
                currImg.style.transform = `translateX(${moveX}px)`
                if (moveX < 0) {
                    const nextImg = this.$refs[`img${this.nextIndex}`][0]
                    nextImg.style.transform = `translateX(${moveX}px)`
                } else if (moveX > 0){
                    const prevImg = this.$refs[`img${this.prevIndex}`][0]
                    prevImg.style.transform = `translateX(${moveX}px)`
                }
                clearInterval(this.intervalFun)
            },
            /**
                触摸结束事件
                @param {Dom} e 轮播元素
                @return
             */
            touchend(e) {
                if (this.transing) {
                    return
                }
                const moveX = e.changedTouches[0].pageX - this.touchStartX
                if (moveX > this.moveDistance) {
                    this.transPrev()
                } else if (moveX < -this.moveDistance) {
                    this.transNext()
                } else if (moveX > 0){
                    this.transBack()
                } else if (moveX < 0) {
                    this.transBack()
                }
                this.refreshInterval()
            },
            /**
                轮播滑动上一个
                @param
                @return
             */
            transPrev() {
                this.transing = true
                const currImg = this.$refs[`img${this.currIndex}`][0]
                currImg.style.transition = `all ${this.animationInterval/1000}s`
                currImg.style.transform = 'translateX(100%)'
                const prevImg = this.$refs[`img${this.prevIndex}`][0]
                prevImg.style.transition = `all ${this.animationInterval/1000}s`
                prevImg.style.transform = 'translateX(100%)'
                setTimeout(()=> {
                    this.transClear()
                    this.currIndex = this.prevIndex
                    this.prevIndex = this.getPrevIndex(this.currIndex)
                    this.nextIndex = this.getNextIndex(this.currIndex)
                }, this.animationInterval)
            },
            /**
                轮播滑动下一个
                @param
                @return
             */
            transNext() {
                this.transing = true
                const currImg = this.$refs[`img${this.currIndex}`][0]
                currImg.style.transition = `all ${this.animationInterval/1000}s`
                currImg.style.transform = 'translateX(-100%)'
                const nextImg = this.$refs[`img${this.nextIndex}`][0]
                nextImg.style.transition = `all ${this.animationInterval/1000}s`
                nextImg.style.transform = 'translateX(-100%)'
                setTimeout(()=> {
                    this.transClear()
                    this.currIndex = this.nextIndex
                    this.prevIndex = this.getPrevIndex(this.currIndex)
                    this.nextIndex = this.getNextIndex(this.currIndex)
                }, this.animationInterval)
            },
            /**
                轮播滑动指定序号
                @param {Number} i 指定序号
                @return
             */
            transIndex(i) {
                if (this.transing) {
                    return
                }
                if (i == this.currIndex) {
                    return
                }
                if (this.currIndex == 0 && i == this.datas.length - 1) {
                    this.transPrev()
                    return
                }
                if (this.currIndex == this.datas.length - 1 && i == 0) {
                    this.transNext()
                    return
                }
                if (i > this.currIndex) {
                    this.nextIndex = i
                    setTimeout(()=>{
                        this.transNext()
                    }, 20)
                } else {
                    this.prevIndex = i
                    setTimeout(()=>{
                        this.transPrev()
                    }, 20)
                }
                this.refreshInterval()
            },
            /**
                轮播滑动回退
                @param
                @return
             */
            transBack() {
                this.transing = true
                const currImg = this.$refs[`img${this.currIndex}`][0]
                currImg.style.transition = `all ${this.animationInterval/1000}s`
                currImg.style.transform = ''
                const prevImg = this.$refs[`img${this.prevIndex}`][0]
                prevImg.style.transition = `all ${this.animationInterval/1000}s`
                prevImg.style.transform = ''
                const nextImg = this.$refs[`img${this.nextIndex}`][0]
                nextImg.style.transition = `all ${this.animationInterval/1000}s`
                nextImg.style.transform = ''
                setTimeout(()=> {
                    this.transClear()
                }, this.animationInterval)
            },
            /**
                轮播滑动清空
                @param
                @return
             */
            transClear() {
                this.transing = false
                const currImg = this.$refs[`img${this.currIndex}`][0]
                currImg.style.transition = ''
                currImg.style.transform = ''
                const nextImg = this.$refs[`img${this.nextIndex}`][0]
                nextImg.style.transition = ''
                nextImg.style.transform = ''
                const prevImg = this.$refs[`img${this.prevIndex}`][0]
                prevImg.style.transition = ''
                prevImg.style.transform = ''
            },
            /**
                获取上一个序号
                @param {Number} i 序号
                @return {Number} 上一个序号
             */
            getPrevIndex(i) {
                if (i == 0) {
                    return this.datas.length - 1
                }
                return i - 1
            },
            /**
                获取下一个序号
                @param {Number} i 序号
                @return {Number} 下一个序号
             */
            getNextIndex(i) {
                if (i == this.datas.length - 1) {
                    return 0
                }
                return i + 1
            },
            /**
                获取图片class
                @param {Number} i 序号
                @return {String} 图片class
             */
            getImgClass(i) {
                if (i == this.prevIndex) {
                    return 'prev'
                } else if (i == this.nextIndex) {
                    return 'next'
                } else if (i == this.currIndex) {
                    return 'curr'
                }
                return ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .swiper {
        position: relative;
        height: 100%;
        overflow: hidden;
        >.swiper-item {
            position: absolute;
            top: 0; left: -200%;
            width: 100%; height: 100%;
            -webkit-user-drag: none;
        }
        >.swiper-item.prev {
            left: -100%;
        }
        >.swiper-item.curr {
            left: 0;
        }
        >.swiper-item.next {
            left: 100%;
        }
        >.swiper-index {
            position: absolute; z-index: 1;
            bottom: 0; left: 0; right: 0;
            margin: auto;
            height: 2rem;
            >span {
                float: left;
                position: relative;
                margin: 0 0.2rem;
                width: 2.6rem; height: 2rem;
                >span {
                    position: absolute;
                    top: 0; bottom: 0; left: 0; right: 0;
                    margin: auto;
                    height: 0.2rem;
                    background-color: #333;
                }
                >span.active {
                    background-color: #ff2c79;
                }
            }
        }
        >.swiper-tip {
            position: absolute; z-index: 2;
            top: 0; bottom: 0; left: 0; right: 0;
            display: flex;
            align-items: center; justify-content: center;
            background-color: rgba(0, 0, 0, 0.65); color: #fff;
        }
    }
</style>
