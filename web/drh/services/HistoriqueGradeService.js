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
        },
        findDateAvant:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/avant/'+date);
        },
        findDateApres:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/apres/'+date);
        }
        ,
        findDateAvancement:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/avancement/'+date);
        }
        ,
        findDateEntre:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/entre/'+date1+'/'+date2);
        }
        ,
        findDateAvantEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/avant/'+date+'/'+idEntite);
        },
        findDateApresEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancementEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntreEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/date/entre/'+date1+'/'+date2+'/'+idEntite);
        }
        ,
        findDateAvantPer:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/avant/'+date);
        },
        findDateApresPer:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/apres/'+date);
        }
        ,
        findDateAvancementPer:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/avancement/'+date);
        }
        ,
        findDateEntrePer:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/entre/'+date1+'/'+date2);
        },
        findDateAvantPerEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/avant/'+date+'/'+idEntite);
        },
        findDateApresPerEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancementPerEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntrePerEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/date/entre/'+date1+'/'+date2+'/'+idEntite);
        },
        findDateAvantPerHommeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/avant/'+date+'/'+idEntite);
        },
        findDateApresPerHommeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancementPerHommeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntrePerHommeEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/entre/'+date1+'/'+date2+'/'+idEntite);
        },
        findDateAvantPerFemmeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/avant/'+date+'/'+idEntite);
        },
        findDateApresPerFemmeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancementPerFemmeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntrePerFemmeEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/entre/'+date1+'/'+date2+'/'+idEntite);
        },
        findDateAvantPerFemme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/avant/'+date);
        },
        findDateApresPerFemme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/apres/'+date);
        }
        ,
        findDateAvancementPerFemme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/avancement/'+date);
        }
        ,
        findDateEntrePerFemme:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/femme/date/entre/'+date1+'/'+date2);
        },
        findDateAvantPerHomme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/avant/'+date);
        },
        findDateApresPerHomme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/apres/'+date);
        }
        ,
        findDateAvancementPerHomme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/avancement/'+date);
        }
        ,
        findDateEntrePerHomme:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/per/homme/date/entre/'+date1+'/'+date2);
        },
        findDateAvantPats:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/avant/'+date);
        },
        findDateApresPats:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/apres/'+date);
        }
        ,
        findDateAvancemenPats:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/avancement/'+date);
        }
        ,
        findDateEntrePats:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/entre/'+date1,date2);
        }
        ,
        findDateAvantPatsEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/avant/'+date+'/'+idEntite);
        },
        findDateApresPatsEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancemenPatsEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntrePatsEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/date/entre/'+date1,date2+'/'+idEntite);
        }
        ,
        findDateAvantPatsHommeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/avant/'+date+'/'+idEntite);
        },
        findDateApresPatsHommeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancemenPatsHommeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntrePatsHommeEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/entre/'+date1,date2+'/'+idEntite);
        }
        ,
        findDateAvantPatsFemmeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/avant/'+date+'/'+idEntite);
        },
        findDateApresPatsFemmeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/apres/'+date+'/'+idEntite);
        }
        ,
        findDateAvancemenPatsFemmeEntite:function(date,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/avancement/'+date+'/'+idEntite);
        }
        ,
        findDateEntrePatsFemmeEntite:function(date1,date2,idEntite){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/entre/'+date1,date2+'/'+idEntite);
        }
        ,
        findDateAvantPatsFemme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/avant/'+date);
        },
        findDateApresPatsFemme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/apres/'+date);
        }
        ,
        findDateAvancemenPatsFemme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/avancement/'+date);
        }
        ,
        findDateEntrePatsFemme:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/femme/date/entre/'+date1,date2);
        }
        ,
        findDateAvantPatsHomme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/avant/'+date);
        },
        findDateApresPatsHomme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/apres/'+date);
        }
        ,
        findDateAvancemenPatsHomme:function(date){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/avancement/'+date);
        }
        ,
        findDateEntrePatsHomme:function(date1,date2){
            return $http.get(chemin+'/webresources/sn.grh.historiquegrade/pats/homme/date/entre/'+date1,date2);
        }
};
});
