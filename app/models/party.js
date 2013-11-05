define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        Backbone            = require('backbone'),

        Party = Backbone.Model.extend({
            urlRoot: config.server + "/parties"
        }),

        PartyCollection = Backbone.Collection.extend({
            model: Party,
            url: config.server + "/parties",
            parse: function(response) {
                return response.results;
            }
        });

    return {
        Party: Party,
        PartyCollection: PartyCollection
    };

});