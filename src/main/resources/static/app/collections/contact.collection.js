define((require) => {
    'use strict';

    var Backbone = require('backbone'),
        ContactModel = require('ContactModel');

    return Backbone.Collection.extend({
        model: ContactModel,
        url: '/contact',
        parse: function(response) {
            return response._embedded.contact;
        }

    });
});