define((require) => {
        'use strict';

        var BaseView = require('BaseView'),
            ContactModel = require('ContactModel'),
            $ = require('jquery'),
            ModalView = require('ModalView'),
            contactViewTemplate = require('text!/app/templates/contact.collection.item.dust'),
            deleteContactModalTemplate = require('text!/app/templates/delete.contact.confirm.modal.dust');

        return BaseView.extend({
            model: ContactModel,
            template: contactViewTemplate,
            events: {
                'click #delete-btn': 'confirmDeleting'
            },

            confirmDeleting() {
                var self = this;

                var modalView = new ModalView({
                    title: 'Confirm deleting',
                    template: deleteContactModalTemplate,
                    model: self.model,
                    buttons: {
                        'Delete': function () {
                            $(this).dialog("close");
                            self.model.destroy();
                        },
                        'Cancel': function () {
                            $(this).dialog("close");
                            modalView.remove();
                        }
                    }
                });

                modalView.render().show();
            }
        });
    }
);