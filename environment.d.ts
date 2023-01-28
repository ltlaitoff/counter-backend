declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: number
			GOOGLE_JWK_PUBLIC_KEYS: string
			MONGO_USERNAME: string
			MONGO_PASSWORD: string
			MONGO_DATABASE: string
			NODE_ENV: 'development' | 'production'
		}
	}
}

export {}
