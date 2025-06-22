import type { Test } from '@/types';
import { allTests } from '@/resourses/allTests';
import { fakeApiRequest } from './utils';


export function fetchTests(): Promise<Test[]> {
  return fakeApiRequest(allTests);
}