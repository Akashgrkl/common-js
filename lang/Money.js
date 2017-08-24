const assert = require('./assert'),
	is = require('./is');

const Decimal = require('./Decimal'),
	Currency = require('./Currency');

module.exports = (() => {
	'use strict';

	/**
	 * A structure for storing money amounts.
	 *
	 * @public
	 * @param {Decimal|Number|String} - A amount, which can be parsed as a {@link Decimal}
	 * @param {Currecny} - The currency.
	 */
	class Money {
		constructor(value, currency) {
			assert.argumentIsRequired(currency, 'currency', Currency, 'Currency');

			this._decimal = getDecimal(value);
			this._currency = currency;
		}

		/**
		 * The currency amount.
		 *
		 * @public
		 * @returns {Decimal}
		 */
		get decimal() {
			return this._decimal;
		}

		/**
		 * The currency.
		 *
		 * @public
		 * @returns {Currency}
		 */
		get currency() {
			return this._currency;
		}

		toAmount(places, mode) {
			return new Money(this._decimal.round(getPlaces(places), mode), this._currency);
		}

		toString() {
			return `[Money]`;
		}
	}

	function getDecimal(value) {
		if (value instanceof Decimal) {
			return value;
		} else {
			return new Decimal(value);
		}
	}

	function getPlaces(value) {
		if (is.integer(value) && !(value < 0)) {
			return value;
		} else {
			return 2;
		}
	}

	return Money;
})();
