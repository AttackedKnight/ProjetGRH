/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('SocialesController', function ($scope, SweetAlert, $q,
        SyndicatTypeEmploye, CaisseSocialeTypeEmploye, MutuelleTypeEmploye, UploadFile, Employe
        , MembreMutuelle, Document)
{
    $scope.removeSelectedSyndicat = function () {
        $scope.$parent.employe.syndicat = null;
        $scope.currentSyndicat = 0;
    };

    $scope.removeSelectedMutuelle = function () {
        $scope.membreMutuelle.mutuelleSante = null;
        $scope.currentMutuelle = 0;
    };

    $scope.removeSelectedCaisseSociale = function () {
        $scope.$parent.employe.caisseSociale = null;
        $scope.$parent.employe.matriculeCaisseSociale = "";
        $scope.currentCaisseSociale = 0;
    };


    /*RECUPERATION DES INFORMATIONS DE L'EMPLOYE*/

    $scope.getSyndicat = function (element) {
        $scope.currentSyndicat = $(element).val();
        $scope.$parent.employe.syndicat = $scope.syndicats.filter(retrieveSyndicat)[0];
    };
    function retrieveSyndicat(data) {
        return data.id == $scope.currentSyndicat;
    }
    ;

    $scope.getCaisseSociale = function (element) {
        $scope.currentCaisseSociale = $(element).val();
        $scope.$parent.employe.caisseSociale = $scope.caissesociales.filter(retrieveCaisseSociale)[0];
    };
    function retrieveCaisseSociale(data) {
        return data.id == $scope.currentCaisseSociale;
    }
    ;

    $scope.getMutulleSante = function (element) {
        $scope.currentMutuelle = $(element).val();
        $scope.membreMutuelle.mutuelleSante = $scope.mutuelles.filter(retrieveMutulleSante)[0];
    };
    function retrieveMutulleSante(data) {
        return data.id == $scope.currentMutuelle;
    }
    ;

    if ($scope.$parent.employe.syndicat != null) {
        $scope.currentSyndicat = $scope.$parent.employe.syndicat.id;
    } else {
        $scope.currentSyndicat = 0;
    }

    if ($scope.$parent.employe.caisseSociale != null) {
        $scope.currentCaisseSociale = $scope.$parent.employe.caisseSociale.id;
    } else {
        $scope.currentCaisseSociale = 0;
    }

    MembreMutuelle.findByEmploye($scope.$parent.employe).success(function (data) {
        if (data) {
            $scope.membreMutuelle = data;
            $scope.currentMutuelle = $scope.membreMutuelle.mutuelleSante.id;
            $scope.editMutuelleOperation = true;
        } else {
            $scope.membreMutuelle = {id: "", employe: $scope.$parent.employe};
            $scope.currentMutuelle = 0;
            $scope.editMutuelleOperation = false;
        }
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement du mutuelle de sante !");
    });

    SyndicatTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.syndicats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des syndicats");
    });

    CaisseSocialeTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.caissesociales = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des caisses sociales");
    });

    MutuelleTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.mutuelles = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles");
    });

    /* toggle edit form */

    $scope.editCaisseSociale = false;
    $scope.editMutuelleSante = false;
    $scope.editSyndicat = false;

    $scope.toggleCaisseSocialeEditForm = function () {
        $scope.editCaisseSociale = !$scope.editCaisseSociale;
    };

    $scope.toggleMutuelleSanteEditForm = function () {
        $scope.editMutuelleSante = !$scope.editMutuelleSante;
    };

    $scope.toggleSyndicatEditForm = function () {
        $scope.editSyndicat = !$scope.editSyndicat;
    };

    $scope.currentSyndicat = 0;
    $scope.currentMutuelle = 0;
    $scope.currentCaisseSociale = 0;

    /*MUTUELLE DE SANTE*/

    $scope.setMutuelleSante = function (membreMutualle) {
        $scope.membreMutuelle = angular.copy(membreMutualle);
        $scope.currentMutuelle = $scope.membreMutuelle.mutuelleSante.id;
        $scope.formerMutuelleId = angular.copy($scope.currentMutuelle);
        $scope.toggleMutuelleSanteEditForm();
    };

    $scope.controlMutuelleSanteFormEdit = function (formulaire) {
        if ($scope.editMutuelleOperation == false) { //S'il s'agit d'un ajout
            if ($scope.membreMutuelle.mutuelleSante) {
                if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        $scope.addMutuelle();
                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }
            } else {
                SweetAlert.simpleNotification("error", "Erreur", "Choisissez d'abord un mutuelle");
            }
        }

        if ($scope.editMutuelleOperation == true) { //S'il s'agit d'une modification ou d'un suppression(si la valeur repasse a nulle)
            console.log("Edit mutuelle");
            if ($scope.membreMutuelle.mutuelleSante) {    //Operation de modification
                if ($scope.formerMutuelleId == $scope.currentMutuelle) { //Si le mutuelle n'a pas change
                    if ($scope.lesFichiers != null) {//S'il s'a des fichiers a ajouter au mutuelle existant
                        if ($scope.controlDocumentForm(formulaire)) {
                            $scope.completerDocument();
                            $scope.document.membreMutuelle = $scope.membreMutuelle;
                            $scope.uploadDocument($scope.lesFichiers);
                            $scope.toggleMutuelleSanteEditForm();
                            $scope.$parent.listerMesDocuments();
                        }
                    }

                } else {   //Changement de mutuelle
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        $scope.document.membreMutuelle = $scope.membreMutuelle;
                        $scope.uploadDocument($scope.lesFichiers);
                        $scope.updateMutuelle();
                    }
                }

            } else {//Operation de suppression (l'employe n'est plus membre)
                $scope.deleteMutuelleRelatedDocument();
            }
        }
    };

    $scope.getMutuelleEmploye = function () {
        MembreMutuelle.findByEmploye($scope.$parent.employe).success(function (data) {
            $scope.document.membreMutuelle = data;
            //Uploader les documents lies a conjoint
            $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement du mutuelle de sante !");
        });
    };

    $scope.addMutuelle = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreMutuelle.add($scope.membreMutuelle).success(function () {
            $scope.getMutuelleEmploye();
            $scope.toggleMutuelleSanteEditForm();
            $scope.$parent.listerMesDocuments();
            SweetAlert.simpleNotification("success", "Succes", "Ajout effectuée avec succes");
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du mutuelle de santé");
        });
    };

    function retrieveDocumentMutuelle(data) {
        return angular.isDefined(data.membreMutuelle) && (data.membreMutuelle.id == $scope.membreMutuelle.id);
    }

    $scope.deleteMutuelle = function () {
        MembreMutuelle.delete($scope.membreMutuelle.id).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.toggleMutuelleSanteEditForm();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la suppression du mutuelle de santé");
        });
    };
    $scope.deleteMutuelleRelatedDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentMutuelle);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteMutuelle();
                });
            });
        } else {
            $scope.deleteMutuelle();
        }
    };


    $scope.updateMutuelle = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreMutuelle.edit($scope.membreMutuelle).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.toggleMutuelleSanteEditForm();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification du mutuelle de santé");
        });
    };
    /*MUTUELLE DE SANTE*/


    /*Gestion des documents electroniques*/
    $scope.formProvenanceFichier = "";
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


    $scope.deleteArchiveSociale = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
            Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                    .then(function (value) {
                        if (value == true) {
                            $scope.deleteDocumentSociale(doc);
                        }
                    });
        } else {
            SweetAlert.simpleNotification("warning", "Attention", "Vous ne pouvez pas supprimer ce document \n\
                                            car la date d'écheance n'est pas encore atteinte");
        }

    };

    $scope.deleteDocumentSociale = function (document) {
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