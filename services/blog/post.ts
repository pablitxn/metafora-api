import PostModel from '../../models/blog/post'

type Limit = number | null
type Offset = number | null

class PostService {
	static async index(limit: Limit, offset: Offset) {
		try {
			const response = await PostModel.index(limit, offset)
			return response
		} catch (err) {
			return err
		}
	}

	static async create(payload: any) {
		try {
			const post = PostModel.deshydrate(payload)
			const [record] = await PostModel.create(post)
			const response = PostModel.hydrate(record)
			return response
		} catch (err) {
			return err
		}
	}

	static async findById(id: number) {
		try {
			const [record] = await PostModel.findById(id)
			const response = PostModel.hydrate(record)
			return response
		} catch (err) {
			return err
		}
	}

	static async edit(id: number, payload: any) {
		try {
			const post = PostModel.deshydrate(payload)
			const [record] = await PostModel.edit(id, post)
			const response = PostModel.hydrate(record)
			return response
		} catch (err) {
			return err
		}
	}

	static async delete(id: number) {
		try {
			const [record] = await PostModel.delete(id)
			const response = PostModel.hydrate(record)
			return response
		} catch (err) {
			return err
		}
	}
}

export default PostService
