export type Test = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
};

export enum QuestionType {
  single = 'single',
  multiple = 'multiple',
  text = 'text',
  boolean = 'boolean',
}
interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
}
interface SingleQuestion extends BaseQuestion {
  type: QuestionType.single;
  correctAnswer: string;
  options: string[];
}
interface MultipleQuestion extends BaseQuestion {
  type: QuestionType.multiple;
  correctAnswer: string[];
  options: string[];
}
interface TextQuestion extends BaseQuestion {
  type: QuestionType.text;
  correctAnswer: string;
}
interface BooleanQuestion extends BaseQuestion {
  type: QuestionType.boolean;
  correctAnswer: boolean;
}
export type Question = SingleQuestion | MultipleQuestion | TextQuestion | BooleanQuestion

export type UserAnswer = {
  questionId: string;
  answer: string | string[] | boolean;
};
