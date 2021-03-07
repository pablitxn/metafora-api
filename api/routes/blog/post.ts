// Express
import { Router, Request, Response } from 'express'
// Services
import PostService from '../../../services/blog/post'
// Utils
import { getPaginationParams } from '../../../utils'

// Definitions
const route = Router()

const PostRoute = (app: Router) => {
	app.use('/blog', route)

	route.get('/post', async (req: Request, res: Response) => {
		const { limit, offset } = getPaginationParams(req.query)
		try {
			const data = await PostService.index(limit, offset)
			res.status(200).json({ data })
		} catch (err) {
			console.log(err)
			res.status(500).send(err)
		}
	})

	route.get('/post/:id', async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.params.id)
			const data = await PostService.findById(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.post('/post', async (req: Request, res: Response) => {
		try {
			const payload = { body: req.body }
			const data = await PostService.create(payload)
			res.status(201).json({ data })
		} catch (err) {
			throw err
		}
	})

	route.put('/post/:id', async (req: Request, res: Response) => {
		try {
			const payload = { body: req.body, id: req.params.id }
			const id = 22
			const data = await PostService.edit(id, payload)
			res.status(201).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.delete('/post/:id', async (req: Request, res: Response) => {
		try {
			const id = parseInt(req.params.id)
			const data = await PostService.delete(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})
}

export default PostRoute
