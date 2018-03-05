
 //Visualiser les details d' groupe d'utilisateur
    
angular.module('ParametrageModule').controller('DetailAccesController',function($scope,Securite,Groupe,AccesGroupeTable,$routeParams)
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
       }).error(function(){
         dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue(acces)</div>');
       }); 
    }).error(function(){
        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue(groupe)</div>');
    });  
    
    
    $scope.controlForm=function(g){
        if(g.libelle==null || g.libelle==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            //Creer d'abord le groupe
            $scope.modifierGroupeEtAcces(g);
        }
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
          dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
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
