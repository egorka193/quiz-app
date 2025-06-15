import { createRouter, createWebHistory } from 'vue-router';
import { allTests } from '@/allTests';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/home',
      component: () => import('../components/views/HomePage.vue'),
    },
    {
      name: 'Quizzes',
      path: '/quizzes',
      component: () => import('../components/views/QuizzPage/QuizPage.vue'),
    },
    {
      name: 'Admin',
      path: '/admin',
      component: () => import('../components/views/AdminPage.vue'),
    },
    {
      name: 'Edit',
      path: '/edit/:id',
      component: () => import('@/components/views/EditPage.vue'),
      props: true,
    },
    {
      name: 'Test',
      path: '/test/:id',
      component: () => import('../components/views/QuizzPage/QuizTest.vue'),
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