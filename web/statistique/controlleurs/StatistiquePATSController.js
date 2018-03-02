angular.module('StatistiqueModule').controller('StatistiquePATSController',function($scope ,Securite, Statistique){
 
 
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */
   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    } 
    $('.statistique').trigger('click');
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
   $scope.countemploye=function(){
        Statistique.countemploye().success(function (data){
            $scope.effectifemploye=data;
            $scope.countemployepats();
           
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.countemploye();
      
    $scope.countemployepats=function(){
        Statistique.countemployepats().success(function (data){
            $scope.effectifemployepats=data; 
            $scope.countemployehommepats();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    
    
    $scope.effectifTotalHomme=0;
    $scope.effectifTotalFemme=0;
    
    $scope.effectifTotalHommePats=0;
    $scope.effectifTotalFemmePats=0;
    
    $scope.pourcentageHommesPats=0;
    $scope.pourcentageFemmesPats=0;
    
    $scope.countemployehommepats=function(){
        Statistique.countemployehommepats().success(function (data){
            $scope.effectifTotalHommePats=data;
            $scope.countemployefemmepats();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    
    $scope.countemployefemmepats=function(){
        Statistique.countemployefemmepats().success(function (data){
            $scope.effectifTotalFemmePats=data;
             $scope.pourcentagePats=(($scope.effectifemployepats/$scope.effectifemploye)*100).toFixed(2);
            $scope.pourcentageHommesPats=(($scope.effectifTotalHommePats/$scope.effectifemployepats)*100).toFixed(2);
            $scope.pourcentageFemmesPats=(($scope.effectifTotalFemmePats/$scope.effectifemployepats)*100).toFixed(2);
            
            
             /*  Statistiques PATS / PER      */
            var chartPatsPer = AmCharts.makeChart("statPatsPer", {
              "type": "pie",
              "startDuration": 2,
               "theme": "light",
              "addClassNames": true,
              "legend":{
                    "position":"top",
                "margin":0,
                "autoMargins":false
              },
              "innerRadius": "20%",
              "defs": {
                "filter": [{
                  "id": "shadow",
                  "width": "200%",
                  "height": "200%",
                  "feOffset": {
                    "result": "offOut",
                    "in": "SourceAlpha",
                    "dx": 0,
                    "dy": 0
                  },
                  "feGaussianBlur": {
                    "result": "blurOut",
                    "in": "offOut",
                    "stdDeviation": 5
                  },
                  "feBlend": {
                    "in": "SourceGraphic",
                    "in2": "blurOut",
                    "mode": "normal"
                  }
                }]
              },
              "dataProvider": [{
                "categorie": "PATS",
                "pourcentage": $scope.pourcentagePats

              }, {
                "categorie": "PER",
                "pourcentage": (100 - $scope.pourcentagePats).toFixed(2)

              }],
              "valueField": "pourcentage",
              "titleField": "categorie",
                "labelRadius": 15,
              "depth3D": 20,
              "angle": 25,

              "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
              "export": {
                "enabled": true
              }
            });

            chartPatsPer.addListener("init", handleInit);

            chartPatsPer.addListener("rollOverSlice", function(e) {
              handleRollOver(e);
            });

            function handleInit(){
              chartPatsPer.legend.addListener("rollOverItem", handleRollOver);
            }

                /*   Fin Statistiques PATS / PER      */

                        /*  Statistiques Hommes et Femmes     */
            var chartHomFem = AmCharts.makeChart("statHomFem", {
              "type": "pie",
              "startDuration": 2,
               "theme": "light",
              "addClassNames": true,
              "legend":{
                    "position":"top",
                "margin":0,
                "autoMargins":false
              },
              "innerRadius": "20%",
              "defs": {
                "filter": [{
                  "id": "shadow",
                  "width": "200%",
                  "height": "200%",
                  "feOffset": {
                    "result": "offOut",
                    "in": "SourceAlpha",
                    "dx": 0,
                    "dy": 0
                  },
                  "feGaussianBlur": {
                    "result": "blurOut",
                    "in": "offOut",
                    "stdDeviation": 5
                  },
                  "feBlend": {
                    "in": "SourceGraphic",
                    "in2": "blurOut",
                    "mode": "normal"
                  }
                }]
              },
              "dataProvider": [{
                "genre": "Hommes",
                "pourcentage": $scope.pourcentageHommesPats
              }, {
                "genre": "Femmes",
                "pourcentage": $scope.pourcentageFemmesPats
              }],
              "valueField": "pourcentage",
              "titleField": "genre",
                "labelRadius": 15,
              "depth3D": 20,
              "angle": 25,

              "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
              "export": {
                "enabled": true
              }
            });

            chartHomFem.addListener("init", handleInit);

            chartHomFem.addListener("rollOverSlice", function(e) {
              handleRollOver(e);
            });

            function handleInit(){
              chartHomFem.legend.addListener("rollOverItem", handleRollOver);
            }

                /*   Fin Statistiques Hommes et Femmes      */



            function handleRollOver(e){
              var wedge = e.dataItem.wedge.node;
              wedge.parentNode.appendChild(wedge);
            }

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };




});

