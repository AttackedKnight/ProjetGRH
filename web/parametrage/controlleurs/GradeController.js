/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('GradeController',function($scope,$q,Securite,Grade,Classe,Corps,Avancement,Echelon,Niveau,Categorie){
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    $scope.initialiserGrade=function(){
        $scope.lignes=[];
        $scope.lignes.push({id:""});
    };
    $scope.initialiserGrade();
    
    $scope.typeGrade="pats";
    
    $scope.changerTypeGrade=function(){
       
        $scope.initialiserGrade();
        $scope.nouvelleLigne=true;
    };
    
    
    $scope.nouvelleLigne=true;
    $scope.ajouterLigne=function(){
        
        if($scope.lignes.length==4){
            $scope.nouvelleLigne=false;
        }
        else{
            $scope.lignes.push({id:""});
        }
    };
    
    $scope.classes=[];
    $scope.categories=[];
    $scope.corps=[];
    $scope.niveaux=[];
    $scope.echelons=[];
    $scope.typeavancements=[];
    
    Avancement.findAll().success(function (data) {        
        $scope.typeavancements=data;          
    }).error(function () {
        alert('Une erreur est survenue : type avancement');
    });
    
    Corps.findAll().success(function (data) {  
        $scope.corps=data;         
    }).error(function () {
        alert('Une erreur est survenue');
    });          
     
    Classe.findAll().success(function (data) {
        $scope.classes=data;
    }).error(function () {
        alert('Une erreur est survenue');
    });          
    
    Echelon.findAll().success(function (data) {
        $scope.echelons=data;          
    }).error(function () {
        alert('Une erreur est survenue');
    });          
       
    Niveau.findAll().success(function (data) {
        $scope.niveaux=data;
    }).error(function () {
        alert('Une erreur est survenue');
    });          
       

    Categorie.findAll().success(function (data) {
        $scope.categories=data;  
    }).error(function () {
        alert('Une erreur est survenue');
    }); 
    
    $scope.grades=[];  
    
    $scope.editForm=false;
    $scope.createForm=true;
    
    
    
    $scope.toggle=function (){
        $scope.editForm=!$scope.editForm;
        $scope.createForm=!$scope.createForm;
        $scope.nouvelleLigne=!$scope.nouvelleLigne;
             
    };
    
    $scope.controlForm=function(){
           
        var validite=true;
        console.log($scope.lignes)
        if($scope.createForm==true){
                       
            if($scope.typeGrade=="per"){
                for(var i=0;i<$scope.lignes.length;i++){
                    if($scope.lignes[i].corps==null){
                        $(".corps").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite=false;
                    }
                    if($scope.lignes[i].classe==null){
                         $(".classe").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                         validite=false;
                    }
                    if($scope.lignes[i].echelon==null){
                        $(".echelon").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite=false;
                    }
                }
            }
            if($scope.typeGrade=="pats" ){
                for(var i=0;i<$scope.lignes.length;i++){
                    if($scope.lignes[i].classe==null){
                         $(".classe").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                         validite=false;
                    }
                    if($scope.lignes[i].categorie==null){
                        $(".categorie").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite=false;
                    }
                    if($scope.lignes[i].niveau==null){
                        $(".niveau").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite=false;
                    }
                    if($scope.lignes[i].echelon==null){
                        $(".echelon").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite=false;
                    }
                    if($scope.lignes[i].typeAvancement==null){
                        $(".typeAvancement").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite=false;
                    }
                }

            }
        }
        
        $('#GradeForm input').each(function(e){
           if($(this).val()==="" ){
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite=false;
           }
        });

        if(validite===true){
            if($scope.createForm==true){
                $scope.add($scope.lignes);                
            }
            else{
                $scope.edit($scope.lignes[0]);
            }
        }
    };
    
    $scope.add=function(l){
        var req_tab=[];
        var dialog = bootbox.dialog({
                            title: 'CREATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Création ...</span></p>'
                        });
        for(var i=0;i<l.length;i++){
            req_tab.push(Grade.add(l[i]));
        }
        $q.all(req_tab).then(function(result){
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Creation effetuee avec succes</div>'); 
            $scope.findAll();
            $scope.initialiserGrade();
            
        });
      };
      
    $scope.findAll=function(){
          var dialog = bootbox.dialog({
                            title: 'CHARGEMENT',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Chargement ...</span></p>'
                        });
        Grade.findAll().success(function (data) {
            dialog.modal('hide');
            $scope.grades=data;
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
        Grade.edit(item).success(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Modification effetuee avec succes</div>');
            $scope.findAll();
            
            $scope.initialiserGrade();
            
            $scope.toggle();
        }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });
    };
     
    $scope.findAll();

    $scope.setCurrent = function (grade) {
        $scope.initialiserGrade();
        $scope.lignes[0]=grade;        
        if(!grade.corps || grade.corps==null){
            $scope.typeGrade="pats";
        }
        else{
            $scope.typeGrade="per";
        }
        
        $('.edit').attr('disabled','disabled');
        $scope.toggle();
    };
    
    $scope.annuler=function(){
        
        $('.btn').removeAttr('disabled');
        $('form').trigger("reset");
        
        $scope.initialiserGrade();
        
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
        
                    Grade.delete(item.id).success(function () {
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
