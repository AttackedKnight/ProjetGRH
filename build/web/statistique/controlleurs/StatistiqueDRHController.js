angular.module('StatistiqueModule').controller('StatistiqueDRHController',function($scope ,$q,Securite, Statistique){
 
 
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */
   
    if(Securite.estConnecte()==false){
        document.location.href="#/";
        return; 
    } 
    $('.statistique').trigger('click');
    
    
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    $scope.effectifTotalHomme=0;
    $scope.effectifTotalFemme=0;
    
    $scope.effectifTotalHommePer=0;
    $scope.effectifTotalFemmePer=0;
    
    $scope.effectifTotalHommePats=0;
    $scope.effectifTotalFemmePats=0;
    
    $scope.pourcentageHommesPats=0;
    $scope.pourcentageFemmesPats=0;
    
    
   $scope.countemploye=function(){
        Statistique.countemploye().success(function (data){
            $scope.effectifemploye=data;
            
            $scope.voirPourcentageHommeFemmeGlobal();
            
            $scope.countemployepats();
            
           
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.countemploye();
      
      
    /*Effectif et pourcentage PER-PATS*/
    
    $scope.countemployepats=function(){
        Statistique.countemployepats().success(function (data){
            $scope.effectifemployepats=data;
            
            $scope.voirPourcentageHommeFemmePats();
            
            $scope.countemployeper();

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    $scope.countemployeper=function(){
        Statistique.countemployeper().success(function (data){
            $scope.effectifemployeper=data;
            
            $scope.voirPourcentageHommeFemmePer();
            
             $scope.calculerPourcentagePerEtPats();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    $scope.calculerPourcentagePerEtPats=function(){
        $scope.pourcentagePats=(($scope.effectifemployepats/$scope.effectifemploye)*100).toFixed(2);
        /*  Statistiques PATS / PER      */
            
            $scope.voirPourcentagePerEtPats($scope.pourcentagePats);
                
        /*   Fin Statistiques PATS / PER      */
    };
    
    $scope.voirPourcentagePerEtPats=function(pourcent_pats){
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
                "pourcentage": pourcent_pats

              }, {
                "categorie": "PER",
                "pourcentage": (100 - pourcent_pats).toFixed(2)

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
    };
    
    /*Effection et pourcentage PER-PATS*/
    
    
    
     /*Poucentage Homme-Femme*/
     
     
    /* global*/
     
    $scope.effectifTotalHomme=0;
    $scope.effectifTotalFemme=0;
    
    $scope.countemployehomme=function(){
        Statistique.countemployehomme().success(function (data){
            $scope.effectifTotalHomme=data;
            
            $scope.countemployefemme();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    $scope.countemployefemme=function(){
        Statistique.countemployefemme().success(function (data){
            $scope.effectifTotalFemme=data;
            
            $scope.pourcentageHommes=(($scope.effectifTotalHomme/$scope.effectifemploye)*100).toFixed(2);
            $scope.pourcentageFemmes=(($scope.effectifTotalFemme/$scope.effectifemploye)*100).toFixed(2);
                       
            
            /*  Statistiques Hommes et Femmes     */
            if($scope.typePourcentageHommeFemme=='general'){
                $scope.voirPourcentageHommeFemme($scope.pourcentageHommes,$scope.pourcentageFemmes);
            }
            /*   Fin Statistiques Hommes et Femmes      */        

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    
    /*Fin global*/
    
    /*Effectif Homme PER-PATS*/
    
     
    
    $scope.countemployehommepats=function(){
        Statistique.countemployehommepats().success(function (data){
            $scope.effectifTotalHommePats=data;
            
            $scope.countemployefemmepats();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    
    $scope.countemployehommeper=function(){
        Statistique.countemployehommeper().success(function (data){
            $scope.effectifTotalHommePer=data;
            
            $scope.countemployefemmeper();
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    /*Effectif Homme PER-PATS*/
    
    /*Effectif Femme PER-PATS*/
    
    $scope.countemployefemmepats=function(){
        Statistique.countemployefemmepats().success(function (data){
            $scope.effectifTotalFemmePats=data;
            
            $scope.pourcentageHommesPats=(($scope.effectifTotalHommePats/$scope.effectifemployepats)*100).toFixed(2);
            $scope.pourcentageFemmesPats=(($scope.effectifTotalFemmePats/$scope.effectifemployepats)*100).toFixed(2);
                       
            /*  Statistiques Hommes et Femmes     */
            if($scope.typePourcentageHommeFemme=='pats'){
                $scope.voirPourcentageHommeFemme($scope.pourcentageHommesPats,$scope.pourcentageFemmesPats);
            }
            /*   Fin Statistiques Hommes et Femmes      */        

        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    $scope.countemployefemmeper=function(affiche){
        Statistique.countemployefemmeper().success(function (data){
            $scope.effectifTotalFemmePer=data;
            $scope.pourcentagePer=(($scope.effectifemployeper/$scope.effectifemploye)*100).toFixed(2);
            $scope.pourcentageHommesPer=(($scope.effectifTotalHommePer/$scope.effectifemployeper)*100).toFixed(2);
            $scope.pourcentageFemmesPer=(($scope.effectifTotalFemmePer/$scope.effectifemployeper)*100).toFixed(2);
            
           
            /*  Statistiques Hommes et Femmes  : PER  */
            if($scope.typePourcentageHommeFemme=='per'){
                $scope.voirPourcentageHommeFemme($scope.pourcentageHommesPer,$scope.pourcentageFemmesPer);
            }
            

            /*   Fin Statistiques Hommes et Femmes  :per    */
                
          
            
        }).error(function () {
            alert('Une erreur est survenue');
        }); 
    };
    
    
     /*Effectif Femme PER-PATS*/
     
     /*Poucentage Homme-Femme*/
        
    $scope.typePourcentageHommeFemme='general';
       
    /*       GLOBAL         */
    
    $scope.voirPourcentageHommeFemmeGlobal=function(){
        $scope.countemployehomme();  
    };
     
    /*       GLOBAL         */
     
    /*       PATS         */
     
    $scope.voirPourcentageHommeFemmePats=function(){
        $scope.countemployehommepats();
    };
    
   /*       PATS         */
    
    /*       PER         */
    
    $scope.voirPourcentageHommeFemmePer=function(){
        $scope.countemployehommeper();
    };
    
    /*       PER         */
    
    $scope.changerTypePourcentageHommeFemme=function(){
        $scope.typePourcentageHommeFemme=$('#typePourcentageHF').val();
        console.log($scope.typePourcentageHommeFemme);
        if($scope.typePourcentageHommeFemme=='general'){
            $scope.voirPourcentageHommeFemmeGlobal();
        }
        else if($scope.typePourcentageHommeFemme=='pats'){
            $scope.voirPourcentageHommeFemmePats();
        }
        else{
            $scope.voirPourcentageHommeFemmePer();
        }
    };
    
    
    $scope.voirPourcentageHommeFemme=function(percent_hom,percent_fem){
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
                "pourcentage": percent_hom
              }, {
                "genre": "Femmes",
                "pourcentage": percent_fem
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


            function handleRollOver(e){
                var wedge = e.dataItem.wedge.node;
                wedge.parentNode.appendChild(wedge);
            }
    };
    
    /*Poucentage Homme-Femme*/
    
    
    /*Trache age*/

    $scope.typeTrancheAge='general';

    $scope.changerTypeTrancheAge=function(){
        $scope.typeTrancheAge=$('#typeTrancheAge').val();
        console.log($scope.typeTrancheAge)
        $scope.debutTrancheAge=20;
        $scope.finTrancheAge=60;
        $scope.intervalleTrancheAge=4;

        $scope.construireGrapheTranche($scope.debutTrancheAge, $scope.finTrancheAge,$scope.intervalleTrancheAge);

    };

    $scope.today=new Date();

    $scope.trancheAge=function(debut,fin){

        var from=new Date();
        var to=new Date();

        from.setFullYear(from.getFullYear()-debut);

        to.setFullYear(to.getFullYear()-fin);

        var debut=from.getFullYear()+'-'+(from.getMonth()+1)+'-'+from.getDate();
        var fin=to.getUTCFullYear()+'-'+(to.getUTCMonth()+1)+'-'+to.getUTCDate();

        var dates=debut+'/'+fin;

        return dates;
    };

         
        $scope.construireGrapheTranche=function(debut,fin, intervalle){
            $scope.donnees=[];
           
            var end=debut+intervalle;
            
            var intervalle_date;
            var date1;
            var date2;
            
            var req_h=[];
            var req_f=[];
            /*Creation de l'objet a afficher sur le graphe*/
            while(end<=fin){              
                intervalle_date= $scope.trancheAge(debut,end);
                date1=intervalle_date.split('/')[0];
                date2=intervalle_date.split('/')[1];
                var une_barre={};
                une_barre.annee=debut+'-'+end;

                $scope.donnees.push(une_barre);
                
                debut=end;
                end=debut+intervalle;
                
                if($scope.typeTrancheAge=='general'){
                    var promise_h = Statistique.trancheagehommes(date1,date2);
                    req_h.push(promise_h);

                    var promise_f = Statistique.trancheagefemmes(date1,date2);
                    req_f.push(promise_f);
                }
                else if($scope.typeTrancheAge=='per'){
                    var promise_h = Statistique.trancheagehommesper(date1,date2);
                    req_h.push(promise_h);

                    var promise_f = Statistique.trancheagefemmesper(date1,date2);
                    req_f.push(promise_f);
                }
                else{
                    var promise_h = Statistique.trancheagehommespats(date1,date2);
                    req_h.push(promise_h);

                    var promise_f = Statistique.trancheagefemmespats(date1,date2);
                    req_f.push(promise_f);
                }
                
                
            }
            
            $q.all(req_h).then(function (result){
                
                for(var i=0;i<result.length;i++){
                    $scope.donnees[i].hommes=parseInt(result[i].data);
                }
                
                $q.all(req_f).then(function (result){
                    for(var i=0;i<result.length;i++){
                        $scope.donnees[i].femmes=parseInt(result[i].data);
                    }

                    /*Dessiner le graphe Tranche d'age*/
                    $scope.tracerDiagrammeTrancheAge($scope.donnees);
                    

                });
            });


    
        };
        
        $scope.tracerDiagrammeTrancheAge=function(donnees){
            var chartTrancheAge = AmCharts.makeChart("trancheAge", {
                         "theme": "light",
                         "type": "serial",
                       "startDuration": 2,
                         "dataProvider": donnees,
                         "valueAxes": [{
                       "position": "left"
                         }],
                         "graphs": [{
                             "balloonText": "[[category]]:<br/> <b> Hommes [[value]]</b>",

                             "fillAlphas": 1,
                             "lineAlpha": 0.1,
                             "type": "column",
                             "valueField": "hommes"
                         },{
                             "balloonText": "[[category]]:<br/> <b> Femmmes [[value]]</b>",

                             "fillAlphas": 1,
                             "lineAlpha": 0.1,
                             "type": "column",
                             "valueField": "femmes"
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
        };  
        
        
        $scope.debutTrancheAge=20;
        $scope.finTrancheAge=60;
        $scope.intervalleTrancheAge=4;
        
        $scope.construireGrapheTranche($scope.debutTrancheAge, $scope.finTrancheAge,$scope.intervalleTrancheAge);
        
        $scope.actualiserTrancheAge=function(d,f,i){
            if(parseInt(d)>0 && parseInt(f)>0 && parseInt(i)>0){
                if(parseInt(d)>parseInt(f)){
                    alert('La valeur de début doit etre inférieure à celle de fin');
                }
                else{
                    $scope.construireGrapheTranche(parseInt(d),parseInt(f),parseInt(i));
                }
            }
            
            
        };
        
        
         /*Trache age*/
                
                
        
        /*Debut RECRUTEMENT*/
        
            $scope.typeRecrutementParAnnee='general';

            $scope.changerTypeRecrutementParAnnee=function(){
                $scope.typeRecrutementParAnnee=$('#typeRecrutementParAnnee').val();
                $scope.intervaleAnneeRecrutement=5;

                $scope.countRecrutement($scope.intervaleAnneeRecrutement);
                console.log(typeRecrutementParAnnee);
            };
            
            
            
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }
            
            function supprimerCouleur(colorsTab,index){
                var tab=[];
                var j=0;
                for(var i=0;i<colorsTab.length;i++){
                    if(i!==index){
                        
                        tab[j]=colorsTab[i];
                        j++;
                    }
                }
                
                return  tab;
            }

           $scope.countRecrutement=function(nombreAnnees){
                $scope.recrutements=[];
                
                var colors=["#000000","#A52A2A","#DC143C" ,"#006400" ,"#1E90FF","#2F4F4F" ,"#FFD700" ,"#FF69B4" ,"#ADFF2F","#0000CD","#FF4500","#046380"];
                
                var d = new Date();
                var n = d.getFullYear();
                 
                var debutAnnee;
                var finAnnee;
                var i=0;
                
                var req_recru=[];
                 /*Creation de l'objet a afficher sur le graphe*/
                while(nombreAnnees>0){              

                    //Recrutements effectues entre le 1 janvier et le 31 decembre de l'annee
                     debutAnnee=n+'-01-01';
                     finAnnee=n+'-12-31';                     
                    //Recrutements effectues entre le 1 janvier et le 31 decembre de l'annee
                    
                    i=getRandomInt(colors.length);
                    
                    var une_barre={};
                    une_barre.annee=parseInt(n);
                    une_barre.color=colors[i];
                    
                    colors=supprimerCouleur(colors,i); //Supprimer la couleur de la liste des couleurs:éviter répétition

                    $scope.recrutements.push(une_barre);


                    if($scope.typeRecrutementParAnnee=='general'){
                        var promise_recru = Statistique.compterRecrutement(debutAnnee,finAnnee);
                        req_recru.push(promise_recru);
                    }
                    else if($scope.typeRecrutementParAnnee=='per'){
                        var promise_recru = Statistique.compterRecrutementPer(debutAnnee,finAnnee);
                        req_recru.push(promise_recru);
                    }
                    else{
                        var promise_recru = Statistique.compterRecrutementPats(debutAnnee,finAnnee);
                        req_recru.push(promise_recru);
                    }
                    
                    

                    n-=1;
                    nombreAnnees--;
                }
                
                $q.all(req_recru).then(function (result){
                    for(var i=0;i<result.length;i++){
                        $scope.recrutements[i].pourcentage=parseInt(result[i].data);
                    }
                    
                    $scope.recrutements.reverse();
                    
                    $scope.tracerDiagrammeRecrutementParAnnee($scope.recrutements);
//                    console.log($scope.recrutements);
                });
                
           };
           
          
        $scope.tracerDiagrammeRecrutementParAnnee=function(recrutements){
          var chartnbreRecrutement = AmCharts.makeChart("statNbreRecrutement", {
                        "theme": "light",
                        "type": "serial",
                      "startDuration": 2,
                        "dataProvider": recrutements,
                        "valueAxes": [{
                      "position": "left"
                        }],
                        "graphs": [{
                            "balloonText": "[[category]]: <b>[[value]]</b><br/>",
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
        };
        
        $scope.intervaleAnneeRecrutement=5;

        $scope.countRecrutement($scope.intervaleAnneeRecrutement);

        $scope.voirRecrutement=function(n){
            if(parseInt(n)>0){
                $scope.countRecrutement(parseInt(n));
            }
        };

      /*- Fin RECRUTEMENT*/
     
    
    
    
    
    /*Debut Niveau etude*/

        var chartNiveauEtude = AmCharts.makeChart("niveauEtude", {
          "theme": "light",
          "type": "serial",
        "startDuration": 2,
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

    
    
    
    
        /*DEBUT METIER*/
                
            var chart = AmCharts.makeChart("statFonction", {
                "type": "pie",
                "startDuration": 1,
                 "theme": "light",
                "addClassNames": true,
                "legend":{
                      "position":"right",
                  "marginRight":100,
                  "autoMargins":false
                },
                "innerRadius": "10%",
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
                  "metier": "secretaire",
                  "nombre": 50
                }, {
                  "metier": "directeur",
                  "nombre": 10
                }, {
                  "metier": "chauffeur",
                  "nombre": 10
                }, {
                  "metier": "informaticien",
                  "nombre": 16
                }, {
                  "metier": "gardien",
                  "nombre": 13
                }, {
                  "metier": "videur",
                  "nombre": 12
                }, {
                  "metier": "cadre",
                  "nombre": 50
                }],
                "valueField": "nombre",
                "titleField": "metier",
                "export": {
                  "enabled": true
                }
              });

              chart.addListener("init", handleInit);

              chart.addListener("rollOverSlice", function(e) {
                handleRollOver(e);
              });

              function handleInit(){
                chart.legend.addListener("rollOverItem", handleRollOver);
              }

              function handleRollOver(e){
                var wedge = e.dataItem.wedge.node;
                wedge.parentNode.appendChild(wedge);
              }
                /* FIN METIER*/

    

});




