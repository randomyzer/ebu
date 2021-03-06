define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!app/views/tpl/voting.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        el: '.content',
        initialize: function () {
            this.listenTo(this.collection, 'sync', this.render);
            this.collection.fetch({data: {table_id: this.options.tableId, type: 1}});
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

            var view = this;

            $(event.currentTarget).closest(".modal").on('hidden.bs.modal', function () {
                var id = $(event.currentTarget).attr('party-id');

                var formValues = {
                    table_id: view.options.tableId,
                    party_id: id
                };

                $.ajax({
                    url: config.server + '/voto/sumar',
                    type: 'POST',
                    dataType: "json",
                    data: formValues,
                    success: function (data) {
                        view.undelegateEvents();

                        if(!data.error) {
                            window.location.replace('index.html#gracias');
                        }
                    }
                });
            });

            $(event.currentTarget).closest(".modal").modal('hide');
        }
    });
});