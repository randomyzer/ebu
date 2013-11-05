define(function (require) {
    "use strict";

    var config = require('config'),
        $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('text!app/views/tpl/voting.html'),

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
            "click .select-btn": "save"
        },

        save: function (event) {
            event.preventDefault();

            var votes = [];
            $("input").each(function() {
                if ($(this).attr("party-id")) {
                    votes["party[" + $(this).attr("party-id") + "]"] = $(this).val();
                }
            });

            var formValues = $.extend(
                {
                    table_id: this.options.tableId
                },
                votes
            );

            var view = this;

            $.ajax({
                url: config.server + '/votes/save',
                type: 'POST',
                dataType: "json",
                data: formValues,
                success: function (data) {
                    view.undelegateEvents();

                    if(!data.error) {
                        Backbone.history.navigate("mesa/" + view.options.tableId + "/ver", {trigger: true});
                    }
                }
            });
        }
    });
});