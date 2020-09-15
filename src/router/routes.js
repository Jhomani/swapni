const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
			{ 
				path: '',
				component: () => import('pages/Index.vue'), 
				meta: { requireAuth: true } 
			},
			{ 
				path: 'chat/:id',
				component: () => import('pages/chat/Chat.vue'),
				meta: { requireAuth: true, name: 'all-team', simpleHeader: true } 
			},
			{ 
				path: 'all-team',
				component: () => import('pages/chat/AllTeam.vue'),
				meta: { requireAuth: true, name: 'all-team'} 
			},
    ],
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
  {
    path: '/register',
    component: () => import('pages/auth/Register.vue'),
  },
  {
		path: '/login',
		name: 'login',
    component: () => import('pages/auth/Login.vue'),
  },
];

export default routes;
