/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Enfant', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.enfant');
        },

        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.enfant/' + id);
        },
        findByEmploye: function (idEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.enfant/employe/' + idEmploye);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.enfant', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.enfant/' + id);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.enfant/' + item.id, item);
        },
        getLastEnfantAdded: function (idEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.enfant/last/employe/' + idEmploye);
        }
    };
});
