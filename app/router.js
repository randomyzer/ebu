define(function (require) {
    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone');

    $.ajaxSetup({
        statusCode: {
            401: function(){
                window.location.replace('#login');
            },
            403: function() {
                window.location.replace('#login');
            }
        }
    });

    return Backbone.Router.extend({
        routes: {
            "": "tables",
            "login": "login",
            "mesas": "tables",
            "intro": "intro",
            "votaciones/mesa/:tableId": "voting",
            "gracias": "thanks"
        },

        login: function () {
            require(["app/views/login.js"], function (LoginView) {
                var view = new LoginView();
            });
        },

        tables: function () {
            require(["app/views/tables.js", "app/models/table.js"], function (TablesView, Table) {
                var view = new TablesView({collection: new Table.TableCollection});
            });
        },

        intro: function () {
            require(["app/views/intro.js"], function (IntroView) {
                var view = new IntroView();
            });
        },

        voting: function (tableId) {
            require(["app/views/voting.js", "app/models/party.js"], function (VotingView, Party) {
                var view = new VotingView({
                    collection: new Party.PartyCollection,
                    tableId: tableId
                });
            });
        },

        thanks: function () {
            require(["app/views/thanks.js"], function (ThanksView) {
                var view = new ThanksView();
            });
        }
    });
});