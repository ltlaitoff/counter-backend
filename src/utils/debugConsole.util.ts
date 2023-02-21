import chalk from 'chalk'

export const debugMessage = (message: string, tag?: string) => {
	console.log(`${tag + ': ' || ''}${message}`)
}
