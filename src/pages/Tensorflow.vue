<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <h1 class="text-2xl my-4 text-center">Tensorflow Object Detection</h1>
        <div class="flex flex-wrap justify-center my-2">
          <div class="flex w-full justify-center">
            <button
              v-if="!isStreaming"
              @click="openCamera"
              class="w-32 m-2 rounded shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white px-2 py-1"
            >
              Open Camera
            </button>
            <div v-else class="flex justify-between">
              <button
                @click="closeCamera"
                class="w-32 m-2 rounded shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white px-2 py-1"
              >
                Close Camera
              </button>
              <button
                @click="snapshot"
                class="w-32 m-2 rounded shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white px-2 py-1"
              >
                Snapshot
              </button>
            </div>
          </div>
          <video ref="videoRef" autoplay="true" width="100" />
        </div>
        <div class="flex justify-center flex-wrap">
          <div class="w-full flex justify-center">
            <img
              ref="imgRef"
              src="https://images.unsplash.com/photo-1510166420340-24950d8c7027"
              width="300"
              crossorigin="anonymous"
            />
          </div>
          <div class="w-full text-center my-4">
            <button
              class="w-32 rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white p-2"
              @click="detect"
            >
              <span v-if="isLoading">Loading...</span>
              <span v-else>
                Detect Object
              </span>
            </button>
          </div>

          <div v-if="result.length > 0" class="w-full text-center">
            <p class="text-3xl">{{ result[0].class }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");
export default {
  setup() {
    const imgRef = ref("");
    const videoRef = ref("");
    const result = ref("");
    const isLoading = ref(false);
    const isStreaming = ref(false);

    async function detect() {
      isLoading.value = true;
      const img = imgRef.value;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value = predictions;
      isLoading.value = false;
    }
    async function openCamera() {
      if (navigator.mediaDevices.getUserMedia) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((devices) => devices.kind === "videoinput");
        const camId = cams[0].deviceId;
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: { exact: camId } } })
          .then((stream) => {
            videoRef.value.srcObject = stream;
          });
        isStreaming.value = true;
        // navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        //   videoRef.value.srcObject = stream;
        // });
      }
    }
    function closeCamera() {
      const stream = videoRef.value.srcObject;
      const tracks = stream.getTracks();
      tracks.map((track) => track.stop());
      isStreaming.value = false;
    }

    function snapshot() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.value, 0, 0, 200, 200);
      const data = canvas.toDataURL("image/png");
      imgRef.value.setAttribute("src", data);
    }
    return {
      imgRef,
      result,
      detect,
      isLoading,
      openCamera,
      videoRef,
      isStreaming,
      closeCamera,
      snapshot,
    };
  },
};
</script>

<style></style>
