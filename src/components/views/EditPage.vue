<template>
  <div class="edit-page">
    <h2 class="edit-page__title">
      {{ test?.title }}
    </h2>
    <p class="edit-page__description">
      {{ test?.description }}
    </p>

    <div 
      v-for="question in test?.questions" 
      :key="question.id" 
      class="edit-page__question-card"
    >
      <div class="question-card__header">
        <h3 class="question-card__title">
          Вопрос: {{ question.question }}
        </h3>
        <div class="question-card__edit">
          <button>
            <i class="mdi mdi-pencil" />
            Редактировать 
          </button>
        </div>
      </div>

      <p class="question-card__type">
        Тип: {{ question.type }}
      </p>

      <div 
        v-if="question.options" 
        class="question-card__options">
        <p class="question-card__options-title">
          Варианты:
        </p>
        <ul class="question-card__options-list">
          <li 
            v-for="(opt, i) in question.options" 
            :key="i"
            class="question-card__option"
          >
            {{ opt }}
          </li>
        </ul>
      </div>

      <div class="question-card__answer">
        <p class="question-card__answer-label">
          Правильный ответ:
        </p>
        <span class="question-card__answer-value">
          {{ Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { allTests } from '@/resourses/allTests';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const test = allTests.find(t => t.id === props.id);

    return {
      test,
    };
  },
});
</script>

<style scoped>
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
