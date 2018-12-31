/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('InfosProfessionellesController', function ($scope, SweetAlert, $q, Entite,
        Servir, Fonction, Typecontrat, Civilite, FonctionAnnexe, Document)
{

    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des entités");
    });
    Typecontrat.findAll().success(function (data) {
        $scope.typecontrats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de contrats");
    });
    Fonction.findAll().success(function (data) {
        $scope.fonctions = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des fonctions");
    });
    FonctionAnnexe.findAll().success(function (data) {
        $scope.fonctionsAnnexes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des fonctions");
    });

    $(function () {
        $('a').tooltip();
    });

    $scope.fannexe = false;
    $scope.cddContrat = false;
    $scope.getTypeContrat = function () {
        if ($scope.servir.typeContrat.code == 'cdd') {
            $scope.cddContrat = true;
        } else {
            $scope.cddContrat = false;
        }
    };

    /*                    Parcours professionel                       */


    $scope.formProvenanceFichier = "";
    $scope.initServir = function () {
        $scope.fonction = {id: ""};
        $scope.servir = {id: "", employe: $scope.employe, debut: new Date()};
    };
    $scope.initServir();

    $scope.finContratApproche = false;
    $scope.finContratDepasse = false;
    $scope.finContratNombreJoursCritique = 15;

    $scope.findServir = function () {
        /*Recuperer le parcour professionnel de l'employe*/
        Servir.findByEmploye($scope.employe).success(function (data) {
            $scope.parcours = data;
            if (!$scope.$parent.estPermanent) {
                var df = new Date($scope.parcours[0].fin);
                var joursRestants = df - $scope.today;
                joursRestants = joursRestants / 1000 / 60 / 60 / 24;

                if (joursRestants < 0) {  //Date fin de contrat depass�
                    $scope.finContratDepasse = true;
                } else {
                    if (joursRestants < $scope.finContratNombreJoursCritique) {  //Date fin de contrat depass�
                        $scope.finContratApproche = true;
                    }
                }
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des informations sur le poste !");
        });
    };

    $scope.findServir();

    $scope.finirService = function (serviceActuel) {
        serviceActuel.fin = new Date();
        serviceActuel.finService = 1;
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Servir.finirService(serviceActuel).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "");
            $scope.findServir();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de traitement");
        });

    };

    $scope.editJobOperation = false;
    $scope.setJob = function (servir) {
        $scope.editJobOperation = true;
    };
    $scope.controlJobForm = function (formulaire) {
        var validite = true;

        $('.newEmploiForm input[type=text],.newEmploiForm input[type=number]').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        console.log($scope.servir.fonctionAnnexe)
        if ($scope.fannexe == true && (angular.isUndefined($scope.servir.fonctionAnnexe) || $scope.servir.fonctionAnnexe ==null)) {
            console.log("Entre")
            $('#fannexeManquante').show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if ($scope.servir.entite == null) {
            $('#entite').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
//        if (!$scope.$parent.estPermanent && $scope.cddContrat) {
//            if ($scope.servir.typeContrat == null) {
//                $('#contrat').parent().next().show("slow").delay(3000).hide("slow");
//                validite = false;
//            }
//        }

        if (validite === true) {
            
            /*Si c'est une operation d'ajout*/
            if ($scope.editJobOperation == false) {
                if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        if ($scope.fannexe == false) {
                            if(angular.isUndefined($scope.servir.fonctionAnnexe))
                                $scope.servir.fonctionAnnexe =null;
                            $scope.addFonctionServir();
                        } else {
                            $scope.completerServir();
                        }

                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }

            }
            
            /*Si c'est une operation de modification 
             *  */
//            if ($scope.editJobOperation == true) {
//                if ($scope.lesFichiers != null) { //S'il y a des fichiers(nouveaux fichiers) , on l'ajoute
//                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
//                        if ($scope.controlDocumentForm(formulaire)) {
//                            $scope.completerDocument();
//                            $scope.document.servir = $scope.servir;
//                            $scope.uploadDocument($scope.lesFichiers);
//                            $scope.updateServir();
//                        }
//                    } else {
//                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
//                    }
//                } else {
//                    $scope.updateServir();
//                }
//
//            }
            

        }
    };

    $scope.prolongerContrat = function (leService) {
        swal({
            title: 'Le nombre de mois ?',
            input: 'number',
            showCancelButton: true,
            inputValidator: (value) => {
                return !value && 'Renseigner une valeur!'
            },
            inputAttributes: {
                max: 99,
                min: 1
            }
        }).then(function (result) {
            if (result.value) {
                leService.dureeDuContrat = leService.dureeDuContrat + parseInt(result.value);
                var dateFinService = new Date(leService.debut);
                dateFinService.setMonth(dateFinService.getMonth() + leService.dureeDuContrat);
                leService.fin = dateFinService;
                $scope.editServir(leService);
            }
        });
    };

    $scope.editServir = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Servir.edit(s).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "");
            Servir.findByEmploye($scope.employe);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de traitement");
        });
    };

    $scope.addFonctionServir = function () {
        var req_tab = [];
        req_tab.push(Fonction.findByLibelle($scope.fonction.libelle));
        $q.all(req_tab).then(function (results) { //Si la fonction existe deja(parametre)
            console.log(results[0].data)
            if (results[0].data) {    //Si oui
                $scope.servir.fonction = results[0].data;
                if ($scope.servir.fonction.responsabilite == true) {//Verifier si c'est un poste de responsabilite
                    $scope.servir.responsable = 1;
                    console.log("Fonction principale Poste de responsabilite");
                } else {
                    $scope.servir.responsable = 0;
                }
                $scope.completerServir();
            } else {   //On ajoute ca dans la base
                $scope.servir.responsable = 0;
                $q.all(Fonction.add($scope.fonction)).then(function () {
                    var req_tab = [];
                    req_tab.push(Fonction.findByLibelle($scope.fonction.libelle));
                    $q.all(req_tab).then(function (results) { //On le recuppere
                        $scope.servir.fonction = results[0].data;
                        $scope.completerServir();
                    });
                });                
            }
        });
    };
    $scope.completerServir = function () {
        console.log("Completer servir");

        if ($scope.cddContrat) {   //Calculer la date de fin du contrat 
            var dateFinService = new Date($scope.servir.debut);
            dateFinService.setMonth(dateFinService.getMonth() + $scope.servir.dureeDuContrat);
            $scope.servir.fin = dateFinService;
        }
        if ($scope.fannexe == true) {   //Si fonction annexe :Calculer la date de fin du mandat et verifier si c'est une poste de responsabilite
            var dateFinService = new Date($scope.servir.debut);
            dateFinService.setMonth(dateFinService.getMonth() + $scope.servir.fonctionAnnexe.duree);
            $scope.servir.fin = dateFinService;

            if ($scope.servir.fonctionAnnexe.responsabilite == true) {
                $scope.servir.responsable = 1;
                console.log("Fonction annexe Poste de responsabilite");
            } else {
                $scope.servir.responsable = 0;
            }
        }

        console.log($scope.servir);

//        /* Verifier d'abord que l'employe n'occupe pas un autre poste*/
//        Servir.enService($scope.employe).success(function (data) {
//            SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
//            if (data.value == true) {
//                SweetAlert.notificationAvecSuggestion("info", "Information", "Cet employé est en service actuellement",
//                        "<h5>Clicker sur le boutton <b>fin</b> d'abord</h5>");
//            } else {
//                /*Si c'est un poste poste de responsabilité, vérifier que ce n'est pas occupe pas quelqu'un autre*/
//                if ($scope.servir.responsable === 1) {
//                    Servir.findResponsableEntite($scope.servir.entite).success(function (data) {
//                        if (!data) {
//                            $scope.ajouterNouvelPoste();
//                        } else {
//                            $('.conflit-poste').show("slow").delay(3000).hide("slow");
//                        }
//                    }).error(function () {
//                        SweetAlert.simpleNotification("error", "Erreur", "Erreur de vérification du responsable");
//                    });
//                } else {
//                    $scope.ajouterNouvelPoste();
//                }
//            }
//        }).error(function () {
//            SweetAlert.simpleNotification("error", "Erreur", "Erreur de vérification");
//        });

    };

