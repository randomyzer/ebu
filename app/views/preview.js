define(function (require) {
    "use strict";

    var config = require('config'),
        $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('text!app/views/tpl/preview.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            var self = this;

            $.when(
                this.options.table.fetch(),
                this.options.parties.fetch(),
                this.options.votes.fetch({data: {table_id: this.options.tableId}})
            ).then(function() {
                self.render();
            });
        },
        el: '.content',
        render: function () {
            this.$el.html(template({
                server: config.server,
                table: this.options.table.toJSON(),
                parties: this.options.parties.toJSON(),
                votes: this.options.votes.toJSON()
            }));

            return this;
        },

        events: {
            "click .ok-btn": "confirm"
        },

        confirm: function (event) {
            event.preventDefault();

            var formValues = {
                table_id: this.options.tableId
            };

            var view = this;

            $.ajax({
                url: config.server + '/votes/confirm',
                type: 'POST',
                dataType: "json",
                data: formValues,
                success: function (data) {
                    view.undelegateEvents();

                    if(!data.error) {
                        Backbone.history.navigate("mesa/" + view.options.tableId + "/urnas", {trigger: true});
                    }
                }
            });
        }
    });
});