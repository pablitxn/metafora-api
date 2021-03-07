import PostModel from '../../models/blog/post'
// import { IPost } from '../../types'

type Limit = number | null
type Offset = number | null

class PostService {
	static async index(limit: Limit, offset: Offset) {
		const model = new PostModel()
		try {
			const response = await model.index(limit, offset)
			return response
		} catch (err) {
			console.log('err service', err)
			return err
		}
	}

	static async create(payload: any) {
		const model = new PostModel()
		// const post = model.validate(payload)
		try {
			const record = model.create(payload)
			const response = model.factory(record)
			return response
		} catch (err) {
			return err
		}
	}

	static async findById(id: number) {
		const model = new PostModel()
		try {
			const response = model.findById(id)
			return response
		} catch (err) {
			return err
		}
	}

	static async edit(id: number, payload: any) {
		const model = new PostModel()
		// const post = model.validate(payload)
		try {
			const response = model.edit(id, payload)
			return response
		} catch (err) {
			return err
		}
	}

	static async delete(id: number) {
		const model = new PostModel()
		try {
			const response = model.delete(id)
			return response
		} catch (err) {
			return err
		}
	}
}

export default PostService
