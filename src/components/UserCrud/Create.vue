<template>
  <button @click="isModalOpen = true" class="px-2 py-1 border rounded my-4">
    Add User
  </button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @close="isModalOpen = false">
      <template #title>
        Add New User
      </template>
      <template #body>
        <form @submit.prevent="submit">
          <div class="p-2">
            <label for="">Name</label>
            <input
              v-model="state.form.name"
              class="w-full p-2 rounded border"
              type="text"
              placeholder="User Name"
            />
          </div>
          <div class="p-2">
            <label for="">Email</label>
            <input
              v-model="state.form.email"
              class="w-full p-2 rounded border"
              type="email"
              placeholder="User Email"
            />
          </div>
          <div class="p-2">
            <label for="">Avatar</label>
            <input
              v-model="state.form.avatar"
              class="w-full p-2 rounded border"
              type="text"
              placeholder="Avatar Url"
            />
          </div>
          <div class="p-2">
            <input
              class="w-full p-2 rounded border hover:bg-gray-300"
              type="submit"
              value="create"
            />
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import Modal from "../Modal";
import { reactive, ref } from "vue";
import axios from "../../plugins/axios";
export default {
  components: { Modal },
  setup(_, { emit }) {
    const isModalOpen = ref(false);

    const state = reactive({
      form: {
        name: "",
        email: "",
        avatar: "",
      },
    });

    async function submit() {
      const { data } = await axios.post("/users", state.form);
      emit("new-user-added", data);
      state.form.email = "";
      state.form.name = "";
      state.form.avatar = "";
      isModalOpen.value = false;
    }

    return { isModalOpen, state, submit };
  },
};
</script>

<style></style>
