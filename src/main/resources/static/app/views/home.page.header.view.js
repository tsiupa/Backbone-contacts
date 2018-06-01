define((require) => {
    'use strict';

    var BaseView = require('BaseView'),
        template = require('text!/app/templates/home.page.header.dust');

    return BaseView.extend({
        template: template,
        events: {
            'submit #search-form': 'search'
        },
        search: function(e) {
            e.preventDefault();
            var searchQuery = this.$('#search-query').val();
            this.trigger('contacts:search', searchQuery);
        }
    });
});