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
            "": "home",
            "login": "login",
            "mesas": "tables",
            "mesa/:tableId/urnas": "urns",
            "mesa/:tableId/votos": "voting",
            "mesa/:tableId/ver": "preview",
            "mesa/:tableId/incidencias": "incidence",
            "mesa/:tableId/foto": "snapshot",
            "mesa/:tableId/apertura": "open",
            "mesa/:tableId/flujo": "flow",
            "mesa/:tableId/cierre": "close"
        },

        home: function () {
            require(["app/views/home.js"], function (HomeView) {
                var view = new HomeView();
                view.delegateEvents();
            });
        },

        login: function () {
            require(["app/views/login.js"], function (LoginView) {
                var view = new LoginView();
            });
        },

        tables: function () {
            require(["app/views/tables.js", "app/models/table.js"], function (TablesView, Table) {
                var view = new TablesView({
                    tables: new Table.TableCollection
                });
            });
        },

        urns: function (tableId) {
            require(["app/views/urns.js", "app/models/table.js", "app/models/urn.js"], function (UrnsView, Table, Urn) {
                var view = new UrnsView({
                    table: new Table.Table({id: tableId}),
                    urns: new Urn.UrnCollection,
                    tableId: tableId
                });
            });
        },

        voting: function (tableId) {
            require(["app/views/voting.js", "app/models/table.js", "app/models/party.js", "app/models/vote.js"], function (VotingView, Table, Party, Vote) {
                var view = new VotingView({
                    tableId: tableId,
                    table: new Table.Table({id: tableId}),
                    parties: new Party.PartyCollection,
                    votes: new Vote.VoteCollection
                });
            });
        },

        preview: function (tableId) {
            require(["app/views/preview.js", "app/models/table.js", "app/models/party.js", "app/models/vote.js"], function (PreviewView, Table, Party, Vote) {
                var view = new PreviewView({
                    tableId: tableId,
                    table: new Table.Table({id: tableId}),
                    parties: new Party.PartyCollection,
                    votes: new Vote.VoteCollection
                });
            });
        },

        incidence: function (tableId) {
            require(["app/views/incidence.js", "app/models/table.js", "app/models/incidence.js"], function (IncidencesView, Table, Incidence) {
                var view = new IncidencesView({
                    table: new Table.Table({id: tableId}),
                    incidences: new Incidence.IncidenceCollection
                });
            });
        },

        snapshot: function (tableId) {
            require(["app/views/snapshot.js", "app/models/table.js"], function (SnapshotView, Table) {
                var view = new SnapshotView({
                    tableId: tableId,
                    table: new Table.Table({id: tableId})
                });
            });
        },

        open: function (tableId) {
            require(["app/views/open.js"], function (OpenView) {
                var view = new OpenView({
                    tableId: tableId
                });
            });
        },

        flow: function (tableId) {
            require(["app/views/flow.js", "app/models/table.js"], function (FlowView, Table) {
                var view = new FlowView({
                    tableId: tableId,
                    table: new Table.Table({id: tableId})
                });
            });
        },

        close: function (tableId) {
            require(["app/views/close.js"], function (CloseView) {
                var view = new CloseView({
                    tableId: tableId
                });
            });
        }
    });
});