<template>
  <div class="quiz-page">
    <div class="quiz-page__intro">
      <h2 class="quiz-page__title">
        Explore Quizzes
      </h2>
      <p class="quiz-page__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus recusandae tempore architecto.
      </p>
    </div>
    <QuizzCards />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuizzCards from '@/components/views/QuizPage/QuizCards.vue';

export default defineComponent({
  components: {
    QuizzCards,
  },
});
</script>

<style scoped>
.quiz-page__intro {
  margin: 0 auto 30px auto;
  text-align: center;
  width: 600px;

}
.quiz-page__description{
  margin: 0 auto;
  font-size: 20px;
}
.quiz-page__title{
  font-size: 30px;
}
</style>
