'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'library-app',
    environment,
    rootURL: '',
    locationType: 'hash',
    firebase: {
      apiKey: "AIzaSyDXyoqhQt3BmN9upKj15CB_rPzUC4Xj6d8",
      authDomain: "library-app-45e08.firebaseapp.com",
      databaseURL: "https://library-app-45e08.firebaseio.com",
      projectId: "library-app-45e08",
      storageBucket: "library-app-45e08.appspot.com",
      messagingSenderId: "76937989489"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {

    // We need this for activating Faker in production environment.
    ENV['ember-faker'] = {
      enabled: true
    };
  }

  return ENV;
};
