<!-- <template>
  <div>{{ question }}</div>
  <input type="text" v-model="answer" />
  <button @click="postAnswer">Soumettre</button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const question = ref("");
const answer = ref("");

onMounted(async () => {
  try {
    const response = await axios.get("https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quizz", {
      headers: {
        Authorization: `Bearer ${votre_token}`,
      },
    });
    question.value = response.data.question;
  } catch (error) {
    console.error(error);
  }
});

const postAnswer = async () => {
  try {
    const response = await axios.post(
      "https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quizz",
      {
        answer: answer.value,
      },
      {
        headers: {
          Authorization: `Bearer ${votre_token}`,
        },
      }
    );
    
  } catch (error) {
    console.error(error);
  }
};
</script> -->






<template>
  <div>
    <div>{{ question.label }}</div>
    <div v-if="question.answerType === 'choice'">
      <button v-for="(choice, index) in question.choices" :key="index" @click="selectChoice(choice)">
        {{ choice }}
      </button>
    </div>
    <input v-else type="text" v-model="answer" />
    <button @click="postAnswer">Soumettre</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const quizData = [
  {
    "label": "Quel fleuve traverse l'Égypte ?",
    "answerType": "choice",
    "choices": ["Le Kibo", "Le Danube", "Le Nil"],
    "answer": "Le Nil"
  },
  {
    "label": "Quel était le prénom du peintre Van Gogh ?",
    "answerType": "choice",
    "choices": ["Vincent", "Claude", "Paul", "Christian"],
    "answer": "Vincent"
  },
  {
    "label": "Quelle est la capitale de la France ?",
    "answerType": "text",
    "answer": "Paris"
  },
  // ... (ajoutez d'autres questions si nécessaire)
];

const questionIndex = ref(0);
const question = ref(quizData[0]);
const answer = ref("");

const postAnswer = () => {
  // Gérez la logique pour vérifier la réponse ici
  // (comparer la réponse avec la réponse attendue dans le JSON, etc.)

  // Passez à la question suivante
  questionIndex.value++;

  if (questionIndex.value < quizData.length) {
    // S'il y a encore des questions, mettez à jour la question actuelle
    question.value = quizData[questionIndex.value];
  } else {
    // Sinon, vous avez terminé le quiz
    question.value = { label: "Quiz terminé !", answerType: "text", answer: "" };
  }

  // Effacez la réponse
  answer.value = "";
};

const selectChoice = (choice:any) => {
  // Mettez à jour la réponse avec le choix sélectionné
  answer.value = choice;
};
</script>

