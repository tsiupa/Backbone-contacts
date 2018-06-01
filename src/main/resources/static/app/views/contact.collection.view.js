define((require) => {
    'use strict';

    var BaseView = require('BaseView'),
        ContactCollectionItemView = require('ContactCollectionItemView'),
        ContactCollectionPaginationView = require('ContactCollectionPaginationView'),
        template = require('text!/app/templates/contact.collection.dust'),
        _filter = require('lodash/collection/filter'),
        _findIndex = require('lodash/array/findIndex'),
        _isString = require('lodash/lang/isString'),
        _isNumber = require('lodash/lang/isNumber'),
        _chunk = require('lodash/array/chunk');

    return BaseView.extend({
        template: template,

        itemsPerPage: 6,

        currentSearchQuery: '',

        initialize: function () {
            this.contactCollectionPaginationView = new ContactCollectionPaginationView({itemsPerPage: this.itemsPerPage});
            this.listenTo(this.contactCollectionPaginationView, 'page:change', () => this.onPageChanged());
            this.listenTo(this.collection, 'update', () => this.onPageChanged());
        },

        onPageChanged: function (page, opts) {
            var models = this.findContactsByCurrentSearchQuery();
            var modelsByPages = _chunk(models, this.itemsPerPage);

            page = (page && page.number) || this.contactCollectionPaginationView.pagination.activePage;
            if (!modelsByPages[page - 1]) {
                page = page - 1;
            }

            this.contactCollectionPaginationView.setPaginationParams(page, modelsByPages.length);
            this.resetCollection(modelsByPages[page - 1], opts);
        },

        search: function (searchQuery) {
            this.currentSearchQuery = searchQuery;
            this.onPageChanged({number: 1});
        },

        findContactsByCurrentSearchQuery: function () {
            return _filter(this.collection.models, (contact) => {
                var index = _findIndex(Object.values(contact), val => {
                    var strVal = _isNumber(val) || _isString(val) ? val.toString() : '';
                    return strVal.toLowerCase().includes(this.currentSearchQuery.toLowerCase());
                });
                return index != -1;
            });
        },

        resetCollection: function (collection, opts) {
            opts = opts || {};

            this.collection.reset(collection);

            if (!opts.silent) {
                this.render();
            }
        },

        onRender: function () {
            this._removeSubViews();

            var $content = this.$('#content');

            if (this.collection.isEmpty()) {
                return;
            }

            this.collection.each((model) => {
                var view = new ContactCollectionItemView({model: model});
                this.addSubView(view);
                $content.append(view.render().$el);
            });

            this.contactCollectionPaginationView.setElement(this.$('#pagination')).render();
            this.addSubView(this.contactCollectionPaginationView);

            return this;
        },
    });
});