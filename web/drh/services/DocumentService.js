/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Document', function ($http) {
return{

        findAll:function(){
            return $http.get(chemin+'/webresources/sn.grh.document');
        },
        find:function(id){
            return $http.get(chemin+'/webresources/sn.grh.document/'+id);
        },
        findByLibelle:function(nom){
            return $http.get(chemin+'/webresources/sn.grh.document/nom/'+nom);
        },
        add:function(item){
            return $http.post(chemin+'/webresources/sn.grh.document',item);
        },
        findByEmploye:function(e){
            return $http.get(chemin+'/webresources/sn.grh.document/employe/'+e.id);
        },
        delete:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.document/'+id);
        },

        edit:function(item){
            return $http.put(chemin+'/webresources/sn.grh.document/'+item.id,item);
        }
};
});
