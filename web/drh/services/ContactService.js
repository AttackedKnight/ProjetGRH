/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Contact', function ($http) {
return{

        findAll:function(){
            return $http.get(chemin+'/webresources/sn.grh.contact');
        },
        find:function(id){
            return $http.get(chemin+'/webresources/sn.grh.contact/'+id);
        },
        findByEmploye:function(e){
            return $http.get(chemin+'/webresources/sn.grh.contact/employe/'+e.id);
        },
        checkcontact:function(numero){
            return $http.get(chemin+'/webresources/sn.grh.contact/checknum/'+numero);
        },
        checkmail:function(email){
            return $http.get(chemin+'/webresources/sn.grh.contact/checkmail/'+email);
        },
        add:function(item){
            return $http.post(chemin+'/webresources/sn.grh.contact',item);
        },
        delete:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.contact/'+id);
        },

        edit:function(item){
            return $http.put(chemin+'/webresources/sn.grh.contact/'+item.id,item);
        }
};
});