//    $scope.addServir = function () {
//        Servir.add($scope.servir).success(function () {
//            SweetAlert.simpleNotification("success", "Succes", "Nouveau poste enregistré avec succes");
//            $scope.reinitialiserFormulaireParcours();
//            $scope.findServir();
//        }).error(function () {
//            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement\n\
//                des informations sur le nouveau poste");
//        });
//    };

    $scope.reinitialiserFormulaireParcours = function () {
        $scope.fonction = {id: ""};
        $scope.servir = {id: "", employe: $scope.employe, debut: new Date()};
        $scope.document = {id: "", dateEnregistrement: $scope.$parent.today};
    };

    /*                    Parcours professionel                       */

    /*Gestion des documents electroniques*/
    $scope.lesFichiers = null;
    $scope.initDocument = function () {
        $scope.document = {id: "", dateEnregistrement: $scope.$parent.today};
    };
    $scope.initDocument();

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
        var instanceDoc;
        for (var i = 0; i < emplacementFichiers.length; i++) {   //  Parcour des emplacements des fichier uploades
            instanceDoc = angular.copy($scope.document);
            instanceDoc.emplacement = emplacementFichiers[i];
            req_tab.push(Document.add(instanceDoc));    //Ajout dans la base de donnees
        }
        $q.all(req_tab).then(function () { //Si l'upload dans le dossier physique a reussi
            if ($scope.traitementSMatrimoniale == true) {
                $scope.editEmploye();
                $scope.traitementSMatrimoniale = false;
            }
            //Reinitialisation et raffraichissement liste document
            $scope.initDocument();
            $scope.cancelFileUpload();
            $scope.$parent.listerMesDocuments();
        });
    };

    $scope.editEmploye = function () {
        $scope.toggleSituationMatriEditForm();
        Employe.edit($scope.$parent.employe).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
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


    $scope.deleteArchiveSituationMatrimoniale = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
            Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                    .then(function (value) {
                        if (value == true) {
                            $scope.deleteDocumentSituationMatrimoniale(doc);
                        }
                    });
        } else {
            SweetAlert.simpleNotification("warning", "Attention", "Vous ne pouvez pas supprimer ce document \n\
                                            car la date d'écheance n'est pas encore atteinte");
        }

    };

    $scope.deleteDocumentSituationMatrimoniale = function (document) {
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

    /*Gestion des documents electroniques*/
});