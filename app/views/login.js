define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/login.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            this.render();

            $('#return-message').hide();
        },
        el: '.content',
        render: function () {
            this.$el.html(template());

            return this;
        },

        events: {
            "click #login-button": "login"
        },

        login: function (event) {
            event.preventDefault();

            var formValues = {
                _username: $('#username-input').val(),
                _password: $('#password-input').val()
            };

            $.ajax({
                url: config.server + '/login_check',
                type: 'POST',
                async: false,
                dataType: "json",
                data: formValues,
                success: function (data) {
                    if(data.error) {
                        $('#return-message').text(data.error.text).show();
                    } else {
                        Backbone.history.navigate("mesas", {trigger: true});
                    }
                }
            });
        }
    });
});