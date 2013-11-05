define('config', {
    server: 'http://trep.dev/server/web'
    //server: 'http://trepws.vanillasys.com/web'
});

require.config({
    baseUrl: '',
    waitSeconds: 200,
    paths: {
        jquery:                         'vendor/jquery/jquery-min',
        "jquery-ui":                    'vendor/jquery-ui/js/jquery-ui-min',
        "jquery-timepicker-addon":      'vendor/jquery-timepicker-addon/js/jquery-ui-timepicker-addon-min',
        "jquery-timepicker-addon-i18n": 'vendor/jquery-timepicker-addon/js/i18n/jquery-ui-timepicker-es',
        backbone:                       'vendor/backbone/backbone-min',
        underscore:                     'vendor/underscore/underscore-min',
        text:                           'vendor/requirejs/text',
        twitter_bootstrap:              'vendor/bootstrap/js/bootstrap-min'
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
        'jquery-ui': {
            deps: ['jquery']
        },
        'jquery-timepicker-addon': {
            deps: ['jquery-ui']
        },
        'jquery-timepicker-addon-i18n': {
            deps: ['jquery-timepicker-addon']
        }
    },

    // Debug mode
    urlArgs: "v=" +  (new Date()).getTime()
});

require(
    ['jquery', 'backbone', 'app/router.js'],
    function ($, Backbone, Router) {
        var router = new Router();

        $("body").on("click", ".back-button", function (event) {
            event.preventDefault();
            window.history.back();
        });

        Backbone.history.start();
    }
);
