/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('HistoriqueGrade', function ($http) {
return{

        findAll:function(){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade');
        },
        find:function(id){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/'+id);
        },
        findByEmploye:function(e){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/employe/'+e.id);
        },
        add:function(item){
            return $http.post(chemin+'/webresources/sn.grh.historiquegrade',item);
        },
        delete:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.historiquegrade/'+id);
        },

        edit:function(item){
            return $http.put(chemin+'/webresources/sn.grh.historiquegrade/'+item.id,item);
        }
};
});
