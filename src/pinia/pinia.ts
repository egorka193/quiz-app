import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    currentQuestion: 0,
    answers: [] as string[],
  }),
  getters: {
    answeredCount(state) {
      return state.answers.length;
    },
  },
  actions: {
    answerQuestion(answer: string) {
      this.answers.push(answer);
      this.currentQuestion++;
    },
  },
});