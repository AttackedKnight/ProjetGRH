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
              "startDuration": 1,
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
              "startDuration": 1,
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
                
                
                //Tranche d'age
        var bar = new Morris.Bar({
          element: 'statTrancheAge',
          resize: true,
          
          data: [
            {y: '20 - 25', Hommes : 100, Femmes : 90},
            {y: '25 - 30', Hommes : 75, Femmes : 65},
            {y: '30 - 35', Hommes : 50, Femmes : 40},
            {y: '35 - 40', Hommes : 75, Femmes : 65},
            {y: '40 - 45', Hommes : 50, Femmes : 40},
            {y: '45 - 50', Hommes : 75, Femmes : 65},
            {y: '50 - 55', Hommes : 100, Femmes : 90},
            {y: '55 - 60', Hommes : 50, Femmes : 40},
            {y: '60 - 65', Hommes : 75, Femmes : 65}
            
          ],
          barColors: ['#00a65a', '#f56954'],
          xkey: 'y',
          ykeys: ['Hommes', 'Femmes'],
          labels: ['Hommes', 'Femmes'],
          hideHover: 'auto'
         
        });
        
     //Tranche d'age

                
                
/*Debut Niveau etude*/

      var chartTrancheAge = AmCharts.makeChart("niveauEtude", {
          "theme": "light",
          "type": "serial",
        "startDuration": 1,
          "dataProvider": [{
              "annee": "BFEM",
               "pourcentage": 90,
              "color": "#FF0F00"
          }, {
              "annee": "BAC",
              "pourcentage": 93,
              "color": "#FF6600"
          }, {
              "annee": "LICENCE",
              "pourcentage": 82,
              "color": "#FF9E01"
          }, {
              "annee": "MASTER",
              "pourcentage": 95,
              "color": "#FCD202"
          }, {
              "annee": "DOCTORAT",
              "pourcentage": 88,
              "color": "#F8FF01"
          }],
          "valueAxes": [{
        "position": "left"
          }],
          "graphs": [{
              "balloonText": "[[category]]: <b>[[value]]%</b><br/> Homme [[value]]%<br/> Homme [[value]]%",
              "fillColorsField": "color",
              "fillAlphas": 1,
              "lineAlpha": 0.1,
              "type": "column",
              "valueField": "pourcentage"
          }],
          "depth3D": 20,
        "angle": 30,
          "chartCursor": {
              "categoryBalloonEnabled": true,
              "cursorAlpha": 0,
              "zoomable": false
          },
          "categoryField": "annee",
          "categoryAxis": {
              "gridPosition": "start",
              "labelRotation": 0
          }
      
      });
     


/*- Fin niveau d'etude*/



            function handleRollOver(e){
              var wedge = e.dataItem.wedge.node;
              wedge.parentNode.appendChild(wedge);
            }
            
            
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
});


