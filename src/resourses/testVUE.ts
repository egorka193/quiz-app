import { QuestionType, type Test } from '@/types';

export const vueTest: Test = {
  id: 'vue-001',
  title: 'Vue.js Basics',
  description: 'Проверь свои знания основ Vue.js.',
  createdBy: 'admin-Egorka',
  questions: [
    {
      id: 'v1',
      type: QuestionType.single,
      question: 'Какой директивой связывается значение input с данными компонента?',
      options: ['v-if', 'v-model', 'v-bind', 'v-for'],
      correctAnswer: 'v-model',
    },
    {
      id: 'v2',
      type: QuestionType.multiple,
      question: 'Какие хуки жизненного цикла существуют во Vue?',
      options: ['created', 'mounted', 'destroyed', 'updated', 'unmounted'],
      correctAnswer: ['created', 'mounted','updated', 'unmounted'],
    },
    {
      id: 'v3',
      type: QuestionType.boolean,
      question: 'Во Vue 3 можно использовать Composition API.',
      correctAnswer: true,
    },
    {
      id: 'v4',
      type: QuestionType.text,
      question: 'Как называется функция для реактивных переменных в Composition API?',
      correctAnswer: 'ref',
    },
  ],
};
