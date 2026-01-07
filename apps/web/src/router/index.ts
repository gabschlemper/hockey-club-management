import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores'
import { UserRole } from '@hockey-club/types'

/**
 * Route Meta Information
 * Extended with custom properties for access control
 */
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    allowedRoles?: UserRole[]
    layout?: 'default' | 'admin' | 'athlete' | 'auth'
  }
}

/**
 * Route Definitions
 * 
 * Organized by access level and feature.
 * Following Clean Architecture: routes are declarative and business logic
 * is handled by guards and stores.
 */
const routes: RouteRecordRaw[] = [
  // Public Routes (No authentication required)
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: {
      requiresAuth: false,
      layout: 'auth',
    },
  },

  // Root redirect based on authentication
  {
    path: '/',
    name: 'Root',
    redirect: () => {
      const authStore = useAuthStore()
      
      if (!authStore.isAuthenticated) {
        return { name: 'Login' }
      }
      
      return authStore.isAdmin
        ? { name: 'AdminDashboard' }
        : { name: 'AthleteDashboard' }
    },
  },

  // Admin Routes
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    meta: {
      requiresAuth: true,
      allowedRoles: [UserRole.ADMIN],
      layout: 'admin',
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/DashboardPage.vue'),
        meta: {
          requiresAuth: true,
          allowedRoles: [UserRole.ADMIN],
          layout: 'admin',
        },
      },
      // Phase 2 routes:
      // events, attendance, athletes, debts, financial
    ],
  },

  // Athlete Routes
  {
    path: '/athlete',
    redirect: '/athlete/dashboard',
    meta: {
      requiresAuth: true,
      allowedRoles: [UserRole.ATHLETE],
      layout: 'athlete',
    },
    children: [
      {
        path: 'dashboard',
        name: 'AthleteDashboard',
        component: () => import('@/pages/athlete/DashboardPage.vue'),
        meta: {
          requiresAuth: true,
          allowedRoles: [UserRole.ATHLETE],
          layout: 'athlete',
        },
      },
      // Phase 2 routes:
      // events, attendance, debts, profile
    ],
  },

  // 404 Not Found
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

/**
 * Router Instance
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * Navigation Guard: Authentication Check
 * 
 * Ensures users are authenticated before accessing protected routes.
 * Redirects to login if not authenticated.
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth ?? true // Default to requiring auth

  // If route requires authentication and user is not authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // If user is authenticated and trying to access login page
  if (to.name === 'Login' && authStore.isAuthenticated) {
    const redirectPath = authStore.isAdmin ? '/admin/dashboard' : '/athlete/dashboard'
    next(redirectPath)
    return
  }

  next()
})

/**
 * Navigation Guard: Role-Based Access Control
 * 
 * Checks if user has the required role to access the route.
 * Redirects to appropriate dashboard if unauthorized.
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const allowedRoles = to.meta.allowedRoles

  // If no specific roles are defined, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    next()
    return
  }

  // Check if user's role is in the allowed roles
  const userRole = authStore.userRole
  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to user's appropriate dashboard
    const redirectPath = authStore.isAdmin ? '/admin/dashboard' : '/athlete/dashboard'
    next(redirectPath)
    return
  }

  next()
})

/**
 * Navigation Guard: Page Title
 * 
 * Sets page title based on route name
 */
router.afterEach((to) => {
  const appName = import.meta.env.VITE_APP_NAME || 'Hockey Club'
  const routeName = to.name?.toString() || 'Page'
  
  document.title = `${routeName} | ${appName}`
})

export default router
