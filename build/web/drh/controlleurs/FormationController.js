/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('FormationController', function ($scope, SweetAlert, UploadFile,
        Diplome, Formation, Document, $q)
{


    /*        formation              */
    $scope.formations = [];
    $scope.diplomante = false;
    $scope.diplome = {id: ""};
    $scope.formation = {id: "", employe: $scope.$parent.employe};
    $scope.editFormationOperation = false;


    $scope.toggleDiplomante = function (el) {
        $scope.typeFormation = $(el).val();
        $scope.diplomante = (parseInt($scope.typeFormation) == 0) ? true : false;
    };
    $scope.controlFormationForm = function (formulaire) {
        var validite = true;
        $('.formationForm input:not([type="file"])').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            if ($scope.editFormationOperation == false) {
                if ($scope.controlDocumentForm(formulaire)) {
                    /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
                     * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                        $scope.completerDocument();
                        if ($scope.diplomante == true) {
                            $scope.completeFormation();
                        } else {
                            $scope.addFormation();
                        }
                    } else {
                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                    }
                }

            }
            if ($scope.editFormationOperation == true) { //S'il s'agit d'un ajout
                if ($scope.wasDiplomante == false && $scope.diplomante == true) { //Si la formation passe de non diplomante a diplomante
                    if ($scope.lesFichiers != null) {   /*S'il ya des fichier,les controlle avant de continuer*/
                        if ($scope.controlDocumentForm(formulaire)) {
                            $scope.completerDocument();
                            $scope.document.formation = $scope.formation;
                            $scope.uploadDocument($scope.lesFichiers);
                            $scope.completeFormation();
                        }
                    } else {
                        $scope.completeFormation();
                    }
                }
                else {
                    if ($scope.wasDiplomante == true && $scope.diplomante == false) { //Si la formation passe de diplomante a non diplomante
                        $scope.formation.diplome = null;
                    }
                    if ($scope.lesFichiers != null) {   /*S'il ya des fichier,les controlle avant de continuer*/
                        if ($scope.controlDocumentForm(formulaire)) {
                            $scope.completerDocument();
                            $scope.document.formation = $scope.formation;
                            $scope.uploadDocument($scope.lesFichiers);
                            $scope.updateFormation();
                        }
                    } else {
                        $scope.updateFormation();
                    }
                }

            }
        }

    };

    $scope.setFormationToUpdate = function (formation) {
        $scope.formation = angular.copy(formation);
        $scope.formation.dateDebut = new Date($scope.formation.dateDebut);
        $scope.formation.dateFin = new Date($scope.formation.dateFin);
        $scope.wasDiplomante = false;
        if (angular.isDefined($scope.formation.diplome)) {
            $scope.wasDiplomante = true;
            $scope.typeFormation = 0;
            $scope.diplomante = true;
            $scope.diplome = $scope.formation.diplome;
        }
        $scope.editFormationOperation = true;
    };

    $scope.updateDiplome = function () {
        Diplome.edit($scope.formation.diplome).success(function () {
            if ($scope.lesFichiers == null) {
                $scope.editFormationOperation = false;
                $scope.reinitialiserFormulaireFormation();
                $scope.findAllFormations();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le diplome n'a pas pu etre modifié");
        });
    };

    $scope.updateFormation = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Formation.edit($scope.formation).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuéé  avec succes");
            if (angular.isDefined($scope.formation.diplome) && $scope.formation.diplome !=null) {
                $scope.updateDiplome();
            } else {
                if ($scope.lesFichiers == null) {
                    $scope.editFormationOperation = false;
                    $scope.reinitialiserFormulaireFormation();
                    $scope.findAllFormations();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "La formation n'a pas pu etre modifiée");
        });
    };

    $scope.completeFormation = function () {
        Diplome.findByLibelle($scope.diplome.nom).success(function (data) {
            if (!data) {
                Diplome.add($scope.diplome).success(function () {
                    Diplome.findByLibelle($scope.diplome.nom).success(function (data) {
                        $scope.formation.diplome = data;
                        if ($scope.editFormationOperation == false) {
                            $scope.addFormation();
                        } else {
                            $scope.updateFormation();
                        }

                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du diplome");
                    });
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout du diplome");
                });

            } else {
                $scope.formation.diplome = data;
                if ($scope.editFormationOperation == false) {
                    $scope.addFormation();
                } else {
                    $scope.updateFormation();
                }
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du diplome");
        });
    };

    $scope.addFormation = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Formation.add($scope.formation).success(function () {
            $scope.lastFormationAdd();
            SweetAlert.simpleNotification("success", "Succes", "Formation ajoutée avec succes");
            $scope.findAllFormations();
            $scope.reinitialiserFormulaireFormation();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de la formation");
        });

    };
    $scope.lastFormationAdd = function () {
        Formation.findLast($scope.$parent.employe.id).success(function (data) {
            $scope.document.formation = data;
            $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement du dernier grade !");
        });
    };

    $scope.findAllFormations = function () {
        Formation.findAllEmployeFormation($scope.$parent.employe).success(function (data) {
            $scope.formations = data;
            $scope.lastFormation = $scope.formations[0];
            SweetAlert.finirChargementSucces("Chargement complet !");
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des formations !");
        });

    };
    $scope.findAllFormations();

    $scope.reinitialiserFormulaireFormation = function () {
        $scope.formation = {id: "", employe: $scope.$parent.employe};
        $scope.diplomante = false;
        $('#diplomante').prop('checked', false);
        $scope.diplome = {id: ""};
    };

    $scope.confirmDeleteFormation = function (idFormation) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        $scope.idDeletedFormation = idFormation;    //Garder l'id de l'element a supprimer pour pouvoir recuperer les documents lies a cet element
                        $scope.deleteFormationRelatedDocument();

                    }
                });
    };


    $scope.deleteFormation = function () {
        Formation.delete($scope.idDeletedFormation).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.findAllFormations();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la suppression de enfant");
        });
    };

    function retrieveDocumentFormation(data) {
        return angular.isDefined(data.formation) && (data.formation.id == $scope.idDeletedFormation);
    }

    $scope.deleteFormationRelatedDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentFormation);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteFormation();
                });
            });
        } else {
            $scope.deleteFormation();
        }
    };



    /*Gestion des documents electroniques*/
    $scope.formProvenanceFichier = "";
    $scope.lesFichiers = null;
    $scope.initDocument = function () {
        $scope.document = {id: "", dateEnregistrement: $scope.$parent.today};
    };
    $scope.initDocument();

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
        var instanceDoc;
        for (var i = 0; i < emplacementFichiers.length; i++) {   //  Parcour des emplacements des fichier uploades
            instanceDoc = angular.copy($scope.document);
            instanceDoc.emplacement = emplacementFichiers[i];
            req_tab.push(Document.add(instanceDoc));    //Ajout dans la base de donnees
        }
        $q.all(req_tab).then(function () { //Si l'upload dans le dossier physique a reussi
            $scope.initDocument();
            $scope.cancelFileUpload();
            $scope.$parent.listerMesDocuments();
            if ($scope.editFormationOperation = true) {
                $scope.editFormationOperation = false;
                $scope.reinitialiserFormulaireFormation();
                $scope.findAllFormations();
            }
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

    $scope.deleteArchiveFormation = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
            Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                    .then(function (value) {
                        if (value == true) {
                            $scope.deleteDocumentFormation(doc);
                        }
                    });
        } else {
            SweetAlert.simpleNotification("warning", "Attention", "Vous ne pouvez pas supprimer ce document \n\
                                            car la date d'écheance n'est pas encore atteinte");
        }

    };

    $scope.deleteDocumentFormation = function (document) {
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