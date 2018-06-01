define((require) => {
    var Backbone = require('backbone'),
        ModelValidator = require('ModelValidator'),
        _forIn = require('lodash/object/forIn'),
        _isFunction = require('lodash/lang/isFunction'),
        _capitalize = require('lodash/string/capitalize'),
        _isEmpty = require('lodash/lang/isEmpty');

    return Backbone.Model.extend({
        validationRules: {},
        validate: function(attrs, options) {
           var modelValidator = new ModelValidator();

           _forIn(this.validationRules, (fieldValidationRules, fieldName) => {
                _forIn(fieldValidationRules, (ruleParam, ruleName) => {
                    var validationFuncName = 'validate' + _capitalize(ruleName);
                    if(_isFunction(modelValidator[validationFuncName])) {
                        modelValidator[validationFuncName](attrs[fieldName], fieldName, ruleParam);
                    }
                });
           });

           if (this.afterValidate) {
               return this.afterValidate(modelValidator.errors);
           }

           if (!_isEmpty(modelValidator.errors)) {
               return modelValidator.errors;
           }
        }
    });
});