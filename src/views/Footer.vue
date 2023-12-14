
<script setup>
import {reactive} from 'vue'
    const tabArr = reactive([
        {
            name: '音乐开放平台',
            url: 'https://developer.music.163.com/st/developer',
        },
        {
            name: '云村交易所',
            url: '//music.163.com/st/web-sublicense/home',
        },
        {
            name: 'Amped Studio',
            url: 'https://web-amped.music.163.com/',
        },
        {
            name: 'X Studio虚拟歌手',
            url: 'https://xstudio.music.163.com',
        },
        {
            name: '用户认证',
            url: '//music.163.com/st/userbasic#/auth',
        },
        {
            name: '音乐交易平台',
            url: 'href="//music.163.com/st/ad-cms-bills/mlogin?from=mainStation"',
        },
        {
            name: '云推歌',
            url: 'https://music.163.com/st/ad-song',
        },
        {
            name: '赞赏',
            url: '//music.163.com/web/reward',
        },  
    ])
</script>
<template>
    <div id="footer">
        <div class="container">
            <ul>
                <li v-for="(item, index) in tabArr" :key="index">
                    <a :href="item.url" target="_blank"></a>
                    <span>{{ item.name }}</span>
                </li>
            </ul>
            <div class="copy">
                <p>
                    <a href="https://beian.miit.gov.cn/" target="_blank">服务条款</a>
                    <span class="line">|</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank">隐私政策</a>
                    <span class="line">|</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank">儿童隐私政策</a>
                    <span class="line">|</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank">版权投诉</a>
                    <span class="line">|</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank">投资者关系</a>
                    <span class="line">|</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank">广告合作</a>
                    <span class="line">|</span>
                    <a href="https://beian.miit.gov.cn/" target="_blank">联系我们</a>
                </p>
                <p>
                    <a href="#">廉政举报</a>
                    <span>不良信息举报邮箱: 51jubao@service.netease.com</span>
                    <span>客服热线：95163298</span>
                </p>
                <p>
                    <span>互联网宗教信息服务许可证：浙（2022）0000120</span>
                    <span>增值电信业务经营许可证：浙B2-20150198</span>
                    <a href="#">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
                </p>
                <p>
                    <span>网易公司版权所有©1997-2023</span>
                    <span>杭州乐读科技有限公司运营:</span>
                    <a href="#">浙网文[2021] 1186-054号</a>
                    <a href="#">
                        <span></span>
                        <span>浙公网安备 33010802013307号</span>
                    </a>
                </p>
            </div>
        </div>
    </div> 
</template> 
<style lang="less">
    #footer{
        height: 325px;
        background-color: #f2f2f2;
        border-top: 1px solid #d3d3d3;
        .container{
            width: 980px;
            height: 100%;
            background-color: #fff;
            overflow: hidden;
            ul{
                display: flex;
                justify-content: center;
                margin-top: 33px;
                li{
                    width: 45px;
                    margin-left: 80px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    &:first-child{
                        margin-left: 0;
                    }
                    a {
                        background: url(../assets/images/foot_enter_new2.png) no-repeat;
                        background-size: 220px 220px;
                        display: block;
                        width: 45px;
                        height: 45px;
                        &:nth-child(1){
                            background-position: -170px -5px;
                            &:hover{
                                background-position: -5px -115px;
                            }
                        }
                        &:nth-child(2){
                            background-position:-5px -170px;
                            &:hover{
                                background-position: -60px -170px;
                            }
                        }
                        &:nth-child(3){
                            background-position: -5px -60px;
                            &:hover{
                                background-position: -60px -5px;
                            }
                        }
                        &:nth-child(4){
                            background-position: -170px -5px;
                            &:hover{
                                background-position: -5px -115px;
                            }
                        }
                        &:nth-child(5){
                            background-position: -60px -60px;
                            &:hover{
                                background-position: -115px -5px;
                            }
                        }
                        &:nth-child(6){
                            background-position: -115px -115px;
                            &:hover{
                                background-position: -5px -5px;
                            }
                        }
                        &:nth-child(7){
                            background-position: -170px -5px;
                            &:hover{
                                background-position: -5px -115px;
                            }
                        }
                        &:nth-child(8){
                            background-position: -170px -115px;
                            &:hover{
                                background-position: -60px -115px;
                            }
                        }
                    }
                    span{
                        font-size: 12px;
                        display: inline-block;
                        width: 100px;
                        color:  rgba(0, 0, 0, 0.5);
                        margin-top: 10px;
                    }
                }
            }
            .copy{
                padding-top: 60px;
                box-sizing: border-box;
                text-align: center;
                font-size: 12px;
                line-height: 24px;
                & p:first-child{
                    font-size: 12px;
                    color: #666;
                    .line{
                        margin: 0px 8px;
                    }
                }
                & p:nth-child(2){
                    a{
                        margin-right: 10px;
                    }
                    span{
                        margin-right: 14px;
                    }
                }
                & p:nth-child(3){
                    a{
                        margin-right: 10px;
                    }
                    span{
                        margin-right: 14px;
                    }
                }
                & p:nth-child(4){
                    a{
                        margin-right: 10px;
                    }
                    span{
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>