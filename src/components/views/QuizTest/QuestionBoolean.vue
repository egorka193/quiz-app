<template>
  <div class="question-boolean">
    <ul class="question-boolean__options">
      <QuestionOptionSelect 
        label="Да"
        :isSelected="selected === true"
        @select="select(true)"
      />
      <QuestionOptionSelect 
        label="нет"
        :isSelected="selected === false"
        @select="select(false)"
      />
    </ul>
    <QAButton 
      :disabled="!canSubmit"
      @click="submitAnswer"
    >
      Ответить
    </QAButton>
  </div>
</template>

<script lang="ts">
import type { BooleanQuestion } from '@/types';
import { computed, defineComponent, type PropType, ref } from 'vue';
import QAButton from '@/components/shared/QAButton.vue';
import QuestionOptionSelect from './QuestionOptionSelect.vue';

export default defineComponent({
  components: {
    QAButton,
    QuestionOptionSelect,
  },
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

      const isCorrect = canSubmit.value === props.question.correctAnswer[0];
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
.question-boolean__options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
  margin: 1rem 0;
  list-style: none;
}

.question-boolean__options li {
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

.question-boolean__options li:hover {
  background-color: #e0e7ff;
}

.question-boolean__options li.selected {
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
