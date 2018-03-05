angular.module('DrhModule').controller('ConsulterEmployeFemmeController',function($scope,Servir,Securite,$rootScope){
     
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    
    if($rootScope.groupeUtilisateur.id==6){   
        Servir.findPatsFemme().success(function (data) {
            $scope.travailleurs=data;
           
            
         
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    if($rootScope.groupeUtilisateur.id==3){
        Servir.findPerFemme().success(function(data){
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
    
 
