define(function (require) {
    "use strict";

    var config                      = require('config'),
        $                           = require('jquery'),
        _                           = require('underscore'),
        Backbone                    = require('backbone'),
        Bootstrap                   = require('twitter_bootstrap'),
        JqueryTimepickerAddonI18n   = require('jquery-timepicker-addon-i18n'),
        tpl                         = require('text!app/views/tpl/flow.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            var self = this;

            $.when(
                this.options.table.fetch()
            ).then(function() {
                self.render();
            });
        },
        el: '.content',
        render: function () {
            this.$el.html(template({
                table: this.options.table.toJSON()
            }));

            $('#return-message').hide();

            return this;
        },

        events: {
            "click #submit-button": "sendData"
        },

        sendData: function (event) {
            event.preventDefault();

            var formValues = {
                table_id: this.options.tableId,
                flow: $('#flow').val()
            };

            var view = this;

            $.ajax({
                url: config.server + '/tables/save-flow',
                type: 'POST',
                dataType: "json",
                data: formValues,
                success: function (data) {
                    if(data.error) {
                        $('#return-message').text(data.error.text).show();
                    } else {
                        view.undelegateEvents();

                        Backbone.history.navigate("mesa/" + view.options.tableId + "/urnas", {trigger: true});
                    }
                }
            });
        }
    });
});