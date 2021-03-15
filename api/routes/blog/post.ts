// Express
import { Router, Request, Response } from 'express'
// Services
import PostService from '../../../services/blog/post'
// Utils
import { requestHelper } from '../../../utils'

// Definitions
const route = Router()

const PostRoute = (app: Router) => {
	app.use('/blog', route)

	route.get('/posts', async (req: Request, res: Response) => {
		const { limit, offset } = requestHelper(req)
		try {
			const data = await PostService.index(limit, offset)
			res.status(200).json({ data })
		} catch (err) {
			console.log(err)
			res.status(500).send(err)
		}
	})

	route.get('/posts/:id', async (req: Request, res: Response) => {
		try {
			const { id } = requestHelper(req)
			const data = await PostService.findById(id)
			res.status(200).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.post('/posts', async (req: Request, res: Response) => {
		try {
			const { payload } = requestHelper(req)
			const data = await PostService.create(payload)
			console.log('data', data)
			res.status(201).json({ data })
		} catch (err) {
			throw err
		}
	})

	route.put('/posts/:id', async (req: Request, res: Response) => {
		try {
			const { id, payload } = requestHelper(req)
			const data = await PostService.edit(id, payload)
			res.status(201).json({ data })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	route.delete('/posts/:id', async (req: Request, res: Response) => {
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
