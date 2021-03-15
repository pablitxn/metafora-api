import { db, pgp } from '../../loaders/pg-promise'
import PostDB from '../../data/blog/post'
import { IPost, fieldSpec } from '../../interfaces/blog/post'
import Model from '../model'

type Limit = number | null
type Offset = number | null

class PostModel {
	constructor() {
		// crear un modelo mas power
		// aca pasariamos Container(PostDB)
		// super(fieldSpec, fields)
	}

	static async index(limit: Limit, offset: Offset) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.index(limit, offset)
			return record
		} catch (err) {
			return err
		}
	}

	static async findById(id: number) {
		try {
			const database = new PostDB(db, pgp)
			const data = await database.findById(id)
			return data
		} catch (err) {
			return err
		}
	}

	static async create(post: IPost) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.create(post)
			return record
		} catch (err) {
			return err
		}
	}

	static async edit(id: number, post: IPost) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.update(id, post)
			return record
		} catch (err) {
			return err
		}
	}

	static async delete(id: number) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.delete(id)
			return record
		} catch (err) {
			return err
		}
	}

	static hydrate(record: any) {
		const post = {
			id: record.id,
			title: record.title,
			subTitle: record.sub_title,
			author: record.author,
			srcBackground: record.src_background,
			altBackground: record.alt_background,
			imgAuthor: record.img_author,
			briefHeader: record.brief_header,
			article: record.article,
			isDeleted: record.is_deleted,
			isDraft: record.is_draft,
			updatedAt: record.updated_at,
			createdAt: record.created_at
		}
		return post
	}

	static deshydrate(payload: any) {
		this.validate(payload)

		const post = {
			title: payload.title,
			sub_title: payload.subTitle ?? null,
			author: payload.author ?? null,
			src_background: payload.srcBackground ?? null,
			alt_background: payload.altBackground ?? null,
			img_author: payload.imgAuthor ?? null,
			brief_header: payload.briefHeader ?? null,
			article: payload.article,
			is_draft: payload.isDraft ?? null
		}

		return post
	}

	static validate(fields: any) {
		// validacion de campos
	}
}

export default PostModel
