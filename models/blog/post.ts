import { db, pgp } from '../../loaders/pg-promise'
import PostDB from '../../data/blog/post'
import { IPost } from '../../types'

type Limit = number | null
type Offset = number | null

class PostModel {
	private database: PostDB
	constructor() {
		// crear un modelo mas power
		// aca pasariamos Container(PostDB)
		this.database = new PostDB(db, pgp)
		// super(fieldSpec, fields)
	}

	public factory(record: any) {
		const post = this.factory(record)
		return post
	}

	public async index(limit: Limit, offset: Offset) {
		try {
			const data = await this.database.index(limit, offset)
			return data
		} catch (err) {
			return err
		}
	}

	public async findById(id: number) {
		try {
			const data = await this.database.findById(id)
			return data
		} catch (err) {
			return err
		}
	}

	public async create(post: IPost) {
		try {
			const data = await this.database.create(post)
			return data
		} catch (err) {
			return err
		}
	}

	public async edit(id: number, post: IPost) {
		try {
			const data = await this.database.update(id, post)
			return data
		} catch (err) {
			return err
		}
	}

	public async delete(id: number) {
		try {
			const data = await this.database.delete(id)
			return data
		} catch (err) {
			return err
		}
	}
}

export default PostModel
