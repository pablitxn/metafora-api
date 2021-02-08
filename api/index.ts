// Router
import { Router } from 'express'
// Routes
import post from './routes/blog/post'

export default () => {
	const app = Router()
	post(app)
	return app
}
