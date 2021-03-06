$(document).ready(function(){
  $('.carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    dots: true
  });
});





(function() {
    'use strict';

    angular
        .module('dogPark', ['ui.router','satellizer'])  // change dogPark for different projects, update index.html
        .config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){

            
            $locationProvider.html5Mode(true);

            $authProvider.facebook({
                clientId: '1047549625374955',   // App ID developers.facebook.com/apps
                name: 'facebook',
                url: 'https://doggydatesbackend.herokuapp.com/auth/facebook',
                authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                redirectUri: window.location.origin + '/',
                requiredUrlParams: ['display', 'scope'],
                scope: ['email'],
                scopeDelimiter: ',',
                display: 'popup',
                oauthType: '2.0',
                popupOptions: { width: 580, height: 400 }
            });

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '../partials/home.html',
                    controller: 'mainController',
                    controllerAs: 'vm'
                })

                .state('form', {
                    url: '/form',
                    templateUrl: '../partials/form.html',
                    controller: 'formController',
                    controllerAs: 'vm'
                })

                .state('park', {
                    url: '/park',
                    templateUrl: '../partials/park.html',
                    controller: 'parkController',
                    controllerAs: 'vm'
                })

        });

})();
