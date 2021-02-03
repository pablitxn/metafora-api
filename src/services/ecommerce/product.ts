// Dependency Injection
import { Service, Inject } from 'typedi'
// Models
import productModel from '../../models/ecommerce/product'

@Service()
export default class Product {
	constructor(
		@Inject('logger') private logger,
	) {}

	public async getProducts() {
		try {
			const products = await productModel.find({})

			return products
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async getProductById(payload) {
		const {
			params: { id: productId }
		} = payload
		try {
			const product = await productModel.findById(productId)

			return product
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async createProduct(payload) {
		const { body: newProduct } = payload
		try {
			const productCreated = await productModel.create(newProduct)

			return productCreated
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async editProduct(payload) {
		const { body: newData } = payload
		const {
			params: { id: product }
		} = payload
		try {
			const productEdited = await productModel.findByIdAndUpdate(product, newData)

			return productEdited
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async deleteProduct(payload) {
		const {
			params: { id: product }
		} = payload
		try {
			const productDeleted = await productModel.findByIdAndRemove(product)

			return productDeleted
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}
}
