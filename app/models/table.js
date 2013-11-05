define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        Backbone            = require('backbone'),

        Table = Backbone.Model.extend({
            urlRoot: config.server + "/tables"
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