import type { Test } from './types';

import { vueTest } from './testVUE';
import { htmlCssTest } from './testHTML&CSS';
import { jsTest } from './testJS';

export const allTests: Test[] = [vueTest, htmlCssTest, jsTest];