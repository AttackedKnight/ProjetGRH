/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('SMatrimonialeController', function ($scope, SweetAlert, $q, Conjoint, Enfant, Situation,
        UploadFile, Employe, Document)
{

    $scope.editSituationMatri = false;

    $scope.toggleSituationMatriEditForm = function () {
        $scope.editSituationMatri = !$scope.editSituationMatri;
    };

    $scope.cancelSituationMatriEdit = function () {
        $scope.$parent.employe = angular.copy($scope.$parent.copieEmploye);
        $scope.toggleSituationMatriEditForm();
        $scope.checkSituationMatrimoniale();
        $scope.initDocument();
        if ($scope.lesFichiers != null) {
            $scope.lesFichiers = null
        }
    };

    $scope.estMarie = false;
    $scope.estCelibataire = false;
    $scope.checkSituationMatrimoniale = function () {
        if ($scope.$parent.employe.situationMatrimoniale.libelle == "Marié(e)") {
            $scope.estMarie = true;
        } else {
            $scope.estMarie = false;
        }
        if ($scope.$parent.employe.situationMatrimoniale.libelle == "Célibataire") {
            $scope.estCelibataire = true;
        } else {
            $scope.estCelibataire = false;
        }
    };
    $scope.checkSituationMatrimoniale();
    /*SITUATION MATRIMONIALE*/

    Situation.findAll().success(function (data) {
        $scope.situations = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des situations matrimoniales");
    });

    //le parametre <<formulaire>> est la valeur de l'attr id du formulaire a controller
    $scope.controlSituationMatriFormEdit = function (formulaire) {
        var validite = true;
        $('.editSituationMatriForm select').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
             * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
            if ($scope.estCelibataire == false) {
                if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        $scope.document.situationMatrimoniale = 1;  //Preciser aue c'est lien a la situation matrimoniale
                        $scope.traitementSMatrimoniale = true;
                        $scope.uploadDocument($scope.lesFichiers);
                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }
            } else {
                $scope.editEmploye();
            }
        }
    };

    /*SITUATION MATRIMONIALE*/

    /*CONJOINT*/

    $scope.editConjoint = false;
    $scope.toggleConjointForm = function () {
        $scope.editConjoint = !$scope.editConjoint;
    };

    $scope.cancelConjointForm = function () {
        $scope.toggleConjointForm();
        $scope.initConjoint();
        $scope.initDocument();
        if ($scope.lesFichiers != null) {
            $scope.lesFichiers = null
        }
    };

    $scope.editConjointOperation = false;
    $scope.setConjoint = function (conj) {
        $scope.conjoint = angular.copy(conj);
        $scope.estSalarieFormerValue = $scope.conjoint.estSalarie;
        $scope.toggleConjointForm();
        $scope.editConjointOperation = true;
    };


    $scope.initConjoint = function () {
        $scope.conjoint = {id: "", employe: $scope.$parent.employe, estSalarie: false};
    };
    $scope.initConjoint();

    $scope.conjoints = [];

    $scope.controlConjointForm = function (formulaire) {
        var validite = true;
        $('#' + formulaire + ' input[type=text]').each(function () {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite == true) {
            /*Si c'est une operation de modification et 
             * Si estSalarie est passe de false -> true ,des pieces justificatifs doivent etre jointes
             *  */
            if ($scope.editConjointOperation == true &&
                    ($scope.estSalarieFormerValue == false && $scope.conjoint.estSalarie == true)) {

                if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        $scope.document.conjoint = $scope.conjoint;
                        $scope.uploadDocument($scope.lesFichiers);
                        $scope.updateConjoint();
                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }
            }
            /*Si c'est une operation de modification et 
             * Si estSalarie n'a pas change ,les pieces justificatifs sont facultatives
             *  */
            if ($scope.editConjointOperation == true &&
                    ($scope.estSalarieFormerValue == $scope.conjoint.estSalarie)) {
                if ($scope.lesFichiers != null) { //S'il y a des fichiers(nouveaux fichiers) , on l'ajoute
                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                        if ($scope.controlDocumentForm(formulaire)) {
                            $scope.completerDocument();
                            $scope.document.conjoint = $scope.conjoint;
                            $scope.uploadDocument($scope.lesFichiers);
                            $scope.updateConjoint();
                        }
                    } else {
                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                    }
                } else {
                    $scope.updateConjoint();
                }

            }
            /*Si c'est une operation d'ajout*/
            if ($scope.editConjointOperation == false) {
                if ($scope.conjoint.estSalarie == true) {   //Des pieces justificatifs doivent etre jointes
                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                        if ($scope.controlDocumentForm(formulaire)) {
                            $scope.completerDocument();
                            $scope.addConjoint();
                        }
                    } else {
                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                    }
                } else {
                    $scope.addConjoint();
                }
            }



        }
    };

    $scope.getConjoint = function () {
        Conjoint.findByEmploye($scope.$parent.employe.id).success(function (data) {
            $scope.conjoints = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement conjoint(s)");
        });
    };
    $scope.getConjoint();

    $scope.getLastConjointAdded = function () {
        Conjoint.getLastConjointAdded($scope.$parent.employe.id).success(function (data) {
            $scope.document.conjoint = data;
            //Uploader les documents lies a conjoint
            $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la récupérqtion du conjoint");
        });
    };
    $scope.addConjoint = function () {
        $scope.toggleConjointForm();
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Conjoint.add($scope.conjoint).success(function () {
            if ($scope.conjoint.estSalarie == true) {   //Continue avec l'upload de fichier
                $scope.getLastConjointAdded();  //Recuperer l'entree qui vient d'etre ajoute pour complete les documents a uploader
            }
            SweetAlert.simpleNotification("success", "Succes", "Ajout effectuée avec succes");
            $scope.getConjoint();
            $scope.initConjoint();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de l'ajout de conjoint");
        });
    };

    $scope.updateConjoint = function () {
        $scope.toggleConjointForm();
        Conjoint.edit($scope.conjoint).success(function () {
            $scope.editConjointOperation == false;
            $scope.getConjoint();
            $scope.initConjoint();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la modification de conjoint");
        });
    };

    $scope.confirmDeleteConjoint = function (idConj) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        $scope.idDeletedConjoint = idConj;    //Garder l'id de l'element a supprimer pour pouvoir recuperer les documents lies a cet element
                        $scope.deleteConjointRelatedDocument();

                    }
                });
    };

    function retrieveDocumentConjoint(data) {
        return angular.isDefined(data.conjoint) && (data.conjoint.id == $scope.idDeletedConjoint);
    }

    $scope.deleteConjoint = function () {
        Conjoint.delete($scope.idDeletedConjoint).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.getConjoint();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la suppression de conjoint");
        });
    };
    $scope.deleteConjointRelatedDocument = function () {
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentConjoint);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteConjoint();
                });
            });
        } else {
            $scope.deleteConjoint();
        }
    };
    /*CONJOINT*/

    /*ENFANT*/

    $scope.editEnfant = false;
    $scope.toggleEnfantForm = function () {
        $scope.editEnfant = !$scope.editEnfant;
    };

    $scope.cancelEnfantForm = function () {
        $scope.toggleEnfantForm();
        $scope.initEnfant();
        $scope.initDocument();
        if ($scope.lesFichiers != null) {
            $scope.lesFichiers = null
        }
    };

    $scope.editEnfantOperation = false;
    $scope.setEnfant = function (enfant) {
        $scope.enfant = angular.copy(enfant);
        $scope.toggleEnfantForm();
        $scope.editEnfantOperation = true;
    };


    $scope.initEnfant = function () {
        $scope.enfant = {id: "",nom:$scope.$parent.employe.nom, employe: $scope.$parent.employe};
    };
    $scope.initEnfant();

    $scope.enfants = [];

    $scope.getEnfant = function () {
        Enfant.findByEmploye($scope.$parent.employe.id).success(function (data) {
            $scope.enfants = data;
            for(var i = 0; i<$scope.enfants.length; i++){   //Formater les dates
                $scope.enfants[i].dateNaissance = new Date($scope.enfants[i].dateNaissance);
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement enfant(s)");
        });
    };
    $scope.getEnfant();

    $scope.controlEnfantForm = function (formulaire) {
        var validite = true;
        $('#' + formulaire + ' input[type=text]').each(function () {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (angular.isUndefined($scope.enfant.dateNaissance)) {
            $('#' + formulaire + ' #dateDeNaissance').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite == true) {
            /*Si c'est une operation de modification 
             *  */
            if ($scope.editEnfantOperation == true) {

                if ($scope.lesFichiers != null) {   /*S'il ya des fichier,les controlle avant de continuer*/
                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                        if ($scope.controlDocumentForm(formulaire)) {
                            $scope.completerDocument();
                            $scope.document.enfant = $scope.enfant;
                            $scope.uploadDocument($scope.lesFichiers);
                            $scope.updateEnfant();
                        }
                    } else {
                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                    }
                } else {
                    $scope.updateEnfant();
                }
            }
            /*Si c'est une operation d'ajout*/
            if ($scope.editEnfantOperation == false) {
                if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {   //Des pieces justificatifs doivent etre jointes
                        $scope.completerDocument();
                        $scope.addEnfant();
                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }
            }



        }
    };

    $scope.getLastEnfantAdded = function () {
        Enfant.getLastEnfantAdded($scope.$parent.employe.id).success(function (data) {
            $scope.document.enfant = data;
            //Uploader les documents lies a enfant
            $scope.uploadDocument($scope.lesFichiers);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la récupérqtion du enfant");
        });
    };
    $scope.addEnfant = function () {
        $scope.toggleEnfantForm();
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Enfant.add($scope.enfant).success(function () {
            $scope.getLastEnfantAdded();  //Recuperer l'entree qui vient d'etre ajoute pour complete les documents a uploader
            SweetAlert.simpleNotification("success", "Succes", "Ajout effectuée avec succes");
            $scope.getEnfant();
            $scope.initEnfant();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de l'ajout de enfant");
        });
    };

    $scope.updateEnfant = function () {
        $scope.toggleEnfantForm();
        Enfant.edit($scope.enfant).success(function () {
            $scope.editEnfantOperation == false;
            $scope.getEnfant();
            $scope.initEnfant();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la modification de enfant");
        });
    };

    $scope.confirmDeleteEnfant = function (idEnfant) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        $scope.idDeletedEnfant = idEnfant;    //Garder l'id de l'element a supprimer pour pouvoir recuperer les documents lies a cet element
                        $scope.deleteEnfantRelatedDocument();

                    }
                });
    };

    function retrieveDocumentEnfant(data) {
        return angular.isDefined(data.enfant) && (data.enfant.id == $scope.idDeletedEnfant);
    }

    $scope.deleteEnfant = function () {
        Enfant.delete($scope.idDeletedEnfant).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.getEnfant();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la suppression de enfant");
        });
    };
    $scope.deleteEnfantRelatedDocument = function () {
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentEnfant);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteEnfant();
                });
            });
        } else {
            $scope.deleteEnfant();
        }
    };

    /*ENFANT*/

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