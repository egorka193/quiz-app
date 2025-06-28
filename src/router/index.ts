import { createRouter, createWebHistory } from 'vue-router';
import { allTests } from '@/resourses/allTests';
import { RoutesNames } from '@/router/types';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: RoutesNames.Home,
      alias: ['/'],
      path: '/home',
      component: () => import('@/components/views/HomePage.vue'),
    },
    {
      name: RoutesNames.Quizes,
      path: '/quizes',
      component: () => import('@/components/views/QuizPage/QuizPage.vue'),
    },
    {
      name: RoutesNames.Admin,
      path: '/admin',
      component: () => import('@/components/views/AdminPage.vue'),
    },
    {
      name: RoutesNames.Edit,
      path: '/edit/:id',
      component: () => import('@/components/views/EditPage/EditPage.vue'),
      props: true,
    },
    {
      name: RoutesNames.Test,
      path: '/test/:id',
      component: () => import('@/components/views/QuizTest/QuizTest.vue'),
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