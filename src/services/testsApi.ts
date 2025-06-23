import type { Test } from '@/types';
import { allTests } from '@/resourses/allTests';
import { fakeApiRequest } from './utils';


export function fetchTests(): Promise<Test[]> {
  return fakeApiRequest(allTests);
}

export const findSaveTests = () => {
  return fakeApiRequest(localStorage.getItem('tests'));
};

export const saveUpdatedTests = (tests: Test[]) => {
  localStorage.setItem('tests', JSON.stringify(tests));
};