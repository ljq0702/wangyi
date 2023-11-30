<script setup>
</script>

<template>
  <header>
    <div class="containner">
      <div class="logo">
        <a href="#">网易云音乐</a>
      </div>
      <ul>
        <li>发现音乐</li>
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

  .logo {
    height: 69px;
    width: 176px;
    background: url(../assets/images/topbar.png) no-repeat;

    a {
      width: 157px;
      height: 100%;
      line-height: 70px;
      opacity: 0;
    }
  }
}
</style>
