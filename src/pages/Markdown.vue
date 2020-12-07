<template>
  <div class="flex w-full flex-wrap">
    <h1 class="w-full text-center text-3xl my-4">Markdown</h1>
    <section class="flex w-10/12 m-auto h-screen">
      <article class="w-1/2 border">
        <textarea
          class="w-full h-full"
          :value="text"
          @input="update"
          ref="markdownRef"
        ></textarea>
      </article>
      <article class="w-1/2 border bg-gray-100" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import marked from "marked";
// import debounce from "../utilities/mixins/debounce";
import useDebonce from "../utilities/composition/useDebounce";
export default {
  //   mixins: [debounce],

  mounted() {
    this.debounce = useDebonce();
    this.$refs.markdownRef.focus();
  },
  data() {
    return {
      text: "",
    };
  },
  computed: {
    markedText() {
      return marked(this.text);
    },
  },
  methods: {
    update(e) {
      const task = () => {
        this.text = e.target.value;
      };
      this.debounce(task, 500);
    },
  },
};
</script>

<style></style>
