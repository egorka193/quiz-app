<template>
  <div>
    <ul class="boolean-options">
      <li
        :class="{ selected: selected === true }"
        @click="select(true)"
      >
        Да
      </li>
      <li
        :class="{ selected: selected === false }"
        @click="select(false)"
      >
        Нет
      </li>
    </ul>
    <button 
      :disabled="selected === null"
      @click="submitAnswer"
    >
      Ответить
    </button>
  </div>
</template>

<script lang="ts">
import type { BooleanQuestion } from '@/types';
import { computed, defineComponent, type PropType, ref } from 'vue';

export default defineComponent({
  props: {
    question: {
      type: Object as PropType<BooleanQuestion>,
      required: true,
    },
  },
  emits: {
    submit: (payload: { isCorrect: boolean; answer: boolean }) => {
      return typeof payload.isCorrect === 'boolean' &&
             typeof payload.answer === 'boolean';
    },
  },
  setup(props, ctx) {
    const selected = ref<boolean | null>(null);

    const select = (val: boolean) => {
      selected.value = val;
    };

    const canSubmit = computed(() => selected.value !== null);

    const submitAnswer = () => {
      if (!canSubmit.value) return;

      const isCorrect = canSubmit.value === props.question.correctAnswer;
      ctx.emit('submit', { isCorrect, answer: canSubmit.value });
    };

    return {
      selected,
      select,
      submitAnswer,
      canSubmit,
    };
  },
});
</script>

<style scoped>
.boolean-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  margin: 1rem 0;
  list-style: none;
}

.boolean-options li {
  flex: 1;
  text-align: center;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 12px 0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px solid transparent;
}

.boolean-options li:hover {
  background-color: #e0e7ff;
}

.boolean-options li.selected {
  background-color: #4f46e5;
  color: white;
  border-color: #4338ca;
}

button {
  margin-top: 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

button:disabled {
  background-color: #a1a1aa;
  cursor: not-allowed;
}


</style>
