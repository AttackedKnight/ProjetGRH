
 //Visualiser les details d' groupe d'utilisateur
    
angular.module('ParametrageModule').controller('DetailAccesController',function($scope,$q,Securite,Groupe,$rootScope,AccesGroupeTable,$routeParams)
{
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
  
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    var id=$routeParams.id;
    Groupe.getGroupe(id).success(function (data){       
        $scope.groupe=data;
         var dialog = bootbox.dialog({
                            title: 'CHARGEMENT',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Chargement ...</span></p>'
                        });
        AccesGroupeTable.showGroupeAccess($scope.groupe).success(function (data){
            dialog.modal('hide');
            $scope.listeAcces=data;          
            
            /*Verifier s'il n'y a des mises  à jour à apporter avant d'afficher*/
            
            $scope.getTables();
            
       }).error(function(){
         dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue(acces)</div>');
       }); 
    }).error(function(){
        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue(groupe)</div>');
    });  
    
    /*Verifier qu'il n'y a pas de nouvelle table ajoutees entre temps:Si oui on les ajoute*/
    
    $scope.getTables=function(){
        Groupe.listerTable().success(function (data){
            
            $scope.tables=data;
            $scope.tables=($scope.tables).split("-");
            
            $scope.checkNewAcces();
        }).error(function(){
            alert('La récupperation des tables a échoué');
        });   
    }; 
    
    $scope.avoirAcces=function(nomTable){
        for(var i=0;i<$scope.listeAcces.length;i++){
            if($scope.listeAcces[i].nomTable==nomTable){ //Si un acces n'est pas  encore definie pour cette table
                return true;
            }
        }
        return false;
    };
    
    $scope.tableExiste=function(nomTable){
        for(var i=0;i<$scope.tables.length;i++){
            if($scope.tables[i]==nomTable){ //Si la table n'existe plus dans la base : on supprime les permissions qu'elle avait
                return true;
            }
        }
        return false;
    };
    
    
    var req_add=[];
    var req_sup=[];
    
    
                    
                    
    
    $scope.checkNewAcces=function(){
        /*Ajouter permissions pour les nouvelles tables*/
        
        for(var i=0;i<$scope.tables.length;i++){
            if(!$scope.avoirAcces($scope.tables[i])){ //Si un acces n'est pas  encore definie pour cette table
                
                $scope.accesTable={};
                
                $scope.accesTable.id="";
                $scope.accesTable.nomTable=$scope.tables[i];
                $scope.accesTable.ajouter=false;
                $scope.accesTable.modifier=false;
                $scope.accesTable.supprimer=false;
                $scope.accesTable.consulter=false;
                $scope.accesTable.lister=false;
                $scope.accesTable.groupe=$scope.groupe;
            
                
                var promise = AccesGroupeTable.newAccess($scope.accesTable);
                req_add.push(promise);
            }
            
        }
        /*Ajouter permissions pour les nouvelles tables*/
        
        /*Supprimer permissions pour les  tables qui n'existent plus*/
        
        for(var i=0;i<$scope.listeAcces.length;i++){
            if(!$scope.tableExiste($scope.listeAcces[i].nomTable)){ //Si un acces n'est pas  encore definie pour cette table
                $scope.supprimerAcces($scope.listeAcces[i]);
                
                var promise =AccesGroupeTable.deleteAccess($scope.listeAcces[i].id);
                req_sup.push(promise);
                //alert('Enlever les permission pour '+$scope.listeAcces[i].nomTable);
            }
        }
        
        /*Supprimer permissions pour les  tables qui n'existent plus*/
        
        $q.all(req_add).then(function (result){
            $q.all(req_sup).then(function (){
                AccesGroupeTable.showGroupeAccess($scope.groupe).success(function (data){
            
                    $scope.listeAcces=data;     
               }).error(function(){
                   alert('Erreur de récuperation de la liste des acces');
               }); 
            });
        });
    };
    
       
    $scope.supprimerAcces=function(a){
        AccesGroupeTable.deleteAccess(a.id).success(function (data){
       }).error(function(){
           alert('Une erreur est survenue lors de la suppression des permissions');
          
       });  
    };
            
    //Creer une permision pour un groupe(sur une table donnée)
    
    $scope.createAccess=function(a){
        AccesGroupeTable.newAccess(a).success(function (data){
       }).error(function(){
           alert('Une erreur est survenue lors de la creation des permissions');
          
       });  
    };
    
    
    /*Verifier qu'il n'y a pas de nouvelle table ajouter entre temps:Si oui on les ajoute*/
    
    $scope.controlForm=function(g){
        
        if(g.code==null || g.code==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            //Creer d'abord le groupe
            if(g.libelle==null || g.libelle==""){
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            }else{
                //Modifier d'abord le groupe
                $scope.modifierGroupeEtAcces(g);
            }
        }
        
//        if(g.libelle==null || g.libelle==""){
//            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
//        }else{
//            
//        }
    };
     
    $scope.modifierGroupeEtAcces=function(groupe){
         var dialog = bootbox.dialog({
                            title: 'MODIFICATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Modification ...</span></p>'
                        });
         Groupe.editGroupe(groupe).success(function (data){
            //parcourir la liste des acces pour les mettre a jour         
            for(i=0;i<$scope.listeAcces.length;i++){
                $scope.editAccess($scope.listeAcces[i]);
            }
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Modification effetuee avec succes</div>');
            document.location.href ='#/parametrage/groupe/show';
       }).error(function(){
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
       });
     };
    
    $scope.editAccess=function(a){
        AccesGroupeTable.editAccess(a).success(function (data){
       }).error(function(){
          alert('Une erreur est survenue');
       });  
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
});
