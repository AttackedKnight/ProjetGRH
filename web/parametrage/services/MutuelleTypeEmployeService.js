/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('MutuelleTypeEmploye', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesantetypeemploye');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesantetypeemploye/' + id);
        },
        findByMutuelleSante: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesantetypeemploye/mutuellesante/' + id);
        },
        findByType: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.mutuellesantetypeemploye/type/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.mutuellesantetypeemploye', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.mutuellesantetypeemploye/' + id);
        },
        deleteByMutuelleSanteAndTypeEmploye: function (item) {
            return $http.delete(chemin + '/webresources/sn.grh.mutuellesantetypeemploye/mutuellesante/' + item.mutuelle+'/typeemploye/'+item.typeemploye);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.mutuellesantetypeemploye/' + item.id, item);
        }
    };
});


