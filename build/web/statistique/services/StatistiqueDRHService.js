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
            countemployehomme:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployehommes');
            },
            countemployehommeper:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployehommesper');
            }, 
            countemployehommepats:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployehommespats');
            },
            countemployefemme:function (){
                return $http.get(chemin+'/webresources/sn.grh.employe/countemployefemmes');
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
            compterRecrutement:function (debut,fin){
                return $http.get(chemin+'/webresources/sn.grh.employe/recrutement/'+debut+'/'+fin);
            },
            compterRecrutementPats:function (debut,fin){
                return $http.get(chemin+'/webresources/sn.grh.employe/recrutement/pats/'+debut+'/'+fin);
            }, 
            compterRecrutementPer:function (debut,fin){
                return $http.get(chemin+'/webresources/sn.grh.employe/recrutement/per/'+debut+'/'+fin);
            },
            compterPatsDeClasse:function(indice){
                 return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/classe/'+indice);
            },
            compterPatsHommeDeClasse:function(indice){
                 return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/classe/'+indice);
            },
            compterPatsFemmeDeClasse:function(indice){
                 return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/classe/'+indice);
            },
            compterPerDeCorps:function(indice){
                 return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/corps/'+indice);
            },
            compterPerHommeDeCorps:function(indice){
                 return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/corps/'+indice);
            },
            compterPerFemmeDeCorps:function(indice){
                 return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/corps/'+indice);
            }
            
        }; 

    
});
