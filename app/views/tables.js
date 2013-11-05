define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/tables.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },
        render: function () {
            this.$el.html(template({tables: this.collection.toJSON()}));

            return this;
        }
    });
});