define((require) => {
    'use strict';

    var BaseView = require('BaseView'),
        $ = require('jquery'),
        template = require('text!/app/templates/contact.collection.pagination.view.dust');

    return BaseView.extend({
        template: template,

        className: 'col-md-12',

        pagination: {
            activePage: 1
        },

        events: {
            'click #page': 'changePage'
        },

        initialize: function (opts) {
            this.itemsPerPage = opts.itemsPerPage;
        },

        setPaginationParams: function (activePage, totalPages) {
            this.pagination.activePage = activePage;
            this.pagination.totalPages = totalPages;
        },

        changePage: function (e) {
            this.pagination.activePage = typeof e == 'number' ? e : $(e.currentTarget).attr('data-number');
            this.trigger('page:change', {number: this.pagination.activePage});
        },

        renderData: function () {
            if (this.pagination.totalPages <= 1) {
                return {needToShow: false};
            }

            var totalPages = this.pagination.totalPages;
            var pages = [];
            while (totalPages > 0) {
                pages.unshift({
                    number: totalPages,
                    isActive: totalPages == this.pagination.activePage
                });
                totalPages--;
            }

            return {
                needToShow: true,
                pages: pages
            };
        }
    });
});