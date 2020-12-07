<template>
  <div class="m-auto">
    <h1 class="text-2xl my-2 text-center">Calandar</h1>
    <section class="mx-2 flex justify-between">
      <h2 class="font-bold">{{ currentMonthName }}</h2>
      <h2 class="font-bold">{{ currentYear }}</h2>
    </section>
    <section class="flex">
      <p
        class="text-center my-2"
        style="width:14.28%"
        v-for="day in days"
        :key="day"
      >
        {{ day }}
      </p>
    </section>
    <section class="flex flex-wrap">
      <p
        class="text-center"
        style="width:14.28%"
        v-for="num in startDay()"
        :key="num"
      ></p>
      <p
        class="text-center"
        style="width:14.28%"
        v-for="num in daysInMonth()"
        :key="num"
        :class="classCurrentDate(num) ? 'text-yellow-400' : ''"
      >
        {{ num }}
      </p>
    </section>
    <section class="flex justify-between my-4">
      <button @click="prev" class="px-2 border rounded">Prev</button>
      <button @click="next" class="px-2 border rounded">Next</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDate: new Date().getUTCDate(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    };
  },
  methods: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    startDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    prev() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    next() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    classCurrentDate(day) {
      const currentShowDate = new Date(
        this.currentYear,
        this.currentMonth,
        day
      ).toDateString();
      const currentRealDate = new Date().toDateString();
      return currentShowDate === currentRealDate;
    },
  },
  computed: {
    currentMonthName() {
      return new Date(
        this.currentYear,
        this.currentMonth
      ).toLocaleString("en-US", { month: "long" });
    },
  },
};
</script>

<style></style>
