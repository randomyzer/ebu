define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/voting.html'),
        twitterBootstrap    = require('twitter_bootstrap'),

        template = _.template(tpl);

    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch();
        },
        render: function () {
            this.$el.html(template({
                server: config.server,
                tableId: this.options.tableId,
                parties: this.collection.toJSON()
            }));

            return this;
        },

        events: {
            "click .parties .select-btn": "addVoting"
        },

        addVoting: function (event) {
            event.preventDefault();

            var id = $(event.currentTarget).attr('party-id');

            var formValues = {
                table_id: this.options.tableId,
                party_id: id
            };

            var view = this;

            $.ajax({
                url: config.server + '/voto/sumar',
                type: 'POST',
                dataType: "json",
                data: formValues,
                success: function (data) {
                    view.undelegateEvents();

                    if(!data.error) {
                        $(event.currentTarget).closest(".modal").on('hidden.bs.modal', function () {
                            Backbone.history.navigate("gracias", {trigger: true});
                        });

                        $(event.currentTarget).closest(".modal").modal('hide');
                    }
                }
            });
        }
    });
});