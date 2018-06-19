
 //Visualiser les details d' groupe d'utilisateur
    
angular.module('ParametrageModule').controller('DetailUtilisateurController',function($scope,Servir,Securite,Utilisateur,Entite,Groupe,Utilisateur,$routeParams)
{
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    $scope.groupes=[];
    $scope.entites=[];
    
    var id=$routeParams.id;
    
    
    Entite.findAll().success(function (data) {           
        $scope.entites=data;
    }).error(function () {
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
    });
   
    Groupe.getGroupes().success(function (data){
        $scope.groupes=data;
    }).error(function(){
       dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
    });
    
    
    Utilisateur.getCompte(id).success(function (data){       
        $scope.utilisateur=data;
        $scope.prenomNom="";
        console.log($scope.utilisateur)
        if($scope.utilisateur.groupe.code!="EMP"){
            Servir.findResponsableEntite($scope.utilisateur.entite).success(function (data){ 
                if(data){                   
                    $scope.prenomNom=data.employe.civilite.code+' '+data.employe.prenom +' '+(data.employe.nom).toUpperCase();
                }
            }).error(function () {
               alert('Une erreur est survenue');

            });
        }
        
    }).error(function(){
        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
    });
    
    
    $scope.controlForm=function(c){
        if(c.entite==null){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            if(c.groupe==null){
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            }else{
                if(c.login==null || c.login==""){
                    $("div.requis").eq(2).show("slow").delay(3000).hide("slow");
                }else{
                    if(c.motDePasse==null || c.motDePasse==""){
                        $("div.requis").eq(3).show("slow").delay(3000).hide("slow");
                    }else{
                        c.email=c.entite.email;
                        $scope.modifierCompteUtilisateur(c);
                    }
                }
            }
        }
        
    };
     
    $scope.modifierCompteUtilisateur=function(compte){
         var dialog = bootbox.dialog({
                            title: 'MODIFICATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Modification ...</span></p>'
                        });
        Utilisateur.editCompte(compte).success(function (data){
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Modification effetuee avec succes</div>');
          document.location.href ='#/parametrage/utilisateur/show';
        }).error(function(){
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });
    };
    
});
