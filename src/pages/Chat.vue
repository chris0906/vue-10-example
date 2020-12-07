<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-center text-2xl">Real Time Chat</h1>
      <div class="border rounded-lg">
        <div class="h-64 p2">
          <div
            v-for="chat in state.chats"
            :key="chat.message"
            :class="chat.userId === userId ? 'text-right' : ''"
          >
            <span>{{ chat.message }}</span>
          </div>
        </div>
        <div class="h-8 p-2">
          <input
            @keydown.enter="addMessage"
            v-model="state.message"
            placeholder="Start Typing"
            class="p-1 border rounded shadow"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive, computed } from "vue";
import { chatsRef } from "../utilities/firebase";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      chats: [],
      message: "",
    });

    const store = useStore();
    const userId = computed(() => store.state.authUser.uid);

    onMounted(async () => {
      //when data changed, this being invoked
      chatsRef.on("child_added", (data) => {
        state.chats.push({ key: data.key, ...data.val() });
      });
    });

    function addMessage() {
      const newMessage = chatsRef.push();
      newMessage.set({
        userId: userId,
        message: state.message,
      });
      state.message = "";
    }

    return { state, addMessage, userId };
  },
};
</script>

<style></style>
