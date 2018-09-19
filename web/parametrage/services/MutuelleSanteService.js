/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('MutuelleSante', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesante');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesante/' + id);
        },
        findByLibelle: function (lib) {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesante/libelle/' + lib);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.mutuellesante', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.mutuellesante/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.mutuellesante/' + item.id, item);
        }
    };
});


