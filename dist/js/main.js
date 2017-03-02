/*!
 * Credit Card Example
 * Version 1.0.0 (02-03-2017 14:54)
 * Licensed under MIT
 * Copyright 2013-2017 Hasan Aydoğdu <hsnaydd@gmail.com>
 */

'use strict';(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var rivetsCreditCard = document.getElementById('rivets-credit-card-container');

    if (!rivetsCreditCard) {
      return;
    }

    rivets.formatters.defaultText = function (value, defaultText) {
      return value || defaultText || '';
    };

    rivets.formatters.maskCreditCard = function (value) {
      return value.replace(/(.{4})/g, '$1 ').trim();
    };

    rivets.bind(rivetsCreditCard, {
      creditCard: {
        isBackface: false },

      handlers: {
        turnCard: function turnCard(event, view) {
          view.creditCard.isBackface = event.type === 'focus';
        } },

      masks: {
        creditCard: function creditCard(event, view) {
          var value = clearValue(this.value, 'number');
          var maxLength = Number(this.getAttribute('data-max-char'));
          if (maxLength) {
            value = limitValue(value, maxLength);
          }
          this.value = view.creditCard.number = value.replace(/(.{4})/g, '$1 ').trim();
        },
        number: function number(event, view) {
          var value = clearValue(this.value, 'number');
          var maxLength = Number(this.getAttribute('data-max-char'));
          if (maxLength) {
            value = limitValue(value, maxLength);
          }
          this.value = view.creditCard.ccv = value;
        } } });


  });

  /**
       * Clears empty spaces from given value
       * @param  {String} value The value to be cleared
       * @param  {String} type The type of value
       * @return {String} Cleaned value
       */
  function clearValue(value, type) {
    if (type === 'number') {
      return value.replace(/[^\d]/g, '');
    }
    return value.replace(/\s+/g, '');
  };

  /**
      * Limit given value
      * @param  {String} value The value to be limited
      * @param  {Number} limit Limit value
      * @return {String} The limited value
      */
  function limitValue(value, limit) {
    if (value.length < limit) {
      return value;
    }
    return value.substring(0, limit);
  };
})();