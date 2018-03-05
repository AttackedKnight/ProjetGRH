/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('AuthentificationModule').controller('ConnexionController',function($scope,$routeParams,$cookies,$rootScope,Connexion,Securite,$location)
{
    $scope.utilisateur={id:""};
        
    
    $scope.$on('$routeChangeStart', function($event, next, current) { 
        if ($rootScope.globals==null || $rootScope.globals.currentUser==null)
        {
            $event.preventDefault();
        }
        
    });
    
        
    (function end() {
        var logout=document.location.href.substring(document.location.href.lastIndexOf("/"),document.location.href.length);
        if(logout==="/logout"){
            Connexion.clearCredentials();          
        }
        
    })();


    (function init() {
        var cookie =$cookies.get('globals');
        if(cookie!=null){
            cookie=JSON.parse(cookie);
            $scope.utilisateur.login=cookie.currentUser.user.login;
        }
        Securite.hide();
    })();
     
    $scope.controlForm=function(c){
        
        if(c.login==null || c.login==""){
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        }else{
            if(c.motDePasse==null || c.motDePasse==""){
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            }else{
              $scope.connecterUtilisateur(c);
            }
        }
                  
    };
    
    
    $scope.connecterUtilisateur=function(c){       
        var dialog =bootbox.dialog({
                            title: 'CONNEXION',
                            message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Connexion ...</span></p>'
                        });
        Connexion.login(c).success(function (data) {
            if (data!=null) {
                
                Connexion.setCredentials(data);

                dialog.modal('hide');
                
                
                $('header').removeAttr('hidden');
                $('aside').removeAttr('hidden');
                $('footer').removeAttr('hidden');
                $('.content-header').removeAttr('hidden');
                $('.content-wrapper').removeAttr('style');

                switch (data.groupe.id){
                    case 2:
                        $('#admin-menu').removeAttr('hidden');
                        document.location.href="#/parametrage/statistique";
                        break;
                    case 3:
                        $('#drh-menu').removeAttr('hidden');
                        document.location.href="#/drh/per";
                        break;
                    case 6:
                        $('#drh-menu').removeAttr('hidden');
                        document.location.href="#/drh/pats";
                        break;
                    default :
                        document.location.href="#/";
                        break;
                }
                
            } else {
                dialog.modal('hide');
                $scope.erreurConnexion="Login et(ou) mot de passe incorrect(s)";
            }
        }).error(function () {
            dialog.modal('hide');
            $scope.erreurConnexion="Login et(ou) mot de passe incorrect(s)";
        });          

    };
});
