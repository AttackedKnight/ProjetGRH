angular.module('StatistiqueModule').factory('Statistique', function ($http) {
    
        return {
            countemploye:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemploye');
            },
             countemployepats:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployepats');
            },
            countemployeper:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployeper');
            },
            countemployehommeper:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployehommesper');
            }, 
            countemployehommepats:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployehommespats');
            }, 
            countemployefemmeper:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployefemmesper');
            }, 
            countemployefemmepats:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployefemmespats');
            }
            
        }; 

    
});

