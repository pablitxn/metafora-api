// @ts-nocheck
import User from './user'

const Fixtures: any = {
	User,
	createAll: async () => {
		try {
			await User.createAll()
		} catch (error) {
			return console.log('Fixtures error in createAll()')
		}
	},
	resetAll: async () => {
		try {
			await User.reset()
		} catch (error) {
			console.log('Fixtures error in resetAll()')
		}
	}
}

export default Fixtures
