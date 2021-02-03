// Dependency Injection
import { Service, Inject } from 'typedi'
// Models
import offerModel from '../../models/ecommerce/offer'

@Service()
export default class Offer {
	constructor(
		@Inject('logger') private logger,
	) {}

	public async getOffers() {
		try {
			const offers = await offerModel.find({})

			return offers
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async createOffer(payload) {
		const { body: newOffer } = payload
		try {
			const offerCreated = await offerModel.create(newOffer)

			return offerCreated
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async editOffer(payload) {
		const { body: newData } = payload
		const {
			params: { id: offer }
		} = payload

		try {
			const offerEdited = await offerModel.findByIdAndUpdate(offer, newData)

			return offerEdited
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}

	public async deleteOffer(payload) {
		const {
			params: { id: offer }
		} = payload
		try {
			const offerDeleted = await offerModel.findByIdAndRemove(offer)

			return offerDeleted
		} catch (err) {
			this.logger.error(err)
			throw err
		}
	}
}
