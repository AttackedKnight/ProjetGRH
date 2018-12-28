/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('AvancementController', function ($scope, SweetAlert,
        HistoriqueGrade,GradeTypeEmploye, UploadFile, Typedocument,Document,$q)
{


    $scope.fonction = {id: ""};
    $scope.formProvenanceFichier = "";
     $scope.lesFichiers = null;
    $scope.document = {id: "", dateEnregistrement: $scope.$parent.today};
    
    $scope.message = "Bonjour , inf pro ctrl message";
//
//    $scope.templates=[{name:"Informations generales",url:"infosGenerales.html"},
//        {name:"Informations professionelles",url:"infosPro.html"}]

        /*Donnees qui varient selon le type de l'employe*/
        console.log($scope.$parent.employe.typeEmploye.id);
        GradeTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
            $scope.grades = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des grades !");
        });
        

        /*Donnees qui varient selon le type de l'employe*/

        
        $scope.historiqueGrade = {id: "", employe: $scope.$parent.employe, encours: 1};

       
        

        $(function () {
            $('a').tooltip();
        });
    
  /*                     AVANCEMENT                                 */

    $scope.showGradeList = false;

    $scope.toggleGradeList = function () {
        $scope.showGradeList = !$scope.showGradeList;
        if ($scope.showGradeList == true) {
            if ($scope.gradeActu.grade) {
                $scope.selection = ($scope.gradeActu.grade.corps.libelle) ? $scope.gradeActu.grade.corps.libelle : $scope.gradeActu.grade.classe.libelle;
            } else {
                $scope.selection = "";
            }

        }
    };

    $scope.mesgrades = [];
    $scope.gradeActu = {};

    $scope.listerHistoriqueAvancement = function () {
        HistoriqueGrade.findByEmploye($scope.$parent.employe).success(function (data) {
            if (data) {
                $scope.mesgrades = data;
                $scope.gradeActu = $scope.mesgrades[0];
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du grade");
        });
    };
    
     $scope.listerHistoriqueAvancement();
     
      $scope.ajouterGrade = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        if ($scope.gradeActu.grade) {
            $scope.gradeActu.encours = false;
            HistoriqueGrade.edit($scope.gradeActu).success(function () {
                $scope.addGrade();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur de mise à jour");
            });
        } else {
            $scope.addGrade();
        }

    };
    $scope.lastGrade= function (){
        HistoriqueGrade.findLast($scope.$parent.employe.id).success(function (data) {
        $scope.document.historiqueGrade = data;
        $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement du dernier grade !");
        });
    };
     
    
    $scope.addGrade = function () {
        var datePassation = new Date();
        var dateProchainAvancement = new Date();
        dateProchainAvancement.setFullYear(dateProchainAvancement.getFullYear() + $scope.historiqueGrade.grade.duree);

        $scope.historiqueGrade.datePassation = datePassation;
        $scope.historiqueGrade.dateProchainAvancement = dateProchainAvancement;

        HistoriqueGrade.add($scope.historiqueGrade).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Grade enregistré avec succes");
//            $scope.listerHistoriqueAvancement();
//            $scope.reinitialiserFormulaireAvancement();
               $scope.lastGrade();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le grade n'a pas pu etre ajouté");
        });
    };
    
    

    $scope.controlGradeForm = function (formulaire) {
        var validite = true;
        if (!$scope.historiqueGrade.grade || $scope.historiqueGrade.grade == null) {
            $('.grade-not-selected').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
             if ($scope.controlDocumentForm(formulaire)) {
                 $scope.completerDocument();
                 $scope.ajouterGrade();
           }
    };

   };

    

    $scope.reinitialiserFormulaireAvancement = function () {
        $scope.selection = "";
        $scope.historiqueGrade = {id: "", employe: $scope.$parent.employe, encours: 1};
         $scope.document = {id: "", dateEnregistrement: $scope.today};
          $scope.lesFichiers = null;
    };

    /*                     AVANCEMENT                                 */

