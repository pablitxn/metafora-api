// Express
import { Router, Request, Response } from 'express'
// Services
import ProductService from '../../../services/ecommerce/product'
// Dependency Injection
import { Container } from 'typedi'

// Definitions
const route = Router()

export default (app: Router) => {
	app.use('/ecommerce', route)

	route.get('/products', async (req: Request, res: Response) => {
		try {
			const productServiceInstance = Container.get(ProductService)
			const products = await productServiceInstance.getProducts()

			res.status(200).json({
				data: products,
				message: 'products listed'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.get('/get-product/:id', async (req: Request, res: Response) => {
		try {
			const productServiceInstance = Container.get(ProductService)
			const products = await productServiceInstance.getProductById(req)

			res.status(200).json({
				data: products,
				message: 'product found'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.post('/add-product', async (req: Request, res: Response) => {
		try {
			const productServiceInstance = Container.get(ProductService)
			const createProduct = await productServiceInstance.createProduct(req)

			res.status(201).json({
				data: createProduct,
				message: 'product created'
			})
		} catch (err) {
			console.log(err)
			throw err
		}
	})

	route.patch('/edit-product/:id', async (req: Request, res: Response) => {
		try {
			const productServiceInstance = Container.get(ProductService)
			const productEdited = await productServiceInstance.editProduct(req)

			res.status(201).json({
				data: productEdited,
				message: 'product edited'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.delete('/delete-product/:id', async (req: Request, res: Response) => {
		try {
			const productServiceInstance = Container.get(ProductService)
			const productDeleted = await productServiceInstance.deleteProduct(req)

			res.status(200).json({
				data: productDeleted,
				message: 'product deleted'
			})
		} catch (err) {
			res.status(500).send(err)
		}
	})
}
