// Express
import { Router, Request, Response } from 'express'
// Services
import PostService from '../../../services/blog/post'

// Definitions
const route = Router()

const PostRoute = (app: Router) => {
	app.use('/blog', route)

	/** GET ALL  */
	route.get('/post', async (req: Request, res: Response) => {
		try {
			const data = await PostService.getPosts()
			res.status(200).json({ data, message: 'posts listed' })
		} catch (err) {
			console.log(err)
			res.status(500).send(err)
		}
	})

	/** GET BY ID  */
	route.get('/post/:id', async (req: Request, res: Response) => {
		try {
			const payload = { id: req.params.id }
			const data = await PostService.getPost(payload)
			console.log('create success', data)
			res.status(200).json({ data, message: 'post' })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	/** CREATE  */
	route.post('/post', async (req: Request, res: Response) => {
		try {
			const payload = { body: req.body }
			const data = await PostService.createPost(payload)

			res.status(201).json({ data, message: 'post created' })
		} catch (err) {
			throw err
		}
	})

	/** UPDATE  */
	route.put('/post/:id', async (req: Request, res: Response) => {
		try {
			const payload = { body: req.body, id: req.params.id }
			const data = await PostService.editPost(payload)
			res.status(201).json({ data, message: 'post edited' })
		} catch (err) {
			res.status(500).send(err)
		}
	})

	/** REMOVE  */
	route.delete('/post/:id', async (req: Request, res: Response) => {
		try {
			const data = await PostService.deletePost(req)
			res.status(200).json({ data, message: 'post deleted' })
		} catch (err) {
			res.status(500).send(err)
		}
	})
}

export default PostRoute
