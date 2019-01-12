/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('ServiceModule').factory('Absence', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.absence');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absence/' + id);
        },
        findByEntite: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absence/entite/' + id);
        },
        findByEmploye: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absence/employe/' + id);
        },
        findAbsenceAccepteByEmploye: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absence/acceptee/employe/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.absence', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.absence/' + id);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.absence/' + item.id, item);
        },
        getDernierConge: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absence/dernierconge/employe/' + id);
        },
        getAbsenceDeductible: function (id,dateRef) {
            dateRef = new Date(dateRef);
            var dateString = dateRef.getFullYear()+'-'+(dateRef.getMonth()+1)+'-'+dateRef.getDate(); //Passe la date sous format string pour le passe en parametre a la methode get
            return $http.get(chemin + '/webresources/sn.grh.absence/absencedeductible/employe/' + id +'/datereference/'+dateString);
        },
        findAbsenceAccepteByEntite: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.absence/acceptee/entite/' + id);
        }
    };
});