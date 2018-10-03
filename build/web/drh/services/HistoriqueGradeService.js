/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('HistoriqueGrade', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.historiquegrade', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.historiquegrade/' + id);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.historiquegrade/' + item.id, item);
        },
        findAvancement: function (types) {
            /*RECUPERER LES INFORMATIONS SUR LES AVANCEMENTS DES EMPLOYES DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/avancement/typeemploye/' + types); /*ok*/
        },
        findAvancementFemme: function (types) {
            /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE FEMININ DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/avancement/femme/typeemploye/' + types); /*ok*/
        },
        findAvancementHomme: function (types) {
            /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE MASCULIN DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/avancement/homme/typeemploye/' + types); /*ok*/
        },
        findAvancementEntite: function (typeEmploye, idEntite) {
            /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/avancement/entite/'+idEntite+'/typeemploye/' + typeEmploye);  //ok
        },
        findAvancementEntiteFemme: function (typeEmploye, idEntite) {
            /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE FEMININ D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/avancement/femme/entite/'+idEntite+'/typeemploye/' + typeEmploye);  //ok
        },
        findAvancementEntiteHomme: function (typeEmploye, idEntite) {
            /*RECUPERER LES INFORMATIONS SUR LE AVANCEMENTS DES EMPLOYES DE SEXE MASCULIN D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/avancement/homme/entite/'+idEntite+'/typeemploye/' + typeEmploye);  //ok
        },
        findByEmploye: function (e) {
            /*RECUPERER L'HISTORIAUE DES AVANCEMENTS D'UN EMPLOYE*/
            return $http.get(chemin + '/webresources/sn.grh.historiquegrade/employe/' + e.id);
        }
       
    };
});
