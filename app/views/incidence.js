define(function (require) {
    "use strict";

    var config = require('config'),
        $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        tpl = require('text!app/views/tpl/incidence.html'),

        template = _.template(tpl);

    return Backbone.View.extend({
        initialize: function () {
            var self = this;

            $.when(
                this.options.table.fetch(),
                this.options.incidences.fetch()
            ).then(function() {
                self.render();
            });
        },
        el: '.content',
        render: function () {
            this.$el.html(template({
                server: config.server,
                table: this.options.table.toJSON(),
                incidences: this.options.incidences.toJSON()
            }));

            return this;
        },

        events: {
            "click .select-btn": "save",
            "change #incidence": "checkIncidence"
        },

        save: function (event) {
            event.preventDefault();

            var formValues = {
                table_id: this.options.table.get('id'),
                incidence_id: $('#incidence').val(),
                custom_incidence: $('#custom_incidence').val()
            };

            var view = this;

            $.ajax({
                url: config.server + '/voting/save-incidence',
                type: 'POST',
                dataType: "json",
                data: formValues,
                success: function (data) {
                    view.undelegateEvents();

                    if(!data.error) {
                        Backbone.history.navigate("mesas", {trigger: true});
                    }
                }
            });
        },

        checkIncidence: function (event) {
            if (0 == $(event.currentTarget).val()) {
                $("#custom_incidence").removeClass('hide');
            } else {
                $("#custom_incidence").addClass('hide');
            }
        }
    });
});