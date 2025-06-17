<template>
  <div class="quiz-card">
    <div class="quiz-card__meta">
      <p class="quiz-card__category">
        {{ test.title }}
      </p>
      <p class="quiz-card__difficulty">
        easy
      </p>
    </div>
    <div class="quiz-card__content">
      <h3 class="quiz-card__title">
        {{ test.title }}
      </h3>
      <p class="quiz-card__description">
        {{ test.description }}
      </p>
    </div>
    <div class="quiz-card__info">
      <div>
        <i class="quiz-card__icon mdi mdi-chat-question" />
        <span class="quiz-card__questions">{{ test.questions.length }} Questions</span>
      </div>
      <router-link
        class="quiz-card__button"
        :to="{ name: RoutesNames.Test, params: { id: test.id }}"
      >
        Start Quiz →
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Test } from '@/types';
import { RoutesNames } from '@/router/types';

export default defineComponent({
  props: {
    test: {
      type: Object as PropType<Test>,
      required: true,
    },
  },
  setup() {
    return {
      RoutesNames,
    };
  },
});
</script>

<style scoped>
.quiz-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 400px; 
}

.quiz-card__meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
}
.quiz-card__category {
  padding: 5px;
  background-color: rgba(255, 166, 0, 0.339);
  border-radius: 20px;
  color: black;
}
.quiz-card__difficulty {
  padding: 5px;
  background-color: rgba(85, 255, 0, 0.232);
  border-radius: 20px;
  color: black;
}

.quiz-card__content {
  margin-top: 10px;
}

.quiz-card__info {
  align-items: center;
  margin-top: auto; 
  padding-top: 15px;
}
.quiz-card__info div{
 display: flex;
 gap: 10px;
 margin-bottom: 10px;
}

.quiz-card__button {
  background-color: #4f46e5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  text-align: center;
  width: 100%;
}

.quiz-card__button:hover {
  background-color: #4338ca;
}
</style>
