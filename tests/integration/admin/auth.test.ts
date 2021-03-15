import assert from 'assert'
import axios, { AxiosRequestConfig } from 'axios'
import TestHelper from '../../../utils/test-helper'
import Fixtures from '../../fixtures'
// const User = require('../../../models/admin/auth')

import expressApp from '../../../app'
import supertest from 'supertest'
import DBMigrate from 'db-migrate'
import { config } from 'dotenv'

config()

describe('Authentication', () => {
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	/** db */
	let api
	let server
	let dbmigrate
	/** TODO: refactor en un helper */

	beforeAll(async () => {
		if (process.env.RESET_DATABASE) {
			dbmigrate = await DBMigrate.getInstance(true, { env: 'test' })
			await dbmigrate.reset()
			await dbmigrate.up()
		}

		const { app, server: _server } = await expressApp
		api = await supertest(app)
		server = _server
	})

	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////
	let user
	let authz

	beforeEach(async () => {
		await Fixtures.resetAll()
		await Fixtures.createAll()
		user = await Fixtures.User.Admin.instance

		// const options: AxiosRequestConfig = {
		// 	method: 'POST',
		// 	url: 'https://metafora.us.auth0.com/oauth/token',
		// 	headers: { 'content-type': 'application/json' },
		// 	data: {
		// 		client_id: 'HlMT0i4VLJCBmLUnzG31pNtaGF0XSnFe',
		// 		client_secret: '3Ylrwck1cwr1DGR6sqxDLDxUfkoPjGrXOMQfKBeYdrcXUKilKgDHuEKvRzNGJck8',
		// 		audience: 'https://quickstarts/api',
		// 		grant_type: 'client_credentials'
		// 	}
		// }

		// const { data } = await axios(options)
		// authz = data
	})

	describe('/test_token', () => {
		test('should 401 if Audience is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: 'https://metafora.us.auth0.com/oauth/token',
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: 'HlMT0i4VLJCBmLUnzG31pNtaGF0XSnFe',
					client_secret:
						'3Ylrwck1cwr1DGR6sqxDLDxUfkoPjGrXOMQfKBeYdrcXUKilKgDHuEKvRzNGJck8',
					grant_type: 'client_credentials'
				}
			}

			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 401 if Secret is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: 'https://metafora.us.auth0.com/oauth/token',
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: 'HlMT0i4VLJCBmLUnzG31pNtaGF0XSnFe',
					audience: 'https://quickstarts/api',
					grant_type: 'client_credentials'
				}
			}

			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 401 if Client ID is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: 'https://metafora.us.auth0.com/oauth/token',
				headers: { 'content-type': 'application/json' },
				data: {
					client_secret:
						'3Ylrwck1cwr1DGR6sqxDLDxUfkoPjGrXOMQfKBeYdrcXUKilKgDHuEKvRzNGJck8',
					audience: 'https://quickstarts/api',
					grant_type: 'client_credentials'
				}
			}

			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 401 if Grant Type is empty', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: 'https://metafora.us.auth0.com/oauth/token',
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: 'HlMT0i4VLJCBmLUnzG31pNtaGF0XSnFe',
					client_secret:
						'3Ylrwck1cwr1DGR6sqxDLDxUfkoPjGrXOMQfKBeYdrcXUKilKgDHuEKvRzNGJck8'
				}
			}

			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(401)
			expect(response.type).toBe('application/json')
		})

		test('should 200 and return Auth0 tokens', async () => {
			const options: AxiosRequestConfig = {
				method: 'POST',
				url: 'https://metafora.us.auth0.com/oauth/token',
				headers: { 'content-type': 'application/json' },
				data: {
					client_id: 'HlMT0i4VLJCBmLUnzG31pNtaGF0XSnFe',
					client_secret:
						'3Ylrwck1cwr1DGR6sqxDLDxUfkoPjGrXOMQfKBeYdrcXUKilKgDHuEKvRzNGJck8',
					audience: 'https://quickstarts/api',
					grant_type: 'client_credentials'
				}
			}

			const response = await api.post('/api/admin/test_token').send(options)
			expect(response.statusCode).toBe(200)
			expect(response.type).toBe('application/json')
		})
	})

	// describe('sync-profile', () => {
	// 	test('should 401 if Authentication Failed', () => {})
	// 	test('should 201 and return new User if this not exists', () => {})
	// 	test('should 200 and return updated User this if exists', () => {})
	// })

	afterAll(async () => {
		await new Promise<void>((resolve) => setTimeout(() => resolve(), 500))
		server.close()
	})
})
