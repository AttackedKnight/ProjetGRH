/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Syndicat', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.syndicat');
        },
        findSyndicatPats: function () {
            return $http.get(chemin + '/webresources/sn.grh.syndicat/pats');
        },
        findSyndicatPer: function () {
            return $http.get(chemin + '/webresources/sn.grh.syndicat/per');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.syndicat/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.syndicat', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.syndicat/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.syndicat/' + item.id, item);
        }
    };
});


