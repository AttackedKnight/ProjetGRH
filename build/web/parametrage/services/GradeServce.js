/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Grade', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.grade');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.grade/' + id);
        },
        findGradePer: function () {
            return $http.get(chemin + '/webresources/sn.grh.grade/per');
        },
        findPerCorps: function (corps) {
            return $http.get(chemin + '/webresources/sn.grh.grade/per/corps/' + corps);
        },
        findPerCorpsClasse: function (corps, classe) {
            return $http.get(chemin + '/webresources/sn.grh.grade/per/corps/' + corps + '/classe/' + classe);
        },
        compterPerClasseCorps: function (corps) {
            return $http.get(chemin + '/webresources/sn.grh.grade/per/classe/corps/' + corps);
        },
        findGradePats: function () {
            return $http.get(chemin + '/webresources/sn.grh.grade/pats');
        },
        findPatsClasse: function (classe) {
            return $http.get(chemin + '/webresources/sn.grh.grade/pats/classe/' + classe);
        },
        findPatsClasseEtCategorie: function (classe, categorie) {
            return $http.get(chemin + '/webresources/sn.grh.grade/pats/classe/' + classe + '/categorie/' + categorie);
        },
        findPatsClasseEtCategorieEtNiveau: function (classe, categorie, niveau) {
            return $http.get(chemin + '/webresources/sn.grh.grade/pats/classe' + classe + '/categorie/' + categorie + '/niveau/' + niveau);
        },
        compterPatsCategorieClasse: function (classe) {
            return $http.get(chemin + '/webresources/sn.grh.grade/pats/categorie/classe/' + classe);
        },
        compterPatsNiveauClasse: function (classe) {
            return $http.get(chemin + '/webresources/sn.grh.grade/pats/niveau/classe/' + classe);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.grade', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.grade/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.grade/' + item.id, item);
        }
    };
});
