<template>
  <div class="center-content">
    
    <div>
      <div class="green-rectangle">
        <div class="questions">
    Question {{ questionCount }} / 10: 
  </div>
        <div
  class="counter-container"
  :class="{ 'heartbeat-animation': timeLeft <= 10 }"
>
  {{ timeLeft.toString().padStart(4, "0") }}
</div>
      </div>
      <div v-if="isLoading">Loading...</div>
      <div v-else>
        <div class="question">{{ question }}</div>
        <div class="answer-options">
          <div v-for="choice in choices" :key="choice.id">
            <input
              type="radio"
              :id="choice.id"
              v-model="selectedAnswer"
              :value="choice.id"
              @click="toggleSelection(choice.id)"
            />
            <label :for="choice.id">{{ choice.value }}</label>
          </div>
        </div>
        <button
          class="border-none text-white rounded-md flex flex-col items-start space-y-2 p-2 px-6"
          :class="selectedAnswer ? 'bg-blue-500' : 'bg-gray-500'"
          @click="postAnswer"
          :disabled="!selectedAnswer"
        >
          Valider
        </button>
        <!-- <button
        class="border bg-gray-600 rounded-md flex flex-col items-start space-y-2 p-2 px-6"
        @click="quizResult"
      >
        Result
      </button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const timeLeft = ref(999999999999);
const question = ref("");
const selectedAnswer = ref("");
const questionUUID = ref("");
const choices = ref<Array<{ id: string; value: string }>>([]);
const token = localStorage.getItem("jwt");
const isLoading = ref(true);
const previousSelection = ref("");
const questionCount = ref(1);




const toggleSelection = (id: string) => {
  if (previousSelection.value === id) {
    selectedAnswer.value = "";
    previousSelection.value = "";
  } else {
    previousSelection.value = id;
  }
};

let timer: NodeJS.Timeout;

const startTimer = () => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
      router.push("/oops");
    }
  }, 1000);
};

const getQuestion = async () => {
  try {
    const response = await axios.get(
      "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      question.value = response.data.label;
      questionUUID.value = response.data.id;
      choices.value = response.data.choices;
      console.log(response.data);
    } else {
      console.log("GET request failed with status: ", response.status);
    }
  } catch (error: any) {
    console.error("An error occurred during GET request: ", error);
  } finally {
    isLoading.value = false;
  }
};

const postAnswer = async () => {
  try {
    console.log("quiz_uuid: ", questionUUID.value);
    console.log("choice_uuid: ", selectedAnswer.value);

    const response = await axios.post(
      "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz",
      {
        quiz_uuid: questionUUID.value,
        choice_uuid: selectedAnswer.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
    console.log(response.data);
    // Appeler getQuestion pour obtenir la prochaine question
    getQuestion();
    questionCount.value++;
  } else {
    console.log("Response status: ", response.status);
    console.log("Response data: ", response.data);
    console.error("Erreur lors de l'envoi de la réponse");
  }
  } catch (error: any) {
    console.error(error);
    console.error(error.response);
    console.error(error.response.data);
  }
};

// const token2 = localStorage.getItem("jwt");
// const quizResult = async () => {
//   try {
//     console.log("quizResult");
//     const headers: HeadersInit = {
//       Authorization: `Bearer ${token2}`,
//     };
//     const getUrl = `https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz/score`;
//     const response = await fetch(getUrl, {
//       method: "GET",
//       headers,
//       mode: "cors",
//       cache: "default",
//     });
//     const res = await response.json();
//     const message = res.message;
//     console.log("message", message);
//   } catch (error) {
//     console.error(error);
//   }
// };

onMounted(() => {
  getQuestion();
  startTimer();
});
</script>

<style scoped>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95.5vh;
  width: 100%;
  flex-direction: column;
  background: var(
    --bg-grad,
    linear-gradient(101deg, #000 26.95%, #2f2e44 94.54%)
  );
}

.green-rectangle {
  height: 79px;
  background: linear-gradient(90deg, #000 0%, #00fdc0 101.13%);
  width: 100%;
  position: fixed;
  top: 4.5%;
  left: 0;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  display: flex;
  /* justify-content: flex-start; */
  align-items: center; 
}

.question {
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%;
  margin-bottom: 15%;
}

.questions {
  color: #fff;
  text-align: left;
  margin: 3%;

}

.answer-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  color: #fff;
}

.answer-options div {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 526px;
  height: 58px;
  padding: 0px 16px;
  align-items: center;
  gap: 16px;
  border: 1px solid gray;
  border-radius: 8px;
  background: rgba(225, 241, 255, 0.2);
}

button {
  margin: auto;
  margin-top: 70px;
}

.counter-container {
  width: 70px;
  height: 50px;
  background: white;
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin: 80%;


}


@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.heartbeat-animation {
  animation: heartbeat 1s infinite;
  color: red;
}


</style>
