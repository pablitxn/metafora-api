import ModelDB from '../db-model'
import { IPost } from '../../types'
import { IDatabase, IMain } from 'pg-promise'

/** TODO:
 * 	- dependency injection
 * 	- handle errors: messages and logger
 * 	- improve queries
 *	- more and better methods
 */

class PostDB extends ModelDB {
	db: IDatabase<any>
	pgp: IMain
	constructor(db: IDatabase<any>, pgp: IMain) {
		super()
		this.db = db
		this.pgp = pgp
	}

	async create(post: IPost) {
		const query = this.pgp.helpers.insert(post, null, 'post')
		await this.db.none(query)
		const _query = 'SELECT id, title FROM post ORDER BY id DESC LIMIT 1;'
		return await this.db.one(_query)
	}

	async update(id: string, post: IPost) {
		try {
			const query = this.pgp.helpers.update(post, null, 'post')
			await this.db.none(query)
			const _query = `SELECT * FROM post WHERE id = ${id};`
			const data = this.db.any(_query)
			return data
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async delete(id: string) {
		try {
			await this.db.func('fn_delete_post', id)
			return { id }
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async getAll() {
		try {
			const query = `SELECT * FROM post WHERE is_deleted = false;`
			const data = await this.db.any(query)
			return data
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async findById(id: string) {
		try {
			const query = `SELECT * FROM post WHERE id = ${id};`
			const [data] = await this.db.any(query, id)
			return data
		} catch (err) {
			console.log(err)
			return err
		}
	}
}

export default PostDB
