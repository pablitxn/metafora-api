import { db, pgp } from '../../loaders/pg-promise'
// import AuthDB from '../../data/admin/auth'
// import UserDB from '../../data/admin/user'
import Model from '../model'

type Limit = number | null
type Offset = number | null

class PostModel {
	constructor() {
		// crear un modelo mas power
		// aca pasariamos Container(PostDB)
		// super(fieldSpec, fields)
	}

	static async login(post: any) {
		try {
			// const database = new PostDB(db, pgp)
			// const record = await database.create(post)
			// return record
		} catch (err) {
			return err
		}
	}

	static validate(fields: any) {
		// validacion de campos
	}
}

export default PostModel
