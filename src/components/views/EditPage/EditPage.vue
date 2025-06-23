<template>
  <div>
    <QAButton
      class="add-question-btn"
      @click="addQuestion"
    >
      <i class="mdi mdi-plus" /> Добавить вопрос
    </QAButton>
    <div
      v-for="question in test?.questions"
      :key="question.id"
      class="edit-page__question-card"
    >
      <QuestionViewer
        v-if="!isEditing(question.id)"
        :question="question"
        @edit="startEdit"
      />
      <QuestionEditor
        v-else
        :question="question"
        @save="saveEdit"
      />
      <QAButton
        class="delete-button"
        @click="deleteQuestion(question.id)"
      >
        <i class="mdi mdi-trash-can" />
        Удалить вопрос
      </QAButton>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useTestsStore } from '@/pinia/tests';
import { QuestionType, type Question } from '@/types';
import QuestionEditor from './QuestionEditor.vue';
import QuestionViewer from './QuestionViewer.vue';
import QAButton from '@/components/shared/QAButton.vue';

export default defineComponent({
  components: {
    QAButton,
    QuestionEditor,
    QuestionViewer,
  },
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

    const addCorrectAnswer = (question: Question) => {
      if (question.type === QuestionType.multiple) {
        question.correctAnswer.push('');
      }
    };

    const removeCorrectAnswer = (question: Question, index: number) => {
      question.correctAnswer.splice(index, 1);
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


    onMounted(async () => {
      await store.loadTests();
    });

    const generateId = () => `${test.value?.questions.length ?? 0}`;
    const isEditing = (id: string) => editingQuestionId.value === id;

    const addQuestion = () => {
      if (!test.value) return;

      const newQuestion: Question = {
        id: generateId(),
        type: QuestionType.single,
        question: 'Новый вопрос',
        options: [''],
        correctAnswer: [''],
      };

      test.value.questions.unshift(newQuestion);
      editingQuestionId.value = newQuestion.id;
    };

    const deleteQuestion = (id: string) => {
      if (!test.value) return;
      test.value.questions = test.value.questions.filter(q => q.id !== id);
      store.updateTest(test.value);
    };

    return {
      test,
      editingQuestionId,
      startEdit,
      saveEdit,
      isEditing,
      onTypeChange,
      addCorrectAnswer,
      removeCorrectAnswer,
      addQuestion,
      deleteQuestion,
    };
  },
});
</script>

<style>
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

.question-card__option {
  margin-bottom: 4px;
}

.question-card__title {
  font-size: 20px;
  margin-bottom: 10px;
  color: #34495e;
  max-width: 650px;
}

.question-card__options-list {
  padding-left: 20px;
  margin: 5px 0 15px;
}
.add-question-btn {
  padding: 6px 12px;
  font-size: 14px;
  background-color: #e3f2fd;
  border: 1px solid #64b5f6;
  color: #1976d2;
  border-radius: 6px;
  cursor: pointer;
  gap: 6px;
  margin-bottom: 10px
}
</style>