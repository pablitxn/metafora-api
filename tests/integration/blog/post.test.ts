import TestHelper from '../../../utils/test-helper'
import Fixtures from '../../fixtures'

import expressApp from '../../../app'
import supertest from 'supertest'
import DBMigrate from 'db-migrate'
import configs from '../../../loaders/configs'

describe('Blog / Posts', () => {
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	/** db */
	let api
	let server
	let dbmigrate

	beforeAll(async () => {
		try {
			if (configs.test.resetDatabase) {
				dbmigrate = await DBMigrate.getInstance(true, { env: 'test' })
				await dbmigrate.reset()
				await dbmigrate.up()
			}

			const { app, server: _server } = await expressApp
			api = await supertest(app)
			server = _server

			await Fixtures.resetAll()
			await Fixtures.createAll()
		} catch (err) {
			console.error(err)
		}
	})

	afterAll(async () => {
		await Fixtures.resetAll()
		await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000)) // trick
		server.close()
	})

	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	let user
	let authz

	describe('index', () => {
		test('should 200 and return an array of Posts without Token', async () => {
			const response = await api.get('/api/blog/posts/?limit=3')
			expect(response.statusCode).toBe(200)
			expect(response.type).toBe('application/json')
			expect(response.body.data).toHaveLength(3)
		})

		test('should 200 and return an array of Posts with Token', async () => {
			const options = {
				method: 'POST',
				url: process.env.AUTH0_TOKEN_URL,
				headers: { 'content-type': 'application/json' }
			}
			const response = await api.get('/api/blog/posts/?limit=3').send(options)
			expect(response.statusCode).toBe(200)
			expect(response.type).toBe('application/json')
			expect(response.body.data).toHaveLength(3)
		})

		test('should paginate Posts with limit', async () => {
			const LIMIT = 2
			const statusCode = 200
			const response = await api.get(`/api/blog/posts/?limit=${LIMIT}`)
			expect(response.statusCode).toBe(statusCode)
			expect(response.type).toBe('application/json')
			expect(response.body.data).toHaveLength(LIMIT)
		})

		test('should paginate Tutors with limit and offset', async () => {
			const LIMIT = 2
			const OFFSET = 1
			const statusCode = 200
			const response = await api.get(`/api/blog/posts/?limit=${LIMIT}&offset=${OFFSET}`)
			expect(response.statusCode).toBe(statusCode)
			expect(response.type).toBe('application/json')
			expect(response.body.data).toHaveLength(LIMIT)

			const allPosts = await api.get(`/api/blog/posts/?limit=5`)
			const toCompair = allPosts.body.data.slice(OFFSET, OFFSET + LIMIT)
			expect(toCompair).toEqual(response.body.data)
		})
	})

	describe('create', () => {
		const newPost = {
			title: 'Orci dis ultrices magna tortor ac faucibus tempus rhoncausa',
			subTitle: 'Taciti primis fermentum malesueada suspendisse lectus hac',
			author: 'User test',
			srcBackground: 'url//ima',
			altBackground: 'alt-text',
			imgAuthor: 'Ph / Ilustrator',
			briefHeader: 'Ridiculus ornare cras integer',
			article:
				'Lorem ipsum dolor sit amet consectetur adipiscing elit, venenatis curae cras lacinia sodales fringilla massa, cubilia mi congue vestibulum arcu ligula.',
			isDraft: false
		}

		test('should 401 without authorization', async () => {
			const response = await api.post('/api/blog/posts').send(newPost)
			expect(response.statusCode).toBe(201)
			expect(response.type).toBe('application/json')
			expect(response.body.data.title).toEqual(newPost.title)
		})
	})

	// describe('findById', () => {})

	// describe('edit', () => {})

	// describe('delete', () => {})
})
