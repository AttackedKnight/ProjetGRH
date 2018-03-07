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
            },
            trancheage:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/'+debut+'/'+fin);
            }
            ,
            trancheagehommes:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/homme/'+debut+'/'+fin);
            }
            ,
            trancheagefemmes:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/femme/'+debut+'/'+fin);
            },
            trancheagehommesper:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/homme/per/'+debut+'/'+fin);
            }
            ,
            trancheagefemmesper:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/femme/per/'+debut+'/'+fin);
            },
            trancheagehommespats:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/homme/pats/'+debut+'/'+fin);
            }
            ,
            trancheagefemmespats:function(debut,fin){
                
                return $http.get(chemin+'/webresources/sn.grh.employe/trancheage/femme/pats/'+debut+'/'+fin);
            }, 
            recrute:function (debut,fin){
                return $http.get(chemin+'/webresources/sn.grh.employe/recrutement/'+debut/+fin);
            }
            
        }; 

    
});
