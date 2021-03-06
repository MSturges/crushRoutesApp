(function() {
  'use strict';

  angular.module('app')
  .service('LoginService', LoginService)

  LoginService.$inject = [
    '$log',
    '$q',
    '$http',
    '$window',
    'HostService'
  ];

  function LoginService ($log, $q, $http, $window, HostService) {

    this.userLogin = function(loginObject) {
      var deferred = $q.defer();
      $http.post( 'http://Max-Sturges.local:3000' + '/auth/login', loginObject)
      .then(function (response) {
        if (response.data.error) {
          deferred.reject(response.data.error);
        } else if(response.data.token && response.data.user){
          $window.localStorage.setItem('token', response.data.token);
          $window.localStorage.setItem('user', JSON.stringify(response.data.user));
          deferred.resolve(response);
        }
      })
      .catch(function(err){
        deferred.reject(err)
      })
      return deferred.promise
    }




  }
}())
