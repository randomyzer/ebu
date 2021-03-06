define('config', {
    server: 'http://bocadeurna.encuestamovil.info/server/web'
});

require.config({
    baseUrl: '',
    waitSeconds: 200,
    paths: {
        jquery:             'vendor/jquery/jquery-min',
        backbone:           'vendor/backbone/backbone-min',
        underscore:         'vendor/underscore/underscore-min',
        text:               'vendor/requirejs/text',
        twitter_bootstrap:  'vendor/bootstrap/js/bootstrap-min',
        jquery_countdown:   'vendor/jquery-countdown/jquery-countdown'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'twitter_bootstrap': {
            deps: ['jquery']
        },
        'jquery_countdown': {
            deps: ['jquery']
        }
    },

    // Debug mode
    //urlArgs: "v=" +  (new Date()).getTime()
});

require(
    ['jquery', 'backbone', 'app/router.js', 'twitter_bootstrap'],
    function ($, Backbone, Router) {
        var router = new Router();

        $("body").on("click", ".back-button", function (event) {
            event.preventDefault();
            window.history.back();
        });

        Backbone.history.start();
    }
);
