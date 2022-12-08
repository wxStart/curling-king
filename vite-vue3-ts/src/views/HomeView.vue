<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>{{ userInfo.name }}</div>
    <div>{{ userInfo.age }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UserType } from "./user.puex";
import { VuexMixinFactory } from "../utils/vuex-helper";
import { pageUserVuexPath } from "../store/path-name";

const mixin = VuexMixinFactory.createMixin(pageUserVuexPath, {
  states: {
    userInfo: "user",
  },
  mutations: {
    setUser: "setUser",
  },
});

@Options({
  components: {},
  mixins: [mixin],
})
export default class HomeView extends Vue {
  userInfo!: UserType;
  setUser!: (data: UserType) => void;

  created() {
    setTimeout(() => {
      this.setUser({ name: "李四", age: 22 });
    }, 3000);
  }
}
</script>
