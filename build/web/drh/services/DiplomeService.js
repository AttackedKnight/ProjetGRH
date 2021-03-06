/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Diplome', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.diplome');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.diplome/' + id);
        },
        findByLibelle: function (nom) {
            return $http.get(chemin + '/webresources/sn.grh.diplome/nom/' + nom);
        },
        add: function (item) {
            alert('called');
            return $http.post(chemin + '/webresources/sn.grh.diplome', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.diplome/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.diplome/' + item.id, item);
        }
    };
});
