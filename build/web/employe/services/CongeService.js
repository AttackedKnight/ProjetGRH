/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('EmployeModule').factory('Conge', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.conge');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.conge/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.conge', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.conge/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.conge/' + item.id, item);
        }
    };
});

