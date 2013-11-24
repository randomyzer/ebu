define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        jqueryCountdown     = require('jquery_countdown'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/thanks.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(template());

            var currentDate = new Date();
            $('#clock').countdown(1 * 10 * 1000 + currentDate.valueOf(), function(event) {
                var $this = $(this);
                switch(event.type) {
                    case "seconds":
                    case "minutes":
                        $this.find('span#'+event.type).html(event.value);
                        break;
                    case "finished":
                        $('#intro-button').removeClass('hide');
                        $('#clock').addClass('hide');
                        break;
                }
            });

            return this;
        }
    });
});