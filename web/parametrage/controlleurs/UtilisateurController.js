/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('UtilisateurController',function($scope,Securite,Utilisateur,Servir,Entite,Groupe)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
    
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    $scope.groupes=[];
    $scope.entites=[];
    
    
    $scope.utilisateurs=[];
    $scope.utilisateur={id:""};
    $scope.UtilisateurCourant={};
    
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
    
    //Trouver l'entite dans laquelle se trouve actuellement un employe
    
    $scope.getEntiteEmploye=function(id){
        Servir.findEntiteEmploye(id).success(function (data){
            return data.nom;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    //Recuperer les comptes d'utilisateur
    
    $scope.getComptes=function(){
        var dialog = bootbox.dialog({
                            title: 'CHARGEMENT',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Chargement ...</span></p>'
                        });
       Utilisateur.getComptes().success(function (data){
           dialog.modal('hide');
           $scope.utilisateurs=data;
           if($scope.utilisateurs.length==0){
               $('.box-body').html('<span style="font-size: 1.2em; color: green; font-weight: bold;">Vous n\'avez pas crée de compte pour le moment</span>');
           }
       }).error(function(){
           dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
       });  
    };
    $scope.getComptes();
   
    
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
                        $scope.creerCompteUtilisateur(c);
                    }
                }
            }
        }
        
    };

    
    $scope.creerCompteUtilisateur=function(c){
        
        var dialog = bootbox.dialog({
                            title: 'CREATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Création ...</span></p>'
                        });
       Utilisateur.createCompte(c).success(function (data){
           dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Creation effetuee avec succes</div>');
           $scope.getComptes();
           $scope.utilisateur={id:""};             
       }).error(function(){
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue:creation</div>');
       });  
    };
    

    $scope.supprimerCompteUtilisateur=function(compte){
        
        bootbox.confirm({
            title: "Suppression !",
            message: "Voulez vous supprimer l'élement",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Annuler'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirmer'
                }
            },
            callback: function (result) {
                if(result==true){
                    var dialog = bootbox.dialog({
                                        title: 'SUPPRESSION',
                                        message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Suppression ...</span></p>'
                                    });
                    Utilisateur.deleteCompte(compte.id).success(function (data){
                        dialog.modal('hide');
                        $scope.getComptes();
                   }).error(function(){
                       dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
                   });
                }
            }
        });
        
        
    };
});