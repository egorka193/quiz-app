<template>
  <div class="quiz-test">
    <h2>{{ test.title }}</h2>
    <p>{{ test.description }}</p>

    <div v-if="currentQuestion">
      <h3>Вопрос {{ currentQuestionIndex + 1 }} из {{ test.questions.length }}</h3>
      <p class="question-text">
        {{ currentQuestion.question }}
      </p>
      <component
        :is="questionComponent"
        :question="currentQuestion"
        @submit="handleAnswer"
      />

      <p v-if="answerSubmitted">
        Ответ принят!
      </p>
    </div>

    <div v-else>
      <h3>Тест завершён!</h3>
      <p>Правильных ответов: {{ score }} из {{ test.questions.length }}</p>
      <QAButton
        class="quiz-test__restart-button"
        @click="restartTest"
      >
        Пройти заново
      </QAButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, type PropType } from 'vue';
import { type Test } from '@/types';
import QuestionSimple from './QuestionSimple.vue';
import QuestionBoolean from './QuestionBoolean.vue';
import QuestionText from './QuestionText.vue';
import QAButton from '@/components/shared/QAButton.vue';
import QuestionMultiple from './QuestionMultiple.vue';

export default defineComponent({
  components: {
    QAButton,
    QuestionSimple,
    QuestionMultiple,
    QuestionBoolean,
    QuestionText,
  },
  props: {
    test: {
      type: Object as PropType<Test>,
      required: true,
    },
  },
  setup(props) {
    const currentQuestionIndex = ref(0);
    const score = ref(0);
    const answerSubmitted = ref(false);

    const currentQuestion = computed(() => {
      return props.test.questions[currentQuestionIndex.value];
    });

    const isLastQuestion = computed(() => {
      return currentQuestionIndex.value === props.test.questions.length - 1;
    });

    const questionComponentMap = {
      single: 'QuestionSimple',
      multiple: 'QuestionMultiple',
      boolean: 'QuestionBoolean',
      text: 'QuestionText',
    };

    const questionComponent = computed(() => {
      return questionComponentMap[currentQuestion.value.type];
    });

    const handleAnswer = (payload: { isCorrect: boolean;}) => {
      if (payload.isCorrect) score.value++;
      answerSubmitted.value = true;

      setTimeout(() => {
        answerSubmitted.value = false;
        if (!isLastQuestion.value) {
          currentQuestionIndex.value++;
        } else {
          currentQuestionIndex.value = -1;
        }
      }, 700); 
    };

    const restartTest = () => {
      currentQuestionIndex.value = 0;
      score.value = 0;
      answerSubmitted.value = false;
    };

    return {
      currentQuestionIndex,
      currentQuestion,
      questionComponent,
      isLastQuestion,
      score,
      answerSubmitted,
      handleAnswer,
      restartTest,
    };
  },
});
</script>

<style scoped>
.quiz-test {
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.question-text {
  font-weight: 600;
  margin-bottom: 1rem;
}

.quiz-test__restart-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 16px;
}

.quiz-test__restart-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.text-answer input {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
  box-sizing: border-box;
}

.text-answer input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}
</style>
