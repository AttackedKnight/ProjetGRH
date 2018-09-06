angular.module('AuthentificationModule').factory('Connexion', function ($http,$rootScope,$cookies) {
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
        setCredentials:function(utilisateur){

            $rootScope.globals = {
                currentUser: {
                    user: utilisateur
                }
            };

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        },

        clearCredentials:function(){
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
        

        
        
};


});
