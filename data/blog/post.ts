import ModelDB from '../db-model'
import { IPost } from '../../types'
import { IDatabase, IMain } from 'pg-promise'

/** TODO:
 * 	- dependency injection
 * 	- handle errors: messages and logger
 */

type Limit = number | null
type Offset = number | null

class PostDB extends ModelDB {
	db: IDatabase<any>
	pgp: IMain
	constructor(db: IDatabase<any>, pgp: IMain) {
		super()
		this.db = db
		this.pgp = pgp
	}

	async create(post: IPost) {
		try {
			const record = await this.db.func('fn_insert_post', post)
			return record
		} catch (err) {
			console.log(err)
		}
	}

	async update(id: number, post: IPost) {
		try {
			const record = await this.db.func('fn_update_post', [id, post])
			return record
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async delete(id: number) {
		try {
			const record = await this.db.func('fn_delete_post', id)
			return record
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async index(limit: Limit, offset: Offset) {
		try {
			const record = await this.db.func('fn_find_post', [null, limit, offset])
			return record
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async findById(id: number) {
		try {
			const record = await this.db.func('fn_find_post', id)
			return record
		} catch (err) {
			console.log(err)
			return err
		}
	}
}

export default PostDB
