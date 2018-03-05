angular.module('StatistiqueModule').controller('StatistiquePERController',function($scope,Securite,Statistique){
   
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
            $scope.countemployeper();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.countemploye();
    
    $scope.countemployeper=function(){
        Statistique.countemployeper().success(function (data){
            $scope.effectifemployeper=data;
            $scope.countemployehommeper();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
     
   
      
    $scope.effectifTotalHommePer=0;
    $scope.effectifTotalFemmePer=0;
    
    $scope.countemployehommeper=function(){
        Statistique.countemployehommeper().success(function (data){
            $scope.effectifTotalHommePer=data;
            $scope.countemployefemmeper();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    
    $scope.countemployefemmeper=function(){
        Statistique.countemployefemmeper().success(function (data){
            $scope.effectifTotalFemmePer=data;
            $scope.pourcentagePer=(($scope.effectifemployeper/$scope.effectifemploye)*100).toFixed(2);
            $scope.pourcentageHommesPer=(($scope.effectifTotalHommePer/$scope.effectifemployeper)*100).toFixed(2);
            $scope.pourcentageFemmesPer=(($scope.effectifTotalFemmePer/$scope.effectifemployeper)*100).toFixed(2);
            
            
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
                "pourcentage": (100 - $scope.pourcentagePer).toFixed(2)

              }, {
                "categorie": "PER",
                "pourcentage": $scope.pourcentagePer

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
                "pourcentage": $scope.pourcentageHommesPer
              }, {
                "genre": "Femmes",
                "pourcentage": $scope.pourcentageFemmesPer
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


