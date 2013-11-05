define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/home.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        el: '.content',
        render: function () {
            this.$el.html(template());

            return this;
        }
    });
});