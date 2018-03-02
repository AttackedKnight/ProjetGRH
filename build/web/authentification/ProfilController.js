angular.module('AuthentificationModule').controller('ProfilController',function($scope,Connexion,$rootScope,$cookies,Securite,UploadFile)
{
    
    var cookie =JSON.parse($cookies.get('globals'));

    $scope.utilisateur=cookie.currentUser.user;
    

    $scope.imgAffichee;
    $scope.edit=false;
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
  
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    
    $scope.editable=function(){
        $scope.edit=true;
    };
    
    $scope.cancel=function(){
        $scope.edit=false;
        $scope.motDePasseConfirm="";
        
    };
    
    

    $scope.showProfil=function(){
        $('#previsualisation').attr('src',$scope.utilisateur.avatar);
        $scope.file=null;
    };
    $scope.showProfil();
    
    $scope.preview = function(img) {
        $scope.file=img.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            
           $scope.imgAffichee=URL.createObjectURL($scope.file);
           $('#previsualisation').attr('src',$scope.imgAffichee);

        };
        reader.readAsDataURL($scope.file);
    
    };
    
    $scope.controlForm=function(c){
        
        if(c.login==null || c.login==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            if(c.motDePasse==null || c.motDePasse==""){
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            }else{
              $scope.submit();
            }
        }
                  
    };
    
    $scope.submit=function(){
        
        if(!$scope.file){
            
            $scope.editUser();
          
        }
        else{
            $scope.imgProfil=$scope.file;
            var format=$scope.imgProfil.name.split(".");
            format=format[format.length-1];
            var fd = new FormData();
            fd.append($scope.utilisateur.id, $scope.imgProfil);
            UploadFile.uploadFile(fd).success(function(data){
                $scope.utilisateur.avatar='images/'+data;
                
                $scope.editUser();
            })
            .error(function(){
                alert("erreur");
            });
        }
    };
    
    $scope.editUser=function (){
        var dialog = bootbox.dialog({
                            title: 'MODIFICATION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Modification ...</span></p>'
                        });
        Connexion.edit($scope.utilisateur).success(function () {
            
                dialog.find('.bootbox-body').html('<div class="alert alert-block alert-success"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Modification effetuee avec succes</div>');
            Connexion.setCredentials($scope.utilisateur);     
            $rootScope.avatarUtilisateur=$scope.utilisateur.avatar;
            alert('Votre profil à été mis à jour');
            $scope.cancel();
        }).error(function () {
            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
        });  
    };

});
