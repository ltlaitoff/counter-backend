declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string
			GOOGLE_JWK_PUBLIC_KEYS: string
			MONGODB_URI: string
			NODE_ENV: 'development' | 'production'
		}
	}
}

export {}
