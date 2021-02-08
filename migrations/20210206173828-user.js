var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType
var PromiseDB = require('./util/promise-db')

const tableName = 'user'
const columnSpec = {
	id: {
		type: 'int',
		unsigned: true,
		notNull: true,
		primaryKey: true,
		autoIncrement: true
	},
	fist_name: { type: 'string', notNull: true, unique: false },
	last_name: { type: 'string', notNull: false, unique: false },
	email: { type: 'string', notNull: true, unique: true },
	username: { type: 'string', notNull: true, unique: true },
	password: { type: 'string', notNull: true, unique: false },
	gender: { type: 'string', notNull: false, unique: false },
	brief_description: { type: 'string', notNull: false, unique: false },
	description: { type: 'string', notNull: false, unique: false },
	firm: { type: 'string', notNull: false, unique: false },
	avatar: { type: 'string', notNull: false, unique: false },
	is_deleted: { type: 'boolean', notNull: true, unique: false, defaultValue: false },
	created_at: { type: 'timestamp', notNull: false }
}

exports.up = PromiseDB.upCreateTable(tableName, columnSpec)
exports.down = PromiseDB.downDropTable(tableName, columnSpec)
