<script setup lang='ts'>
defineProps({
    title: {
        type: String,
    },
    need_tab: {
        type: Array,
        default: []
    }
})
const tabs = ['华语', '流行', '摇滚', '民谣', '电子']
</script>
<template>
    <div class="hd_content">
        <div class="title_wrap">
            <a href="#">{{ title }}</a>
            <div class="tab" v-if="need_tab.length != 0">
                <template v-for="(item, index) in tabs">
                    <a href="#">{{ item }}</a>
                    <span class="line" v-if="index != tabs.length - 1">|</span>
                </template>

            </div>
            <span class="more">
                <a href="#">更多</a>
                <span class="iconfont icon-youjiantou"></span>
            </span>
        </div>
        <slot></slot>
    </div>
</template>
<style lang="less" scoped>
.hd_content {
    width: 100%;
    background: url(../../assets/images/index.png) no-repeat 0 9999px;
    background-position: -225px -156px;

    .title_wrap {
        height: 33px;
        border-bottom: 2px solid #C10D0C;
        padding: 0px 10px 0px 34px;

        >a {
            font-size: 20px;
            color: #333;
            float: left;
            line-height: 28px;
        }

        .tab {
            float: left;
            font-size: 12px;
            margin: 7px 0px 0px 20px;
            color: #666;
            a:hover{
                text-decoration: underline;
            }
            .line {
                margin: 0px 10px;
            }
        }

        .more {
            font-size: 12px;
            float: right;
            color: #666;
            span {
                color: #C10D0C;
            }
        }
    }
}
</style>