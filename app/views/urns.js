define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Bootstrap           = require('twitter_bootstrap'),
        tpl                 = require('text!app/views/tpl/urns.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            var self = this;

            $.when(
                this.options.table.fetch(),
                this.options.urns.fetch()
            ).then(function() {
                self.render();
            });
        },
        el: '.content',
        render: function () {
            this.$el.html(template({
                table: this.options.table.toJSON(),
                urns: this.options.urns.toJSON()
            }));

            return this;
        }
    });
});