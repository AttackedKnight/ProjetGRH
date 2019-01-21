/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('AbsenceTypeEmploye', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.absencetypeemploye');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absencetypeemploye/' + id);
        },
        findByAbsence: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absencetypeemploye/absence/' + id);
        },
        findByType: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absencetypeemploye/type/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.absencetypeemploye', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.absencetypeemploye/' + id);
        },
        deleteByAbsenceAndTypeEmploye: function (item) {
            return $http.delete(chemin + '/webresources/sn.grh.absencetypeemploye/typeabsence/' + item.typeAbsence+'/typeemploye/'+item.typeemploye);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.absencetypeemploye/' + item.id, item);
        }
    };
});


