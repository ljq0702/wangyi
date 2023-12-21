<!--导航栏 - 推荐 -->
<script setup >
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getBanner, getPersonalized, getNewDisc, getTopList, getPlaylistDetail, getPlayListAll } from '../../request/api';
import ListTitle from '@/components/findMusic/ListTitle.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
const banners = reactive([]);
const imgIndex = ref(0)
const tabs_popular = ['华语', '流行', '摇滚', '民谣', '电子'] // 热门推荐
const recommendSong_list = reactive([]); // 推荐歌单数据
const newDisc_list = reactive([]); // 新碟上架标记
let transition_Ref = reactive({}); // bannner样式对象
const num_disc = ref(1); // 新碟轮播标记
const disc_style = reactive([]) // 新碟上架滑动样式
let userSwiper = null  // 使用swiper
const topList = reactive([]);
onBeforeMount(() => {
    getBanner().then(res => {
        if (res.code == 200) {
            banners.values = res.banners
        }
    })
    getTJ(); // 获取推荐数据
    getNewDiscData(); // 获取新碟推荐数据
    getTopListData(); // 获取榜单数据
})
onMounted(() => {
    bannerAuto();
})
//  获取推荐歌单
function getTJ() {
    getPersonalized(8).then((res) => {
        if (res.code == 200) {
            recommendSong_list.values = res.result
        }
    })
}
// 获取新碟上架数据
function getNewDiscData() {
    getNewDisc({ limit: 10 }).then(res => {
        if (res.code == 200) {
            let newArr = [];
            for (let i = 0; i < 10; i += 5) {
                newArr.push(res.weekData.slice(i, i + 5));
            }
            newArr.push(newArr[0]);
            newArr.unshift(newArr[newArr.length - 2])
            newDisc_list.values = newArr;
            // newDisc_list.values = res
        }
    })
}
// 获取所有榜单数据
function getTopListData() {
    getTopList().then(res => {
        if (res.code == 200) {
            topList.values = res.list.splice(0, 3);
            topList.values.forEach((item, index) => {
                getPlayListAll({ id: item.id, limit: 10 }).then(res => {
                    if (res.code == 200) {
                        topList.values[index].playlist = res.songs;
                    }
                })
            })
        }
    })
}
// 获取歌单详情
function getPlaylistDetailData(id) {
    getPlaylistDetail(id).then(res => {
        if (res.code == 200) {
            console.log(res);
        }
    })
}
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
const onSwiper = (swiper) => {
    console.log(swiper);
    userSwiper = swiper
}
// 新碟上架 轮播 向左移动
function onPrevious() {
    userSwiper.slidePrev();
}
// 新碟上架 轮播 向右移动
function onNext() {
    userSwiper.slideNext();
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
                            <a href="" :class="imgIndex == index ? 'opacity' : 'opacity_no'" :style="transition_Ref"><img
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
            <div class="left">
                <ListTitle title="热门推荐" :need_tab="tabs_popular">
                    <template v-slot>
                        <ul class="popular">
                            <li v-for="(item, index) in recommendSong_list.values" :key="index">
                                <div
                                    :style="{ background: `url(${item.picUrl}) no-repeat center center`, backgroundSize: '140px 140px' }">
                                    <!-- <img :src="item.picUrl" alt=""> -->
                                </div>
                                <a href="#">{{ item.name }}</a>
                            </li>
                        </ul>
                    </template>
                </ListTitle>
                <ListTitle title="新碟上架">
                    <div class="newDisc_wrap clear">
                        <div class="swiper-button-prev pre">
                            <a href="javascript:void(0)" @click="onPrevious" class="pre"><span
                                    class="iconfont icon-zuojiantou"></span></a>
                        </div>
                        <swiper :modules="modules" :loop="true" :slides-per-view="1" :space-between="5"
                            :scrollbar="{ draggable: false }" class="swiperBox roll" @swiper="onSwiper"
                            @slideChange="onSlideChange">
                            <swiper-slide v-for="(item, index) in newDisc_list.values" :key="index">
                                <ul>
                                    <li v-for="(item2, index2) in item" :key="index2">
                                        <div>
                                            <img :src="item2.picUrl" alt="">
                                            <a href="#" class="mask"></a>
                                            <a href="#"></a>
                                        </div>
                                        <p class="title_head">{{ item2.name }}</p>
                                        <p class="title_foot">{{ item2.artists[0].name }}</p>
                                    </li>
                                </ul>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-next next">
                            <a href="javascript:void(0)" @click="onNext" class="next"><span
                                    class="iconfont icon-youjiantou"></span></a>
                        </div>

                    </div>
                </ListTitle>
                <ListTitle title="榜单">
                    <div class="bangdan clear">
                        <div class="toplist" v-for="(item, index) in topList.values">
                            <div class="top">
                                <div class="cover_img">
                                    <img :src="item.coverImgUrl + '?param=80y80'" alt="">
                                </div>
                                <div class="top_op clear">
                                    <a href="#">{{ item.name }}</a>
                                    <div>
                                        <a href="#"><span class="iconfont icon-bofang"></span></a>
                                        <a href="#"><span class="iconfont icon-tianjiawenjianjia"></span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="list">
                                <ul>
                                    <li class="clear" v-for="(item_song, i) in item.playlist" :key="i">
                                        <span>{{ i + 1 }}</span>
                                        <a href="#">{{ item_song.name }}</a>
                                        <div class="play_op">
                                            <a href="#"><span class="iconfont icon-bofang"></span></a>
                                            <a href="#"><span class="iconfont icon-bofang"></span></a>
                                            <a href="#"><span class="iconfont icon-bofang"></span></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="look_all">
                                <a href="#"><span>查看全部></span></a>
                            </div>
                        </div>
                    </div>
                </ListTitle>
            </div>
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

            >a:hover {
                background-color: rgba(51, 51, 51, 0.2);
            }

            >a .iconfont {
                font-size: 35px;
                color: #CFCFCF;
            }

            >a {
                width: 37px;
                height: 63px;
                text-align: center;
                line-height: 63px;
            }

            >a:nth-child(1) {
                position: absolute;
                top: calc(50% - 17.5px);
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
                    // background-color: hotpink;
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

                .download {
                    width: 250px;
                    height: 100%;
                    background-color: hotpink;
                    float: left;
                    background: url(../../assets/images/download.png) no-repeat;
                    position: relative;
                    text-align: center;

                    p {
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
        height: 1423px;
        margin: 0 auto;
        border: 1px solid #d3d3d3;
        box-sizing: border-box;

        .left {
            width: 728px;
            height: 100%;
            border-right: 1px solid #d3d3d3;
            box-sizing: border-box;
            float: left;
            padding: 20px 20px 40px;

            .popular {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 0;

                li {
                    width: 140px;
                    padding-bottom: 30px;

                    >div {
                        width: 140px;
                        height: 140px;
                        margin-bottom: 10px;

                        img {
                            width: 140px;
                            height: 140px;
                        }
                    }

                    >a {
                        // width: 140px;
                        font-size: 14px;
                        color: #000;

                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }


            }

            .newDisc_wrap {
                height: 184px;
                background-color: #f5f5f5;
                border: 1px solid #d3d3d3;
                line-height: 184px;
                // padding-left: 16px;
                position: relative;

                // >a {
                //     // float: left;
                // }

                .pre {
                    position: absolute;
                    top: 0;
                    left: 2px;
                    z-index: 99;
                }

                .next {
                    position: absolute;
                    top: 0;
                    right: 2px;
                }

                .roll {
                    height: 180px;
                    width: 645px;
                    margin-top: 2px;
                    overflow: hidden;
                    position: relative;

                    ul {
                        width: 645px;
                        margin-top: 28px;
                        position: absolute;
                        top: 0;

                        // float: left;
                        li {
                            width: 118px;
                            height: 150px;
                            display: inline;
                            float: left;
                            margin-left: 11px;

                            div {
                                width: 118px;
                                height: 109px;
                                position: relative;
                                background: url(../../assets/images/index.png) no-repeat;
                                background-position: -260px 100px;

                                // background-size: ;
                                .mask {
                                    width: 118px;
                                    height: 100px;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    background: url(../../assets/images/coverall.png) no-repeat;
                                    background-position: 0px -570px;
                                }

                                img {
                                    width: 100px;
                                    height: 100px;
                                }
                            }

                            p {
                                line-height: 18px;
                                font-size: 12px;
                                // position: absolute;
                            }

                            .title_head {
                                color: #000;
                                text-wrap: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;

                            }

                            .title_foot {
                                color: #666;
                            }
                        }
                    }
                }

            }

            .bangdan {
                height: 472px;
                background: url(../../assets/images/index_bill.png) no-repeat center center;

                .toplist {
                    width: 230px;
                    height: 100%;
                    float: left;

                    &:last-child {
                        width: 227px;
                        float: left;
                    }

                    .top {
                        width: 230px;
                        height: 120px;
                        padding: 20px 0px 0px 19px;

                        .cover_img {
                            float: left;
                            img{
                                width: 80px;
                                height: 80px;
                            }
                        }

                        .top_op {
                            width: 116px;
                            float: left;
                            margin: 6px 0px 0px 10px;

                            >a {
                                font-size: 14px;
                                color: #333;
                                font-weight: 900;

                                &:hover {
                                    text-decoration: underline;
                                }
                            }

                            div {
                                a {
                                    margin-right: 10px;

                                    span {
                                        font-size: 22px;
                                        color: #BDBDBD;
                                    }
                                }
                            }
                        }
                    }

                    .list {
                        width: 230px;
                        height: 320px;
                        ul {
                            width: calc(230px - 50px);
                            height: 100%;
                            margin-left: 50px;

                            li {
                                width: 180px;
                                height: 32px;
                                line-height: 32px;
                                >span {
                                    font-size: 16px;
                                    color: #666;
                                    width: 35px;
                                    height: 32px;
                                    margin-left: -35px;
                                    text-align: center;
                                    float: left;
                                }

                                &:nth-child(1) span,
                                &:nth-child(2) span,
                                &:nth-child(3) span {
                                    color: #C10D0C;
                                }

                                >a {
                                    width: 170px;
                                    height: 32px;
                                    font-size: 12px;
                                    color: #000;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    float: left;

                                    &:hover {
                                        text-decoration: underline;
                                    }
                                }

                                .play_op {
                                    display: none;
                                    width: 82px;
                                    float: right;
                                    font-size: 15px;

                                    >a {
                                        margin-right: 10px;

                                        span {
                                            color: #333;
                                        }
                                    }

                                }

                                &:hover {
                                    >a {
                                        width: 80px;
                                    }
                                    .play_op {
                                        display: block;
                                    }
                                }
                            }
                        }
                    }
                    & > div:last-child{
                        height: 32px;
                        line-height: 32px;
                        padding-right: 30px;
                        text-align: right;
                        font-size: 12px;
                        color: #666;
                        >a:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

        .right {
            width: 250px;
            height: 100%;
            float: left;
        }


    }
}</style>