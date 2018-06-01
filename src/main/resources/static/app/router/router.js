define((require) => {
    'use strict';


var Backbone = require('backbone'),
    HomePageView = require('HomePageView'),
    ContactFormView = require('ContactFormView'),
    ContactCollection = require('ContactCollection');

    return Backbone.Router.extend({

        routes: {
            '': 'allContacts',
            'contacts': 'allContacts',
            'contacts/new': 'newContact',
            'contacts/:id': 'editContact'
        },


        allContacts: function () {
            this.collection = new ContactCollection();
            this.collection.fetch({async: false});
            this.currentView && this.currentView.remove();
            this.currentView = new HomePageView({
                router: this,
                contactCollection: this.collection});
            this.renderCurrentView();
        },

        newContact: function () {
            this.currentView && this.currentView.remove();
            this.currentView = new ContactFormView();
            this.renderCurrentView();
        },

        editContact: function (contactId) {
            var currentContact = this.collection.get(contactId);
            currentContact.fetch();
            this.currentView && this.currentView.remove();
            this.currentView = new ContactFormView({model: currentContact});
            this.renderCurrentView();
        },

        renderCurrentView: function () {
            $('#main').html(this.currentView.render().$el);
        }
    });
});