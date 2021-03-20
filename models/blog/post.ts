import { db, pgp } from '../../loaders/pg-promise'
import PostDB from '../../data/blog/post'
import { IPost, fieldSpec } from '../../interfaces/blog/post'
import { Limit, Offset } from '../../interfaces'
import Model from '../model'

class Post extends Model {
	constructor(fields: IPost) {
		super(fieldSpec, fields)
	}

	/** TODO: describe what is it
	 *	when will i need inflate some property ?
	 * @param fields
	 * @returns
	 */
	inflate(fields: any) {
		super.inflate(fields)
		// if (fields.something) {	}
		return this
	}

	/** TODO: describe what is it
	 *	when will i need inflate some property ?
	 * @param fields
	 * @returns
	 */
	deshydrate(options = {}) {
		let fields = super.deshydrate(options)
		return fields
	}

	/** TODO: describe what is it
	 *	when will i need inflate some property ?
	 * @param fields
	 * @returns
	 */
	hydrate(options = {}) {
		let fields = super.hydrate(options)
		return fields
	}

	/** TODO: describe what is it
	 * 	when will i need modificate render?
	 *  when i will need to do it?
	 * @param options
	 * @returns fields ? what
	 */
	render(options = {}) {
		let fields = super.render(options)
		return fields
	}

	/** TODO: describe what is it
	 * 	when will i need modificate render?
	 *  what can this receive?
	 * @returns void
	 */
	validate(el: any) {
		// let errors = super.validate(true)
		// if(someValidation) errors.push({ field, message })
		// if (errors.length > 0) throw CustomError.validationError(errors)
	}

	/**
	 * @param {number} limit -Limit quantity results
	 * @param {number} offset - Offset pagination
	 * @returns An array with Posts
	 */
	static async index(limit: Limit, offset: Offset) {
		try {
			const database = new PostDB(db, pgp)
			const records = await database.index(limit, offset)
			const posts = await records.map((record) => new Post(record))
			const res = await posts.map((r) => r.deshydrate())
			console.log(res)
			return posts
		} catch (err) {
			return err
		}
	}
	/**
	 * @param {number} id - Post ID
	 * @returns A certain Post
	 */
	static async findById(id: number) {
		try {
			const database = new PostDB(db, pgp)
			const data = await database.findById(id)
			return data
		} catch (err) {
			return err
		}
	}
	/**
	 * @param post - Object seralized
	 * @returns Post created
	 */
	static async create(post: IPost) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.create(post)
			return record
		} catch (err) {
			return err
		}
	}
	/**
	 * @param {number} id - Post ID
	 * @param post - Object serialized with fields to edit
	 * @returns Post created
	 */
	static async edit(id: number, post: IPost) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.update(id, post)
			return record
		} catch (err) {
			return err
		}
	}
	/**
	 *
	 * @param {number} id - Post ID
	 * @returns Name and ID of Post deleted
	 */
	static async delete(id: number) {
		try {
			const database = new PostDB(db, pgp)
			const record = await database.delete(id)
			return record
		} catch (err) {
			return err
		}
	}
	// /**
	//  *  mock methods to improve
	//  *  and move the parent model
	//  */
	// static hydrate(record: any) {
	// 	const post = {
	// 		id: record[0].id,
	// 		title: record[0].title,
	// 		subTitle: record[0].sub_title,
	// 		author: record[0].author,
	// 		srcBackground: record[0].src_background,
	// 		altBackground: record[0].alt_background,
	// 		imgAuthor: record[0].img_author,
	// 		briefHeader: record[0].brief_header,
	// 		article: record[0].article,
	// 		isDeleted: record[0].is_deleted,
	// 		isDraft: record[0].is_draft,
	// 		updatedAt: record[0].updated_at,
	// 		createdAt: record[0].created_at
	// 	}
	// 	return post
	// }
	// /**
	//  *  mock methods to improve
	//  *  and move the parent model
	//  */
	// static deshydrate(payload: any) {
	// 	const post = {
	// 		title: payload.title,
	// 		sub_title: payload.subTitle ?? null,
	// 		author: payload.author ?? null,
	// 		src_background: payload.srcBackground ?? null,
	// 		alt_background: payload.altBackground ?? null,
	// 		img_author: payload.imgAuthor ?? null,
	// 		brief_header: payload.briefHeader ?? null,
	// 		article: payload.article,
	// 		is_draft: payload.isDraft ?? null
	// 	}
	// return postA
	// }
}

export default Post
