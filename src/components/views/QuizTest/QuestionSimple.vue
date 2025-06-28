<template>
  <div class="questoin-simple">
    <ul class="answers-list">
      <QuestionOptionSelect
        class="answers-list__option"
        v-for="(answer, idx) in question.options"
        :key="idx"
        :label="answer"
        :isSelected="selectedAnswer === answer"
        @select="selectAnswer(answer)"
      />
    </ul>
    <QAButton
      class="answers-list__btn" 
      :disabled="!selectedAnswer"
      @click="submitAnswer"
    >
      Ответить
    </QAButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue';
import QuestionOptionSelect from './QuestionOptionSelect.vue';
import type { SingleQuestion } from '@/types';
import QAButton from '@/components/shared/QAButton.vue';

export default defineComponent({
  components: {
    QuestionOptionSelect,
    QAButton,
  },
  props: {
    question: {
      type: Object as PropType<SingleQuestion>,
      required: true,
    },
  },
  emits: {
    submit: (payload: { isCorrect: boolean; answer: string | null }) => {
      return (
        typeof payload.isCorrect === 'boolean' &&
        (typeof payload.answer === 'string' || payload.answer === null)
      );
    },
  },
  setup(props, ctx) {
    const selectedAnswer = ref<string | null>(null);

    const selectAnswer = (answer: string) => {
      selectedAnswer.value = answer;
    };

    const submitAnswer = () => {
      const isCorrect = selectedAnswer.value === props.question.correctAnswer[0];
      ctx.emit('submit', { isCorrect, answer: selectedAnswer.value });
    };

    return {
      selectedAnswer,
      selectAnswer,
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

:disabled {
  background-color: #a1a1aa;
  cursor: not-allowed;
}
</style>
