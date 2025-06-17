<template>
  <div class="quiz-cards">
    <div v-if="allTests.length === 0">
      loading.....
    </div>
    <QuizzCard
      v-for="test in allTests"
      v-else
      :key="test.id"
      :test="test"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import QuizzCard from './QuizCard.vue';
import type { Test } from '@/types';
import { fetchTests } from '@/services/testsApi';

export default defineComponent({
  components: {
    QuizzCard,
  },
  setup() {
    const allTests = ref<Test[]>([]);

    onMounted(async () => {
      allTests.value = await fetchTests();
    });

    return {
      allTests,
    };
  },
});
</script>

<style scoped>
.quiz-cards {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
