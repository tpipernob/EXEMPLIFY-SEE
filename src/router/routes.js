
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'tutorial-page', name: 'tutorial', component: () => import('src/pages/TutorialPage.vue') },
      { path: 'theory-page', name: 'teachingTheory', component: () => import('src/pages/TeachingTheoryPage.vue') },
      { path: 'activities-page', name: 'activities', component: () => import('src/pages/ActivitiesPage.vue') },
      { path: 'repository-page', name: 'repository', component: () => import('src/pages/RepositoryPage.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
