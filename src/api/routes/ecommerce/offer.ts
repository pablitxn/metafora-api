// Express
import { Router, Request, Response } from 'express'
// Services
import OfferService from '../../../services/ecommerce/offer'
// Dependency Injection
import { Container } from 'typedi'

// Definitions
const route = Router()

export default (app: Router) => {
	app.use('/ecommerce', route)

	route.get('/offers', async (req: Request, res: Response) => {
		try {
			const offerServiceInstance = Container.get(OfferService)
			const offers = await offerServiceInstance.getOffers()

			res.status(200).json({
				data: offers,
				message: 'offers listed'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.post('/add-offer', async (req: Request, res: Response) => {
		try {
			const offerServiceInstance = Container.get(OfferService)
			const createdOffer = await offerServiceInstance.createOffer(req)

			res.status(201).json({
				data: createdOffer,
				message: 'offer created'
			})
		} catch (err) {
			console.log(err)
			throw err
		}
	})

	route.patch('/edit-offer/:id', async (req: Request, res: Response) => {
		try {
			const offerServiceInstance = Container.get(OfferService)
			const offerEdited = await offerServiceInstance.editOffer(req)

			res.status(201).json({
				data: offerEdited,
				message: 'offer edited'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.delete('/delete-offer/:id', async (req: Request, res: Response) => {
		try {
			const offerServiceInstance = Container.get(OfferService)
			const offerDeleted = await offerServiceInstance.deleteOffer(req)

			res.status(200).json({
				data: offerDeleted,
				message: 'offer deleted'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})
}
