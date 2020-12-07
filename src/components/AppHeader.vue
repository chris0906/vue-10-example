<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2"
  >
    <router-link
      v-for="item in linklist"
      :key="item.to"
      class="mx-2"
      :to="item.to"
      >{{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" @click="logout" class="mx-2">Logout</button>
    <button v-else @click="openModal" class="mx-2">
      Login
    </button>
  </nav>
</template>

<script>
import firebase from "../utilities/firebase";
export default {
  //   props: { isLoggedIn: { type: Boolean, required: true } },
  data() {
    return {
      linklist: [
        { title: "Dc Heros", to: "/dc-heros" },
        { title: "Calandar", to: "/calandar" },
        { title: "markdown", to: "/markdown" },
        { title: "Slider", to: "/slider" },
        { title: "Caculator", to: "/caculator" },
        { title: "reuseableModal", to: "/reuseableModal" },
        { title: "Chat", to: "/chat" },
        { title: "User Crud", to: "/user-crud" },
        { title: "Tensorflow", to: "/tensorflow" },
      ],
    };
  },
  methods: {
    openModal() {
      this.$store.commit("setIsLoginOpen", true);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened.
          console.log("logout error:", error);
        });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
};
</script>

<style></style>
