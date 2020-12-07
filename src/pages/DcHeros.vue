<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center">Dc Heros {{ heroCount }}</h1>
    <ul>
      <li class="flex justify-between" v-for="(hero, key) in heros" :key="hero">
        <div>{{ hero }}</div>
        <button @click="remove(key)">X</button>
      </li>
    </ul>
    <form class="mt-10" @submit.prevent="submit">
      <input
        class="border rounded"
        name="username"
        v-model.lazy="newHero"
        placeholder="type a hero"
        ref="newHeroRef"
      />
      <button
        class="border rounded bg-gradient-to-r from-red-700 to-pink-500 text-white"
        type="submit"
      >
        add heros
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
export default {
  setup() {
    const newHeroRef = ref("");
    const newHero = ref("");
    const heros = ref(["Super Girl", "Flash", "Chris li", "Asher Lee"]);
    onMounted(() => {
      newHeroRef.value.focus();
    });
    function remove(index) {
      heros.value = heros.value.filter((hero, i) => i !== index);
    }
    function submit() {
      if (newHero.value) {
        heros.value.push(newHero.value);
        newHero.value = "";
      }
    }
    const heroCount = computed({
      get: () => heros.value.length,
    });

    return { heros, newHero, remove, newHeroRef, submit, heroCount };
  },
};
</script>

<style></style>
