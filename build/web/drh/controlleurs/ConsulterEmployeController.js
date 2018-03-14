/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterEmployeController',function($scope,$rootScope,Securite,Servir)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    if($rootScope.groupeUtilisateur.code=='PATS_AD'){
        Servir.findPats().success(function (data) {
            $scope.travailleurs=data;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD'){
        Servir.findPer().success(function (data) {
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
                "bLengthChange": true,
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
              });        
            }, 2000);
             
        }
        
    })();
    
    $scope.critereTri="nom";    
    $scope.ordreTri=false;
    
//    $scope.critereTri=function(){
//        alert($scope.critereTri);
//    };

    
//    $('table').one('mouseenter',function(){
//        $('#example1').dataTable({
//          "bPaginate": true,
//          "bLengthChange": false,
//          "bFilter": false,
//          "bSort": true,
//          "bInfo": true,
//          "bAutoWidth": false
//        });
//    });
//    
    
//    $('#dlh').click(function (){
//        $('#example1').dataTable({
//          "bPaginate": true,
//          "bLengthChange": false,
//          "bFilter": false,
//          "bSort": true,
//          "bInfo": true,
//          "bAutoWidth": false
//        });
//    });
});

