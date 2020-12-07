<template>
  <div class="flex w-full flex-wrap">
    <div class="w-full absolute" v-for="(color, index) in sliders" :key="color">
      <transition name="fade">
        <div
          v-if="currentSlide === index"
          :class="color"
          class="w-full"
          style="height:350px"
        ></div>
      </transition>
    </div>
    <div class="w-full absolute" style="height:340px">
      <div class="bottom-0 absolute w-full flex justify-center">
        <div
          v-for="(item, index) in sliders"
          :key="item"
          @click="makeActive(index)"
          :class="currentSlide === index ? 'bg-gray-700' : 'bg-gray-300'"
          class="w-4 h-4 mx-2 rounded-full cursor-pointer shadow-md"
        ></div>
      </div>
    </div>
    <!-- <div class="my-10 w-full flex">
      <div class="m-auto">
        <transition name="fade">
          <h1 v-if="isTitleShowing">Slider Carousel</h1>
        </transition>
        <button
          @click="isTitleShowing = !isTitleShowing"
          class="px-2 rounded border"
        >
          Toggle Text
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide === 2 ? (this.currentSlide = 0) : this.currentSlide++;
    }, 3000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  data() {
    return {
      currentSlide: 0,
      interval: "",
      sliders: ["bg-blue-400", "bg-yellow-400", "bg-green-400"],
      isTitleShowing: true,
    };
  },
  methods: {
    makeActive(index) {
      this.currentSlide = index;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-in;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
