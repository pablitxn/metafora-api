import PostModel from '../../models/blog/post'
import { IPost } from '../../types'

class PostService {
	static async getPosts(): Promise<any> {
		try {
			const model = new PostModel()
			const response = await model.getPosts()
			return response
		} catch (err) {
			console.log('err service', err)
			return err
		}
	}

	static async createPost(payload: any) {
		const post = payload.body
		PostService.validate(post)
		try {
			const model = new PostModel()
			const response = model.createPost(post)
			return response
		} catch (err) {
			return err
		}
	}

	static async getPost(id: string) {
		try {
			const model = new PostModel()
			const response = model.getPost(id)
			return response
		} catch (err) {
			return err
		}
	}

	static async editPost(payload: any) {
		const id = payload.id
		const post = payload.body
		PostService.validate(post)
		try {
			const model = new PostModel()
			const response = model.editPost(id, post)
			return response
		} catch (err) {
			return err
		}
	}

	static async deletePost(id: string) {
		try {
			const model = new PostModel()
			const response = model.deletePost(id)
			return response
		} catch (err) {
			return err
		}
	}

	static validate(body: any) {
		// pasa de camel case a guion bajo case
	}

	static factory(post: IPost) {
		// transpila los guines bajos
	}
}

export default PostService
