angular.module('AuthentificationModule').factory('Securite', function ($rootScope,$cookies,AccesGroupeTable) {
   
     
    return{

        estConnecte:function(){
//            $("#ecran_attente").show();
            if (!$cookies.get('globals'))
            {
                
               return false;   
            }
            else{
                
                var cookie =JSON.parse($cookies.get('globals'));
                
                
                $rootScope.prenomUtilisateur=cookie.currentUser.user.employe ? cookie.currentUser.user.employe.prenom : "";              
                $rootScope.nomUtilisateur=cookie.currentUser.user.employe ? cookie.currentUser.user.employe.nom : "";
                $rootScope.groupeUtilisateur=cookie.currentUser.user.groupe;
                $rootScope.avatarUtilisateur=cookie.currentUser.user.avatar;
                $rootScope.entiteUtilisateur=cookie.currentUser.user.entite;
                
                
                /*Recuperation des permissions*/
                
                
                if($rootScope.groupeUtilisateur.code=='SUP_AD'){
                    $('#admin-menu').removeAttr('hidden');
                }
                if($rootScope.groupeUtilisateur.code=='PER_AD'){
                    $('#drh-menu').removeAttr('hidden');
                }
                if($rootScope.groupeUtilisateur.code=='PATS_AD' || $rootScope.groupeUtilisateur.code=='DRH_AD'){
                    $('#drh-menu').removeAttr('hidden');
                    $('#drh-demandes').removeAttr('hidden');
                }
                if($rootScope.groupeUtilisateur.code=='EMP'){
                    $rootScope.idUtilisateur=cookie.currentUser.user.employe.id;
                    $('#employe-menu').removeAttr('hidden');
                }


                $('.no-print').css('display','none');

                $('header').removeAttr('hidden');
                $('aside').removeAttr('hidden');
                $('footer').removeAttr('hidden');
                $('.content-header').removeAttr('hidden');


                $('.content-wrapper').removeAttr('style');
                $('body').css('padding-right','0px');
                
                if(!$rootScope.myPermission || $rootScope.myPermission.length==0){ 
                
                    AccesGroupeTable.showGroupeAccess($rootScope.groupeUtilisateur).success(function (p){           
                        $rootScope.myPermission=p;  
//                        console.log('Requete bd');
//                        console.log($rootScope.myPermission);
                        
                        $rootScope.avoirPermission=function(action,nomTable){
    //                        console.log('je suis appele');
                            if(action=='ajouter' || action=='modifier' || action=='supprimer' || action=='lister' || action=='consulter'){

                                for(var i=0;i<$rootScope.myPermission.length;i++){
                                    if($rootScope.myPermission[i].nomTable==nomTable){
                                        if(action=='ajouter'){
                                            return $rootScope.myPermission[i].ajouter;
                                        }
                                        if(action=='modifier'){
                                            return $rootScope.myPermission[i].modifier;
                                        }
                                        if(action=='supprimer'){
                                            return $rootScope.myPermission[i].supprimer;
                                        }
                                        if(action=='lister'){
                                            return $rootScope.myPermission[i].lister;
                                        }
                                        if(action=='consulter'){
                                            return $rootScope.myPermission[i].consulter;
                                        }

                                    }
                                }

                                return false;
                            }
                            else{
                                return false;
                            }

                        };
                        

                   }).error(function(){
                        alert('Une erreur est survenue lors de la recupération des permissions');
                   });
               }
               
                $rootScope.$watch('$viewContentLoaded', function(){                     
                    /*$("#ecran_attente").hide();*/
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
//        ,
//        avoirPermission:function(action,nomTable){
//            console.log('je suis appele');
//            if(action=='ajouter' || action=='modifier' || action=='supprimer' || action=='lister' || action=='consulter'){
//               
//                for(var i=0;i<$rootScope.myPermission.length;i++){
//                    if($rootScope.myPermission[i].nomTable==nomTable){
//                        if(action=='ajouter'){
//                            return $rootScope.myPermission[i].ajouter;
//                        }
//                        if(action=='modifier'){
//                            return $rootScope.myPermission[i].ajouter;
//                        }
//                        if(action=='supprimer'){
//                            return $rootScope.myPermission[i].ajouter;
//                        }if(action=='lister'){
//                            return $rootScope.myPermission[i].ajouter;
//                        }
//                        if(action=='consulte'){
//                            return $rootScope.myPermission[i].ajouter;
//                        }
//                        
//                    }
//                }
//                
//                return false;
//            }
//            else{
//                return false;
//            }
//               
//        }
             
};


});


