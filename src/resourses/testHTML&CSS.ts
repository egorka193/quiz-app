import { QuestionType, type Test } from '@/types';

export const htmlCssTest: Test = {
  id: 'html-css-001',
  title: 'HTML & CSS Basics',
  description: 'Базовые вопросы по HTML и CSS.',
  createdBy: 'admin-Egorka',
  questions: [
    {
      id: '1',
      type: QuestionType.single,
      question: 'Какой тег используется для создания ссылки в HTML?',
      options: ['<a>', '<link>', '<url>', '<href>'],
      correctAnswer: ['<a>'],
    },
    {
      id: '2',
      type: QuestionType.multiple,
      question: 'Какие значения может принимать свойство `position` в CSS?',
      options: ['static', 'relative', 'fixed', 'absolute', 'center'],
      correctAnswer: ['static', 'relative', 'fixed', 'absolute'],
    },
    {
      id: '3',
      type: QuestionType.boolean,
      question: 'Свойство `margin` может принимать отрицательные значения.',
      correctAnswer: [true],
    },
    {
      id: '4',
      type: QuestionType.text,
      question: 'Как называется свойство CSS для установки фона?',
      correctAnswer: ['background'],
    },
  ],
};