/*Gestion des documents electroniques*/
    $scope.lesFichiers = null;
    $scope.document = {id: "", dateEnregistrement: $scope.today};


   

   
    /*Gestion des documents electroniques*/

    $scope.deleteGrade = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        HistoriqueGrade.delete(id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.listerHistoriqueAvancement();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

    /*last*/
    
    /*Gestion des documents electroniques*/
   

    $scope.controlDocumentForm = function (formulaire) {
        var validite = true;
        $('#' + formulaire + ' textarea').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.document.typeDocument == null) {
            $('#' + formulaire + ' .type-doc-missing').show("slow").delay(3000).hide("slow");
            validite = false;
        }

        if ($scope.lesFichiers == null) {
            $('#' + formulaire + ' .missing-file').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        
        return validite;

    };

    /*Complete les autres informations sur le document : l'employe, la date d'echeance, ...*/
    $scope.completerDocument = function () {
        $scope.document.employe = $scope.$parent.employe;
        var e = new Date();
        e.setFullYear(e.getFullYear() + $scope.document.typeDocument.dureeArchivage);
        $scope.document.echeance = e;      
    };

    $scope.cancelFileUpload = function () {
        $('#' + $scope.formProvenanceFichier + ' .detailUpload').html('');
        $scope.lesFichiers = null;

    };

    $scope.previewUpload = function (fichiers, formulaire) {
        $scope.formProvenanceFichier = formulaire;
        $scope.lesFichiers = fichiers;
        for (var i = 0; i < fichiers.files.length; i++) {
            $scope.fichierEnvoye = fichiers.files[i];
            if ($scope.afficheDetail($scope.fichierEnvoye, i) === true) {
                var reader = new FileReader();
                reader.readAsDataURL($scope.fichierEnvoye);
            }
        }
    };

    $scope.afficheDetail = function (file, indice) {
        var allowedTypes = "pdf";                  //Type de fichier autorise  
        var imgType = file.name.split('.');
        imgType = imgType[imgType.length - 1].toLowerCase(); //Recuperer l'extension du fichier
        if (imgType === allowedTypes) {

            var talle = Math.ceil(file.size / 1024);
            $('#' + $scope.formProvenanceFichier + ' .detailUpload').append('<div><span clas>' + file.name + '</span><div class="progress progress-striped active"><div id="barreProgression_' + indice + '" class="progress-bar"></div></div><div id="pourcentage_' + indice + '" class="pull-right"></div> </div>');

            return true;
        } else {
            $scope.cancelFileUpload();
            $(".error-format").show("slow").delay(3000).hide("slow");
            return false;
        }
    };

    $scope.addDocument = function (emplacementFichiers) {
        var req_tab = [];       
        var instanceDoc ;
        for (var i = 0; i < emplacementFichiers.length; i++) {   //  Parcour des emplacements des fichier uploades
            instanceDoc = angular.copy($scope.document);
            instanceDoc.emplacement= emplacementFichiers[i];     
            req_tab.push(Document.add(instanceDoc));    //Ajout dans la base de donnees
        }
        $q.all(req_tab).then(function () { //Si l'upload dans le dossier physique a reussi
            $scope.document = {id: "", dateEnregistrement: $scope.today};    
             $scope.listerHistoriqueAvancement();
            $scope.reinitialiserFormulaireAvancement();
            $scope.$parent.listerMesDocuments();
        });
    };

   
    /*Gerer l'upload de fichier*/

    $scope.uploadDocument = function (fichiers) {
        if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
            var req_tab = [];
            for (var i = 0; i < fichiers.files.length; i++) {   //  Parcour des fichier a uploader
                $scope.fileToUpload = fichiers.files[i];
                var format = $scope.fileToUpload.name.split("."); //Recuperation du format
                format = format[format.length - 1];
                var fd = new FormData();                //Creation d'un objet FormData
                fd.append($scope.$parent.employe.numeroCni, $scope.fileToUpload);   //Ajout du fichier et de son emplacement au FormData
                req_tab.push(UploadFile.uploadDocument(fd));    //Upload dans le dossier physique
            }
            $q.all(req_tab).then(function (results) { //Si l'upload dans le dossier physique a reussi
                var emplacement = [];
                for (var i = 0; i < results.length; i++) { //Recuperer les emplacement de chaque fichier uploader dans le dossier physique
                    emplacement.push(results[i].data);
                }
                $scope.addDocument(emplacement);               //Ajout dans la base de donnees     
                UploadFile.resetHttp();
            });

        } else {
            SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
        }

    };
    /*Gestion des documents electroniques*/

    $scope.deleteArchiveAvancement = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
            Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                    .then(function (value) {
                        if (value == true) {
                            $scope.deleteDocumentAvancement(doc);
                        }
                    });
        } else {
            SweetAlert.simpleNotification("warning", "Attention", "Vous ne pouvez pas supprimer ce document \n\
                                            car la date d'écheance n'est pas encore atteinte");
        }

    };

    $scope.deleteDocumentAvancement = function (document) {
        UploadFile.delete(angular.toJson({chemin: document.emplacement})).success(function () {
            Document.delete(document.id).success(function () {
                SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                $scope.$parent.listerMesDocuments();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du document");
            });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du fichier");
        });
    };

   
});