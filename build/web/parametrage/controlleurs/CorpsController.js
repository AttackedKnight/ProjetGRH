/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('CorpsController',function($scope,Securite,Corps){
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    $scope.corps=[];
    $scope.unCorps={id:""};
    
    $scope.editForm=false;
    $scope.createForm=true;
    
    $scope.toggle=function (){
        $scope.editForm=!$scope.editForm;
        $scope.createForm=!$scope.createForm;
    };
    
    $scope.controlForm=function(c){
        if(c.libelle==null || c.libelle==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            if($scope.createForm==true){
                $scope.add(c);
            }
            else{
                $scope.edit(c);
            }
        }
    };
    
    $scope.add=function(s){
        var dialog = bootbox.dialog({
                            title: 'CREATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Création ...</span></p>'
                        });
      Corps.add(s).success(function(){
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Creation effetuee avec succes</div>'); 
                $scope.findAll();
           $scope.unCorps = {id:""};
           }).error(function () {
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });
      };
      
      $scope.findAll=function(){
          var dialog = bootbox.dialog({
                            title: 'CHARGEMENT',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Chargement ...</span></p>'
                        });
          Corps.findAll().success(function (data) {  
              dialog.modal('hide');
            $scope.corps=data;         
        }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });          
         };
         
         $scope.findAll();
         
      $scope.edit=function(item){
          var dialog = bootbox.dialog({
                            title: 'MODIFICATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Modification ...</span></p>'
                        });
            Corps.edit(item).success(function () {
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Modification effetuee avec succes</div>');
            $scope.findAll();
            $scope.unCorps = {id:""};
            $scope.toggle();
        }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });
      };
       $scope.findAll();

    $scope.setCurrent = function (unCorps) {
        $scope.unCorps = unCorps;
         $('.edit').attr('disabled','disabled');
        $scope.toggle();
    };
     $scope.annuler=function(){
        
        $('.btn').removeAttr('disabled');
        $('form').trigger("reset");
        $scope.toggle();
    };
      $scope.delete=function(item){
        
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
        
                    Corps.delete(item.id).success(function () {
                        dialog.modal('hide');
                        $scope.findAll();
                    }).error(function () {
                        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
                    });
        
                }
            }
      
      
      });
  };
        
});
