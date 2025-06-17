import type { Test } from '@/types';
import { allTests } from '@/resourses/allTests';


export function fetchTests(): Promise<Test[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allTests);
    }, 1000);
  });
}