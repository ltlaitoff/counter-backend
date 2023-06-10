import fs from 'node:fs'
import path from 'node:path'

const getHttpsOptions = () => {
	return {
		key: fs.readFileSync(
			path.resolve(__dirname, '../../../certs/selfsigned.key')
		),
		cert: fs.readFileSync(
			path.resolve(__dirname, '../../../certs/selfsigned.crt')
		)
	}
}

export { getHttpsOptions }
