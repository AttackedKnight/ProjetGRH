/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('FonctionAnnexe', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.fonctionannexe');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.fonctionannexe/' + id);
        },
        findByLibelle: function (libelle) {
            return $http.get(chemin + '/webresources/sn.grh.fonctionannexe/libelle/' + libelle);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.fonctionannexe', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.fonctionannexe/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.fonctionannexe/' + item.id, item);
        }
    };
});
