import chalk from 'chalk'

export const debugMessage = (message: string, tag?: string) => {
	console.log(`${tag + ': ' || ''}${message}`)
}

export const serverDebugMessage = (message: string) => {
	const tag = chalk.yellowBright(`[Server]`)

	debugMessage(message, tag)
}
