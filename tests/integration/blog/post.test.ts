describe('Post API', () => {
	describe('create', () => {
		const newPost = { name: '', description: '' }

		beforeEach((done) => {})

		const testCreate = (body, statusCode, authToken) => {}

		const testCreateValidation = (body, expectedErrorFields) => {}

		describe('validate fields and error messages', () => {
			it('should 4xx and message if id is not a number')
			it('should 4xx and message if title is not a string')
			it('should 4xx and message if author is not a string')
			it('should 4xx and message if srcBackground is not a string')
			it('should 4xx and message if altBackground is not a string')
			it('should 4xx and message if imgAuthor is not a string')
			it('should 4xx and message if briefHeader is not a string')
			it('should 4xx and message if article is not a string')
			it('should 4xx and message if isDeleted is not a boolean')
			it('should 4xx and message if isDraft is not a boolean')
			it('should 4xx and message if createdAt is not a date')
		})

		it('should 400 and message with empty request', (done) => {
			testCreateValidation({}, [
				'email',
				'password',
				'first_name',
				'last_name',
				'tutor_type_id'
			]) //.end(done)
		})
		it('should 400 and message if title is empty')

		it('should 400 and message if article is empty')

		it('should 401 and message if no authorization provided')

		it('should 201, message and post created if this is created')
	})

	describe('update', () => {
		const newPost = { name: '', description: '' }

		beforeEach((done) => {})

		const testUpdate = (body, statusCode, authToken) => {}

		const testUpdateValidation = (body, expectedErrorFields) => {}

		describe('validate fields and error messages', () => {
			it('should 4xx and message if id is not a number')
			it('should 4xx and message if title is not a string')
			it('should 4xx and message if author is not a string')
			it('should 4xx and message if srcBackground is not a string')
			it('should 4xx and message if altBackground is not a string')
			it('should 4xx and message if imgAuthor is not a string')
			it('should 4xx and message if briefHeader is not a string')
			it('should 4xx and message if article is not a string')
			it('should 4xx and message if isDeleted is not a boolean')
			it('should 4xx and message if isDraft is not a boolean')
			it('should 4xx and message if createdAt is not a date')
		})
		it('should 400 and message with empty request', (done) => {
			testUpdateValidation({}, []) //.end(done)
		})
		it('should 400 and message if title is empty')

		it('should 400 and message if article is empty')

		it('should 400 and message if no have any change')

		it('should 401 and message if no authorization provided')

		it('should 201, message and post updated if this is updated')
	})

	describe('delete', () => {
		const postId = 1

		beforeEach((done) => {})

		const testDelete = (body, statusCode, authToken) => {}

		const testDeleteValidation = (body, expectedErrorFields) => {}

		it('should 4xx and message if id is not a number', (done) => {
			testDeleteValidation({}, []) //.end(done)
		})
		it('should 401 and message if id is invalid')

		it('should 401 and message if no authorization provided')

		it('should 201 and  message if post is deleted')
	})

	describe('get all', () => {
		beforeEach((done) => {
			// tutor_type_id = Fixtures.TutorType.TutorType2.instance.id
			// done()
		})

		const testGet = (body, statusCode, authToken) => {
			// return request(sails.hooks.http.app)
			//           .post('/tutors')
			//           .set('Authorization', authToken)
			//           .send(body)
			//           .expect(statusCode)
		}

		const testDeleteValidation = (body, expectedErrorFields) => {
			// return testDelete(body, 400, adminTutor.getToken()).expect(
			//     TestHelper.checkValidationErrors(expectedErrorFields)
			// )
		}

		describe('validate fields and error messages', () => {
			it('should 4xx and message if filter is incorrect')
			it('should 4xx and message if page is no exists')
			it('should 4xx and message if limit is incorrect')
			it('should 4xx and message if offset is incorrect')
			it('should 4xx and message if sort is incorrect')
		})
		it('should 400 and message if no have any post')
		it('should 401 and message if no authorization provided')

		it('should 2xx and message with posts')
	})

	describe('get by id', () => {
		beforeEach((done) => {})

		const testGet = (body, statusCode, authToken) => {}

		const testDeleteValidation = (body, expectedErrorFields) => {}

		it('should 400 and message if id is not a number')
		it('should 400 and message if id no exists')

		it('should 401 and message if no authorization provided')

		it('should 2xx and message with posts')
	})
})
