define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        Backbone            = require('backbone'),

        Vote = Backbone.Model.extend({
            urlRoot: config.server + "/votes"
        }),

        VoteCollection = Backbone.Collection.extend({
            model: Vote,
            url: config.server + "/votes",
            parse: function(response) {
                return response.results;
            }
        });

    return {
        Vote: Vote,
        VoteCollection: VoteCollection
    };

});