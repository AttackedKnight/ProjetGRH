/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('FormationController', function ($scope, SweetAlert,UploadFile, Typedocument,Diplome, Formation, Employe,
         Servir, Document,$q)
{


    $scope.fonction = {id: ""};
    $scope.formProvenanceFichier = "";
     $scope.lesFichiers = null;
    $scope.document = {id: "", dateEnregistrement: $scope.today};

    
    $scope.message = "Bonjour , inf pro ctrl message";
//
//    $scope.templates=[{name:"Informations generales",url:"infosGenerales.html"},
//        {name:"Informations professionelles",url:"infosPro.html"}]


    /*        formation              */
    
    $scope.formations = [];
    $scope.today = new Date();
    $scope.diplomante = false;
    $scope.diplome = {id: ""};
    $scope.formation = {id: "", employe: $scope.$parent.employe};

    $scope.toggleDiplomante = function () {
        $scope.diplomante = !$scope.diplomante;
    };
    $scope.controlFormationFormation = function (formulaire) {
        var validite = true;
        $('.formationForm input:not([type="file"])').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if (validite === true) {
            if ($scope.controlDocumentForm(formulaire)) {
                /*Le nmero de cni est l'identifiant du dossier de l'employe dans les archives.
                 * Donc avant l'ajout d'une info ayant une pi�ce jointe , le numero doit etre d�fini */
                if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
                    if ($scope.controlDocumentForm(formulaire)) {
                        $scope.nouvelleFormation = true;
                        if ($scope.diplomante == true) {
                            $scope.completeFormation();
                        } else {
                            $scope.addFormation();
                        }
                    }
                } else {
                    SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
                }


            }

        }

    };

    $scope.visualiserDocumentformation = function (idFormation) {
        for (var i = 0; i < $scope.documents.length; i++) {
            if ($scope.documents[i].formation != null && $scope.documents[i].formation.id == idFormation) {
                $scope.visualiserDocument($scope.documents[i].emplacement);
            }
        }
    };

    /*Permet de completer le document en referencant la formation a laquelle elle se rapporte
     * Elle est appele apres que la formation soit ajoutee dans la base de donnees et recuperer*/
    $scope.completerDocumentFormation = function () {
        $scope.document.formation = $scope.lastFormation;
        $scope.completerDocument();
        $scope.uploadDocument($scope.lesFichiers);
        $scope.nouvelleFormation = false;
    };
    $scope.completeFormation = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Diplome.findByLibelle($scope.diplome.nom).success(function (data) {
            if (!data) {
                Diplome.add($scope.diplome).success(function () {
                    Diplome.findByLibelle($scope.diplome.nom).success(function (data) {
                        $scope.formation.diplome = data;
                        $scope.addFormation();
                    }).error(function () {
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du diplome");
                    });
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout du diplome");
                });

            } else {
                $scope.formation.diplome = data;
                $scope.addFormation();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du diplome");
        });
    };

    $scope.addFormation = function () {
        Formation.add($scope.formation).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Formation ajoutée avec succes");
            $scope.findAllFormations();
            $scope.reinitialiserFormulaireFormation();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'ajout de la formation");
        });

    };

    $scope.findAllFormations = function () {
        Formation.findAllEmployeFormation($scope.$parent.employe).success(function (data) {
            $scope.formations = data;
            $scope.lastFormation = $scope.formations[0];
            SweetAlert.finirChargementSucces("Chargement complet !");
             console.log($scope.formations);
            if ($scope.nouvelleFormation == true) {
                //S'il s'agit d'une nouvelle formation, il y a upload
                $scope.completerDocumentFormation();
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des formations !");
        });

    };
    $scope.findAllFormations();
   console.log($scope.$parent.documents);

    $scope.reinitialiserFormulaireFormation = function () {
        $scope.formation = {id: "", employe: $scope.$parent.employe};
        $scope.diplomante = false;
        $('#diplomante').prop('checked', false);
        $scope.diplome = {id: ""};
    };




    /*Gestion des documents electroniques*/
   

    Typedocument.findAll().success(function (data) {
        $scope.typedocuments = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de document !");
    });

    
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

    $scope.ajouterNouveauDocument = function (formulaire) {
        $scope.formProvenanceFichier = formulaire;
        if ($scope.controlDocumentForm(formulaire)) {
            $scope.completerDocument();
            $scope.uploadDocument($scope.lesFichiers);
        }
    };

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

    $scope.addDocument = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Document.add($scope.document).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Document ajoutée avec succes");
            if ($scope.finUpload == true) {
                //Utile lorsqu'il y a plusieurs documents a enregistrer pour une seule table(formation,situation matri ...)
                $scope.document = {id: "", dateEnregistrement: $scope.today};
                $scope.cancelFileUpload();
                $scope.$parent.listerMesDocuments();
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le document n'a pas pu etre ajouté");
        });

    };

    /*Gerer l'upload de fichier*/

    $scope.uploadDocument = function (fichiers) {
        if ($scope.$parent.employe.numeroCni && $scope.$parent.employe.numeroCni != '') {
            $scope.finUpload = false;
            for (var i = 0; i < fichiers.files.length; i++) {   //  Parcour des fichier a uploader
                $scope.uploadedFile = fichiers.files[i];
                var format = $scope.uploadedFile.name.split("."); //Recuperation du format
                format = format[format.length - 1];
                var fd = new FormData();                //Creation d'un objet FormData
                fd.append($scope.$parent.employe.numeroCni, $scope.uploadedFile);   //Ajout du fichier et de son emplacement au FormData
                UploadFile.uploadDocument(fd).success(function (data) {   //Appel du service(Objet java) charger d'uploader le fichier : la requete retourne le nom du fichier
                    $scope.document.emplacement = data;
                    $scope.addDocument();               //Ajout dans la base de donnees
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du document");
                });
            }
            $scope.finUpload = true;
            UploadFile.resetHttp();
        } else {
            SweetAlert.simpleNotification("error", "Erreur", "Indiquer d'abord le numéro de CNI de cet employé");
        }

    };

    $scope.visualiserDocument = function (lien) {
        window.open(lien);
    };

    /*Gestion des documents electroniques*/

    $scope.deleteAgent = function (employe) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Employe.delete(employe.id).success(function () {
                            UploadFile.delete(angular.toJson({chemin: "archives/" + employe.numeroCni})).success(function () {
                                SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                                document.location.href = "#/drh/employe/consulter";
                            }).error(function () {
                                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                            });

                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

   


    $scope.getDocumentformation = function (idFormation) {
        for (var i = 0; i < $scope.documents.length; i++) {
            if ($scope.documents[i].formation != null && $scope.documents[i].formation.id == idFormation) {
                return $scope.documents[i];
            }
        }
        return null;
    };

    $scope.delArchive = false;
    $scope.deleteArchive = function (doc) {
        var dateEcheanceDoc = new Date(doc.echeance);
        var dateEcheanceAtteinte = ($scope.today > dateEcheanceDoc);    //Si la date d'�cheance du document est atteinte ?
        if (dateEcheanceAtteinte) {
            Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                    .then(function (value) {
                        $scope.delArchive = true;
                        if (value == true) {
                            $scope.deleteDocument(doc);
                        }
                    });
        } else {
            SweetAlert.simpleNotification("warning", "Attention", "Vous ne pouvez pas supprimer ce document \n\
                                            car la date d'écheance n'est pas encore atteinte");
        }

    };

    $scope.deleteDocument = function (document) {

        UploadFile.delete(angular.toJson({chemin: document.emplacement})).success(function () {
            Document.delete(document.id).success(function () {
                if ($scope.delArchive == true) {
                    $scope.delArchive = false;
                    SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                    $scope.$parent.listerMesDocuments();
                }
                if ($scope.delFormation == true) {
                    /*Supprimer la formation a la quelle est rattachee le document supprimer*/
                    $scope.deleteFormation(document.formation.id);
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du document");
            });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression du fichier");
        });
    };

    $scope.delFormation = false;  /*Verifier si le document supprimer est lie a une formation(c a d si la mathode deleteFornation doit etre appellee apres suppression du document)*/

    $scope.deleteFormationAndDocument = function (id) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.delFormation = true;
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        var doc = $scope.getDocumentformation(id); //Recuperer le document lie � cette formation
                        $scope.deleteDocument(doc);
                    }
                });
    };

    $scope.deleteFormation = function (id) {
        Formation.delete(id).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
            $scope.delFormation = false;
            $scope.$parent.listerMesDocuments();
            $scope.findAllFormations();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
        });
    };

   

});