import type { Test } from '@/types';

import { vueTest } from '@/resourses/testVUE';
import { htmlCssTest } from '@/resourses/testHTML&CSS';
import { jsTest } from '@/resourses/testJS';

export const allTests: Test[] = [vueTest, htmlCssTest, jsTest];