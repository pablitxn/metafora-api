import AuthModel from '../../models/admin/auth'

class Auth {
	static async login(payload: any) {
		try {
			const [record] = await AuthModel.login(payload)
			// return response
		} catch (err) {
			return err
		}
	}
}

export default Auth
