// Router
import { Router } from 'express'
// Routes
import ecommerce from './routes/ecommerce'

export default () => {
	const app = Router()
	ecommerce(app)

	return app
}
