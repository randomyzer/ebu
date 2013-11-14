define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.View.extend({
        initialize: function () {
            this.render();

            $('#return-message').hide();
        },
        el: '.content',
        render: function () {
            $.ajax({
                url: config.server + '/close',
                type: 'GET',
                async: false,
                dataType: "json",
                success: function (data) {
                    Backbone.history.navigate("mesas", {trigger: true});
                }
            });

            return this;
        }
    });
});