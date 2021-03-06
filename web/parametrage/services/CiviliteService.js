/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Civilite', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.civilite');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.civilite/' + id);
        },
        findByGenreAndSituation: function (genre,situation) {
            if(situation != '')
                return $http.get(chemin + '/webresources/sn.grh.civilite/genre/' + genre+'/situation/'+situation);
            else
                return $http.get(chemin + '/webresources/sn.grh.civilite/genre/' + genre);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.civilite', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.civilite/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.civilite/' + item.id, item);
        }
    };
});
