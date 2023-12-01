
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/pt/IndexPage.vue') },
      { path: 'pt/tutorial-page', name: 'tutorial', component: () => import('src/pages/pt/TutorialPage.vue') },
      { path: 'pt/theory-page', name: 'teachingTheory', component: () => import('src/pages/pt/TeachingTheoryPage.vue') },
      { path: 'pt/activities-page', name: 'activities', component: () => import('src/pages/pt/ActivitiesPage.vue') },
      { path: 'pt/feedbacks-page', name: 'feedbacks', component: () => import('src/pages/pt/FeedbacksPage.vue') },
      { path: 'pt/repository-page', name: 'repository', component: () => import('src/pages/pt/RepositoryPage.vue') },
      { path: 'en/', name: 'en-home', component: () => import('pages/en/IndexPage.vue') },
      { path: 'en/tutorial-page', name: 'en-tutorial', component: () => import('src/pages/en/TutorialPage.vue') },
      { path: 'en/theory-page', name: 'en-teachingTheory', component: () => import('src/pages/en/TeachingTheoryPage.vue') },
      { path: 'en/activities-page', name: 'en-activities', component: () => import('src/pages/en/ActivitiesPage.vue') },
      { path: 'en/feedbacks-page', name: 'en-feedbacks', component: () => import('src/pages/en/FeedbacksPage.vue') },
      { path: 'en/repository-page', name: 'en-repository', component: () => import('src/pages/en/RepositoryPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/pt/ErrorNotFound.vue')
  }
]

export default routes
