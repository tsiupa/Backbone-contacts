define((require) => {
    'use strict';

    var BaseView = require('BaseView'),
        ContactModel = require('ContactModel'),
        template = require('text!/app/templates/contact.form.dust'),
        _forIn = require('lodash/object/forIn');


    return BaseView.extend({
        template: template,

        initialize: function(opts) {
            if(!this.model)
                this.model = new ContactModel();
        },

        events: {
            'submit #contact-form': 'submit'
        },

        submit: function(e) {
            e.preventDefault();
            this.hideErrors();

            _forIn(this.model.toJSON(), (value, key) => {
                if (key == 'id'){
                    return;
                }

                var newValue = this.$el.find('#' + key).val();
                this.model.set(key, newValue);
            });

            if (this.model.isValid() && this.model.save({},{async: false})) {
                Backbone.history.navigate('contacts', {trigger: true, replace: true});
            } else {
                this.showErrors();
            }
        },

        onRender: function() {
            _forIn(this.model.toJSON(), (value, key) => {
                this.$el.find('#' + key).val(value);
            });
        },

        showErrors: function() {
            _forIn(this.model.validationError, (value, key) => {
                this.$el.find('#' + key + 'Block').addClass('has-error');
                var $fieldError = this.$el.find('#' + key + 'Error');
                $fieldError.html(value);
                $fieldError.show();
            });
        },

        hideErrors: function() {
            _forIn(this.model.toJSON(), (value, key) => {
                this.$el.find('#' + key + 'Block').removeClass('has-error');
                this.$el.find('#' + key + 'Error').hide();
            });
        }
    });
});