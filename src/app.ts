// We need this in order to use @Decorators
import 'reflect-metadata'
// Project configs
import config from './config'
// Express
import express from 'express'
// Logs
import Logger from './loaders/logger'
// Socket.io
import http from 'http'

async function startServer() {
	// Express App
	const app = express()
	// Websockets
	const $app = express()
	const server = http.createServer($app)

	await require('./loaders').default({
		expressApp: app,
		websocketApp: { app: $app, server }
	})

	app.listen(config.port, () => {
		Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `)
	})

	server.listen(4420, (err) => {
		if (err) {
			Logger.error(err)
			process.exit(1)
		}
		Logger.info(`
      ################################################
      🛡️  WebSocket listening on port: 4420 🛡️
      ################################################
    `)
	})
}

startServer()
