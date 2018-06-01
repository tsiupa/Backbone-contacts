define((require) => {
    'use strict';

    var BaseView = require('BaseView'),
        HomePageHeaderView = require('HomePageHeaderView'),
        ContactCollectionView = require('ContactCollectionView'),
        template = require('text!/app/templates/home.page.dust');

    return BaseView.extend({
        template: template,

        initialize: function (opts) {
            this.contactCollectionView = new ContactCollectionView({collection: opts.contactCollection});
            this.headerView = new HomePageHeaderView();
            this.listenTo(this.headerView, 'contacts:search', (query) => this.contactCollectionView.search(query));

            this.addSubView(this.headerView);
            this.addSubView(this.contactCollectionView);
        },

        onRender: function() {
            this.showChildView('#home-header', this.headerView);
            this.showChildView('#home-main', this.contactCollectionView);
        }
    });
});