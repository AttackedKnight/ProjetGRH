/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ParametrageModule').controller('EntiteController',function($scope,Securite,Entite,TypeEntite){
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    $scope.entites=[];
    $scope.entite={id:""};
    
    
    TypeEntite.findAll().success(function (data) {
        $scope.typeentites=data;
    }).error(function () {
        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
    });
    
    $scope.controlForm=function(c){
        if(c.nom==null || c.nom==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            if(c.adresse==null || c.adresse==""){
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            }else{
                if(c.telephone==null || c.telephone==""){
                    $("div.requis").eq(2).show("slow").delay(3000).hide("slow");
                }else{
                    if(c.email==null || c.email==""){
                        $("div.requis").eq(3).show("slow").delay(3000).hide("slow");
                    }else{
                        if(c.typeEntite==null){
                            $("div.requis").eq(4).show("slow").delay(3000).hide("slow");
                        }else{
                            $scope.add(c);
                        }
                        
                    }
                }
            }
        }
        
    };
    
    $scope.add=function(c){
        var dialog = bootbox.dialog({
                            title: 'CREATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Création ...</span></p>'
                        });
        Entite.add(c).success(function(){
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Creation effetuee avec succes</div>');
            $scope.findAll();
            $scope.entite = {id:""};
       }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue:creation</div>');
       });
    };
      
    $scope.findAll=function(){
       var dialog = bootbox.dialog({
                            title: 'CHARGEMENT',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Chargement ...</span></p>'
                        });
      Entite.findAll().success(function (data) {
             dialog.modal('hide');
            $scope.entites=data;
      }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue:creation</div>');
      });          
    };

    $scope.findAll();
     
    
   

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
                                    
                    Entite.delete(item.id).success(function () {
                        dialog.modal('hide');
                        $scope.findAll();
                    }).error(function(){
                       dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
                    });
                }
            }
        });
        
        
      };
      
});

