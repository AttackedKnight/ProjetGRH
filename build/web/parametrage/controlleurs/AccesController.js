/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('AccesController',function($scope,Securite,Groupe,AccesGroupeTable)
{
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
    
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    
    $scope.groupes=[];
    $scope.groupe={id:""};
    $scope.groupeCree={};
    
    
    $scope.listeAcces=[];
    $scope.accesTable={};
    
    //Recuperer les groupes d'utilisateur existants
    
    $scope.getGroupes=function(){
        var dialog = bootbox.dialog({
                            title: 'CHARGEMENT',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Chargement ...</span></p>'
                        });
       Groupe.getGroupes().success(function (data){
           dialog.modal('hide');
           $scope.groupes=data;
           if($scope.groupes.length==0){
               $('.box-body').html('<span  style="font-size: 1.2em; color: green;  font-weight: bold;">Aucun groupe cree pour le moment</span>');
           }
       }).error(function(){
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
       });  
    };
    $scope.getGroupes();
    
   
    
    //Creer un nouveau groupe d'utilisateur
    
    $scope.createGroupe=function(groupe){
       var dialog = bootbox.dialog({
                            title: 'CREATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Création ...</span></p>'
                        });
       Groupe.newGroupe(groupe).success(function (data){
           $scope.getGroupes();
           $scope.groupe={id:""};
           
           //Recuperation du groupe nouvellement crée
           Groupe.getLastGroupe().success(function (data){
                $scope.groupeCree=data;
                
                //parcourir la liste des acces et inserer chaque ligne dans la base de données         
                for(i=0;i<$scope.listeAcces.length;i++){
                    $scope.listeAcces[i].groupe=$scope.groupeCree;
                    $scope.createAccess($scope.listeAcces[i]);
                }
                
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Creation effetuee avec succes</div>');
                
                //Réinitialiser la liste des acces et l'objet groupeCree crée
                $scope.groupeCree={};
                $scope.listeAcces=[];
                construireListeAcces();
                
           }).error(function(){
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue lors de la création des acces</div>');
           });  
       }).error(function(){
           dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
       });  
    };
    
    
    
    
    //Recuperer les noms de table de la base de donnees:pour la creation du formulaire
    
    $scope.getTables=function(){
        $scope.tables=Groupe.listeTable();  
    }; 
    $scope.getTables();
    
    //Creer les objets AccesTable a afficher dans le formulaire(ligne du formulaire)
     
    function construireListeAcces(){
        for(i=0;i<$scope.tables.length;i++){
            $scope.accesTable.id="";
            $scope.accesTable.nomTable=$scope.tables[i];
            $scope.accesTable.ajouter=false;
            $scope.accesTable.modifier=false;
            $scope.accesTable.supprimer=false;
            $scope.accesTable.consulter=false;
            $scope.accesTable.lister=false;
            
            $scope.listeAcces.push($scope.accesTable);
            $scope.accesTable={};
        }
    }  
    construireListeAcces();
    
    //Creer une permision pour un groupe(sur une table donnée)
    
    $scope.createAccess=function(a){
        AccesGroupeTable.newAccess(a).success(function (data){
       }).error(function(){
           dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>La création de l\'acces a echoué</div>');
          
       });  
    };
    
    //Creation du groupe
    $scope.creerGroupeEtAcces=function(nouvelGroupe){

        g=nouvelGroupe;
        if(g.libelle==null || g.libelle==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            //Creer d'abord le groupe
            $scope.createGroupe(g);
        }
        
        
    };
    
    $scope.cocherAjouter=function(){
        for(i=0;i<$scope.listeAcces.length;i++){
            $scope.listeAcces[i].ajouter=$scope.a;
        }
    };
    
    $scope.cocherSupprimer=function(){
        for(i=0;i<$scope.listeAcces.length;i++){
            $scope.listeAcces[i].supprimer=$scope.s;
        }
    };
    
    $scope.cocherModifier=function(){
        for(i=0;i<$scope.listeAcces.length;i++){
            $scope.listeAcces[i].modifier=$scope.m;
        }
    };
    
    $scope.cocherLister=function(){
        for(i=0;i<$scope.listeAcces.length;i++){
            $scope.listeAcces[i].lister=$scope.l;
        }
    };
    
    $scope.cocherConsulter=function(){
        for(i=0;i<$scope.listeAcces.length;i++){
            $scope.listeAcces[i].consulter=$scope.c;
        }
    };
    
    $scope.activer=function(e,etat){

        e.ajouter= e.supprimer= e.consulter= e.modifier= e.lister=etat;
    };
    
    $scope.supprimerGroupe=function(groupe){
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
                    //On recupere d'abord les acces de ce groupe dans la table accesgroupe pour les supprimer
                    AccesGroupeTable.showGroupeAccess(groupe).success(function (data){
                        for(i=0;i<data.length;i++){
                            AccesGroupeTable.deleteAccess(data[i].id);
                        }
                        //On supprime le groupe
                        Groupe.deleteGroupe(groupe.id).success(function (data){                           
                            $scope.getGroupes();
                            dialog.modal('hide');
                       }).error(function(){
                           dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
                       });

                   }).error(function(){
                       dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Les acces du groupe n\'ont pas pu etre supprimer</div>');
                      
                   });
                }
            }
        });
        
    };
});