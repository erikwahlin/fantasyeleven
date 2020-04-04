export const shortenName = fullName => {
	const afterSpace = fullName.indexOf(' ') + 1;

	let lastName = fullName.substring(afterSpace);

	let midName = '';

	const firstName = lastName.length < 9 ? fullName[0] + '.' : '';

	if (lastName.includes('-')) {
		const afterHyphen = lastName.indexOf('-') + 1;

		midName = lastName[0] + '-';

		lastName = lastName[afterHyphen].toUpperCase() + lastName.substring(afterHyphen + 1);
	}

	return `${firstName} ${midName}${lastName}`;
};

export const clone = (obj, keyName) => {
	// if level bottom or key is 'ref' return val
	if (obj === null || typeof obj !== 'object' || keyName === 'ref') {
		return obj;
	}

	const copy = obj.constructor();

	for (var key in obj) {
		copy[key] = clone(obj[key], key);
	}
	return copy;
};
