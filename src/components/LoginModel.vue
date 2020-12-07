<template>
  <div v-if="isModalOpen">
    <section
      @click="close"
      class="z-20 h-screen w-screen bg-gray-400 fixed top-0 opacity-50"
    ></section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white rounded border p-2 shadow w-1/3">
          <div class="p-6 border">
            <h1 class="text-2xl text-center">Login</h1>
            <GoogleLogin @close-login-from-google="close" />
            <p class="text-center mt-2">Or</p>
            <form action="" class="p-2 my-2 " @submit.prevent="submit">
              <div class="my-4">
                <label for="">Email or Username</label>
                <input
                  class="rounded shadow p-2 w-full"
                  placeholder="enter your username or email"
                  v-model="form.email"
                  ref="emailRef"
                />
              </div>
              <div class="my-4">
                <label for="">Password</label>
                <input
                  type="password"
                  class="rounded p-2 shadow w-full"
                  placeholder="enter your password"
                  v-model="form.password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white p-2"
                >
                  <span v-if="!isLoading">Login</span>
                  <span v-else>⏳</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../utilities/firebase";
import GoogleLogin from "../components/Login/GoogleLogin";

export default {
  components: { GoogleLogin },
  mounted() {
    // this.$refs.emailRef.focus();
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  computed: {
    isModalOpen() {
      return this.$store.state.isLoginOpen;
    },
  },
  methods: {
    submit() {
      this.isLoading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.isLoading = false;
          this.form.email = "";
          this.form.password = "";
          this.$store.commit("setIsLoggedIn", true);
          this.close();
        })
        .catch((err) => {
          console.log("sign in error:", err);
          this.isLoading = false;
        });
    },
    close() {
      this.$store.commit("setIsLoginOpen", false);
    },
  },
};
</script>

<style></style>
