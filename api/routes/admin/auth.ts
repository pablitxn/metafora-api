import { Router, Request, Response } from 'express'
import AuthService from '../../../services/admin/auth'
import { checkJwt } from '../../middlewares/authz'
import { checkPermissions } from '../../middlewares/permissions'
import { auth, ConfigParams, requiresAuth } from 'express-openid-connect'
import { requestHelper } from '../../../utils'
import configs from '../../../loaders/configs'
import axios, { AxiosRequestConfig } from 'axios'

const route = Router()

const auth0Configs: ConfigParams = {
	issuerBaseURL: 'https://YOUR_APPLICATION_ROOT_URL',
	baseURL: 'https://YOUR_APPLICATION_ROOT_URL',
	clientID: 'YOUR_CLIENT_ID',
	secret: 'LONG_RANDOM_VALUE',
	clientSecret: 'YOUR_CLIENT_SECRET'
}

const Auth = (app: Router) => {
	app.use('/admin', route)

	route.post('/test_token', async (req: Request, res: Response) => {
		const { body } = requestHelper(req)
		try {
			const { data } = await axios(body)
			res.status(200).send(data)
		} catch (err) {
			res.status(401).send(err)
		}
	})

	app.use(auth(auth0Configs))
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
