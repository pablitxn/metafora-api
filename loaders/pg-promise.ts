import promise from 'bluebird' // best promise library today
import pgPromise from 'pg-promise' // pg-promise core library
import { Diagnostics } from './diagnostics' // optional diagnostics
import { IInitOptions, IDatabase, IMain } from 'pg-promise'
// import { IPost } from '../types'

type ExtendedProtocol = IDatabase<any> & any

const mockconfig = {
	driver: 'pg',
	user: 'metafora',
	password: 'metafora',
	database: 'metafora',
	ssl: false,
	host: '0.0.0.0',
	schema: 'public',
	port: 5432
}

// pg-promise initialization options:
const initOptions: IInitOptions<any> = {
	// Using a custom promise library, instead of the default ES6 Promise:
	promiseLib: promise,

	// Extending the database protocol with our custom repositories;
	// API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
	extend(obj: ExtendedProtocol, dc: any) {
		// Database Context (dc) is mainly needed for extending multiple databases with different access API.
		// Do not use 'require()' here, because this event occurs for every task and transaction being executed,
		// which should be as fast as possible.
		// obj.users = new UsersRepository(obj, pgp)
	}
}

// Initializing the library:
const pgp: IMain = pgPromise()

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp(mockconfig)

// Initializing optional diagnostics:
Diagnostics.init(initOptions)

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
export { db, pgp }
