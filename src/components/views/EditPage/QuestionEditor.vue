<template>
  <div
    class="edit-page__question-card"
  >
    <div class="question-card__header">
      <h3 class="question-card__title">
        Вопрос:
        <input 
          v-model="localQuestion.question" 
          class="edit-input" 
        >
      </h3>
      <div class="question-card__edit">
        <QAButton @click="save">
          <i class="mdi mdi-content-save" /> Сохранить
        </QAButton>
      </div>
    </div>

    <div class="question-card__type">
      Тип:
      <v-select
        v-model="localQuestion.type"
        :items="typeOptions"
        item-title="label"
        item-value="value"
        class="edit-input"
        label="Тип вопроса"
        outlined
        dense
        @update:modelValue="onTypeChange"
      />
    </div>

    <AnswersOptions
      v-if="showAnswerOptions"
      v-model="localQuestion.options!"
      title="Варианты"
      placeholder="Введите вариант ответа"
    />

    <div class="question-card__answer">
      <p class="question-card__answer-label">Правильный ответ:</p>

      <input
        v-if="localQuestion.type === 'single'"
        v-model="localQuestion.correctAnswer[0]"
        class="edit-input"
        placeholder="Введите правильный ответ"
      >

      <textarea
        v-else-if="localQuestion.type === 'text'"
        v-model="localQuestion.correctAnswer[0]"
        class="edit-input"
        placeholder="Введите правильный текст"
        rows="3"
      />

      <AnswersOptions
        v-if="localQuestion.type === QuestionType.multiple"
        v-model="localQuestion.correctAnswer"
        title="Правильные ответы"
        placeholder="Введите правильный ответ"
      />

      <QASelect
        v-if="localQuestion.type === QuestionType.boolean"
        v-model="localQuestion.correctAnswer[0]"
        :items="[
          { title: 'Да', value: true },
          { title: 'Нет', value: false }
        ]"
        label="Выберите правильный ответ"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { QuestionType, type Question } from '@/types';
import QAButton from '@/components/shared/QAButton.vue';
import AnswersOptions from './AnswersOptions.vue';
import QASelect from '@/components/shared/QASelect.vue';

export default defineComponent({
  components: {
    QAButton,
    AnswersOptions,
    QASelect,
  },
  props: {
    question: {
      type: Object as () => Question,
      required: true,
    },
  },
  emits: ['save'],
  setup(props, ctx) {
    const localQuestion = ref({ ...props.question });

    const typeOptions = [
      { label: 'Один ответ', value: QuestionType.single },
      { label: 'Несколько ответов', value: QuestionType.multiple },
      { label: 'Булевое значение', value: QuestionType.boolean },
      { label: 'Текстовое значение', value: QuestionType.text },
    ];

    const showAnswerOptions = computed(() => {
      const q = localQuestion.value;
      return (
        q.type === QuestionType.single ||
        q.type === QuestionType.multiple
      );
    });
    

    const save = () => {
      ctx.emit('save');
    };

    const addCorrectAnswer = () => {
      if (localQuestion.value.type === QuestionType.multiple) {
        localQuestion.value.correctAnswer.push('');
      }
    };

    const removeCorrectAnswer = (index: number) => {
      localQuestion.value.correctAnswer.splice(index, 1);
    };

    const addOption = () => {
      if (!localQuestion.value.options) {
        localQuestion.value.options = [];
      }
      localQuestion.value.options.push('');
    };

    const removeOption = (index: number) => {
      localQuestion.value.options?.splice(index, 1);
    };

    const onTypeChange = () => {
      const q = localQuestion.value;
      if (!q) return;

      if (q.type === QuestionType.single) {
        q.options = [''];
        q.correctAnswer = [''];
      } else if (q.type === QuestionType.multiple) {
        q.options = ['', '', '', ''];
        q.correctAnswer = q.correctAnswer.length ? q.correctAnswer : [''];
      } else if (q.type === QuestionType.boolean) {
        q.options = [];
        q.correctAnswer = [true];
      } else if (q.type === QuestionType.text) {
        q.options = [];
        q.correctAnswer = [''];
      }
    };

    return {
      localQuestion,
      save,
      addCorrectAnswer,
      removeCorrectAnswer,
      onTypeChange,
      addOption,
      removeOption,
      QuestionType,
      typeOptions,
      showAnswerOptions,
    };
  },

});
</script>

<style scoped>
.edit-input {
  padding: 8px 10px;
  font-size: 14px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.edit-input:focus {
  outline: none;
  border-color: #3f51b5;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
}

.answer-multiple-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
</style>