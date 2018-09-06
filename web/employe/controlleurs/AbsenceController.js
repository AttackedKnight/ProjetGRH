/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('EmployeModule').controller('AbsenceController', function ($scope, Securite)
{


    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */



    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */


});