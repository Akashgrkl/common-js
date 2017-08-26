var Currency = require('./../../../../lang/Currency');
var Day = require('./../../../../lang/Day');
var Money = require('./../../../../lang/Money');

var Component = require('./../../../../serialization/json/Component');
var Field = require('./../../../../serialization/json/Field');
var DataType = require('./../../../../serialization/json/DataType');
var Schema = require('./../../../../serialization/json/Schema');

describe('When a person schema is created (first and last names)', function() {
	'use strict';

	var schema;

	beforeEach(function() {
		schema = new Schema('person', [
			new Field('first', DataType.STRING),
			new Field('last', DataType.STRING)
		]);
	});

	describe('and a schema-compliant object is created', function() {
		var object;

		beforeEach(function() {
			object = {
				first: 'bryan',
				last: 'ingle'
			};
		});

		describe('and the object is "stringified" as JSON', function() {
			var serialized;

			beforeEach(function() {
				serialized = JSON.stringify(object);
			});

			describe('and the object is rehydrated using the schema reviver', function() {
				var deserialized;

				beforeEach(function() {
					deserialized = JSON.parse(serialized, schema.getReviver());
				});

				it('should have a "first" property with the expected value', function() {
					expect(deserialized.first).toEqual('bryan');
				});

				it('should have a "last" property with the expected value', function() {
					expect(deserialized.last).toEqual('ingle');
				});
			});
		});
	});
});

describe('When a person schema is created (grouped first and last names with a birthday)', function() {
	'use strict';

	var schema;

	beforeEach(function() {
		schema = new Schema('person', [
			new Field('name.first', DataType.STRING),
			new Field('name.last', DataType.STRING),
			new Field('birthday', DataType.DAY)
		]);
	});

	describe('and a schema-compliant object is created', function() {
		var object;

		beforeEach(function() {
			object = {
				name: {
					first: 'bryan',
					last: 'ingle'
				},
				birthday: new Day(1974, 10, 20)
			};
		});

		describe('and the object is "stringified" as JSON', function() {
			var serialized;

			beforeEach(function() {
				serialized = JSON.stringify(object);
			});

			describe('and the object is rehydrated using the schema reviver', function() {
				var deserialized;

				beforeEach(function() {
					try {
						deserialized = JSON.parse(serialized, schema.getReviver());
					} catch (e) {
						console.log(e);
					}
				});

				it('should have a "name.first" property with the expected value', function() {
					expect(deserialized.name.first).toEqual('bryan');
				});

				it('should have a "name.last" property with the expected value', function() {
					expect(deserialized.name.last).toEqual('ingle');
				});

				it('should have a "birthday" property with the expected value', function() {
					expect(deserialized.birthday.year).toEqual(1974);
					expect(deserialized.birthday.month).toEqual(10);
					expect(deserialized.birthday.day).toEqual(20);
				});
			});
		});
	});
});

describe('When an account schema is created (using the Money component)', function() {
	'use strict';

	var schema;

	beforeEach(function() {
		schema = new Schema('account', [
			new Field('number', DataType.NUMBER)
		], [
			Component.forMoney('balance')
		]);
	});

	describe('and a schema-compliant object is created', function() {
		var object;

		beforeEach(function() {
			object = {
				number: 123456789,
				balance: new Money(314.15, Currency.USD)
			};
		});

		describe('and the object is "stringified" as JSON', function() {
			var serialized;

			beforeEach(function() {
				serialized = JSON.stringify(object);
			});

			describe('and the object is rehydrated using the schema reviver', function() {
				var deserialized;

				beforeEach(function() {
					try {
						deserialized = JSON.parse(serialized, schema.getReviver());
					} catch (e) {
						console.log(e);
					}
				});

				it('should have a "number" property with the expected value', function() {
					expect(deserialized.number).toEqual(123456789);
				});

				it('should have a "balance" property with the expected value', function() {
					expect(deserialized.balance.currency).toEqual(Currency.USD);
					expect(deserialized.balance.decimal.getIsEqual(314.15)).toEqual(true);
				});
			});
		});
	});
});

describe('When an account schema is created (using the Money component with nesting)', function() {
	'use strict';

	var schema;

	beforeEach(function() {
		schema = new Schema('account', [
			new Field('number', DataType.NUMBER)
		], [
			Component.forMoney('balances.yesterday'),
			Component.forMoney('balances.today')
		]);
	});

	describe('and a schema-compliant object is created', function() {
		var object;

		beforeEach(function() {
			object = {
				number: 987654321,
				balances: {
					yesterday: new Money(314.15, Currency.USD),
					today: new Money(271.83, Currency.USD)
				}
			};
		});

		describe('and the object is "stringified" as JSON', function() {
			var serialized;

			beforeEach(function() {
				serialized = JSON.stringify(object);
			});

			describe('and the object is rehydrated using the schema reviver', function() {
				var deserialized;

				beforeEach(function() {
					try {
						deserialized = JSON.parse(serialized, schema.getReviver());
					} catch (e) {
						console.log(e);
					}
				});

				it('should have a "number" property with the expected value', function() {
					expect(deserialized.number).toEqual(987654321);
				});

				it('should have a "balances.yesterday" property with the expected value', function() {
					expect(deserialized.balances.yesterday.currency).toEqual(Currency.USD);
					expect(deserialized.balances.yesterday.decimal.getIsEqual(314.15)).toEqual(true);
				});

				it('should have a "balances.today" property with the expected value', function() {
					expect(deserialized.balances.today.currency).toEqual(Currency.USD);
					expect(deserialized.balances.today.decimal.getIsEqual(271.83)).toEqual(true);
				});
			});
		});
	});
});