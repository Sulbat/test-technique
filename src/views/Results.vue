<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Colonne 1</th>
          <th>Colonne 2</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in results.slice(0, 4)" :key="index">
          <td>{{ result.col1 }}</td>
          <td>{{ result.col2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

interface Result {
  col1: string;
  col2: string;
}

export default {
  setup() {
    const results = ref<Result[]>([]);

    onMounted(() => {
      // Ici, vous pouvez faire votre appel API pour obtenir les données
      // Pour l'instant, je vais juste utiliser des données factices
      results.value = [
        { col1: 'Donnée 1', col2: 'Donnée 2' },
        { col1: 'Donnée 3', col2: 'Donnée 4' },
        { col1: 'Donnée 5', col2: 'Donnée 6' },
        { col1: 'Donnée 7', col2: 'Donnée 8' },
      ];
    });

    return { results };
  }
}
</script>