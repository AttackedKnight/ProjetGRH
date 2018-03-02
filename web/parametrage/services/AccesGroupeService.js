/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('ParametrageModule').factory('AccesGroupeTable',function($http)
{
    return {
        getAccess:function(){
            return $http.get(chemin+'/webresources/sn.grh.accesgroupe');
        },
        showGroupeAccess:function(groupe){
            return $http.get(chemin+'/webresources/sn.grh.accesgroupe/groupe/'+groupe.id);
        },
        newAccess:function(a){
            return $http.post(chemin+'/webresources/sn.grh.accesgroupe',a);
        },
        editAccess:function(a){
            return $http.put(chemin+'/webresources/sn.grh.accesgroupe/'+a.id,a);
        },
        deleteAccess:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.accesgroupe/'+id);
        }
    };
});