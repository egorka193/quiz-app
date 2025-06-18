<template>
  <div class="text-answer">
    <input
      v-model="textAnswer"
      type="text"
      placeholder="Введите ответ"
    />
    <button 
      :disabled="!canSubmit"
      @click="submitAnswer"
    >
      Ответить
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, computed } from 'vue';
import type { TextQuestion } from '@/types';

export default defineComponent({
  props: {
    question: {
      type: Object as PropType<TextQuestion>,
      required: true,
    },
  },
  emits: {
    submit: (payload: { isCorrect: boolean; answer: string }) => {
      return (
        typeof payload.isCorrect === 'boolean' &&
        typeof payload.answer === 'string'
      );
    },
  },
  setup(props, ctx) {
    const textAnswer = ref('');

    const canSubmit = computed(() => textAnswer.value.trim().length > 0);

    const submitAnswer = () => {
      const isCorrect = textAnswer.value.trim().toLowerCase() 
        === props.question.correctAnswer[0].trim().toLowerCase();
      ctx.emit('submit', { isCorrect, answer: textAnswer.value });
    };

    return {
      textAnswer,
      canSubmit,
      submitAnswer,
    };
  },
});
</script>

<style scoped>
.text-answer {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
}

.text-answer input {
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.text-answer input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 5px rgba(79, 70, 229, 0.5);
}

.text-answer button {
  margin-top: 15px;
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.text-answer button:disabled {
  background-color: #a1a1aa;
  cursor: not-allowed;
}

</style>
