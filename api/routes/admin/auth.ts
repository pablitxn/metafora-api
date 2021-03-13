import { Router, Request, Response } from 'express'
// import AuthService from '../../../services/admin/auth'
import { checkJwt } from '../../middlewares/authz'
import { checkPermissions } from '../../middlewares/permissions'
import { auth, requiresAuth } from 'express-openid-connect'
import { requestHelper } from '../../../utils'
import dotenv from 'dotenv'
dotenv.config()

const route = Router()

const Auth = (app: Router) => {
	app.use(
		auth({
			authRequired: false,
			auth0Logout: true,
			issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
			baseURL: process.env.BASE_URL,
			clientID: process.env.AUTH0_CLIENT_ID,
			secret: process.env.SESSION_SECRET
		})
	)
	app.use('/admin', route)
	// app.use(checkPermissions)
	// app.use(auth())

	route.get('/', async (req: any, res: Response) => {
		console.log('hola')
		try {
		} catch (err) {
			throw err
		}
	})

	route.get('/update_profile_data', requiresAuth(), (req, res) => {
		res.send(JSON.stringify(req.oidc.user))
		// update user-db
	})

	route.get('/callback', async (req: any, res: Response) => {
		try {
		} catch (err) {
			throw err
		}
	})

	route.post('/', async (req: Request, res: Response) => {
		// try {
		// 	res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
		// } catch (err) {
		// 	throw err
		// }
	})
}

export default Auth
