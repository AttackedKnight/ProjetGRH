/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterEmployeEntiteController',function($scope,$q,$routeParams,$rootScope,Entite,Securite,HistoriqueGrade,Servir)
{
    
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
    
    $scope.getAllEmployeEntite=function(){
       
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPerEtPatsEntite($scope.filles[i].id));
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
    
    $scope.getEmployePerEntite=function(){
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPerEntite($scope.filles[i].id));
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

    $scope.getEmployePatsEntite=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(Servir.findPatsEntite($scope.filles[i].id));
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
            $scope.getEmployePatsEntite();
        }
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
            $scope.getEmployePerEntite();
        }

        if($rootScope.groupeUtilisateur.code=='DRH_AD'){


            if($routeParams.type==1){
                $scope.getEmployePerEntite();
            }
            else if($routeParams.type==0){
                $scope.getEmployePatsEntite();
            }
            else{
                $scope.getAllEmployeEntite();
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
    
    
    
    
    
    $scope.getEntiteAllAvancementOn=function(){
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementEntite(d,$scope.filles[i].id));
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
    $scope.getEntiteAllAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantEntite(d,$scope.filles[i].id));
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
    $scope.getEntiteAllAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresEntite(d,$scope.filles[i].id));
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
    $scope.getEntiteAllAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresEntite(dMin,dMax,$scope.filles[i].id));
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
    
    $scope.getEntitePerAvancementOn=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementPerEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePerAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantPerEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePerAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresPerEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePerAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateEntrePerEntite(dMin,dMax,$scope.filles[i].id));
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

    
    $scope.getEntitePatsAvancementOn=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvancementPatsEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePatsAvancementBefore=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateAvantPatsEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePatsAvancementAfter=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateApresPatsEntite(d,$scope.filles[i].id));
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
    $scope.getEntitePatsAvancementBetween=function(){
        
        var req_tab=[];
        var cumul=[];
        for(var i=0;i<$scope.filles.length;i++)
        {
            req_tab.push(HistoriqueGrade.findDateEntrePatsEntite(dMin,dMax,$scope.filles[i].id));
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
    
    $scope.getAllAvancement=function(){
        if($scope.position=="between"){
            $scope.getEntiteAllAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntiteAllAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntiteAllAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntiteAllAvancementAfter();
        }
    };
    $scope.getPerAvancement=function(){
        if($scope.position=="between"){
            $scope.getEntitePerAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntitePerAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntitePerAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntitePerAvancementAfter();
        }
    };
    
    $scope.getPatsAvancement=function(){
        if($scope.position=="between"){
            $scope.getEntitePatsAvancementBetween();
        }
        if($scope.position=="on"){
            $scope.getEntitePatsAvancementOn();
        }
        if($scope.position=="before"){
            $scope.getEntitePatsAvancementBefore();
        }
        if($scope.position=="after"){
            $scope.getEntitePatsAvancementAfter();
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
            else if($routeParams.type==0){
                $scope.getPatsAvancement();
            }
            else{
                $scope.getAllAvancement();
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
                "bLengthChange": false,
                "bFilter": false,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
              });        
            }, 2000);
             
        }
        
    })();

    
});

