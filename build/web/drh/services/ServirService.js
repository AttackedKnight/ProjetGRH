/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Servir', function ($http) {
return{

        findAll:function(){
            return $http.get(chemin+'/webresources/sn.grh.servir');
        },
        findPer:function(){
            return $http.get(chemin+'/webresources/sn.grh.servir/per');
        },
        findPats:function(){
            return $http.get(chemin+'/webresources/sn.grh.servir/pats');
        },
        findPerEntite:function(id){
            return $http.get(chemin+'/webresources/sn.grh.servir/per/'+id);
        },
        findPatsEntite:function(id){
            return $http.get(chemin+'/webresources/sn.grh.servir/pats/'+id);
        },
        find:function(id){
            return $http.get(chemin+'/webresources/sn.grh.servir/'+id);
        },
        findByEmploye:function(e){
            return $http.get(chemin+'/webresources/sn.grh.servir/employe/'+e.id);
        },
        findResponsableEntite:function(entite){
            return $http.get(chemin+'/webresources/sn.grh.servir/responsable/'+entite.id);
        },
        finirService:function(item){
            return $http.put(chemin+'/webresources/sn.grh.servir/finservice/'+item.id,item);
        },
        enService:function(employe){
            return $http.get(chemin+'/webresources/sn.grh.servir/enservice/'+employe.id);
        },
        countEmploye:function(entite){
            return $http.get(chemin+'/webresources/sn.grh.servir/effectif/'+entite.id);
        },
        add:function(item){
            return $http.post(chemin+'/webresources/sn.grh.servir',item);
        },
        delete:function(id){
            return $http.delete(chemin+'/webresources/sn.grh.servir/'+id);
        },
        
        edit:function(item){
            return $http.put(chemin+'/webresources/sn.grh.servir/'+item.id,item);
        }
};
});
