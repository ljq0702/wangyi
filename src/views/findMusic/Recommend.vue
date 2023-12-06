<!--导航栏 - 推荐 -->
<script setup >
import { onMounted, reactive } from 'vue'
import { getBanner } from '../../request/api';
const banners = reactive([]);
onMounted(() => {
    getBanner().then(res => {
        if (res.code == 200) {
            banners.values = res.banners
            console.log(banners.values);
        }
    })
})
function moveto(){
    
}
</script>
<template>
    <div class="content">
        <div id="banner">
            <div class="container">
                <a href="javascript:void(0)" @click="moveto">&lt;</a>
                <a href="javascript:void(0)">&gt;</a>
                <div class="banner_main">
                    <div class="banner_imgs">
                        <template v-for="(item, index) in banners.values" :key="index">
                            <img alt="" :src="item.imageUrl">
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div id="main">

        </div>
    </div>
</template>
    

    
<style lang="less" scoped>
.content {
    background-color: #f5f5f5;

    #banner {
        height: 285px;
        background-color: red;

        .container {
            height: 285px;
            position: relative;

            a:nth-child(1) {
                position: absolute;
                top: 50%;
                left: 0;
            }

            a:nth-child(2) {
                position: absolute;
                top: 50%;
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
                    display: flex;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }


            }
        }
    }

    #main {
        width: 980px;
        background-color: yellow;
        height: 1725px;
        margin: 0 auto;
    }
}</style>