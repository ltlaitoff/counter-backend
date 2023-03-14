// import chalk from 'chalk'

export const debugMessage = (
	message: string,
	tag?: string,
	...args: Array<unknown>
) => {
	console.log(`${tag + ': ' || ''}${message}`, ...args)
}

export const serverDebugMessage = (
	message: string,
	...args: Array<unknown>
) => {
	const tag = `[Express]`

	debugMessage(message, tag, ...args)
}
