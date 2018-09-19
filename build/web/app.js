/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 
 * MODULE GLOBAL DE L'APPLICATION
 */
angular.module('globalModule', ['ngRoute', 'ngMessages', 'EmployeModule',
    'ngCookies', 'angularFileUpload', 'DrhModule', 'ParametrageModule', 'AuthentificationModule',
    'StatistiqueModule', 'ServiceModule', 'datatables', 'checklist-model']);

/*Sur serveur*/
//var chemin="https://10.157.20.203:8080/ProjetGRH"; 

/*En local:new port*/
//var chemin="http://localhost:33967/ProjetGRH";


var chemin = "/ProjetGRH";


