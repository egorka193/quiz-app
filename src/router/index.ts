import { createRouter, createWebHistory } from 'vue-router';
import { allTests } from '@/allTests';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/home',
      component: () => import('../components/views/QuizzCards/QuizzCards.vue'),
    },
    {
      name: 'Test',
      path: '/test/:id',
      component: () => import('../components/views/QuizzCards/QuizTest.vue'),
      props: route => {
        const test = allTests.find(t => t.id === route.params.id);
        return { test };
      },
    },
    {
      name: 'NotFound',
      path: '/:catchAll(.*)', 
      component: () => import('@/components/views/ErrorPage.vue'), 
      meta: { title: 'NotFound' },
    },
  ],
});

export default router;