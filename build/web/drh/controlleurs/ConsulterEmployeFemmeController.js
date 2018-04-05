angular.module('DrhModule').controller('ConsulterEmployeFemmeController',function($scope,$routeParams,Servir,Securite,$rootScope){
     
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    
    
    
    $scope.getPerFemme=function(){
        Servir.findPerFemme().success(function(data){
            $scope.travailleurs=data;
        }).error(function(){
            alert('une erreur est survenue');
        });
    };
    $scope.getPatsFemme=function(){
        Servir.findPatsFemme().success(function (data) {
            $scope.travailleurs=data;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    if($rootScope.groupeUtilisateur.code=='PATS_AD'){   
        $scope.getPatsFemme();
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD'){
        $scope.getPerFemme();
    }
    
    if($rootScope.groupeUtilisateur.code=='DRH_AD'){
        if($routeParams.type==1){
            $scope.getPerFemme();
        }
        if($routeParams.type==0){
            $scope.getPatsFemme();
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
    
 
