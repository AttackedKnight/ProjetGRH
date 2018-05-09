/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterEmployeEntiteController',function($scope,$routeParams,$rootScope,Securite,HistoriqueGrade,Servir)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    if($rootScope.groupeUtilisateur.code=='PATS_AD'){
        Servir.findPatsEntite($routeParams.id).success(function (data) {
            $scope.travailleurs=data;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD'){
        Servir.findPerEntite($routeParams.id).success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    
    if($rootScope.groupeUtilisateur.code=='DRH_AD'){
        
        Servir.findPerEtPatsEntite($routeParams.id).success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    }
    
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
        HistoriqueGrade.findDateAvancementEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntiteAllAvancementBefore=function(){
        HistoriqueGrade.findDateAvantEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntiteAllAvancementAfter=function(){
        HistoriqueGrade.findDateApresEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           

        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntiteAllAvancementBetween=function(){
        HistoriqueGrade.findDateEntreEntite(dMin,dMax,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    $scope.getEntitePerAvancementOn=function(){
        HistoriqueGrade.findDateAvancementPerEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntitePerAvancementBefore=function(){
        HistoriqueGrade.findDateAvantPerEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntitePerAvancementAfter=function(){
        HistoriqueGrade.findDateApresPerEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntitePerAvancementBetween=function(){
        HistoriqueGrade.findDateEntrePerEntite(dMin,dMax,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };

    
    $scope.getEntitePatsAvancementOn=function(){
        HistoriqueGrade.findDateAvancementPatsEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntitePatsAvancementBefore=function(){
        HistoriqueGrade.findDateAvantPatsEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntitePatsAvancementAfter=function(){
        HistoriqueGrade.findDateApresPatsEntite(d,$routeParams.id).success(function (data) {
            $scope.avancements=data;

        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getEntitePatsAvancementBetween=function(){
        HistoriqueGrade.findDateEntrePatsEntite(dMin,dMax,$routeParams.id).success(function (data) {
            $scope.avancements=data;
         
        }).error(function () {
            alert('Une erreur est survenue');
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
    
    $scope.validerCritere=function(){
        $scope.recupererChaineDate();
        
        if($rootScope.groupeUtilisateur.code=='PATS_AD'){
           
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
            
            
        }
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
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
        }

        if($rootScope.groupeUtilisateur.code=='DRH_AD'){

          

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

        }
        
    };
    
    $scope.validerCritere();
    
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

