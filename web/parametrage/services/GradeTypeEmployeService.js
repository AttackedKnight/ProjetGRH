/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('GradeTypeEmploye', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.gradetypeemploye');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.gradetypeemploye/' + id);
        },
        findByGrade: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.gradetypeemploye/grade/' + id);
        },
        findByType: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.gradetypeemploye/type/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.gradetypeemploye', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.gradetypeemploye/' + id);
        },
        deleteByGradeAndTypeEmploye: function (item) {
            return $http.delete(chemin + '/webresources/sn.grh.gradetypeemploye/grade/' + item.grade+'/typeemploye/'+item.typeemploye);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.gradetypeemploye/' + item.id, item);
        }
    };
});


