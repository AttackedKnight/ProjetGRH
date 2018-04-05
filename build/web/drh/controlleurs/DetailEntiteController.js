/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('DrhDetailEntiteController',function($scope,Securite,Entite,TypeEntite,Servir,Employe)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

     
   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
  
   
    
    Entite.findAll().success(function (data) {
        $scope.entites=data;
        $scope.VoirDetails($scope.entites[0]);
    }).error(function () {
        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue:creation</div>');
    });          
    
    
    
    TypeEntite.findAll().success(function (data) {
        $scope.typeentites=data;
    }).error(function () {
        alert('Une erreur est survenue');
    });          
    
    
    $scope.VoirDetails=function(e){
        $scope.entite=e;       
        Servir.findResponsableEntite(e).success(function (data){
            Servir.countEmploye(e).success(function (effectif) {
                $scope.effectif=effectif;
            }).error(function () {
                alert('Une erreur est survenue');
            });
            $scope.responsable=data;
            
            if($scope.responsable){
                
                $scope.prenomNom=$scope.responsable.employe.civilite.code+' '+$scope.responsable.employe.prenom +' '+($scope.responsable.employe.nom).toUpperCase();
            }
            
//             $('.les-entites').eq(0).trigger('click');
            
        }).error(function () {
           alert('Une erreur est survenue');
             
        });
        
        
    };
   
});
