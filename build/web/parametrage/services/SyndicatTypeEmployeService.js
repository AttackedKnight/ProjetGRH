/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('SyndicatTypeEmploye', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.syndicattypeemploye');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.syndicattypeemploye/' + id);
        },
        findBySyndicat: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.syndicattypeemploye/syndicat/' + id);
        },
        findByType: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.syndicattypeemploye/type/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.syndicattypeemploye', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.syndicattypeemploye/' + id);
        },
        deleteBySyndicatAndTypeEmploye: function (item) {
            return $http.delete(chemin + '/webresources/sn.grh.syndicattypeemploye/syndicat/' + item.syndicat+'/typeemploye/'+item.typeemploye);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.syndicattypeemploye/' + item.id, item);
        }
    };
});


