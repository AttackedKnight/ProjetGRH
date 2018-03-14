angular.module('AuthentificationModule').factory('Securite', function ($rootScope,$cookies) {
    return{

        estConnecte:function(){
            if (!$cookies.get('globals'))
            {
                
               return false;   
            }
            else{
                
                var cookie =JSON.parse($cookies.get('globals'));
                
//                endMessage = adult ? '18+' : '-18';
                
                $rootScope.prenomUtilisateur=cookie.currentUser.user.employe ? cookie.currentUser.user.employe.prenom : "";              
                $rootScope.nomUtilisateur=cookie.currentUser.user.employe ? cookie.currentUser.user.employe.nom : "";
                $rootScope.groupeUtilisateur=cookie.currentUser.user.groupe;
                $rootScope.avatarUtilisateur=cookie.currentUser.user.avatar;
                $rootScope.entiteUtilisateur=cookie.currentUser.user.entite;
                

                if($rootScope.groupeUtilisateur.code=='SUP_AD'){
                    $('#admin-menu').removeAttr('hidden');
                }
                if($rootScope.groupeUtilisateur.code=='PER_AD'){
                    $('#drh-menu').removeAttr('hidden');
                }
                if($rootScope.groupeUtilisateur.code=='PATS_AD'){
                    $('#drh-menu').removeAttr('hidden');
                    $('#drh-demandes').removeAttr('hidden');
                }
//                switch ($rootScope.groupeUtilisateur.code){
//                    case 2:
//                        $('#admin-menu').removeAttr('hidden');
//                        break;
//                    case 3:
//                        $('#drh-menu').removeAttr('hidden');
//                        
//                        break;
//                    case 6:
//                        $('#drh-menu').removeAttr('hidden');
//                        $('#drh-demandes').removeAttr('hidden');
//                        break;
//
//                }
                
                $('.no-print').css('display','none');
                
                $('header').removeAttr('hidden');
                $('aside').removeAttr('hidden');
                $('footer').removeAttr('hidden');
                $('.content-header').removeAttr('hidden');
                
                
                $('.content-wrapper').removeAttr('style');
                $('body').css('padding-right','0px');
                $rootScope.$watch('$viewContentLoaded', function(){
                   
                    $('body').css('padding-right','0px');
                });
                
               return true;
            }
        },
        hide:function(){
            
            
            $('.no-print').css('display','none');

            $('header').attr('hidden','hidden');
            $('aside').attr('hidden','hidden');
            $('footer').attr('hidden','hidden');           
            $('.content-header').attr('hidden','hidden');
            
            
            $('#admin-menu').attr('hidden','hidden');
            $('#drh-menu').attr('hidden','hidden');
            $('#drh-demandes').attr('hidden','hidden');
            
            $('.content-wrapper').css('background','transparent');

            
        }
             
};


});


