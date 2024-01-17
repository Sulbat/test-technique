<template>
  <div
    class="bg-[url('https://s3-alpha-sig.figma.com/img/4a9b/db73/e52d84cc4ce72e1d1d6f95bd650404ab?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sopu~Q2UCvwCg0XB~CuQbzDXnyKywkad0wsY3XE5PK1CmjJMdhsq2qPUlNkrPMLiK1zladi1yD2LpXOdCj3N2nkPXVOIYCHmAOtiHlnCZ-TJ8b3V0Ahmn4RsRAq72py3wXXAH6KVFihH8oYgQIE4q2tldyx-vusjkkmgJSVrSqc~TbrSJOF7zndxJiqqB2MwfEZ7CrD7V5T~GKL1I9HGjC59mJQFXTtKLJRiBjJmv4pPxurfpwpQpiUwrHiPYFFPVVNvgo22Da8bJzHihR6qsI-Uy1s10Ok9QLQkiNJML1wUHi6UdShcKYBfr0RgLznbanje11JaOLllZXRg345HKg__')] bg-cover bg-no-repeat h-screen flex items-center justify-center"
  >
    <div>
      <div
        class="flex flex-col items-center p-0 px-8 pb-12 space-y-6 bg-white bg-opacity-15 rounded-2xl shadow-md backdrop-blur-medium"
        style="width: 608px; height: 316px"
      >
        <h2 class="text-white text-3xl font-semibold leading-normal">Time is over !</h2>        
        <h1 class="text-9xl text-yellow-500">{{ message }}</h1>
        <router-link
          to="/quizz"
          class="try-again-button bg-accent-100 rounded shadow-md"
          style="
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.12),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 3px 1px -2px rgba(0, 0, 0, 0.2);
          "
        >
          Try again
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Oops",
  setup() {
    const message = ref("Oops");

    return {
      message,
    };
  },
});
</script>

<style scoped>

.try-again-button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  display: inline-block;
}
</style>
