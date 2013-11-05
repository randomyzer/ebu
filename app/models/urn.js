define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        Backbone            = require('backbone'),

        Urn = Backbone.Model.extend({
            urlRoot: config.server + "/urns"
        }),

        UrnCollection = Backbone.Collection.extend({
            model: Urn,
            url: config.server + "/urns",
            parse: function(response) {
                return response.results;
            }
        });

    return {
        Urn: Urn,
        UrnCollection: UrnCollection
    };

});