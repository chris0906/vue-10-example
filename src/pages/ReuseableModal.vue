<template>
  <section class="flex w-full ">
    <div class="m-auto ">
      <h1 class="text-2xl my-5">Reuseable Modal</h1>
      <Modal v-if="isRedModalOpen" @close-modal="isRedModalOpen = false">
        <template #title>
          Red Modal
        </template>
        <template #body>
          <p>this is the body slot for modal 1</p>
        </template>
      </Modal>
      <button
        class="border rounded px-2 mx-4 text-white bg-blue-500"
        @click="isRedModalOpen = true"
      >
        Red Modal
      </button>
      <Modal v-if="isBlueModalOpen" @close-modal="isBlueModalOpen = false">
        <template v-slot:title>
          Blue Modal
        </template>
        <template v-slot:body>
          <p>this is the body slot for modal 2</p>
        </template>
      </Modal>
      <button
        class="border rounded px-2 mx-4 text-white bg-blue-500"
        @click="isBlueModalOpen = true"
      >
        Blue Modal
      </button>
    </div>
  </section>
</template>

<script>
import Modal from "../components/Modal";
import { ref } from "vue";
export default {
  components: { Modal },
  setup() {
    const isRedModalOpen = ref(false);
    const isBlueModalOpen = ref(false);

    return { isRedModalOpen, isBlueModalOpen };
  },
};
</script>

<style></style>
