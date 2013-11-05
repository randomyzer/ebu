define(function (require) {
    "use strict";

    var config              = require('config'),
        $                   = require('jquery'),
        Backbone            = require('backbone'),

        Incidence = Backbone.Model.extend({
        }),

        IncidenceCollection = Backbone.Collection.extend({
            model: Incidence,
            url: config.server + "/incidences",
            parse: function(response) {
                return response.results;
            }
        });

    return {
        Incidence: Incidence,
        IncidenceCollection: IncidenceCollection
    };

});