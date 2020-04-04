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
