import {
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server'

const isSignInPage = createRouteMatcher(['/auth'])
const isProtectedRoute = createRouteMatcher(['/'])

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
	if (isSignInPage(request) && convexAuth.isAuthenticated()) {
		return nextjsMiddlewareRedirect(request, '/')
	}
	if (isProtectedRoute(request) && !convexAuth.isAuthenticated()) {
		return nextjsMiddlewareRedirect(request, '/auth')
	}
})

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
