define(function (require) {
    "use strict";

    var config                      = require('config'),
        $                           = require('jquery'),
        _                           = require('underscore'),
        Backbone                    = require('backbone'),
        Bootstrap                   = require('twitter_bootstrap'),
        JqueryTimepickerAddonI18n   = require('jquery-timepicker-addon-i18n'),
        tpl                         = require('text!app/views/tpl/open.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        el: '.content',
        render: function () {
            this.$el.html(template({tableId: this.options.tableId}));

            $('#open_date').timepicker();

            return this;
        },

        events: {
            "click #submit-button": "sendData"
        },

        sendData: function (event) {
            event.preventDefault();

            var formValues = {
                table_id: this.options.tableId,
                open_date: $('#open_date').val()
            };

            var view = this;

            $.ajax({
                url: config.server + '/tables/save-open-date',
                type: 'POST',
                dataType: "json",
                data: formValues,
                success: function (data) {
                    view.undelegateEvents();

                    Backbone.history.navigate("mesa/" + view.options.tableId + "/urnas", {trigger: true});
                }
            });
        }
    });
});