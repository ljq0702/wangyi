<script setup>
import { RouterLink } from 'vue-router';

const nav = ['发现音乐', '我的音乐', '关注', '商城', '音乐人', '云推歌', '下载客户端']
const tabBar = [
  {
    title: '推荐',
    url: '/findMusic/recommend'
  }, {
    title: '排行榜',
    url: '/findMusic/theCharts'
  }, {
    title: '歌单',
    url: '/findMusic/songSheet'
  }, {
    title: '主播电台',
    url: '/findMusic/anchorRadio'
  }, {
    title: '歌手',
    url: '/findMusic/singer'
  }, {
    title: '新碟上架',
    url: '/findMusic/newDisc'
  }
]
</script>

<template>
  <div>
    <header>
      <div class="containner">
        <div class="logo">
          <a href="#">网易云音乐</a>
        </div>
        <ul>
          <li v-for="(item, index) in nav" :key="index">
            <a href="#">
              {{ item }}
              <sub class="cor" v-if="item == '发现音乐'">&nbsp;</sub>
            </a>

          </li>
        </ul>
        <div class="search">
          <span class="iconfont icon-sousuo"></span>
          <input type="text" placeholder="音乐/视频/电台/用户">
        </div>
        <a href="#">创作者中心</a>
        <div class="head">
          <img src="../assets/images/head.jpg" alt="">
        </div>
      </div>
    </header>
    <div class="top_bar">
      <div class="container">
        <ul>
          <li v-for="item, index in tabBar" :key="index"><a :href="item.url"><em>{{ item.title }}</em></a></li>
        </ul>
      </div>
    </div>
    
    <main>
      <RouterView />
    </main>
  </div>
</template>
<style scoped lang="less">
header {
  height: 70px;
  background-color: #242424;
}

.containner {
  width: 1100px;
  height: 70px;
  /* background-color: red; */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    height: 69px;
    width: 156px;
    background: url(../assets/images/topbar.png) no-repeat;
    margin-right: 20px;

    a {
      width: 157px;
      height: 100%;
      line-height: 70px;
      opacity: 0;
    }
  }

  ul {
    display: flex;
    align-items: center;
    padding: 0;

    li {
      height: 70px;
      line-height: 70px;
      color: #ccc;
      padding: 0 19px;
      font-size: 14px;

      &:hover {
        background-color: #000;
        color: #fff;
      }

      .cor {
        display: block;
        position: absolute;
        left: 50%;
        top: 64px;
        width: 12px;
        height: 7px;
        margin-left: -6px;
        overflow: hidden;
        background-position: -226px 0;
      }
    }
  }

  .search {
    // height: 70px;
    width: 158px;
    // margin-top: 20px;
    height: 32px;
    // line-height: 32px;
    background-color: #fff;
    border-radius: 32px;
    display: flex;
    align-items: center;
    padding: 0px 8px;

    input {
      // margin: 8px 0px 0px 0px;
      width: 115px;
      // flex: 1;
      outline: none;
      border: none;
      font-size: 12px;
    }

    span {
      font-size: 20px;
      color: #ddd;
    }
  }

  >a {
    width: 90px;
    height: 32px;
    border: 1px solid #4f4f4f;
    color: #ccc;
    text-align: center;
    font-size: 12px;
    line-height: 32px;
    border-radius: 16px;
    // margin-left: 12px;
  }

  .head {
    width: 30px;
    height: 30px;
    border-radius: 30px;

    img {
      width: 30px;
      height: 30px;
      border-radius: 30px;
    }
  }
}

.top_bar {
  height: 35px;
  background-color: #C20C0C;
  border-bottom: 1px soild #a40011;

  .container {
    height: 35px;
    padding-left: 157px;

    ul {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #fff;

      li {
        a {
          height: 34px;
          text-align: center;

          em {
            font-style: normal;
            padding: 0 13px;
            display: inline-block;
            height: 20px;
            margin: 0px 17px 0;
            line-height: 20px;
            border-radius: 20px;

            &:hover {
              background-color: #9B0909;
            }
          }
        }

      }
    }
  }
}
</style>
