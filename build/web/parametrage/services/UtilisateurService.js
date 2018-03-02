/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('ParametrageModule').factory('Utilisateur',function($http)
{
    return {
        getComptes:function(){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur');
        },
        getCompte:function(id){
            return $http.get(chemin+'/webresources/sn.grh.utilisateur/'+id);
        },
        createCompte:function(c){
            return $http.post(chemin+'/webresources/sn.grh.utilisateur',c);
        },
        editCompte:function(c){
            return $http.put(chemin+'/webresources/sn.grh.utilisateur/'+c.id,c);
        },
        deleteCompte:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.utilisateur/'+id);
        }
    };
});