import User from './user'

const Fixtures = {
	User,
	createAll: async () => {
		try {
			return await User.createAll()
		} catch (error) {
			console.error(error)
			return console.log('Fixtures error in createAll()')
		}
	},
	resetAll: async () => {
		try {
			return await User.reset()
		} catch (error) {
			console.error(error)
			return console.log('Fixtures error in resetAll()')
		}
	}
}

export default Fixtures
