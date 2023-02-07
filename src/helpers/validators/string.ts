export const stringValidation = (value: unknown): null | string => {
	let resultValue = null

	if (value != undefined && typeof value === 'string') {
		resultValue = value
	}

	return resultValue
}
