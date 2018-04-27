/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule',['ngRoute','ngMessages'])
.config(function ($routeProvider){
    $routeProvider.when('/parametrage/statistique',{
        templateUrl:'parametrage/statistique.html',
        controller: 'AccesController'
    }).when('/parametrage/groupe/new',{
        templateUrl: 'parametrage/groupe/new.html',
        controller: 'AccesController'
    }).when('/parametrage/groupe/show',{
        templateUrl: 'parametrage/groupe/show.html',
        controller: 'AccesController'
    }).when('/parametrage/groupe/show/:id',{
        templateUrl: 'parametrage/groupe/detail.html',
        controller: 'DetailAccesController'
    }).when('/parametrage/groupe/edit/:id',{
        templateUrl: 'parametrage/groupe/edit.html',
        controller: 'DetailAccesController'
    }).when('/parametrage/utilisateur/new',{
        templateUrl: 'parametrage/utilisateur/new.html',
        controller: 'UtilisateurController'
    }).when('/parametrage/utilisateur/show',{
        templateUrl: 'parametrage/utilisateur/show.html',
        controller: 'UtilisateurController'
    }).when('/parametrage/utilisateur/show/:id',{
        templateUrl: 'parametrage/utilisateur/detail.html',
        controller: 'DetailUtilisateurController'
    }).when('/parametrage/utilisateur/edit/:id',{
        templateUrl: 'parametrage/utilisateur/edit.html',
        controller: 'DetailUtilisateurController'
    }).when('/parametrage/civilite',{
        templateUrl: 'parametrage/civilite/civilite.html',
        controller: 'CiviliteController'
    }).when('/parametrage/fonction',{
        templateUrl: 'parametrage/fonction/fonction.html',
        controller: 'FonctionController'
    }).when('/parametrage/entite/new',{
        templateUrl: 'parametrage/entite/new.html',
        controller: 'EntiteController'
    }).when('/parametrage/entite/show',{
        templateUrl: 'parametrage/entite/show.html',
        controller: 'EntiteController'
    }).when('/parametrage/entite/show/:id',{
        templateUrl: 'parametrage/entite/detail.html',
        controller: 'DetailEntiteController'
    }).when('/parametrage/entite/edit/:id',{
        templateUrl: 'parametrage/entite/edit.html',
        controller: 'DetailEntiteController'
    }).when('/parametrage/typeentite',{
        templateUrl: 'parametrage/typeEntite/typeEntite.html',
        controller: 'TypeEntiteController'
    }).when('/parametrage/situationmatrimoniale',{
        templateUrl: 'parametrage/situation/situation.html',
        controller: 'SituationMatrimonialeController'
    }).when('/parametrage/syndicat',{
        templateUrl: 'parametrage/syndicat/syndicat.html',
        controller: 'SyndicatController'
    }).when('/parametrage/mutuelledesante',{
        templateUrl: 'parametrage/mutuelle/mutuelle.html',
        controller: 'MutuelleSanteController'
    }).when('/parametrage/autorisationabsence',{
        templateUrl: 'parametrage/autorisationAbsence/typeAutorisation.html',
        controller: 'TypeAutorisationController'
    }).when('/parametrage/typeavancement',{
        templateUrl: 'parametrage/typeAvancement/typeAvancement.html',
        controller: 'TypeAvancementController'
    }).when('/parametrage/typeemploye',{
        templateUrl: 'parametrage/typeEmploye/typeEmploye.html',
        controller: 'TypeEmployeController'
    }).when('/parametrage/typedocument',{
        templateUrl: 'parametrage/typeDocument/typeDocument.html',
        controller: 'TypeDocumentController'
    }).when('/parametrage/typecontrat',{
        templateUrl: 'parametrage/typeContrat/typeContrat.html',
        controller: 'TypeContratController'
     }).when('/parametrage/typepermission',{
        templateUrl: 'parametrage/typePermission/typePermission.html',
        controller: 'TypePermissionController'                   
    }).when('/parametrage/corps',{
        templateUrl: 'parametrage/corps/corps.html',
        controller: 'CorpsController'                   
    }).when('/parametrage/classe',{
        templateUrl: 'parametrage/classe/classe.html',
        controller: 'ClasseController'                   
    }).when('/parametrage/categorie',{
        templateUrl: 'parametrage/categorie/categorie.html',
        controller: 'CategorieController'                   
    }).when('/parametrage/niveau',{
        templateUrl: 'parametrage/niveau/niveau.html',
        controller: 'NiveauController'                   
    }).when('/parametrage/echelon',{
        templateUrl: 'parametrage/echelon/echelon.html',
        controller: 'EchelonController'                   
    }).when('/parametrage/grade',{
        templateUrl: 'parametrage/grade/grade.html',
        controller: 'GradeController'                   
    }).otherwise('/');
});
