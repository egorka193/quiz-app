<template>
  <div 
    v-if="question" 
    class="edit-page__question-card"
  >
    <div class="question-card__header">
      <h3 class="question-card__title">
        Вопрос:
        <input 
          v-model="localQuestion.question" 
          class="edit-input" 
        />
      </h3>
      <div class="question-card__edit">
        <QAButton @click="save">
          <i class="mdi mdi-content-save" /> Сохранить
        </QAButton>
      </div>
    </div>

    <p class="question-card__type">
      Тип:
      <select 
        v-model="localQuestion.type" 
        class="edit-input" 
        @change="onTypeChange"
      >
        <option value="single">Один ответ</option>
        <option value="multiple">Несколько ответов</option>
        <option value="boolean">Булевое значение</option>
        <option value="text">Текстовое значение</option>
      </select>
    </p>

    <div 
      v-if="localQuestion.options" 
      class="question-card__options"
    >
      <p class="question-card__options-title">Варианты:</p>
      <ul class="question-card__options-list">
        <li 
          v-for="(opt, i) in localQuestion.options" 
          :key="i" 
          class="question-card__option"
        >
          <input 
            v-model="localQuestion.options[i]" 
            class="edit-input" 
          />
          <QAButton 
            class="remove-btn"
            @click="removeOption(i)" 
          >
            <i class="mdi mdi-trash-can" />
          </QAButton>
        </li>
      </ul>
      <QAButton 
        class="add-btn"
        @click="addOption" 
      >
        <i class="mdi mdi-plus" /> Добавить вариант
      </QAButton>
    </div>

    <div class="question-card__answer">
      <p class="question-card__answer-label">Правильный ответ:</p>

      <input
        v-if="localQuestion.type === 'single'"
        v-model="localQuestion.correctAnswer[0]"
        class="edit-input"
        placeholder="Введите правильный ответ"
      />

      <textarea
        v-else-if="localQuestion.type === 'text'"
        v-model="localQuestion.correctAnswer[0]"
        class="edit-input"
        placeholder="Введите правильный текст"
        rows="3"
      />

      <div v-else-if="localQuestion.type === 'multiple'">
        <div
          v-for="(ans, i) in localQuestion.correctAnswer"
          :key="i"
          class="answer-multiple-item"
        >
          <input
            v-model="localQuestion.correctAnswer[i]"
            class="edit-input"
            placeholder="Один из правильных вариантов"
          />
          <QAButton 
            class="remove-btn"
            @click="removeCorrectAnswer(i)"
          >
            <i class="mdi mdi-trash-can" />
          </QAButton>
        </div>
        <QAButton 
          class="add-btn"
          @click="addCorrectAnswer" 
        >
          <i class="mdi mdi-plus" /> Добавить ответ
        </QAButton>
      </div>

      <select 
        v-else-if="localQuestion.type === 'boolean'"
        v-model="localQuestion.correctAnswer[0]"
        class="edit-input"
      >
        <option :value="true">Да</option>
        <option :value="false">Нет</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { QuestionType, type Question } from '@/types';
import QAButton from '@/components/shared/QAButton.vue';

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
  emits: ['save'],
  setup(props, ctx) {
    const localQuestion = ref({ ...props.question });
    

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
        q.options ||= [''];
        q.correctAnswer = [''];
      } else if (q.type === QuestionType.multiple) {
        q.options ||= ['', '', '', ''];
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

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.remove-btn:hover {
  background-color: #ffeaea;
  border-color: #e53935;
  color: #e53935;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #e3f2fd;
  border: 1px solid #64b5f6;
  color: #1976d2;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  gap: 6px;
  margin-bottom: 10px
}

.add-btn:hover {
  background-color: #bbdefb;
  color: #0d47a1;
}

.question-card__option {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

</style>