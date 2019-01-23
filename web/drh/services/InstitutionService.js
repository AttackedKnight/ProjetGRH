/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Institution', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.institution');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.institution/' + id);
        },
        findLast: function () {
            return $http.get(chemin + '/webresources/sn.grh.institution/last');
        },
        findByNom: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.institution/nom/' + e);
        },
        findByAdresse: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.institution/' + e);
        },
        findByTelephone: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.institution/' + e);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.institution', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.institution/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.institution/' + item.id, item);
        }
    };
});
