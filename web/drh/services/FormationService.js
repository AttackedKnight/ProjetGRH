/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Formation', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.formation');
        },
        findAllEmployeFormation: function (item) {
            return $http.get(chemin + '/webresources/sn.grh.formation/employe/' + item.id);
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.formation/' + id);
        },
        findByEmploye: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.formation/employe/' + e.id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.formation', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.formation/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.formation/' + item.id, item);
        }
    };
});

