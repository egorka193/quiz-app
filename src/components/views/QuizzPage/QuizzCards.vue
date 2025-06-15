<template>
  <div class="quiz-cards">
    <QuizzCard
      v-for="test in allTests"
      :key="test.id"
      :test="test"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import QuizzCard from './QuizzCard.vue';
import { allTests } from '../../../allTests';

export default defineComponent({
  name: 'QuizList',
  components: {
    QuizzCard,
  },
  setup() {
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
