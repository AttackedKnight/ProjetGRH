/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('globalModule').factory('SessionCheck', function ($rootScope,$interval) {
    var SessionCheck = {       
        response: function(response) {
            if(angular.isDefined($rootScope.checkSession) && $rootScope.checkSession != null){
                $interval.cancel($rootScope.checkConnected);
                $rootScope.checkConnected=$interval($rootScope.checkSession,70000); 
            }          
            return response;       
        }
    };
    return SessionCheck;
});
angular.module('globalModule').config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('SessionCheck');
}]);