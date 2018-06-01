define.amd.dust = true; // need for the dust lib
require.config({
    baseUrl: '/',
    paths: {
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'bootstrap': '/bower_components/bootstrap/js/bootstrap.min',
        'backbone': '/bower_components/backbone/backbone',
        'dust': '/bower_components/dustjs-linkedin/dist/dust-full.min',
        'text': '/bower_components/text/text',
        'ModelValidator': '/app/models/model.validator',
        'BaseView': '/app/views/base.view',
        'BaseModel': '/app/models/base.model',
        'ContactModel': '/app/models/contact.model',
        'ContactCollection': '/app/collections/contact.collection',
        'ModalView': '/app/views/modal.view',
        'ContactCollectionView': '/app/views/contact.collection.view',
        'ContactCollectionPaginationView': '/app/views/contact.collection.pagination.view',
        'ContactCollectionItemView': '/app/views/contact.collection.item.view',
        'HomePageView': '/app/views/home.page.view',
        'HomePageHeaderView': '/app/views/home.page.header.view',
        'ContactFormView': '/app/views/contact.form.view',
        'ContactRouter': '/app/router/router'
    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    },
    shim: {
        "bootstrap": {"deps": ['jquery']}
    },
    packages: [
        {
            name: 'lodash',
            location: '/bower_components/lodash-amd/modern'
        },
        {
            name: 'jquery-ui',
            location: '/bower_components/jquery-ui/ui'
        }
    ]
});

require(['backbone', 'ContactRouter'],
    function (Backbone, ContactRouter) {
        new ContactRouter();
        Backbone.history.start();
    }
);