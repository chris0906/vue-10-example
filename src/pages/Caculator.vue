<template>
  <section class="w-full flex">
    <div class="m-auto">
      <h1 class="text-2xl text-center">Caculator</h1>
      <p
        class=" w-40 h-10 text-3xl text-right mt-10 overflow-x-scroll"
        style="direction:rtl"
      >
        {{ currentNum }}
      </p>
      <div class="w-40 text-right h-10">
        <small>{{ prevNum }} {{ selectedOperation }} {{ currentNum }}</small>
      </div>

      <div class="grid grid-cols-4 gap-1">
        <button
          @click="pressed('1')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          1
        </button>
        <button
          @click="pressed('2')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          2
        </button>
        <button
          @click="pressed('3')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          3
        </button>
        <button
          @click="pressed('+')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          +
        </button>
        <button
          @click="pressed('4')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          4
        </button>
        <button
          @click="pressed('5')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          5
        </button>
        <button
          @click="pressed('6')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          6
        </button>
        <button
          @click="pressed('-')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          -
        </button>
        <button
          @click="pressed('7')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          7
        </button>
        <button
          @click="pressed('8')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          8
        </button>
        <button
          @click="pressed('9')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          9
        </button>
        <button
          @click="pressed('*')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          *
        </button>
        <button @click="pressed('c')" class="p-2 border rounded h-10 shadow">
          C
        </button>
        <button @click="pressed('0')" class="p-2 border rounded h-10 shadow">
          0
        </button>
        <button
          @click="pressed('=')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          =
        </button>
        <button
          @click="pressed('/')"
          class="p-2 border rounded w-10 h-10 shadow"
        >
          /
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import useWindowEvent from "../utilities/composition/useWindowEvent";
export default {
  setup() {
    const operations = ["+", "-", "*", "/"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const currentNum = ref("");
    const prevNum = ref("");
    const selectedOperation = ref("");
    const handleKeyDown = (e) => pressed(e.key);
    useWindowEvent("keydown", handleKeyDown);

    function pressed(value) {
      if (value === "=" || value === "Enter") calculate();
      else if (value === "c") clear();
      else if (operations.includes(value)) applyOperation(value);
      else if (numbers.includes(value)) appendNumber(value);
    }
    function clear() {
      currentNum.value = "";
      prevNum.value = "";
    }
    function applyOperation(value) {
      calculate();
      prevNum.value = currentNum.value;
      currentNum.value = "";
      selectedOperation.value = value;
    }
    function calculate() {
      if (selectedOperation.value === "*") multiply();
      if (selectedOperation.value === "/") divide();
      if (selectedOperation.value === "+") sum();
      if (selectedOperation.value === "-") subtract();
      prevNum.value = "";
      selectedOperation.value = "";
    }
    function multiply() {
      currentNum.value = +prevNum.value * +currentNum.value;
    }
    function divide() {
      currentNum.value = +prevNum.value / +currentNum.value;
    }
    function subtract() {
      currentNum.value = +prevNum.value - +currentNum.value;
    }
    function sum() {
      currentNum.value = +prevNum.value + +currentNum.value;
    }

    function appendNumber(value) {
      currentNum.value = currentNum.value + value;
    }

    return { currentNum, pressed, appendNumber, prevNum, selectedOperation };
  },
};
</script>

<style></style>
