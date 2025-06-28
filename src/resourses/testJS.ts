import { QuestionType, type Test } from '@/types';

export const jsTest: Test = {
  id: 'js-001',
  title: 'JavaScript Fundamentals',
  description: 'Test your basic knowledge of JavaScript.',
  createdBy: 'admin-Egorka', 
  questions: [
    {
      id: '1',
      type: QuestionType.single,
      question: 'Что вернёт выражение: typeof null?',
      options: ['object', 'null', 'undefined', 'number'],
      correctAnswer: ['object'],
    },
    {
      id: '2',
      type: QuestionType.multiple,
      question: 'Какие типы данных есть в JavaScript?',
      options: ['string', 'number', 'undefined', 'enum', 'float'],
      correctAnswer: ['string', 'number', 'undefined'],
    },
    {
      id: '3',
      type: QuestionType.boolean,
      question: 'Оператор \'===\' сравнивает и тип, и значение?',
      correctAnswer: [true],
    },
    {
      id: '4',
      type: QuestionType.text,
      question: 'Как называется метод, преобразующий JSON-строку в объект?',
      correctAnswer: ['JSON.parse'],
    },
  ],
};
