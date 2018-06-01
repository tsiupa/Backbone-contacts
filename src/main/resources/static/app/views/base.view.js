define(function (require) {
    'use strict';
    var Backbone = require('backbone'),
        dust = require('dust'),
        $ = require('jquery'),
        _isFunction = require('lodash/lang/isFunction'),
        _forEach = require('lodash/collection/forEach'),
        _isArray = require('lodash/lang/isArray'),
        _remove = require('lodash/array/remove'),
        _isFunction = require('lodash/lang/isFunction');

    return Backbone.View.extend({

        constructor() {
            this._subViews = [];
            Backbone.View.apply(this, arguments);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render() {
            var html = this.renderDust(this.template, this.model || this.collection);
            this.$el.html(html);
            this.onRender && this.onRender();

            return this;
        },

        renderDust: function (template, model) {
            if (!dust.cache[template]) {
                var compiledSources = dust.compile(template, template);
                dust.loadSource(compiledSources);
            }
            
            var result = '';
            dust.render(template, model, (err, output) => {
                result = output;
            });

            return result;
        },

        showChildView (region, view) {
            this.$(region).html(view.render().$el);

        },

        clear() {
            this._removeSubViews();
            this.$el.html('');
        },

        remove(opts) {
            opts = opts || {};

            if (!opts.silent) {
                this.trigger('remove');
            }
            this._removeSubViews();

            Backbone.View.prototype.remove.apply(this, arguments);
        },

        registerSubViews() {
            for (var i = 0; i < arguments.length; i++) {
                if (_isArray(arguments[i])) {
                    _forEach(arguments[i], (view) => this.addSubView(view));
                } else {
                    this.addSubView(arguments[i]);
                }
            }
        },

        addSubView(view) {
            this._subViews.push(view);
            this.listenTo(view, 'remove', () => _remove(this._subViews, view));
        },

        _removeSubViews() {
            _forEach(this._subViews, (view) => view.remove({silent: true}));
            this._subViews = [];
        }
    });
});