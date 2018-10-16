angular.module('AuthentificationModule').factory('Connexion', function ($http,$rootScope,$cookies,Base64) {
return{

        findAll:function(){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur');
        },
        find:function(id){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/'+id);
        },
        findByEmploye:function(id){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/employe/'+id);
        },
        getAvatar:function(id){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/avatar/'+id);
        },
        add:function(item){
            return $http.post(chemin+'/webresources/sn.grh.utilisateur',item);
        },

        delete:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.utilisateur/'+id);
        },
        
        edit:function(item){
            return $http.put(chemin+'/webresources/sn.grh.utilisateur/'+item.id,item);
        },
        login:function(item){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/login/'+item.login+'/password/'+item.motDePasse);
        },
        logout:function(){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/deconnexion');
        },
        sessionTimeOut:function(){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/checksession');
        },
        setCredentials:function(utilisateur,typeEmployeAssocie,typeEmploye_o){   //Stocke les informations de l'utilisateur connecte dans une cookie
            
            var authdata = Base64.encode(utilisateur.login + ':' + utilisateur.motDePasse);
            
            $rootScope.globals = {
                currentUser: {
                    user: utilisateur,
                    typeEmployeAssocie:typeEmployeAssocie,
                    typeEmploye_o : typeEmploye_o
                }
            };
            $rootScope.credentials = {
                    authdata: authdata
            };
            $cookies.putObject('globals', $rootScope.globals);
            $cookies.putObject('credentials', $rootScope.credentials);           
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            
                // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
//            var cookieExp = new Date();
//            cookieExp.setDate(cookieExp.getDate() + 7);
//            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        },

        clearCredentials:function(){
            $rootScope.globals = {};
            $rootScope.credentials = {};
            $cookies.remove('globals');
            $cookies.remove('credentials');
            $rootScope.myPermission=[];
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
        

        
        
};


});
