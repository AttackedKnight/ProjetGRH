/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Servir', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.servir');
        },
        findAllEmploye: function (typeEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.servir/typeemploye/'+typeEmploye);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.servir', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.servir/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.servir/' + item.id, item);
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.servir/' + id);
        },
        findEmploye: function (typeEmploye) {
            /*RECUPERER LES EMPLOYES DONT LE TYPE SE TROUVE DANS CEUX INDIQUES */
            return $http.get(chemin + '/webresources/sn.grh.servir/employeenservice/typeemploye/'+typeEmploye); //ok
        },
        findEmployeEntite: function (typeEmploye,id) {
            /*RECUPERER LES EMPLOYES D'UNE ENTITE DONT LE TYPE SE TROUVE DANS CEUX INDIQUES */
            return $http.get(chemin + '/webresources/sn.grh.servir/entite/' + id+'/typeemploye/'+typeEmploye); //ok
        }, 
        findByEmploye: function (e) {   
            /*Recuperer le parcours d'un employe : les entittes ou il a travaille*/
            return $http.get(chemin + '/webresources/sn.grh.servir/employe/' + e.id);
        },
        findResponsableEntite: function (entite) {
            /*Connaitre l'actuel responsable d'une entite*/
            return $http.get(chemin + '/webresources/sn.grh.servir/responsable/' + entite.id);
        },
        finirService: function (item) {
            /*Mettre fin aux fonctions d'un employe */
            return $http.put(chemin + '/webresources/sn.grh.servir/finservice/' + item.id, item);
        },
        enService: function (employe) {
            /*Verifie si l'employe est en service quelque part ou non*/
            return $http.get(chemin + '/webresources/sn.grh.servir/enservice/' + employe.id);
        },
        findEntiteEmploye: function (id) {
            /*RECUPERER L'ENTITE OU TRAVAILLE ACTUELLEMENT UN EMPLOYE*/
            return $http.get(chemin + '/webresources/sn.grh.servir/entite/employe/' + id);
        },
        countEmploye: function (entite) {
            /*CONNAITRE L'EFFECTIF DES EMPLOYES D'UNE ENTITE*/
            return $http.get(chemin + '/webresources/sn.grh.servir/effectif/' + entite.id);
        },
        findFonctionEmploye: function (id) {   
            /*Recuperer le parcours d'un employe : les entittes ou il a travaille*/
            return $http.get(chemin + '/webresources/sn.grh.servir/fonction/employe/' + id);
        },
        estPermanent: function (id) {   
            /*Verifier si l'employe est Permenant ou contractuel*/
            return $http.get(chemin + '/webresources/sn.grh.servir/statut/employe/' + id);
        },
        findLastByEmploye: function (id) {   
            /*Verifier si l'employe est Permenant ou contractuel*/
            return $http.get(chemin + '/webresources/sn.grh.servir/last/employe/' + id);
        },
        
        
    };
});
