/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Employe', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.employe');
        },

        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.employe/' + id);
        },
        findByNin: function (numeroCni) {
            return $http.get(chemin + '/webresources/sn.grh.employe/nin/' + numeroCni);
        },
        checkcni: function (numeroCni) {
            return $http.get(chemin + '/webresources/sn.grh.employe/checkcni/' + numeroCni);
        },
        checkmatricule: function (matriculeInterne) {
            var matriculeInt= matriculeInterne.replace("/","-");
            return $http.get(chemin + '/webresources/sn.grh.employe/checkmatricule/'+matriculeInt);
        },
        checkmatriculemd: function (matriculeMainDoeuvre) {
            return $http.get(chemin + '/webresources/sn.grh.employe/checkmatriculemd/' + matriculeMainDoeuvre);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.employe', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.employe/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.employe/' + item.id, item);
        }
    };
});
