/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('SocialesController', function ($scope, SweetAlert, $q,
        SyndicatTypeEmploye, CaisseSocialeTypeEmploye, MutuelleTypeEmploye, UploadFile, Employe
        , MembreMutuelleSante, MembreCaisseSociale, MembreSyndicat, Document)
{
    SyndicatTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.lesSyndicats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des syndicats");
    });
    CaisseSocialeTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.caissesociales = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des caisses sociales");
    });
    MutuelleTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.mutuellesantes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles");
    });


    /*CAISSE SOCIALE*/
    $scope.currentCaisseSociale = 0;
    $scope.editCaisseSociale = false;
    $scope.initMembreCaisseSociale = function () {
        $scope.membreCaisseSociale = {id: "", employe: $scope.$parent.employe, dateDebut: $scope.$parent.today, encours: 1};
    };
    $scope.initMembreCaisseSociale();

    $scope.getCaisseSociale = function (element) {
        $scope.currentCaisseSociale = $(element).val();
        $scope.membreCaisseSociale.caisseSociale = $scope.caissesociales.filter(retrieveCaisseSociale)[0];
    };
    function retrieveCaisseSociale(data) {
        return data.id == $scope.currentCaisseSociale;
    }
    ;
    $scope.setCaisseSociale = function (cs) {
        $scope.editCaisseSociale = true;
        $scope.membreCaisseSociale = angular.copy(cs);
        $scope.currentCaisseSociale = $scope.membreCaisseSociale.caisseSociale.id;
    };

    $scope.cancelCaisseSocialeEdit = function () {
        $scope.initMembreCaisseSociale();
        $scope.initDocument();
        $("#editCaisseSocialeForm").trigger("reset");
        $scope.currentCaisseSociale = 0;
        $scope.editCaisseSociale = false;
        if ($scope.lesFichiers != null) {
            $scope.lesFichiers = null;
        }
    };
    $scope.controlCaisseSocialeFormEdit = function (formulaire) {
        var validite = true;
        $('.editCaisseSocialeForm input:not([type="file"])').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.editCaisseSociale == false && (angular.isUndefined($scope.membreCaisseSociale.caisseSociale)
                || $scope.membreCaisseSociale.caisseSociale == null)) {
            $("#select_caisse_sociale").show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite == true) {
            MembreCaisseSociale.checkmatriculecs($scope.membreCaisseSociale.matriculeCaisseSociale).success(function (data) {
                if (data.value == true) {
                    $('#mat_cs_dup').show("slow").delay(3000).hide("slow");
                } else {
                    if ($scope.editCaisseSociale == false) {
                        if ($scope.controlDocumentForm(formulaire)) {
                            /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
                             * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
                            if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                                $scope.completerDocument();
                                $scope.addMembreCaisseSociale();
                            } else {
                                SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                            }
                        }
                    }
                    if ($scope.editCaisseSociale == true) {
                        if ($scope.lesFichiers != null) {   //Les fichiers sont optionnels : on effectue l'upload que s'il en existe
                            if ($scope.controlDocumentForm(formulaire)) {
                                $scope.completerDocument();
                                $scope.document.membreCaisseSociale = $scope.membreCaisseSociale;
                                $scope.uploadDocument($scope.lesFichiers);
                                $scope.updateMembreCaisseSociale();
                            }
                        } else {
                            $scope.updateMembreCaisseSociale();
                        }
                    }
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Echec de vérification du matricule de solde");
            });

        }
    };
    $scope.findAllMembreCaisseSociale = function () {
        MembreCaisseSociale.findByEmploye($scope.$parent.employe).success(function (data) {
            $scope.caisses = data;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération");
        });
    };
    $scope.findAllMembreCaisseSociale();
    $scope.findLastMembreCaisseSocialeAdded = function () {
        MembreCaisseSociale.findLast($scope.$parent.employe.id).success(function (data) {
            $scope.document.membreCaisseSociale = data;
            $scope.uploadDocument($scope.lesFichiers);
            $scope.initMembreCaisseSociale();
            $scope.findAllMembreCaisseSociale();
            $("#editCaisseSocialeForm").trigger("reset");
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de récuperation !");
        });
    };
    $scope.addMembreCaisseSociale = function () {
        if ($scope.caisses != null && $scope.caisses.length > 0 && $scope.caisses[0].encours == 1) {
            SweetAlert.notificationAvecSuggestion("info", "Information", "Cet employé est encore membre de " + $scope.caisses[0].caisseSociale.code + ".",
                    "<h5>Clicker sur le boutton <b>Quitter</b> d'abord</h5>");

        } else {
            SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
            MembreCaisseSociale.add($scope.membreCaisseSociale).success(function () {
                SweetAlert.simpleNotification("success", "Succes", "Ajout effectuée avec succes");
                $scope.findLastMembreCaisseSocialeAdded();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout");
            });
        }


    };
    $scope.updateMembreCaisseSociale = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreCaisseSociale.edit($scope.membreCaisseSociale).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectée avec succes");
            $scope.initMembreCaisseSociale();
            $scope.findAllMembreCaisseSociale();
            if ($scope.lesFichiers == null) {
                $scope.initDocument();
            }
            $scope.editCaisseSociale = false;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification");
        });
    };
    $scope.confirmQuitterCaisseSociale = function (cs) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement effectuer cet action ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.quitterCaisseSociale(cs);
                    }
                });
    };
    $scope.quitterCaisseSociale = function (cs) {
        cs.dateFin = new Date();
        cs.encours = 0;
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreCaisseSociale.edit(cs).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectée avec succes");
            $scope.findAllMembreCaisseSociale();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification");
        });
    };

    $scope.confirmDeleteMembreCaisseSociale = function (idMembreCaisseSociale) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        $scope.idDeletedMembreCaisseSociale = idMembreCaisseSociale;    //Garder l'id de l'element a supprimer pour pouvoir recuperer les documents lies a cet element
                        $scope.deleteMembreCaisseSocialeRelatedDocument();

                    }
                });
    };


    $scope.deleteMembreCaisseSociale = function () {
        MembreCaisseSociale.delete($scope.idDeletedMembreCaisseSociale).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.findAllMembreCaisseSociale();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la suppression de enfant");
        });
    };

    function retrieveDocumentMembreCaisseSociale(data) {
        return angular.isDefined(data.membreCaisseSociale) && (data.membreCaisseSociale.id == $scope.idDeletedMembreCaisseSociale);
    }

    $scope.deleteMembreCaisseSocialeRelatedDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentMembreCaisseSociale);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteMembreCaisseSociale();
                });
            });
        } else {
            $scope.deleteMembreCaisseSociale();
        }
    };

    /*CAISSE SOCIALE*/


    /*MUTUELLE DE SANTE*/

    $scope.currentMutuelleSante = 0;
    $scope.editMutuelleSante = false;
    $scope.initMembreMutuelleSante = function () {
        $scope.membreMutuelle = {id: "", employe: $scope.$parent.employe, dateDebut: $scope.$parent.today, encours: 1};
    };
    $scope.initMembreMutuelleSante();

    $scope.getMutuelleSante = function (element) {
        $scope.currentMutuelleSante = $(element).val();
        $scope.membreMutuelle.mutuelleSante = $scope.mutuellesantes.filter(retrieveMutuelleSante)[0];
    };
    function retrieveMutuelleSante(data) {
        return data.id == $scope.currentMutuelleSante;
    }
    ;
    $scope.setMutuelleSante = function (mt) {
        $scope.editMutuelleSante = true;
        $scope.membreMutuelle = angular.copy(mt);
        $scope.currentMutuelleSante = $scope.membreMutuelle.mutuelleSante.id;
    };

    $scope.cancelMutuelleSanteEdit = function () {
        $scope.initMembreMutuelleSante();
        $scope.initDocument();
        $("#editMutuelleSanteForm").trigger("reset");
        $scope.currentMutuelleSante = 0;
        $scope.editMutuelleSante = false;
        if ($scope.lesFichiers != null) {
            $scope.lesFichiers = null;
        }
    };
    $scope.controlMutuelleSanteFormEdit = function (formulaire) {
        var validite = true;
        if ($scope.editMutuelleSante == false && (angular.isUndefined($scope.membreMutuelle.mutuelleSante)
                || $scope.membreMutuelle.mutuelleSante == null)) {
            $("#select_mutuelle_sante").show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite == true) {
            if ($scope.editMutuelleSante == false) {
                if ($scope.controlDocumentForm(formulaire)) {
                    /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
                     * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                        $scope.completerDocument();
                        $scope.addMembreMutuelleSante();
                    } else {
                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                    }
                }
            }
            if ($scope.editMutuelleSante == true) {
                if ($scope.lesFichiers != null) {   //Les fichiers sont optionnels : on effectue l'upload que s'il en existe
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        $scope.document.membreMutuelle = $scope.membreMutuelle;
                        $scope.uploadDocument($scope.lesFichiers);
                        $scope.updateMembreMutuelleSante();
                    }
                } else {
                    $scope.updateMembreMutuelleSante();
                }
            }
        }
    };

    $scope.findAllMembreMutuelleSante = function () {
        MembreMutuelleSante.findByEmploye($scope.$parent.employe).success(function (data) {
            $scope.mutuelles = data;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération");
        });
    };
    $scope.findAllMembreMutuelleSante();
    $scope.findLastMembreMutuelleSanteAdded = function () {
        MembreMutuelleSante.findLast($scope.$parent.employe.id).success(function (data) {
            $scope.document.membreMutuelle = data;
            $scope.uploadDocument($scope.lesFichiers);
            $scope.initMembreMutuelleSante();
            $scope.findAllMembreMutuelleSante();
            $("#editMutuelleSanteForm").trigger("reset");
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de récuperation !");
        });
    };
    $scope.addMembreMutuelleSante = function () {
        if ($scope.mutuelles != null && $scope.mutuelles.length > 0 && $scope.mutuelles[0].encours == 1) {
            SweetAlert.notificationAvecSuggestion("info", "Information", "Cet employé est encore membre\n\
 de " + $scope.mutuelles[0].mutuelleSante.code + ".",
                    "<h5>Clicker sur le boutton <b>Quitter</b> d'abord</h5>");

        } else {
            SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
            MembreMutuelleSante.add($scope.membreMutuelle).success(function () {
                SweetAlert.simpleNotification("success", "Succes", "Ajout effectuée avec succes");
                $scope.findLastMembreMutuelleSanteAdded();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout");
            });
        }


    };
    $scope.updateMembreMutuelleSante = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreMutuelleSante.edit($scope.membreMutuelle).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectée avec succes");
            $scope.initMembreMutuelleSante();
            $scope.findAllMembreMutuelleSante();
            if ($scope.lesFichiers == null) {
                $scope.initDocument();
            }
            $scope.editMutuelleSante = false;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification");
        });
    };
    $scope.confirmQuitterMutuelleSante = function (mt) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement effectuer cet action ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.quitterMutuelleSante(mt);
                    }
                });
    };
    $scope.quitterMutuelleSante = function (mt) {
        mt.dateFin = new Date();
        mt.encours = 0;
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreMutuelleSante.edit(mt).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectée avec succes");
            $scope.findAllMembreMutuelleSante();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification");
        });
    };

    $scope.confirmDeleteMembreMutuelleSante = function (idMembreMutuelleSante) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        $scope.idDeletedMembreMutuelleSante = idMembreMutuelleSante;    //Garder l'id de l'element a supprimer pour pouvoir recuperer les documents lies a cet element
                        $scope.deleteMembreMutuelleSanteRelatedDocument();

                    }
                });
    };


    $scope.deleteMembreMutuelleSante = function () {
        MembreMutuelleSante.delete($scope.idDeletedMembreMutuelleSante).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.findAllMembreMutuelleSante();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la suppression de enfant");
        });
    };

    function retrieveDocumentMembreMutuelleSante(data) {
        return angular.isDefined(data.membreMutuelle) && (data.membreMutuelle.id == $scope.idDeletedMembreMutuelleSante);
    }

    $scope.deleteMembreMutuelleSanteRelatedDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentMembreMutuelleSante);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteMembreMutuelleSante();
                });
            });
        } else {
            $scope.deleteMembreMutuelleSante();
        }
    };

    /*MUTUELLE DE SANTE*/

    /*SYNDICAT*/

    $scope.currentSyndicat = 0;
    $scope.editSyndicat = false;
    $scope.initMembreSyndicat = function () {
        $scope.membreSyndicat = {id: "", employe: $scope.$parent.employe, dateDebut: $scope.$parent.today, encours: 1};
    };
    $scope.initMembreSyndicat();

    $scope.getSyndicat = function (element) {
        $scope.currentSyndicat = $(element).val();
        $scope.membreSyndicat.syndicat = $scope.lesSyndicats.filter(retrieveSyndicat)[0];
    };
    function retrieveSyndicat(data) {
        return data.id == $scope.currentSyndicat;
    }
    ;
    $scope.setSyndicat = function (mt) {
        $scope.editSyndicat = true;
        $scope.membreSyndicat = angular.copy(mt);
        $scope.currentSyndicat = $scope.membreSyndicat.syndicat.id;
    };

    $scope.cancelSyndicatEdit = function () {
        $scope.initMembreSyndicat();
        $scope.initDocument();
        $("#editSyndicatForm").trigger("reset");
        $scope.currentSyndicat = 0;
        $scope.editSyndicat = false;
        if ($scope.lesFichiers != null) {
            $scope.lesFichiers = null;
        }
    };
    $scope.controlSyndicatFormEdit = function (formulaire) {
        var validite = true;
        if ($scope.editSyndicat == false && (angular.isUndefined($scope.membreSyndicat.syndicat)
                || $scope.membreSyndicat.syndicat == null)) {
            $("#select_syndicat").show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite == true) {
            if ($scope.editSyndicat == false) {
                if ($scope.controlDocumentForm(formulaire)) {
                    /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
                     * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
                    if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                        $scope.completerDocument();
                        $scope.addMembreSyndicat();
                    } else {
                        SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                    }
                }
            }
            if ($scope.editSyndicat == true) {
                if ($scope.lesFichiers != null) {   //Les fichiers sont optionnels : on effectue l'upload que s'il en existe
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.completerDocument();
                        $scope.document.membreSyndicat = $scope.membreSyndicat;
                        $scope.uploadDocument($scope.lesFichiers);
                        $scope.updateMembreSyndicat();
                    }
                } else {
                    $scope.updateMembreSyndicat();
                }
            }
        }
    };

    $scope.findAllMembreSyndicat = function () {
        MembreSyndicat.findByEmploye($scope.$parent.employe).success(function (data) {
            $scope.syndicats = data;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération");
        });
    };
    $scope.findAllMembreSyndicat();
    $scope.findLastMembreSyndicatAdded = function () {
        MembreSyndicat.findLast($scope.$parent.employe.id).success(function (data) {
            $scope.document.membreSyndicat = data;
            $scope.uploadDocument($scope.lesFichiers);
            $scope.initMembreSyndicat();
            $scope.findAllMembreSyndicat();
            $("#editSyndicatForm").trigger("reset");
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de récuperation !");
        });
    };
    $scope.addMembreSyndicat = function () {
        if ($scope.syndicats != null && $scope.syndicats.length > 0 && $scope.syndicats[0].encours == 1) {
            SweetAlert.notificationAvecSuggestion("info", "Information", "Cet employé est encore membre de " + $scope.syndicats[0].syndicat.code + ".",
                    "<h5>Clicker sur le boutton <b>Quitter</b> d'abord</h5>");

        } else {
            SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
            MembreSyndicat.add($scope.membreSyndicat).success(function () {
                SweetAlert.simpleNotification("success", "Succes", "Ajout effectuée avec succes");
                $scope.findLastMembreSyndicatAdded();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout");
            });
        }


    };
    $scope.updateMembreSyndicat = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreSyndicat.edit($scope.membreSyndicat).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectée avec succes");
            $scope.initMembreSyndicat();
            $scope.findAllMembreSyndicat();
            if ($scope.lesFichiers == null) {
                $scope.initDocument();
            }
            $scope.editSyndicat = false;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification");
        });
    };
    $scope.confirmQuitterSyndicat = function (mt) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement effectuer cet action ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.quitterSyndicat(mt);
                    }
                });
    };
    $scope.quitterSyndicat = function (mt) {
        mt.dateFin = new Date();
        mt.encours = 0;
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MembreSyndicat.edit(mt).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectée avec succes");
            $scope.findAllMembreSyndicat();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification");
        });
    };

    $scope.confirmDeleteMembreSyndicat = function (idMembreSyndicat) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        $scope.idDeletedMembreSyndicat = idMembreSyndicat;    //Garder l'id de l'element a supprimer pour pouvoir recuperer les documents lies a cet element
                        $scope.deleteMembreSyndicatRelatedDocument();

                    }
                });
    };


    $scope.deleteMembreSyndicat = function () {
        MembreSyndicat.delete($scope.idDeletedMembreSyndicat).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.findAllMembreSyndicat();
            $scope.$parent.listerMesDocuments();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la suppression de enfant");
        });
    };

    function retrieveDocumentMembreSyndicat(data) {
        return angular.isDefined(data.membreSyndicat) && (data.membreSyndicat.id == $scope.idDeletedMembreSyndicat);
    }

    $scope.deleteMembreSyndicatRelatedDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        var reqTab1 = [];
        var reqTab2 = [];
        var relatedDoc = $scope.$parent.documents.filter(retrieveDocumentMembreSyndicat);
        if (relatedDoc.length > 0) {
            for (var i = 0; i < relatedDoc.length; i++) {
                reqTab1.push(UploadFile.delete(angular.toJson({chemin: relatedDoc[i].emplacement}))); //fichier physique
                reqTab2.push(Document.delete(relatedDoc[i].id)); //sur BD
            }
            $q.all(reqTab1).then(function () {  //Suppression dans le dossier physique
                $q.all(reqTab2).then(function () {  //Suppression dans la base de donnees
                    $scope.deleteMembreSyndicat();
                });
            });
        } else {
            $scope.deleteMembreSyndicat();
        }
    };

    /*SYNDICAT*/

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
        var allowedTypes = "pdf"; //Type de fichier autorise  
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
            req_tab.push(Document.add(instanceDoc)); //Ajout dans la base de donnees
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
                var fd = new FormData(); //Creation d'un objet FormData
                fd.append($scope.$parent.employe.numeroCni, $scope.fileToUpload); //Ajout du fichier et de son emplacement au FormData
                req_tab.push(UploadFile.uploadDocument(fd)); //Upload dans le dossier physique
            }
            $q.all(req_tab).then(function (results) { //Si l'upload dans le dossier physique a reussi
                var emplacement = [];
                for (var i = 0; i < results.length; i++) { //Recuperer les emplacement de chaque fichier uploader dans le dossier physique
                    emplacement.push(results[i].data);
                }
                $scope.addDocument(emplacement); //Ajout dans la base de donnees     
                UploadFile.resetHttp();
            });
        } else {
            SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
        }

    };
    $scope.deleteArchiveSociales = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc); //Si la date d'�cheance du document est atteinte ?
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