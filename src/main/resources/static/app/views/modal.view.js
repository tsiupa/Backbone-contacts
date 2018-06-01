define((require) => {
    'use strict';

    var $ = require('jquery'),
        $dialog = require('jquery-ui/widgets/dialog'),
        BaseView = require('BaseView');

    return BaseView.extend({
       initialize(opts) {
           this.title = opts.title;
           this.template = opts.template;
           this.model = opts.model;
           this.buttons = opts.buttons;
       },

       onRender() {
           this.$el.attr('title', this.title);
       },

       show() {
           this.$el.dialog({
               resizable: false,
               height: "auto",
               width: 400,
               modal: true,
               buttons: this.buttons
           });
       }
    });
});