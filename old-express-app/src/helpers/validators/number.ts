export const numberValidation = (value: unknown): null | number => {
	let resultValue = null

	if (value != undefined && typeof value === 'number') {
		resultValue = value
	}

	return resultValue
}
