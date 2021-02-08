import ModelDB from '../db-model'
import sql from '../../sql'
import { IPost } from '../../types'
import { IDatabase, IMain } from 'pg-promise'

class PostDB extends ModelDB {
	db: IDatabase<any>
	pgp: IMain
	constructor(db: IDatabase<any>, pgp: IMain) {
		super()
		this.db = db
		this.pgp = pgp
	}

	/** TODO :
	 *
	 * 	metodos
	 *  handle error code ??
	 * 	conectar un logger
	 *	quizas la db deberia venir por inj de dependencias
	 *
	 */
	async create(post: IPost) {
		const query = this.pgp.helpers.insert(post, null, 'post')
		await this.db.none(query)
		const _query = 'SELECT id, title FROM post ORDER BY id DESC LIMIT 1;'
		return await this.db.one(_query)
	}

	async update(id: string, post: IPost) {
		try {
			// const query = this.pgp.helpers.update(post, null, 'post')
			// await this.db.none(query)
			return { message: 'post updated', id }
		} catch (err) {
			console.log(err)
			return err
		}
	}

	delete(id: string) {
		try {
			// delete
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async getAll() {
		try {
			const data = await this.db.any(sql('blog', 'get-all'))
			return data
		} catch (err) {
			console.log(err)
			return err
		}
	}

	async findById(id: string) {
		try {
			// const query = this.pgp.helpers.update(post, null, 'post')
			// await this.db.none(query)
			// return { message: 'post updated', id: post.id }
		} catch (err) {
			console.log(err)
			return err
		}
	}
}

export default PostDB
