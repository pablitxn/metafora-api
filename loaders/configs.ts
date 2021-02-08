// Dotenv
import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
	// This error should crash whole process
	throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
	// Port
	port: process.env.PORT,
	// Data Base URL
	databaseURL: process.env.MONGODB_URI,
	// JWT Key
	jwtSecret: process.env.JWT_SECRET,
	// Logs dev
	logs: {
		level: process.env.LOG_LEVEL || 'silly'
	},
	// Endpoint prefix
	api: {
		prefix: '/api'
	}
}
