<template>
  <header class="header h-8 bg-black">
    <sun />
    <warning v-if="!address" />
    <div v-if="address">
      <div class="fixed top-0 right-[14rem] pt-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M10.125 10.875H4.875C4.4625 10.875 4.125 10.5375 4.125 10.125V8.625H4.875V10.125H10.125V4.875H8.625V4.125H10.125C10.5375 4.125 10.875 4.4625 10.875 4.875V10.125C10.875 10.5375 10.5375 10.875 10.125 10.875Z" fill="#00FDCF"/>
  <path d="M7.5 6.375C7.3125 6.375 7.1625 6.4125 7.0125 6.4875L5.5125 4.9875C5.5875 4.8375 5.625 4.6875 5.625 4.5C5.625 3.8625 5.1375 3.375 4.5 3.375C3.8625 3.375 3.375 3.8625 3.375 4.5C3.375 5.1375 3.8625 5.625 4.5 5.625C4.6875 5.625 4.8375 5.5875 4.9875 5.5125L6.4875 7.0125C6.4125 7.1625 6.375 7.3125 6.375 7.5C6.375 8.1375 6.8625 8.625 7.5 8.625C8.1375 8.625 8.625 8.1375 8.625 7.5C8.625 6.8625 8.1375 6.375 7.5 6.375ZM4.125 4.5C4.125 4.275 4.275 4.125 4.5 4.125C4.725 4.125 4.875 4.275 4.875 4.5C4.875 4.725 4.725 4.875 4.5 4.875C4.275 4.875 4.125 4.725 4.125 4.5ZM7.5 7.875C7.275 7.875 7.125 7.725 7.125 7.5C7.125 7.275 7.275 7.125 7.5 7.125C7.725 7.125 7.875 7.275 7.875 7.5C7.875 7.725 7.725 7.875 7.5 7.875Z" fill="#00FDCF"/>
  <path d="M1.875 1.125H7.125C7.5375 1.125 7.875 1.4625 7.875 1.875V3.375H7.125V1.875H1.875V7.125H3.375V7.875H1.875C1.4625 7.875 1.125 7.5375 1.125 7.125V1.875C1.125 1.4625 1.4625 1.125 1.875 1.125Z" fill="#00FDCF"/>
</svg>
</div>
      <span
        class="fixed top-0 right-[7rem] text-customGreen pt-2 font-inter text-xs font-normal leading-normal"
        >Connected to Goerli
      </span>
      <div class="fixed top-0 right-20 pt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="10"
          viewBox="0 0 11 10"
          fill="none"
        >
          <path
            d="M9.75 1.875H0.75V0.75H9V0H0.75C0.551088 0 0.360322 0.0790176 0.21967 0.21967C0.0790176 0.360322 0 0.551088 0 0.75V8.625C0 8.82391 0.0790176 9.01468 0.21967 9.15533C0.360322 9.29598 0.551088 9.375 0.75 9.375H9.75C9.94891 9.375 10.1397 9.29598 10.2803 9.15533C10.421 9.01468 10.5 8.82391 10.5 8.625V2.625C10.5 2.42609 10.421 2.23532 10.2803 2.09467C10.1397 1.95402 9.94891 1.875 9.75 1.875ZM0.75 8.625V2.625H9.75V3.75H6.75C6.55109 3.75 6.36032 3.82902 6.21967 3.96967C6.07902 4.11032 6 4.30109 6 4.5V6.75C6 6.94891 6.07902 7.13968 6.21967 7.28033C6.36032 7.42098 6.55109 7.5 6.75 7.5H9.75V8.625H0.75ZM9.75 4.5V6.75H6.75V4.5H9.75Z"
            fill="#00FDCF"
          />
        </svg>
      </div>
    </div>
    <div
      class="fixed top-0 right-0 text-customGreen pt-2 pr-2 font-inter text-xs font-normal leading-normal"
    >
      {{ address }}
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Sun from "../components/Sun.vue";
import Warning from "../components/Warning.vue";

export default defineComponent({
  name: "Header",
  components: {
    Sun,
    Warning,
  },
  setup() {
    const address = ref("");

    onMounted(() => {
      address.value = localStorage.getItem("shortenedAddress") || "";
    });

    return { address };
  },
});
</script>
