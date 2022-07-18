<template>
  <div class="layout"> 
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu  v-for="(item, i) in pages" :index="'' + i" :key="item.path">
        <template slot="title">
          <span>{{i >= 9 ? i + 1 : '0' + (i + 1)}}.{{item.name}}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="`${item.path}/${child.path}`" >{{child.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import {pages} from '@/router/index.js'

export default {
  data() {
    return {
      pages,
    }
  },
};
</script>
<style scoped lang="scss">
.layout {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.el-menu {
  flex: 1 0 300px;
  max-width: 300px;
  background: #545c64;
  overflow: auto;
}
main {
  flex: 1 1 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  position: relative;
  &>div{ 
    float: left;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.4);
  }
}
</style>
