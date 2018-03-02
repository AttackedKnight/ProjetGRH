/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterEmployeEntiteController',function($scope,$routeParams,$rootScope,Securite,Servir)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    if($rootScope.groupeUtilisateur.id==6){
        Servir.findPatsEntite($routeParams.id).success(function (data) {
            $scope.travailleurs=data;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    if($rootScope.groupeUtilisateur.id==3){
        Servir.findPerEntite($routeParams.id).success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    
    (function datatable() {

        if($('#example1 tr').length>0){
            setTimeout(function(){ 
                $('#example1').dataTable({
                "bPaginate": true,
                "bLengthChange": false,
                "bFilter": false,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
              });        
            }, 2000);
             
        }
        
    })();

    
});

