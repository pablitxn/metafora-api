// Dependency Injection
import { Service, Inject } from 'typedi'
// Models
import categoryModel from '../../models/ecommerce/category'

@Service()
export default class Category {
	constructor(
		@Inject('logger') private logger,
	) {}

	public async getCategories() {
		try {
			const categories = await categoryModel.find({})

			return categories
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async getProductsByCategory(payload) {
		const {
			params: { id: category }
		} = payload
		try {
			const products = await categoryModel.findById(category)

			return products
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async createCategory(payload) {
		const { body: newCategory } = payload
		try {
			const categoryCreated = await categoryModel.create(newCategory)

			return categoryCreated
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async editCategory(payload) {
		const { body: newData } = payload
		const {
			params: { id: category }
		} = payload

		try {
			const categoryEdited = await categoryModel.findByIdAndUpdate(category, newData)

			return categoryEdited
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async deleteCategory(payload) {
		const {
			params: { id: category }
		} = payload
		try {
			const categoryDeleted = await categoryModel.findByIdAndRemove(category)

			return categoryDeleted
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}
}
