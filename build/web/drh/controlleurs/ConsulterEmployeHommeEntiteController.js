angular.module('DrhModule').controller('ConsulterEmployeHommeEntiteController',function($scope,$q,$routeParams,Securite,Servir,Entite,HistoriqueGrade,$rootScope){
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
    
    $scope.getPatsHommeEntite=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPatsHommeEntite($scope.filles[i].id));
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
    $scope.getPerHommeEntite=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPerHommeEntite($scope.filles[i].id));
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
            $scope.getPatsHommeEntite();
        }
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
            $scope.getPerHommeEntite();
        }

        if($rootScope.groupeUtilisateur.code=='DRH_AD'){
            if($routeParams.type==1){
                $scope.getPerHommeEntite();
            }
            if($routeParams.type==0){
                $scope.getPatsHommeEntite();
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
    
    
    
    
    
    
    $scope.getEntitePerHommeAvancementOn=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementPerHommeEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePerHommeAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantPerHommeEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePerHommeAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresPerHommeEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePerHommeAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateEntrePerHommeEntite(dMin,dMax,$scope.filles[i].id));
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

    
    $scope.getEntitePatsHommeAvancementOn=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementPatsHommeEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePatsHommeAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantPatsHommeEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePatsHommeAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresPatsHommeEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePatsHommeAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateEntrePatsHommeEntite(dMin,dMax,$scope.filles[i].id));
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
            $scope.getEntitePerHommeAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntitePerHommeAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntitePerHommeAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntitePerHommeAvancementAfter();
        }
    };
    
    $scope.getPatsAvancement=function(){
        if($scope.position=="between"){
            $scope.getEntitePatsHommeAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntitePatsHommeAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntitePatsHommeAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntitePatsHommeAvancementAfter();
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
    
 


