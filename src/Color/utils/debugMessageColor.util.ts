import chalk, { Chalk } from 'chalk'
import { debugMessage } from '../../utils/debugConsole.util'

const COLOR_TAG = chalk.magenta('[Color] ')

type ServiceDebugMessageTypes = 'create' | 'update' | 'remove' | 'find'

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export const serviceDebugMessage = (
	type: ServiceDebugMessageTypes,
	message: string,
	...args: Array<unknown>
) => {
	const tagsColors: Record<ServiceDebugMessageTypes, Chalk> = {
		find: chalk.blue,
		create: chalk.green,
		update: chalk.yellow,
		remove: chalk.red
	}

	const tag = COLOR_TAG + tagsColors[type](`[${capitalizeFirstLetter(type)}]`)

	debugMessage(message, tag, ...args)
}
