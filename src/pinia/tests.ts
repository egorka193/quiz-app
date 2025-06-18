import { defineStore } from 'pinia';
import { allTests } from '@/resourses/allTests';
import type { Test } from '@/types';

export const useTestsStore = defineStore('tests', {
  state: () => ({
    tests: [] as Test[],
  }),
  actions: {
    loadTests() {
      const saved = localStorage.getItem('tests');
      if (saved) {
        this.tests = JSON.parse(saved);
      } else {
        this.tests = allTests;
      }
    },
    updateTest(updatedTest: Test) {
      const index = this.tests.findIndex(t => t.id === updatedTest.id);
      if (index !== -1) {
        this.tests[index] = updatedTest;
        localStorage.setItem('tests', JSON.stringify(this.tests));
      }
    },
  },
});
