/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('DrhDetailEntiteController',function($scope,$q,Securite,Entite,TypeEntite,Servir,Employe)
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
    
    $scope.filles=[];
    
    $scope.getEntitesFille=function(){       
        var filles=[];
        for(var i=0;i<$scope.entites.length;i++){
            if($scope.estEnfant($scope.entites[i],$scope.entite)==true){
                filles.push($scope.entites[i]);
            }
        }    
        return filles;
    };
    
    $scope.estEnfant=function(entite,parent){        
        var e=entite;
        var b=false;
        while(e !=null){
            if(e.id==parent.id){
                b=true;
                break;
            }          
            e=e.entite;
        }
        return b;
    };
    
    $scope.VoirDetails=function(e){
        $scope.entite=e;       
        $scope.filles=$scope.getEntitesFille();
        
        var req_tab=[];
        var cumul=0;
        Servir.findResponsableEntite(e).success(function (data){
            
            for(var j=0;j<$scope.filles.length;j++){
                req_tab.push(Servir.countEmploye($scope.filles[j]));
            }
            $q.all(req_tab).then(function (result){ 
                for(var i=0;i<result.length;i++)
                {
                    cumul+=parseInt(result[i].data);
                }
                $scope.effectif=cumul;
            });

            $scope.responsable=data;
            
            if($scope.responsable){
                
                $scope.prenomNom=$scope.responsable.employe.civilite.code+' '+$scope.responsable.employe.prenom +' '+($scope.responsable.employe.nom).toUpperCase();
            }
            
        }).error(function () {
           alert('Une erreur est survenue');
             
        });
        
        
    };
   
});
