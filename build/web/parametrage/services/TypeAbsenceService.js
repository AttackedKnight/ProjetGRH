/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Typeabsence', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.typeabsence');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.typeabsence/' + id);
        },
        findByLibelle: function (lib) {
            return $http.get(chemin + '/webresources/sn.grh.typeabsence/libelle/' + lib);
        },
        findByCode: function (lib) {
            return $http.get(chemin + '/webresources/sn.grh.typeabsence/code/' + cd);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.typeabsence', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.typeabsence/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.typeabsence/' + item.id, item);
        }
    };
});


