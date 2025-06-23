<template>
  <div class="edit-page__question-card">
    <div class="question-card__header">
      <h3 class="question-card__title">Вопрос: {{ question.question }}</h3>
      <div class="question-card__edit">
        <QAButton @click="$emit('edit', question.id)">
          <i class="mdi mdi-pencil" /> Редактировать
        </QAButton>
      </div>
    </div>
    <p class="question-card__type">Тип: {{ question.type }}</p>

    <div 
      v-if="question.options?.length"
      class="question-card__options"
    >
      <p class="question-card__options-title">Варианты:</p>
      <ul class="question-card__options-list">
        <li 
          v-for="(opt, i) in question.options"
          :key="i" 
          class="question-card__option"
        >
          {{ opt }}
        </li>
      </ul>
    </div>

    <div class="question-card__answer">
      <p class="question-card__answer-label">Правильный ответ:</p>
      <span class="question-card__answer-value">
        {{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QAButton from '@/components/shared/QAButton.vue';
import type { Question } from '@/types';

export default defineComponent({
  components: {
    QAButton,
  },
  props: {
    question: {
      type: Object as () => Question,
      required: true,
    },
  },
  emits: ['edit'],
  setup(props, ctx) {
    const edit = () => ctx.emit('edit', props.question.id);

    return {
      edit,
    };
  },
});
</script>

<style scoped>

.question-card__answer-label {
  font-weight: 500;
  margin-bottom: 5px;
}

.question-card__answer-value {
  font-weight: bold;
  color: #2c3e50;
}
.question-card__edit button {
  padding: 5px;
  background-color: rgba(0, 255, 255, 0.402);
  border-radius: 10px;
  transition: all 0.5s ease;
}
.question-card__edit button:hover {
  background-color: rgba(0, 255, 255, 0.605);
}
</style>