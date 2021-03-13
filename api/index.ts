import { Router } from 'express'
import post from './routes/blog/post'
import auth from './routes/admin/auth'

export default () => {
	const app = Router()
	auth(app)
	post(app)
	return app
}
