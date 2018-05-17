angular.module('DrhModule').controller('ConsulterEmployeFemmeEntiteController',function($scope,$q,$routeParams,Servir,Entite,Securite,$rootScope,HistoriqueGrade){
     
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    /*     RECUPPERER ENTITES FILLES    */
     
    /*  Recuperer l'entite et chercher ses entites enfants  */
    
    $scope.filles=[];
    
    Entite.find($routeParams.id).success(function (data) {
        $scope.entiteChoisie=data;
      
        Entite.findAll().success(function (data) {
            $scope.entites=data;           
            $scope.filles=$scope.getEntitesFille();
            
            $scope.getData();
            $scope.validerCritere();
        }).error(function () {
            alert('Une erreur est survenue : entites');
        });
        
    }).error(function () {
        alert('Une erreur est survenue : entites');
    });
    
    /*  Recuperer l'entite et chercher ses entites enfants  */

    $scope.getEntitesFille=function(){       
        var filles=[];
        for(var i=0;i<$scope.entites.length;i++){
            if($scope.estEnfant($scope.entites[i],$scope.entiteChoisie)==true){
                filles.push($scope.entites[i]);
            }
        }    
        return filles;
    };
    
    $scope.estEnfant=function(entite,parent){        
        var e=entite;
        var b=false;
        while(e !=null){
            if(e.id==parent.id){
                b=true;
                break;
            }          
            e=e.entite;
        }
        return b;
    };
    
    
    /*     RECUPPERER ENTITES FILLES    */
    
    
    $scope.getPerFemmeEntite=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPerFemmeEntite($scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.travailleurs=cumul;
        });
    };
    $scope.getPatsFemmeEntite=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPatsFemmeEntite($scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.travailleurs=cumul;
        });
 
    };
    
    $scope.getData=function(){
        if($rootScope.groupeUtilisateur.code=='PATS_AD'){   
            $scope.getPatsFemmeEntite();
        }
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
            $scope.getPerFemmeEntite();
        }

        if($rootScope.groupeUtilisateur.code=='DRH_AD'){
            if($routeParams.type==1){
                $scope.getPerFemmeEntite();
            }
            if($routeParams.type==0){
                $scope.getPatsFemmeEntite();
            }
        }
    };
    
    
    
    /*Avencements*/
    var today=new Date();
    var dMin,dMax,d;
    
    /*Initialisation date et formatage*/
    
    $scope.setDefaultInterval=function(){
        var month = today.getMonth();
        var year = today.getFullYear();

        $scope.dateMin=new Date(year, today.getMonth(), 1);
        $scope.dateMax = new Date(year, month + 1, 0);
        $scope.dateFournie=today;
        
    };
    
    $scope.recupererChaineDate=function(){
        dMin=$scope.dateMin.getFullYear()+"-"+($scope.dateMin.getMonth()+1)+"-"+$scope.dateMin.getDate();
        dMax=$scope.dateMax.getFullYear()+"-"+($scope.dateMax.getMonth()+1)+"-"+$scope.dateMax.getDate();
        d=$scope.dateFournie.getFullYear()+"-"+($scope.dateFournie.getMonth()+1)+"-"+$scope.dateFournie.getDate();
    };
    
    $scope.setDefaultInterval();
    $scope.recupererChaineDate();
    
    /*Initialisation date et formatage*/
    
    
    
    
    
    
    $scope.getEntitePerFemmeAvancementOn=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementPerFemmeEntite(d,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });

    };
    $scope.getEntitePerFemmeAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantPerFemmeEntite(d,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });

    };
    $scope.getEntitePerFemmeAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresPerFemmeEntite(d,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });
        
    };
    $scope.getEntitePerFemmeAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateEntrePerFemmeEntite(dMin,dMax,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });

    };

    
    $scope.getEntitePatsFemmeAvancementOn=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementPatsFemmeEntite(d,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });
        
    };
    $scope.getEntitePatsFemmeAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantPatsFemmeEntite(d,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });

    };
    $scope.getEntitePatsFemmeAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresPatsFemmeEntite(d,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });
        
    };
    $scope.getEntitePatsFemmeAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateEntrePatsFemmeEntite(dMin,dMax,$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result){
            for(var i=0;i<result.length;i++)
            {
                if(result[i].data.length>0){
                    cumul=cumul.concat(result[i].data);
                }
            }
            $scope.avancements=cumul;
        });
        
    };
    
    
    
    /*CRITERES REQUETES*/
    
    $scope.position="after";
    $scope.intervalle=false;
     
    $scope.definirCritere=function(){
        
        if($scope.position=="between"){
            $scope.intervalle=true;
        }
        else{
            $scope.intervalle=false;
        }
    };
    
    
    $scope.getPerAvancement=function(){
        if($scope.position=="between"){
            $scope.getEntitePerFemmeAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntitePerFemmeAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntitePerFemmeAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntitePerFemmeAvancementAfter();
        }
    };
    
    $scope.getPatsAvancement=function(){
        if($scope.position=="between"){
            $scope.getEntitePatsFemmeAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntitePatsFemmeAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntitePatsFemmeAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntitePatsFemmeAvancementAfter();
        }
    };
    
    $scope.validerCritere=function(){
        $scope.recupererChaineDate();
        
        if($rootScope.groupeUtilisateur.code=='PATS_AD'){
    
            $scope.getPatsAvancement();
        }
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
            $scope.getPerAvancement();
        }

        if($rootScope.groupeUtilisateur.code=='DRH_AD'){
       
            if($routeParams.type==1){
                $scope.getPerAvancement();
            }
            if($routeParams.type==0){
                $scope.getPatsAvancement();
            }
            

        }
        
    };
    
//    $scope.validerCritere();
    
    /*CRITERES REQUETES*/
    
    
    
    /*Avencements*/
    
    
    (function datatable() {

        if($('#example1 tr').length>0){
            setTimeout(function(){ 
                $('#example1').dataTable({
                "bPaginate": true,
                "bLengthChange": true,
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
              });        
            }, 2000);
             
        }
        
    })();
    
});
    
 
