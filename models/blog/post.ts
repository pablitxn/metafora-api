import { db, pgp } from '../../loaders/pg-promise'
import PostDB from '../../data/blog/post'
import { IPost } from '../../types'

class PostModel {
	private db: PostDB
	constructor() {
		// aca pasariamos Container(PostDB)
		this.db = new PostDB(db, pgp)
	}

	public async getPosts(): Promise<any> {
		try {
			const data = await this.db.getAll()
			return data
		} catch (err) {
			return err
		}
	}

	public async getPost(id: string): Promise<any> {
		try {
			const data = await this.db.findById(id)
			return data
		} catch (err) {
			return err
		}
	}

	public async createPost(post: IPost) {
		try {
			const data = await this.db.create(post)
			return data
		} catch (err) {
			return err
		}
	}

	public async editPost(id: string, post: IPost) {
		try {
			const data = await this.db.update(id, post)
			return data
		} catch (err) {
			return err
		}
	}

	public async deletePost(id: string) {
		try {
			const data = await this.db.delete(id)
			return data
		} catch (err) {
			return err
		}
	}
}

export default PostModel
