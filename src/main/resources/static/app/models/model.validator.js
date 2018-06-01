define((require) => {
    'use strict';

    var _isEmpty = require('lodash/lang/isEmpty');

    function ModelValidator() {
        this.errors = {};
    }

    ModelValidator.prototype.validateRequired = function (val, name) {
        if (this.errors[name]) {
            return;
        }

        if (_isEmpty(val)) {
            this.errors[name] = 'Field is required'
        }
    };

    ModelValidator.prototype.validateLength = function (val, name, restrictions) {
        if (this.errors[name]) {
            return;
        }

        var length = (val || '').length;
        if (length < restrictions.min || length > restrictions.max) {
            this.errors[name] = 'Field length should be from ' + restrictions.min + ' to ' + restrictions.max + ' symbols';
        }
    };

    ModelValidator.prototype.validateRegexp = function (val, name, regexp) {
        if (this.errors[name]) {
            return;
        }

        if (!regexp.test(val)) {
            this.errors[name] = 'Field is invalid';
        }
    };

    return ModelValidator;
});