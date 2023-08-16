<template>
  <h1 class="title">Vue Code</h1>
  <el-button type="primary">Primary</el-button>
  <ul>
    <li>
      <router-link to="/home">home</router-link>
    </li>
    <li>
      <router-link to="/about">about</router-link>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script>
import Home from "./views/home";
import { ElButton } from 'element-plus'

export default {
  name: "App",
  components: {
    Home,
    ElButton
  },
};
</script>

<style lang="css" scoped>
.title {
  color: red;
}
</style>
