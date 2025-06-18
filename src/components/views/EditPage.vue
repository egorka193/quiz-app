<template>
  <div>
    <div 
      v-for="question in test?.questions" 
      :key="question.id" 
      class="edit-page__question-card"
    >
      <div class="question-card__header">
        <h3 class="question-card__title">
          Вопрос:
          <template v-if="isEditing(question.id)">
            <input v-model="question.question" class="edit-input" />
          </template>
          <template v-else>
            {{ question.question }}
          </template>
        </h3>
        <div class="question-card__edit">
          <button v-if="!isEditing(question.id)" @click="startEdit(question.id)">
            <i class="mdi mdi-pencil" /> Редактировать
          </button>
          <button v-else @click="saveEdit">
            <i class="mdi mdi-content-save" /> Сохранить
          </button>
        </div>
      </div>

      <p class="question-card__type">
        Тип:
        <template v-if="isEditing(question.id)">
          <select 
            v-model="question.type" 
            class="edit-input"
            @change="onTypeChange(question)"
            >
            <option value="single">Один ответ</option>
            <option value="multiple">Несколько ответов</option>
            <option value="boolean">Булевое значение</option>
            <option value="text">Текстовое значение</option>
          </select>
        </template>
        <template v-else>
          {{ question.type }}
        </template>
      </p>

      <div v-if="question.options" class="question-card__options">
        <p class="question-card__options-title">Варианты:</p>
        <ul class="question-card__options-list">
          <li 
            v-for="(opt, i) in question.options" 
            :key="i" 
            class="question-card__option"
          >
            <template v-if="isEditing(question.id)">
              <input 
                v-model="question.options[i]" 
                class="edit-input" 
              />
            </template>
            <template v-else>
              {{ opt }}
            </template>
          </li>
        </ul>
      </div>
      <div class="question-card__answer">
        <p class="question-card__answer-label">
          Правильный ответ:
        </p>
        <template v-if="isEditing(question.id)">
          <!-- Один ответ -->
          <input
            v-if="question.type === 'single'"
            v-model="question.correctAnswer[0]"
            class="edit-input"
            placeholder="Введите правильный ответ"
          />

          <!-- Текстовый ответ -->
          <textarea
            v-else-if="question.type === 'text'"
            v-model="question.correctAnswer[0]"
            class="edit-input"
            placeholder="Введите правильный текст"
            rows="3"
          />

          <!-- Несколько ответов -->
          <div v-else-if="question.type === 'multiple'">
            <input
              v-for="(ans, i) in question.correctAnswer"
              :key="i"
              v-model="question.correctAnswer[i]"
              class="edit-input"
              placeholder="Один из правильных вариантов"
            />
          </div>

          <!-- Булевый ответ -->
          <select
            v-else-if="question.type === 'boolean'"
            v-model="question.correctAnswer[0]"
            class="edit-input"
          >
            <option :value="true">Да</option>
            <option :value="false">Нет</option>
          </select>
        </template>
        <template v-else>
          <span class="question-card__answer-value">
            {{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useTestsStore } from '@/pinia/tests';
import { QuestionType, type Question } from '@/types';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useTestsStore();

    const test = computed(() => store.tests.find(t => t.id === props.id));
    const editingQuestionId = ref<string | null>(null);

    const startEdit = (id: string) => {
      editingQuestionId.value = id;
    };

    const saveEdit = () => {
      if (test.value) {
        store.updateTest(test.value);
      }
      editingQuestionId.value = null;
    };

    function onTypeChange(question: Question) {
      if (question.type === QuestionType.single) {
        if (!question.options || question.options.length === 0) {
          question.options = [''];
        }
        if (typeof question.correctAnswer === 'string') {
          question.correctAnswer = [question.correctAnswer];
        } else {
          question.correctAnswer = [''];
        }
      } else if (question.type === QuestionType.multiple) {
        if (!question.options || question.options.length === 0) {
          question.options = ['', '', '', ''];
        }
        if (!Array.isArray(question.correctAnswer)) {
          question.correctAnswer = [];
        }
        while (question.correctAnswer.length < question.options.length) {
          question.correctAnswer.push('');
        }
      } else if (question.type === QuestionType.boolean) {
        question.options = [];
        if (typeof question.correctAnswer !== 'boolean') {
          question.correctAnswer = [true];
        }
      } else if (question.type === QuestionType.text) {
        question.options = [];
        if (typeof question.correctAnswer !== 'string') {
          question.correctAnswer = [''];
        }
      }
    }


    onMounted(() => {
      store.loadTests();
    });

    const isEditing = (id: string) => editingQuestionId.value === id;

    return {
      test,
      editingQuestionId,
      startEdit,
      saveEdit,
      isEditing,
      onTypeChange,
    };
  },
});
</script>

<style>
.edit-input {
  padding: 6px;
  font-size: 14px;
  margin: 4px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
}
.edit-page {
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
}

.edit-page__title {
  font-size: 28px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.edit-page__description {
  font-size: 16px;
  margin-bottom: 25px;
  color: #555;
}

.edit-page__question-card {
  border: 1px solid #d3dce6;
  background-color: #eef5ff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.question-card__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.question-card__title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #34495e;
  max-width: 650px;
}

.question-card__type {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.question-card__options-title {
  font-weight: 500;
  margin-bottom: 5px;
  color: #555;
}

.question-card__options-list {
  padding-left: 20px;
  margin: 5px 0 15px;
}

.question-card__option {
  margin-bottom: 4px;
}

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