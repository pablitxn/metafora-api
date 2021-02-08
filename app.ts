import 'reflect-metadata'
import config from './loaders/configs'
import express from 'express'
import Logger from './loaders/logger'

async function startServer() {
	const app = express()

	await require('./loaders').default({ app })

	app.listen(config.port, () => {
		Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `)
	})
}

startServer()
