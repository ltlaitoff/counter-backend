const environmentConfig = () => ({
	isGlobal: true,
	NODE_ENV: process.env.NODE_ENV,
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		uri: process.env.MONGODB_URI
	},
	MONGODB_URI: process.env.MONGODB_URI
})

export { environmentConfig }
