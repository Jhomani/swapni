const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
			{ 
				path: '',
				component: () => import('pages/Index.vue') 
			},
			{ 
				path: 'chat/:id',
				component: () => import('pages/chat/Chat.vue'),
				meta: { name: 'all-team', simpleHeader: true } 
			},
			{ 
				path: 'all-team',
				component: () => import('pages/chat/AllTeam.vue'),
				meta: { name: 'all-team'} 
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
    component: () => import('pages/auth/Login.vue'),
  },
];

export default routes;
