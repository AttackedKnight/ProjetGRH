/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterEmployeController',function($scope,$rootScope,Securite,HistoriqueGrade,Servir,$routeParams)
{
    
     /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    }
   
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    
    
    $scope.getPer=function(){
        Servir.findPer().success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.getPats=function(){
        Servir.findPats().success(function (data) {
            $scope.travailleurs=data;
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.getAll=function(){
        Servir.findPerAndPats().success(function (data) {
            $scope.travailleurs=data;

        }).error(function () {
            alert('Une erreur est survenue');
        });
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
    
    
    
    
    
    $scope.getAllAvancementOn=function(){
        HistoriqueGrade.findDateAvancement(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getAllAvancementBefore=function(){
        HistoriqueGrade.findDateAvant(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getAllAvancementAfter=function(){
        HistoriqueGrade.findDateApres(d).success(function (data) {
            $scope.avancements=data;
           

        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getAllAvancementBetween=function(){
        HistoriqueGrade.findDateEntre(dMin,dMax).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    
    $scope.getPerAvancementOn=function(){
        HistoriqueGrade.findDateAvancementPer(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getPerAvancementBefore=function(){
        HistoriqueGrade.findDateAvantPer(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getPerAvancementAfter=function(){
        HistoriqueGrade.findDateApresPer(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getPerAvancementBetween=function(){
        HistoriqueGrade.findDateEntrePer(dMin,dMax).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };

    
    $scope.getPatsAvancementOn=function(){
        HistoriqueGrade.findDateAvancementPats(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getPatsAvancementBefore=function(){
        HistoriqueGrade.findDateAvantPats(d).success(function (data) {
            $scope.avancements=data;
           
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getPatsAvancementAfter=function(){
        HistoriqueGrade.findDateApresPats(d).success(function (data) {
            $scope.avancements=data;
        }).error(function () {
            alert('Une erreur est survenue');
        });
    };
    $scope.getPatsAvancementBetween=function(){
        HistoriqueGrade.findDateEntrePats(dMin,dMax).success(function (data) {
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
                $scope.getPatsAvancementBetween();
            }
            if($scope.position=="on"){
                $scope.getPatsAvancementOn();
            }
            if($scope.position=="before"){
                $scope.getPatsAvancementBefore();
            }
            if($scope.position=="after"){
                $scope.getPatsAvancementAfter();
            }
            
            
        }
        if($rootScope.groupeUtilisateur.code=='PER_AD'){
            if($scope.position=="between"){
                $scope.getPerAvancementBetween();
            }
            if($scope.position=="on"){
                $scope.getPerAvancementOn();
            }
            if($scope.position=="before"){
                $scope.getPerAvancementBefore();
            }
            if($scope.position=="after"){
                $scope.getPerAvancementAfter();
            }
        }

        if($rootScope.groupeUtilisateur.code=='DRH_AD'){


                if($routeParams.type==1){
                    if($scope.position=="between"){
                    $scope.getPerAvancementBetween();
                }
                if($scope.position=="on"){
                    $scope.getPerAvancementOn();
                }
                if($scope.position=="before"){
                    $scope.getPerAvancementBefore();
                }
                if($scope.position=="after"){
                    $scope.getPerAvancementAfter();
                }
            }
            else if($routeParams.type==0){
                if($scope.position=="between"){
                    $scope.getPatsAvancementBetween();
                }
                if($scope.position=="on"){
                    $scope.getPatsAvancementOn();
                }
                if($scope.position=="before"){
                    $scope.getPatsAvancementBefore();
                }
                if($scope.position=="after"){
                    $scope.getPatsAvancementAfter();
                }
            }
            else{
                if($scope.position=="between"){
                    $scope.getAllAvancementBetween();
                }
                if($scope.position=="on"){
                    $scope.getAllAvancementOn();
                }
                if($scope.position=="before"){
                    $scope.getAllAvancementBefore();
                }
                if($scope.position=="after"){
                    $scope.getAllAvancementAfter();
                }
            }


        }
        
    };
    
    $scope.validerCritere();
    
    /*CRITERES REQUETES*/
    
    
    
    /*Avencements*/
    
    
    if($rootScope.groupeUtilisateur.code=='PATS_AD'){
        $scope.getPats();
    }
    if($rootScope.groupeUtilisateur.code=='PER_AD'){
        $scope.getPer();
    }
    
    if($rootScope.groupeUtilisateur.code=='DRH_AD'){
        
        
        if($routeParams.type==1){
            $scope.getPer();
        }
        else if($routeParams.type==0){
            $scope.getPats();
        }
        else{
            $scope.getAll();
        }
        
         
    }
    (function datatable() {

        if($('#example1 tr').length>0){
            setTimeout(function(){ 
                $('#example1').dataTable({
                "bPaginate": true,
                "bLengthChange": true,
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false,
                "bStateSave": true
              });        
            }, 2000);
             
        }

        
    })();
    
   
});

