'use strict';

/**
 * @ngdoc function
 * @name composeUiApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the composeUiApp
 */
angular.module('composeUiApp')
  .controller('HomeCtrl', function ($scope, $resource) {

    var Host = $resource('api/v1/host');
    var Authentication = $resource('api/v1/authentication');

    var label = 'local Unix socket';

    $scope.unixSocket = label;

    Host.get(function (data) {
      alertify.success('Docker Host: ' + (data.host || label));
      $scope.dockerHost = data.host;
    });

    $scope.select = function ($event, host) {
      if (host === undefined) {
        $event.preventDefault();
      }
      alertify.success('set Docker Host: ' + (host || label));
      Host.save({id:host || null});
      $scope.dockerHost = host;
    };

    Authentication.get(function (data) {
      $scope.authentication = data.enabled;
    });

    $scope.disableAuthentication = function () {
      Authentication.remove(function (data) {
        $scope.authentication = data.enabled;
        alertify.success('basic authentication disabled');
      });
    };

    $scope.setCredentials = function (username, password) {
      Authentication.save({
        username: username,
        password: password
      }, function (data) {
        $scope.authentication = data.enabled;
        alertify.success('enabled authentication for user ' + username);
      });
    };

  });
