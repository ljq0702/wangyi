<script setup>
import { nextTick, onMounted, onUpdated, ref, reactive } from 'vue'
import { useLockStore } from '@/stores/lock'
import { getSongDetails } from '@/request/api.js'
const movement = ref(false)
const lockStore = useLockStore();
const lockState = ref(false)
const audio_play = ref(null) // 控制audio
const isPlay = ref(false)
const songId = ref(null) // 歌曲id
const songSrc = ref(null)
const timer = ref(null);
const currentBar = ref(null); // 当前走的进度条
const songPlayObj = reactive({
    currentTime: null,
    duration: null,
})
onMounted(() => {
    // lockState.value =  sessionStorage.getItem('lock')
    lockState.value = lockStore.lockState
    movement.value = lockState.value;
    nextTick(() => {
        getSongDetailsData();
    })

})
onUpdated(() => {
    // palySong();
})
function songTime() {
    // console.log(audio_play.value.currentTime);
    // console.log(audio_play.value.duration);
    timer.value = setInterval(() => {
        console.log(audio_play.value.buffered);
        let timeRanges  = audio_play.value.buffered
        console.log(timeRanges.start(0));
        if(audio_play.value.ended){
            clearInterval(timer.value)
        }
        let currentTime =  audio_play.value.currentTime;
        let duration = audio_play.value.duration;
        songPlayObj.currentTime = formatTime(currentTime);
        songPlayObj.duration = formatTime(duration);
        currentBar.value.style.width = currentTime / duration * 466+'px';
        // console.log();
    }, 1000)
    
    
}
// 获取歌曲详情
function getSongDetailsData() {
    getSongDetails('347230').then(res => {
        if (res.code == 200) {
            songId.value = res.songs[0].id;
            // audio_play.value = new Audio(`https://music.163.com/song/media/outer/url?id=191254.mp3`);
            songSrc.value = `https://music.163.com/song/media/outer/url?id=191254.mp3`
        }
    })
}
// 移入底部
function overBar() {
    movement.value = true
}
// 移除底部
function outBar() {
    if (lockState.value) {
        return;
    }
    movement.value = false
}
function changeLock() {
    // lockStore.changeLockState();
    lockState.value = !lockState.value
    lockStore.lockState = lockState.value
    // window.sessionStorage.setItem('lock', lockState.value)

}
function palySong() {
    // console.log(123);
    if (isPlay.value) {
        audio_play.value.pause()
        clearInterval(timer.value)
    } else {
        songTime();
        audio_play.value.play()
    }
    isPlay.value = !isPlay.value

}
// 将时间戳转换成分秒的形式
function formatTime(timestamp) {
    const minutes = Math.floor(timestamp / 60)
    const seconds = Math.floor(timestamp % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
// 将分秒时间(如00:03)转化成秒数
function timeToTimestamp(time) {
  const [minutes, seconds] = time.split(':');
  const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  return totalSeconds;
}
</script>
<template>
    <div id="play_bar"
        :style="movement ? { bottom: '0px', transition: 'bottom 1s ease' } : { bottom: '-46px', transition: 'bottom 1s ease' }"
        @mouseover="overBar" @mouseout="outBar">
        <div class="container clear">
            <div class="btns clear">
                <a href="javascript:;" class="pre">上一首</a>
                <a href="javascript:;" :class="isPlay ? 'pause' : 'ply'" @click="palySong">播放/暂停</a>
                <a href="javascript:;" class="nxt">下一首</a>
            </div>
            <div class="head">
                <img src="../assets/images/head.jpg" alt="">
                <a href="javascript:;" class="mask"></a>
            </div>
            <div class="play">
                <div class="words clear">
                    <a href="javascript:;" class="name" title="灰姑娘">灰姑娘</a>
                    <span>
                        <a href="javascript:;">梁咏琪</a>
                    </span>
                    <a href="javascript:;" title="来自歌单" class="src"></a>
                </div>
                <div class="m-pbar">
                    <div class="barbg">
                        <div class="rdy"></div>
                        <div class="cur" ref="currentBar">
                            <span class="btn">
                                <i></i>
                            </span>
                        </div>
                    </div>
                    <span class="time">
                        <em>{{ songPlayObj.currentTime }}</em>
                        / {{ songPlayObj.duration }}
                    </span>
                </div>
            </div>
            <audio class="audio_song" ref="audio_play" controls :src="songSrc" preload="auto"></audio>
            <div class="oper clear">
                <a href="javascript:;" class="icn icn-pip" title="画中画歌词">画中画歌词</a>
                <a href="javascript:;" class="icn icn-add" title="收藏">收藏</a>
                <a href="javascript:;" class="icn icn-share" title="分享">分享</a>
            </div>
            <div class="ctrl">
                <a href="javascript:;" class="icn icn-vol" title="音量"></a>
                <a href="javascript:;" class="icn icn-loop" title="循环"></a>
                <a href="javascript:;" class="icn icn-list" title="播放列表"></a>
            </div>
        </div>
        <div class="bg"></div>
        <div class="right">
            <a class="lock_base" :class="lockState ? 'not_lock' : 'lock'" href="javascript:;" @click="changeLock"></a>
        </div>
    </div>
</template>
<style lang="less">
#play_bar {
    position: fixed;
    left: 0;
    zoom: 1;
    z-index: 99;
    // background-color: red;
    width: 100%;
    height: 53px;
    visibility: visible;

    .container {
        width: 980px;
        height: 47px;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -490px;
        z-index: 15;

        >div {
            float: left;
        }

        .btns {
            width: 137px;
            padding-top: 6px;
            height: 47px;
            box-sizing: border-box;

            >a {
                background: url(../assets//images//playbar.png) no-repeat;
                display: block;
                width: 28px;
                height: 28px;
                margin-right: 8px;
                text-indent: -9999px;
                float: left;
            }

            .pre {
                background-position: 0 -130px;
                margin-top: 5px;

                &:hover {
                    background-position: -30px -130px;
                }
            }

            .ply {
                background-position: 0 -204px;
                width: 36px;
                height: 36px;

                &:hover {
                    background-position: -40px -204px;
                }
            }

            .pause {
                background-position: 0 -165px;
                width: 36px;
                height: 36px;

                &:hover {
                    background-position: -40px -165px;
                }
            }

            .nxt {
                background-position: -80px -130px;
                margin-top: 5px;

                &:hover {
                    background-position: -110px -130px;
                }
            }
        }

        .head {
            width: 34px;
            height: 34px;
            position: relative;
            margin: 6px 15px 0 0;

            img {
                width: 34px;
                height: 34px;
            }

            a {
                display: block;
                width: 34px;
                height: 34px;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        .play {
            width: 581px;

            .words {
                height: 28px;
                font-size: 12px;
                line-height: 28px;

                .name {
                    color: #fff;
                    float: left;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                span {
                    margin-left: 15px;
                    float: left;

                    a {
                        color: #9b9b9b;
                    }
                }

                .src {
                    float: left;
                    display: block;
                    width: 14px;
                    height: 15px;
                    margin: 7px 0 0 13px;
                    background: url(../assets/images/playbar.png) no-repeat;
                    background-position: -110px -103px;

                    &:hover {
                        background-position: -130px -103px;
                    }
                }
            }

            .m-pbar {
                width: 466px;
                position: relative;

                .barbg {
                    width: 466px;
                    height: 9px;
                    background: url(../assets/images/statbar.png) no-repeat;
                    background-position: right 0;
                    position: relative;

                    .rdy {
                        width: 0%;
                        height: 9px;
                        background: url(../assets/images/statbar.png) no-repeat;
                        background-position: right -30px;
                    }

                    .cur {
                        // width: 30%;
                        height: 9px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: url(../assets/images/statbar.png) no-repeat;
                        background-position: left -66px;

                        .btn {
                            position: absolute;
                            top: -7px;
                            right: -13px;
                            width: 22px;
                            height: 24px;
                            margin-left: -11px;
                            background: url(../assets//images/iconall.png) no-repeat;
                            background-position: 0 -250px;
                        }
                    }
                }

                .time {
                    position: absolute;
                    top: -8px;
                    right: -100px;
                    color: #797979;
                    text-shadow: 0 1px 0 #121212;

                    em {
                        color: #a1a1a1;
                        font-style: normal;
                    }
                }
            }
        }

        .oper {
            width: 87px;
            float: left;

            .icn-pip {
                background: url(../assets/images/DLV.png) no-repeat 0 0;

                &:hover {
                    background-position-y: -25px;
                }
            }

            .icn-add {
                background-position: -88px -163px;

                &:hover {
                    background-position: -88px -189px;
                }
            }

            .icn-share {
                background-position: -114px -163px;

                &:hover {
                    background-position: -114px -189px;
                }
            }
        }

        .audio_song {
            position: absolute;
            top: 0;
            left: 0;
            visibility: hidden;
        }

        .icn {
            position: relative;
            float: left;
            display: block;
            width: 25px;
            height: 25px;
            margin: 11px 2px 0 0;
            background: url(../assets/images/playbar.png) no-repeat;
            text-indent: -9999px;
            z-index: 15;
        }

        .ctrl {
            width: 113px;
            position: relative;
            z-index: 10;
            padding-left: 13px;
            background: url(../assets/images/playbar.png) no-repeat;
            background-position: -147px -238px;

            .icn-vol {
                background-position: -2px -248px;

                &:hover {
                    background-position: -31px -248px;
                }
            }

            .icn-loop {
                background-position: -3px -344px;

                &:hover {
                    background-position: -33px -344px;
                }
            }

            .icn-list {
                background-position: -42px -68px;

                &:hover {
                    background-position: -42px -98px;
                }
            }
        }
    }

    .bg {
        width: 100%;
        height: 53px;
        background: url(../assets/images/playbar.png) no-repeat;
        background-repeat: repeat-x;
        background-position: 0 0;
        z-index: 1;
    }

    .right {
        width: 52px;
        height: 67px;
        background: url(../assets/images/playbar.png) no-repeat;
        background-position: 0 -380px;
        position: absolute;
        top: -14px;
        right: 24px;
        z-index: 2;

        .lock_base {
            background: url(../assets/images/playbar.png) no-repeat 0 9999px;
            display: block;
            width: 18px;
            height: 18px;
            margin: 5px 0px 0px 16px;
        }

        .lock {
            background-position: -80px -380px;

            &:hover {
                background-position: -80px -400px;
            }

        }

        .not_lock {
            background-position: -100px -380px;

            &:hover {
                background-position: -100px -400px;
            }
        }
    }
}
</style>