<template>
  <AppHeader />
  <div class="w-full flex">
    <router-view></router-view>
    <!-- <DcHeros /> -->
    <!-- <Calandar /> -->
    <teleport to="body">
      <LoginModel />
    </teleport>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import LoginModel from "./components/LoginModel";
import firebase from "./utilities/firebase";
// import Calandar from "./components/Calandar";
// import DcHeros from "./components/DcHeros";
export default {
  components: {
    AppHeader,
    LoginModel,
    // Calandar,
    // DcHeros,
  },
  mounted() {
    //当用户成功登录时，您可以从观察者中获取用户的相关信息
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("setIsLoggedIn", true);
        this.$store.commit("setAuthUser", user);
      } else {
        this.$store.commit("setIsLoggedIn", false);

        this.$store.commit("setAuthUser", {});
      }
    });
  },
};
</script>

<style src="./style.css"></style>
