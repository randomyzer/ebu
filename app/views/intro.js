define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/intro.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template());

            return this;
        }
    });
});