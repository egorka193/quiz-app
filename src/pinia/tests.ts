import { defineStore } from 'pinia';
import { allTests } from '@/resourses/allTests';
import type { Test } from '@/types';
import { findSaveTests } from '@/services/testsApi';
import { saveUpdatedTests } from '@/services/testsApi';

export const useTestsStore = defineStore('tests', {
  state: () => ({
    tests: [] as Test[],
  }),
  actions: {
    async loadTests() {
      const saved = await findSaveTests();
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
        saveUpdatedTests(this.tests);
      }
    },
  },
});
