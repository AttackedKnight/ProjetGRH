/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Conjoint', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.conjoint');
        },

        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.conjoint/' + id);
        },
        findByEmploye: function (idEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.conjoint/employe/' + idEmploye);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.conjoint', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.conjoint/' + id);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.conjoint/' + item.id, item);
        },
        getLastConjointAdded: function (idEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.conjoint/last/employe/' + idEmploye);
        }
    };
});
