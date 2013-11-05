define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/tables.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            var self = this;

            $.when(
                this.options.tables.fetch()
            ).then(function() {
                self.render();
            });
        },
        el: '.content',
        render: function () {
            this.$el.html(template({tables: this.options.tables.toJSON()}));

            return this;
        }
    });
});