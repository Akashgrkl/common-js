const array = require('./array'),
	assert = require('./assert'),
	attributes = require('./attributes'),
	connection = require('./connection'),
	converters = require('./converters'),
	Currency = require('./Currency');
	date = require('./date'),
	Day = require('./Day'),
	Decimal = require('./Decimal'),
	Disposable = require('./Disposable'),
	Enum = require('./Enum'),
	is = require('./is'),
	mask = require('./mask'),
	math = require('./math'),
	memoize = require('./memoize'),
	Money = require('./Money'),
	object = require('./object'),
	promise = require('./promise'),
	random = require('./random'),
	Rate = require('./Rate'),
	string = require('./string'),
	Timestamp = require('./Timestamp'),
	timezone = require('./timezone'),
	Timezones = require('./Timezones');

module.exports = (() => {
	'use strict';

	return {
		array: array,
		assert: assert,
		attributes: attributes,
		connection: connection,
		converters: converters,
		Currency: Currency,
		date: date,
		Day: Day,
		Disposable: Disposable,
		Decimal: Decimal,
		Enum: Enum,
		is: is,
		mask: mask,
		math: math,
		memoize: memoize,
		Money: Money,
		object: object,
		promise: promise,
		random: random,
		Rate: Rate,
		string: string,
		Timestamp: Timestamp,
		timezone: timezone,
		Timezones: Timezones
	};
})();