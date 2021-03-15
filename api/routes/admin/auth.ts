import { Router, Request, Response } from 'express'
import AuthService from '../../../services/admin/auth'
import { checkJwt } from '../../middlewares/authz'
import { checkPermissions } from '../../middlewares/permissions'
import { auth, requiresAuth } from 'express-openid-connect'
import { requestHelper } from '../../../utils'
import dotenv from 'dotenv'
dotenv.config()
import axios, { AxiosRequestConfig } from 'axios'

const route = Router()

const config = {
	authRequired: false,
	auth0Logout: true,
	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
	baseURL: process.env.BASE_URL,
	clientID: process.env.AUTH0_CLIENT_ID,
	secret: process.env.SESSION_SECRET
}

const Auth = (app: Router) => {
	app.use('/admin', route)

	route.post('/test_token', async (req: Request, res: Response) => {
		try {
			const { body } = requestHelper(req)
			const { data } = await axios(body)
			res.status(200).send(data)
		} catch (err) {
			res.status(401).send(err)
		}
	})

	app.use(auth(config))
	app.use(requiresAuth())
	// app.use(checkPermissions)

	route.get('/sync-profile', async (req: any, res: Response) => {
		try {
			const { user } = req.oidc
			const response = await AuthService.syncUser(user)
			return response
		} catch (err) {
			return err
		}
	})
}

export default Auth
