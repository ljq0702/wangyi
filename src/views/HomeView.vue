<script setup>
  const nav = ['发现音乐','我的音乐','关注','商城', '音乐人','云推歌','下载客户端']
</script>

<template>
  <header>
    <div class="containner">
      <div class="logo">
        <a href="#">网易云音乐</a>
      </div>
      <ul>
        <li v-for="(item,index) in nav"><a href="#">{{ item }}</a></li>
      </ul>
    </div>
  </header>
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
  .logo {
    height: 69px;
    width: 176px;
    background: url(../assets/images/topbar.png) no-repeat;
    margin-right: 20px;
    a {
      width: 157px;
      height: 100%;
      line-height: 70px;
      opacity: 0;
    }
  }
  ul{
    display: flex;
    align-items: center;
    padding: 0;
     li{
      height: 70px;
      line-height: 70px;
      color: #fff;
      padding: 0 20px;
    }
  }
}
</style>
