// routes that are used for both with and without auth
const locSharedRoutes = [{
  name: 'Home',
  link: '/',
  navKey: 1,
  disabled: false,
}, {
  name: 'Dashboard',
  link: '/dashboard',
  navKey: 1,
  disabled: false,
}];

// auth routes only
const locAuthRoutes = [{
  name: 'Logout',
  link: '/logout',
  navKey: 4,
  disabled: false,
}];

// Routes for non-authenticated users
const locNonAuthRoutes = [{
  name: 'Sign in',
  link: '/sign-in',
  navKey: 2,
  disabled: false,
},
{
  name: 'Sign up',
  link: '/sign-up',
  navKey: 3,
  disabled: false,
}];

export const authRoutes = [...locSharedRoutes, ...locAuthRoutes];
export const nonAuthRoutes = [...locSharedRoutes, ...locNonAuthRoutes];
