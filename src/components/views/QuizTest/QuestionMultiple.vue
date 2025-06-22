<template>
  <div>
    <ul class="answers-list">
      <QuestionOptionSelect
        v-for="(option, idx) in question.options"
        :key="idx"
        :label="option"
        :isSelected="selectedAnswers.has(option)"
        @select="toggleAnswer(option)"
      />
    </ul>
    <QAButton 
      class="answers-list__btn" 
      :disabled="selectedAnswers.size === 0" 
      @click="submitAnswer"
    >
      Ответить
    </QAButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue';
import QuestionOptionSelect from './QuestionOptionSelect.vue';
import type { MultipleQuestion } from '@/types';
import QAButton from '@/components/shared/QAButton.vue';

export default defineComponent({
  components: {
    QuestionOptionSelect,
    QAButton,
  },
  props: {
    question: {
      type: Object as PropType<MultipleQuestion>,
      required: true,
    },
  },
  emits: {
    submit: (payload: { isCorrect: boolean; answer: string[] }) => {
      return (
        typeof payload.isCorrect === 'boolean' &&
        Array.isArray(payload.answer) &&
        payload.answer.every(item => typeof item === 'string')
      );
    },
  },
  setup(props, ctx) {
    const selectedAnswers = ref(new Set<string>());

    const toggleAnswer = (option: string) => {
      if (selectedAnswers.value.has(option)) {
        selectedAnswers.value.delete(option);
      } else {
        selectedAnswers.value.add(option);
      }
    };

    const submitAnswer = () => {
      const userAnswers = Array.from(selectedAnswers.value).sort();
      const correctAnswers = [...props.question.correctAnswer].sort();

      const isCorrect = 
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((val, i) => val === correctAnswers[i]);

      ctx.emit('submit', { isCorrect, answer: userAnswers });
    };

    return {
      selectedAnswers,
      toggleAnswer,
      submitAnswer,
    };
  },
});
</script>

<style scoped>
.answers-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.answers-list li {
  background: #f3f4f6;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px solid transparent;
}

.answers-list li:hover {
  background-color: #e0e7ff;
}

.answers-list li.selected {
  background-color: #4f46e5;
  color: white;
  font-weight: 600;
  border-color: #4338ca;
}

.answers-list__btn {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.answers-list__btn:disabled {
  background-color: #a1a1aa;
  cursor: not-allowed;
}
</style>
