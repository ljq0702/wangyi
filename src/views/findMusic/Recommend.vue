<!--导航栏 - 推荐 -->
<script setup >
import { onMounted, reactive, ref } from 'vue'
import { getBanner } from '../../request/api';
const banners = reactive([]);
const imgIndex = ref(0)
let transition_Ref = reactive({});
onMounted(() => {
    getBanner().then(res => {
        if (res.code == 200) {
            banners.values = res.banners
            console.log(banners.values);
        }
    })
    bannerAuto();
})
// 轮播图左右切换
function moveto(to) {
    transition_Ref = {}
    if (to == 'previous' && imgIndex.value != 0) {
        imgIndex.value--
    } else if (to == 'previous' && imgIndex.value == 0) {
        imgIndex.value = banners.values.length - 1
    }
    if (to == 'next' && imgIndex.value != banners.values.length - 1) {
        imgIndex.value++
    } else if (to == 'next' && imgIndex.value == banners.values.length - 1) {
        imgIndex.value = 0
    }
}
// 轮播图指示器切换
function moveToImg(index) {
    imgIndex.value = index
}
// 轮播图的自动切换
function bannerAuto() {
    let timer = null
    clearInterval(timer)
    timer = setInterval(() => {
        transition_Ref = {
            transition: 'opacity .5s linear'
        }
        imgIndex.value++
        if (imgIndex.value >= banners.values.length) {
            imgIndex.value = 0
        }
    }, 5000)

}
</script>
<template>
    <div class="content">
        <div id="banner"
            :style="{ backgroundImage: banners.values.length ? `url(${banners.values[imgIndex].imageUrl})` : '' }">
            <div class="container">
                <a href="javascript:void(0)" @click="moveto('previous')"><span class="iconfont icon-zuojiantou"></span></a>
                <a href="javascript:void(0)" @click="moveto('next')"><span class="iconfont icon-youjiantou"></span></a>
                <div class="banner_main clear">
                    <div class="banner_imgs">
                        <div class="indicator">
                            <a href="#" v-for="(item, index) in banners.values" :key="index"
                                :style="{ backgroundColor: imgIndex == index ? '#CD1111' : '#B3B3B3' }"
                                @click="moveToImg(index)"></a>
                        </div>
                        <template v-for="(item, index) in banners.values" :key="index">
                            <a href="#" :class="imgIndex == index ? 'opacity' : 'opacity_no'" :style="transition_Ref"><img
                                    alt="" :src="item.imageUrl"></a>
                        </template>
                    </div>
                    <div class="download">
                        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </div>
                </div>

            </div>
        </div>
        <div id="main" class="clear"> 
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </div>
</template>
    

    
<style lang="less" scoped>
.content {
    background-color: #f5f5f5;
    #banner {
        height: 285px;
        // background-color: red;
        background-size: 6000px;
        background-position: center center;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            backdrop-filter: blur(100px);
            // z-index: 1;
        }

        .container {
            height: 285px;
            position: relative;
            > a:hover{
                background-color: rgba(51, 51, 51, 0.2);
            }
            >a .iconfont{
                font-size: 35px;
                color: #CFCFCF;
            }
            >a{
                width: 37px;
                height: 63px;
                text-align: center;
                line-height: 63px;
            }
            >a:nth-child(1) {
                position: absolute;
                top:calc(50% - 17.5px) ;
                left: 0;
            }

            >a:nth-child(2) {
                position: absolute;
                top: calc(50% - 17.5px);
                right: 0;
            }

            .banner_main {
                height: 100%;
                width: 980px;
                margin: 0 auto;

                .banner_imgs {
                    width: 730px;
                    height: 100%;
                    background-color: hotpink;
                    overflow: hidden;
                    position: relative;
                    float: left;
                    .indicator {
                        width: 100%;
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        z-index: 2;
                        text-align: center;

                        a {
                            display: inline-block;
                            width: 7px;
                            height: 7px;
                            background-color: #B3B3B3;
                            border-radius: 20px;
                            margin: 0 10px;

                            &:hover {
                                background-color: #CD1111;
                            }
                        }
                    }

                    a {

                        // transition: opacity .5s linear;
                        img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 730px;
                            height: 285px;
                            z-index: 1;
                        }
                    }

                }
                .download{
                width: 250px;
                height: 100%;
                background-color: hotpink;
                float: left;
                background: url(../../assets/images/download.png) no-repeat;
                position: relative;
                text-align: center;
                p{
                    color: #8d8d8d;
                    font-size: 12px;
                    position: absolute;
                    bottom: 13px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                }
            }

            }
            
        }
    }

    .opacity {
        opacity: 1;
        // z-index: 1;
    }

    .opacity_no {
        opacity: 0;
    }

    #main {
        width: 980px;
        background-color: #fff;
        height: 1725px;
        margin: 0 auto;
        .left{
           
        }
    }
}</style>