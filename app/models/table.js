define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        Backbone            = require('backbone'),

        Table = Backbone.Model.extend({
        }),

        TableCollection = Backbone.Collection.extend({
            model: Table,
            url: config.server + "/tables",
            parse: function(response) {
                return response.results;
            }
        });

    return {
        Table: Table,
        TableCollection: TableCollection
    };

});