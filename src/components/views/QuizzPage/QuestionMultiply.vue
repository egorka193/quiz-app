<template>
  <div>
    <ul class="answers-list">
      <li 
        v-for="(option, idx) in question.options" 
        :key="idx" 
        :class="{ selected: selectedAnswers.has(option) }"
        @click="toggleAnswer(option)"
      >
        {{ option }}
      </li>
    </ul>
    <button 
      :disabled="selectedAnswers.size === 0" 
      @click="submitAnswer"
    >
      Ответить
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue';

export default defineComponent({
  name: 'QuestionMultiple',
  props: {
    question: {
      type: Object as PropType<{
        options: string[];
        correctAnswer: string[]; 
      }>,
      required: true,
    },
  },
  emits: ['submit'],
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

button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #a1a1aa;
  cursor: not-allowed;
}
</style>
