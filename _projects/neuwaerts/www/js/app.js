// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('neuwaertsapp', ['ionic'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider){

      $stateProvider
          .state('tabs', {
            url: '/tabs',
            abstract: true,
            templateUrl: 'templates/navigation.html'
          })
          .state('tabs.home', {
            url: '/home',
            views: {
              'home-tab': {
                templateUrl: 'templates/neuwaerts.html',
                controller: 'ListCtrl'
              }
            }
          })
          .state('tabs.list', {
            url: '/list',
            views: {
              'list-tab': {
                templateUrl: 'templates/list.html',
                controller: 'ListCtrl'
              }
            }
          })
          .state('tabs.details', {
            url: '/list/:id',
            views: {
              'list-tab': {
                templateUrl: 'templates/details.html',
                controller: 'ListCtrl'
              }
            }
          })
      ;

      $urlRouterProvider.otherwise('/tabs/home');

    })

    .controller("ListCtrl", function( $scope, $http, $window, $state ){

      $scope.enableReorder = false;
      $scope.enableDelete = false;

      $scope.moveItem = function(user, $fromIndex, $toIndex) {
        $scope.data.splice($fromIndex, 1);
        $scope.data.splice($toIndex, 0, user);
      };

      $scope.deleteItem = function($index) {
        $scope.data.splice($index, 1);
      };

      $scope.toggleReorder = function(){
        $scope.enableReorder = !$scope.enableReorder;
        if($scope.enableReorder) {
          $scope.enableDelete = false;
        }
      };

      $scope.toggleFav = function(user){
        user.fav = !user.fav;
      };

      $scope.mailTo = function(user){
        $window.location.href = "mailto:" + user.email;
      };

      $scope.callTo = function(user){
        $window.location.href = "tel:" + user.telephone;
      };

      $scope.toggleDelete = function(){
        $scope.enableDelete = !$scope.enableDelete;
        if($scope.enableDelete) {
          $scope.enableReorder = false;
        }
      };

      $scope.doRefresh = function(){
        $scope.loadUsers();
        $scope.$broadcast('scroll.refreshComplete');
      };

      $scope.loadUsers = function(){
        $http.get("js/team.json").then(function(data){
          $scope.data = data.data;
          $scope.selectedID = $state.params.id;
        });
      };

      $scope.loadUsers();

    })

;