/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterEmployeController',function($scope,$rootScope,Securite,Servir,$routeParams)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    
    
    $scope.getPer=function(){
        Servir.findPer().success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.getPats=function(){
        Servir.findPats().success(function (data) {
            $scope.travailleurs=data;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.getAll=function(){
        Servir.findPerAndPats().success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    if($rootScope.groupeUtilisateur.code=='PATS_AD'){
        $scope.getPats();
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD'){
        $scope.getPer();
    }
    
    if($rootScope.groupeUtilisateur.code=='DRH_AD'){
        
        
        if($routeParams.type==1){
            $scope.getPer();
        }
        else if($routeParams.type==0){
            $scope.getPats();
        }
        else{
            $scope.getAll();
        }
        
         
    }
    (function datatable() {

        if($('#example1 tr').length>0){
            setTimeout(function(){ 
                $('#example1').dataTable({
                "bPaginate": true,
                "bLengthChange": true,
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
              });        
            }, 2000);
             
        }
        
    })();
    
   
});

