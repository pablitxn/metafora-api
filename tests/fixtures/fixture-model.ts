// @ts-nocheck
import { create as _create } from 'sql-fixtures'
import { config } from 'dotenv'
import { db } from '../../loaders/pg-promise'

config()

class Fixture {
	constructor(table, spec) {
		this.table = table
		this.spec = spec
		this.instance = null
	}

	create() {
		return new Promise((res, rej) => {
			let fixtureSpec = {}
			fixtureSpec[this.table] = this.spec

			const dbConfig = {
				client: 'pg',
				connection: {
					user: 'metafora',
					password: 'metafora',
					database: 'metafora_test',
					port: 5432
				}
			}

			_create(dbConfig, fixtureSpec, (err, result) => {
				if (err) {
					console.log(`Error loading fixtures for table '${this.table}': ${err.message}`)
					rej(err)
				} else {
					let record = result[this.table]
					if (record.constructor.name === 'Array' && record.length === 1)
						record = record[0]
					this.instance = record
					res(this.instance)
				}
			})
		})
	}

	static register(table, specs) {
		let result = {}
		let fixtures = []

		Object.keys(specs).forEach((key) => {
			let fixture = new Fixture(table, specs[key])
			result[key] = fixture
			fixtures.push(fixture)
		})

		result['reset'] = Fixture.resetter(table)
		result['createAll'] = Fixture.createAller(fixtures)

		return result
	}

	static async resetter(table) {
		await db.one(`DELETE FROM ${table};`)
	}

	static createAller(fixtures) {
		return () => {
			const creators = fixtures.map((f) => f.create())
			return Promise.all(creators)
		}
	}
}

export default Fixture
