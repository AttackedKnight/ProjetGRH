angular.module('DrhModule').controller('ConsulterEmployeHommeController',function($scope,Securite,Servir,$rootScope){
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
       if($rootScope.groupeUtilisateur.code=='PATS_AD'){
        Servir.findPatsHomme().success(function (data) {
            $scope.travailleurs=data;
            
         
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD'){
        Servir.findPerHomme().success(function(data){
            $scope.travailleurs=data;
        }).error(function(){
            alert('une erreur est survenue');
        });
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
    
 


