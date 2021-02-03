// Routes
import product from './product'
import category from './category'
import offer from './offer'

export default (app) => {
	product(app)
	category(app)
	offer(app)
}
