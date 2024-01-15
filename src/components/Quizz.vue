<template>
        <div>
            <div v-if="isLoading">Loading...</div>
            <div v-else>
                <div>{{ question }}</div>
                <div v-for="(choice, index) in choices" :key="choice.id">
                    <input type="radio" :id="choice.id" v-model="selectedAnswer" :value="choice.id">
                    <label :for="choice.id">{{ index + 1 }}. {{ choice.value }}</label>
                </div>
                <button @click="postAnswer">Valider</button>
            </div>
        </div>
    </template>
    
    <script lang="ts" setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";

    const question = ref("");
    const selectedAnswer = ref("");
    const choices = ref<Array<{ id: string; value: string }>>([]);
    const token = localStorage.getItem('jwt');
    const isLoading = ref(true);


    const getQuestion = async () => {
        try {
            const response = await axios.get("https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
            question.value = response.data.label;
            choices.value = response.data.choices;
            console.log(response.data);
        } else {
    console.log("GET request failed with status: ", response.status);
}
        } catch (error) {
            console.error("An error occurred during GET request: ", error);
        } finally {
            isLoading.value = false;
        }
    };
    
    const postAnswer = async () => {
    try {
        const response = await axios.post("https://backend-quiz-dot-tools-303211.nw.r.appspot.com/quiz", {
            quiz_uuid: question.value, 
            choice_uuid: selectedAnswer.value 
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log(response.data);
        } else {
            console.error("Erreur lors de l'envoi de la réponse");
        }
    } catch (error) {
        console.error(error);
    }
};
    
    onMounted(getQuestion);
    </script>
